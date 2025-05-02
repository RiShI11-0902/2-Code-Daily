import React, { useState } from 'react';
import Navbar from './Navbar';
import useUserStore from '../store/store';
import handlePayment from '../utils/paymentFunction'; // Accepts `user` and `plan`

const plans = [
  {
    name: 'Starter',
    price: 200,
    interviews: '20 Mock Interviews per Month',
    description: 'Perfect for beginners who want steady progress.',
  },
  {
    name: 'Pro',
    price: 400,
    interviews: '40 Mock Interviews per Month',
    description: 'Best for consistent daily learners.',
  },
  {
    name: 'Elite',
    price: 600,
    interviews: 'Unlimited',
    description: 'Ideal for hardcore DSA grinders.',
  },
];

const Pricing = () => {
  const { user } = useUserStore();
  const [error, setError] = useState('');

  const handleClick = (planName) => {
    if (!user) {
      setError("Please register or log in first.");
      return;
    }
    if (user.isSubscribed) {
      setError("You already have an active plan.");
      return;
    }

    handlePayment(user, planName); // Modify this function to accept plan name
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-[#070F2B] to-[#1B1A55] flex flex-col items-center justify-center text-white px-4 pb-5">
        <h1 className="text-4xl font-bold mb-10 text-[#9290C3]">Choose Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-[#1B1A55] rounded-2xl shadow-xl p-6 flex flex-col items-center justify-between"
            >
              <h2 className="text-2xl font-bold text-[#535C91] mb-2">{plan.name}</h2>
              <p className="text-3xl font-semibold mb-2">₹{plan.price}/month</p>
              <p className="text-lg mb-4 text-[#9290C3]">{plan.interviews}</p>
              <p className="text-center text-sm mb-6 text-gray-300">{plan.description}</p>
              <button
                onClick={() => handleClick(plan.name)}
                className="bg-[#535C91] hover:bg-[#9290C3] text-white py-2 px-6 rounded-lg transition"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 mt-6">{error}</p>}
      </div>
    </>
  );
};

export default Pricing;
