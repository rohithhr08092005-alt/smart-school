import { createContext, useContext, useMemo, useState } from 'react';

const AppDataContext = createContext(null);

const initialRequests = [
  {
    id: 'req-1',
    schoolName: 'Green Valley Public School',
    title: '30 New Benches',
    details: 'Need new benches for grade 6 and 7 classrooms.',
    requirementImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80',
    status: 'Pending',
    targetAmount: 60000,
    raisedAmount: 15000,
    proofImage: '',
    proofDescription: ''
  },
  {
    id: 'req-2',
    schoolName: 'Sunrise Government School',
    title: 'Library Book Set',
    details: 'Upgrade library with language and science books.',
    requirementImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    status: 'In Progress',
    targetAmount: 45000,
    raisedAmount: 32000,
    proofImage: '',
    proofDescription: ''
  },
  {
    id: 'req-3',
    schoolName: 'Little Steps Primary School',
    title: 'Classroom Renovation',
    details: 'Paint walls, repair fans, and install lights.',
    requirementImage: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=900&q=80',
    status: 'Completed',
    targetAmount: 90000,
    raisedAmount: 90000,
    proofImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    proofDescription: 'Work completed in two classrooms and handover signed by school committee.'
  }
];

const initialDonationHistory = [
  {
    id: 'don-1',
    donorName: 'Guest Donor',
    requestId: 'req-2',
    requestTitle: 'Library Book Set',
    amount: 5000,
    date: '2026-03-20'
  }
];

function AppDataProvider({ children }) {
  const [requests, setRequests] = useState(initialRequests);
  const [donationHistory, setDonationHistory] = useState(initialDonationHistory);
  const [currentUser, setCurrentUser] = useState(null);

  function loginUser(userData) {
    setCurrentUser(userData);
  }

  function registerUser(userData) {
    setCurrentUser(userData);
  }

  function logoutUser() {
    setCurrentUser(null);
  }

  function donateToRequest(requestId, amount, donorName) {
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      return;
    }

    setRequests((prevRequests) =>
      prevRequests.map((request) => {
        if (request.id !== requestId || request.status === 'Completed') {
          return request;
        }

        return {
          ...request,
          raisedAmount: request.raisedAmount + parsedAmount,
          status: request.status === 'Pending' ? 'In Progress' : request.status
        };
      })
    );

    const request = requests.find((item) => item.id === requestId);
    setDonationHistory((prev) => [
      {
        id: `don-${Date.now()}`,
        donorName,
        requestId,
        requestTitle: request ? request.title : 'School Requirement',
        amount: parsedAmount,
        date: new Date().toISOString().slice(0, 10)
      },
      ...prev
    ]);
  }

  function addRequirement(newRequirement) {
    setRequests((prev) => [
      {
        id: `req-${Date.now()}`,
        schoolName: newRequirement.schoolName,
        title: newRequirement.title,
        details: newRequirement.details,
        requirementImage: newRequirement.requirementImage || '',
        status: 'Pending',
        targetAmount: Number(newRequirement.targetAmount),
        raisedAmount: 0,
        proofImage: '',
        proofDescription: ''
      },
      ...prev
    ]);
  }

  function updateRequirementStatus(requestId, status) {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status
            }
          : request
      )
    );
  }

  function uploadCompletionProof(requestId, proofImage, proofDescription) {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: 'Completed',
              proofImage,
              proofDescription
            }
          : request
      )
    );
  }

  const value = useMemo(
    () => ({
      requests,
      donationHistory,
      currentUser,
      loginUser,
      registerUser,
      logoutUser,
      donateToRequest,
      addRequirement,
      updateRequirementStatus,
      uploadCompletionProof
    }),
    [requests, donationHistory, currentUser]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used inside AppDataProvider');
  }

  return context;
}

export { AppDataProvider, useAppData };
