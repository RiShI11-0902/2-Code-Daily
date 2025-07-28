import React, { useState } from 'react';
import Navbar from './Navbar';
import useUserStore from '../store/store';
import handlePayment from '../utils/paymentFunction'; // Accepts `user` and `plan`
import { Loader } from 'lucide-react';

const plans = [
  {
    name: 'Regular',
    price: 599,
    interviews: '100 Mock Interviews, 5 Interviews / day',
    description: 'Perfect for beginners who want steady progress.',
  },
  {
    name: 'Early Bird',
    price: 849,
    interviews: '5 Interviews / day for Integer.MAX days',
    description: 'For First 100 users.',
  },
];

const Pricing = () => {
  const { user } = useUserStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const handleClick = (planName) => {
    setLoading(true)
    if (!user) {
      setError("Please register or log in first.");
      setLoading(false)
      return;
    }
    if (user.isSubscribed) {
      setError("You already have an active plan.");
      setLoading(false)
      return;
    }
    handlePayment(user, planName); 
    setLoading(false)
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-950  flex flex-col items-center justify-center text-white px-4 pb-5">
        <h1 className="text-4xl font-bold mb-10 text-[#9290C3]">Choose Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-stone-950 shadow-sm shadow-neutral-500 rounded-2xl p-6 flex flex-col items-center justify-between"
            >
              <h2 className="text-2xl font-bold text-[#535C91] mb-2">{plan.name}</h2>
              <p className="text-3xl font-semibold mb-2">₹{plan.price}</p>
              <p className="text-lg mb-4 text-[#9290C3]">{plan.interviews}</p>
              <p className="text-center text-sm mb-6 text-gray-300">{plan.description}</p>
              <button
                onClick={() => handleClick(plan.name)}
                className="bg-[#535C91] hover:bg-[#9290C3] text-white py-2 px-6 rounded-lg transition"
              >
              {
                loading ? <Loader className='animate-spin w-fit justify-center items-center text-white' /> : "Buy Now"
              }
                
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
