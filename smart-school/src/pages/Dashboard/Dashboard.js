import { useState } from 'react';
import RequestCard from '../../components/common/RequestCard';
import StatusBadge from '../../components/common/StatusBadge';
import { useAppData } from '../../context/AppDataContext';

function Dashboard() {
  const {
    requests,
    donationHistory,
    currentUser,
    donateToRequest,
    addRequirement,
    updateRequirementStatus,
    uploadCompletionProof
  } = useAppData();

  const [donationInputs, setDonationInputs] = useState({});
  const [newRequirement, setNewRequirement] = useState({
    title: '',
    details: '',
    targetAmount: '',
    requirementImage: ''
  });
  const [proofDrafts, setProofDrafts] = useState({});

  if (!currentUser) {
    return (
      <section className="card">
        <h1>Dashboard</h1>
        <p>Please login or register to access role-based dashboard features.</p>
      </section>
    );
  }

  function handleDonate(requestId) {
    donateToRequest(requestId, donationInputs[requestId], currentUser.name);
    setDonationInputs((prev) => ({ ...prev, [requestId]: '' }));
  }

  function handleRequirementSubmit(event) {
    event.preventDefault();
    addRequirement({
      schoolName: currentUser.name,
      title: newRequirement.title,
      details: newRequirement.details,
      targetAmount: newRequirement.targetAmount,
      requirementImage: newRequirement.requirementImage
    });
    setNewRequirement({ title: '', details: '', targetAmount: '', requirementImage: '' });
  }

  function handleRequirementPhoto(file) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setNewRequirement((prev) => ({
        ...prev,
        requirementImage: String(reader.result || '')
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleProofFileChange(requestId, file) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProofDrafts((prev) => ({
        ...prev,
        [requestId]: {
          ...prev[requestId],
          image: String(reader.result || '')
        }
      }));
    };
    reader.readAsDataURL(file);
  }

  function submitProof(requestId) {
    const draft = proofDrafts[requestId];
    if (!draft || !draft.image) {
      return;
    }
    uploadCompletionProof(requestId, draft.image, draft.description || 'Work completed and verified.');
    setProofDrafts((prev) => ({
      ...prev,
      [requestId]: { image: '', description: '' }
    }));
  }

  const donorRequests = requests.filter((request) => request.status !== 'Completed');
  const donorHistory = donationHistory.filter((item) => item.donorName === currentUser.name);
  const schoolRequests = requests.filter((request) => request.schoolName === currentUser.name);

  return (
    <section>
      <div className="section-header">
        <h1>{currentUser.role.toUpperCase()} Dashboard</h1>
        <p>Signed in as {currentUser.name}</p>
      </div>

      {currentUser.role === 'donor' ? (
        <>
          <div className="section-header">
            <h2>Available Donation Requests</h2>
          </div>
          <div className="grid">
            {donorRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                donationAmount={donationInputs[request.id] || ''}
                onDonationAmountChange={(value) =>
                  setDonationInputs((prev) => ({ ...prev, [request.id]: value }))
                }
                onDonate={() => handleDonate(request.id)}
                showDonateAction
              />
            ))}
          </div>

          <div className="section-header section-gap">
            <h2>Your Donation History</h2>
          </div>
          <div className="card">
            {donorHistory.length ? (
              <ul className="history-list">
                {donorHistory.map((item) => (
                  <li key={item.id}>
                    <strong>{item.requestTitle}</strong> - Rs. {item.amount.toLocaleString()} on {item.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No donations yet. Start with any request above.</p>
            )}
          </div>
        </>
      ) : null}

      {currentUser.role === 'school' ? (
        <>
          <div className="section-header">
            <h2>Add New Requirement</h2>
          </div>
          <form className="card simple-form" onSubmit={handleRequirementSubmit}>
            <input
              value={newRequirement.title}
              onChange={(event) =>
                setNewRequirement((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="Requirement title"
              required
            />
            <textarea
              value={newRequirement.details}
              onChange={(event) =>
                setNewRequirement((prev) => ({ ...prev, details: event.target.value }))
              }
              placeholder="Requirement details"
              rows="3"
              required
            />
            <input
              type="number"
              min="1"
              value={newRequirement.targetAmount}
              onChange={(event) =>
                setNewRequirement((prev) => ({ ...prev, targetAmount: event.target.value }))
              }
              placeholder="Target amount"
              required
            />
            <label htmlFor="requirement-photo">Requirement photo</label>
            <input
              id="requirement-photo"
              type="file"
              accept="image/*"
              onChange={(event) => handleRequirementPhoto(event.target.files?.[0])}
            />
            {newRequirement.requirementImage ? (
              <img className="preview-image" src={newRequirement.requirementImage} alt="Requirement preview" />
            ) : null}
            <button type="submit" className="btn btn-primary">Submit Requirement</button>
          </form>

          <div className="section-header section-gap">
            <h2>Your Submitted Requests</h2>
          </div>
          <div className="grid">
            {schoolRequests.map((request) => (
              <article className="card" key={request.id}>
                <div className="request-head">
                  <h3>{request.title}</h3>
                  <StatusBadge status={request.status} />
                </div>
                <p className="muted">{request.details}</p>

                <label htmlFor={`status-${request.id}`}>Update status</label>
                <select
                  id={`status-${request.id}`}
                  value={request.status}
                  onChange={(event) => updateRequirementStatus(request.id, event.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <label htmlFor={`proof-image-${request.id}`}>Completion proof image</label>
                <input
                  id={`proof-image-${request.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleProofFileChange(request.id, event.target.files?.[0])}
                />

                {proofDrafts[request.id]?.image ? (
                  <img className="preview-image" src={proofDrafts[request.id].image} alt="Proof preview" />
                ) : null}

                <textarea
                  placeholder="Proof description"
                  rows="3"
                  value={proofDrafts[request.id]?.description || ''}
                  onChange={(event) =>
                    setProofDrafts((prev) => ({
                      ...prev,
                      [request.id]: {
                        ...prev[request.id],
                        description: event.target.value
                      }
                    }))
                  }
                />

                <button type="button" className="btn btn-primary" onClick={() => submitProof(request.id)}>
                  Upload Completion Proof
                </button>
              </article>
            ))}
          </div>
        </>
      ) : null}

      {currentUser.role === 'admin' ? (
        <>
          <div className="grid">
            <article className="card">
              <h3>Total Requests</h3>
              <p className="metric">{requests.length}</p>
            </article>
            <article className="card">
              <h3>Completed Projects</h3>
              <p className="metric">{requests.filter((request) => request.status === 'Completed').length}</p>
            </article>
            <article className="card">
              <h3>Total Donations</h3>
              <p className="metric">Rs. {donationHistory.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</p>
            </article>
          </div>

          <div className="section-header section-gap">
            <h2>All Requests Oversight</h2>
          </div>
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>School</th>
                    <th>Requirement</th>
                    <th>Status</th>
                    <th>Raised</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.schoolName}</td>
                      <td>{request.title}</td>
                      <td><StatusBadge status={request.status} /></td>
                      <td>Rs. {request.raisedAmount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default Dashboard;
