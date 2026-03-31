import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';

function RequestCard({
  request,
  donationAmount,
  onDonationAmountChange,
  onDonate,
  showDonateAction,
  showProof
}) {
  return (
    <article className="card request-card">
      <div className="request-head">
        <h3>{request.title}</h3>
        <StatusBadge status={request.status} />
      </div>
      <p className="school-name">{request.schoolName}</p>

      {request.requirementImage ? (
        <img
          className="request-image"
          src={request.requirementImage}
          alt={`${request.title} requirement`}
        />
      ) : null}

      <p className="muted">{request.details}</p>
      <p className="money-line">
        Raised: Rs. {request.raisedAmount.toLocaleString()} / Rs. {request.targetAmount.toLocaleString()}
      </p>
      <ProgressBar value={request.raisedAmount} max={request.targetAmount} />

      {showDonateAction ? (
        <div className="donate-inline">
          <input
            type="number"
            min="1"
            placeholder="Amount"
            value={donationAmount}
            onChange={(event) => onDonationAmountChange(event.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={onDonate}>
            Donate
          </button>
        </div>
      ) : null}

      {showProof && request.proofImage ? (
        <div className="proof-box">
          <img src={request.proofImage} alt={`${request.title} completion proof`} />
          <p>{request.proofDescription || 'Completion proof uploaded by school.'}</p>
        </div>
      ) : null}
    </article>
  );
}

export default RequestCard;
