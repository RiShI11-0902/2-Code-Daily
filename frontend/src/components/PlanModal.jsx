import React, { useState } from 'react';

const PlanModal = ({ showModal, setShowModal, handlePayment, user }) => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    handlePayment(user, plan);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-[#070F2B] text-white w-full max-w-md rounded-xl p-6 shadow-2xl border border-[#1B1A55]">
        <h2 className="text-2xl font-bold text-center text-[#9290C3] mb-6">Choose Your Plan</h2>

        <div className="space-y-4">
          {[
            { name: 'Regular', price: '₹59900' },
            { name: 'Early', price: '₹84990' },
          ].map((plan) => (
            <button
              key={plan.name}
              onClick={() => handleSelectPlan(plan.name)}
              className="w-full py-3 rounded-lg bg-[#1B1A55] hover:bg-[#535C91] transition-all duration-200 text-white font-semibold"
            >
              {plan.name} - {plan.price}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="mt-6 w-full py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-200 font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlanModal;
