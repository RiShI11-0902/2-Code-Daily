import React, { useState } from 'react';

const PlanModal = ({ showModal, setShowModal, handlePayment, user }) => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    handlePayment(user, plan);
    setShowModal(false); // Close modal after selection
  };

  if (!showModal) return null; // If modal is not visible, don't render

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Choose Your Plan</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleSelectPlan('Starter')}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Starter - ₹200
          </button>
          <button
            onClick={() => handleSelectPlan('Pro')}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Pro - ₹500
          </button>
          <button
            onClick={() => handleSelectPlan('Elite')}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Elite - ₹1000
          </button>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 w-full p-3 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlanModal;
