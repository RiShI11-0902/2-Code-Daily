import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import handlePayment from '../utils/paymentFunction';
import useUserStore from '../store/store';
import axios from 'axios';

const Pricing = () => {

    const {user} = useUserStore()
    const [error, setError] = useState()
    const [numUsers, setNumUsers] = useState()

    useEffect(() => {
      const totalUsers = async ()=>{
        const data = await axios.get("https://two-code-daily-1.onrender.com/user/totalusers")
        console.log(data);
        if(data.status == 200){
            setNumUsers(data.data.totalUsers)
        }else{
            setError(data.data.message)
        }
      }
      totalUsers()
    }, [])
    

    const checkUser = ()=>{
        if(!user){
            setError("Register First")
        }else if(user.isSubscribed){
            setError("Already Subscribed")
        }
         handlePayment(user)
    }

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen montserrat-heading bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-[#9290C3]">Pricing Plans</h1>
      
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* First 100 Users Plan */}
        {
            numUsers < 100 && <div className="bg-[#1B1A55] p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#535C91]">Early Bird Offer</h2>
            <p className="text-lg">For the first 100 users </p>
            <p className='text-sm font-thin'>{ (100 - numUsers ) + " Users are " + 'Remaining'}</p>
            <p className="text-3xl font-bold mt-4">₹100/month</p>
            <button onClick={ checkUser} className="mt-6 bg-[#535C91] hover:bg-[#9290C3] text-white py-2 px-6 rounded-lg transition">Get Started</button>
          </div>
        }
        
        
        {/* Regular Plan */}
        <div className="bg-[#1B1A55] p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#535C91]">Standard Plan</h2>
          <p className="text-lg">For all other users</p>
          <p className="text-3xl font-bold mt-4">₹200/month</p>
          <button onClick={checkUser} className="mt-6 bg-[#535C91] hover:bg-[#9290C3] text-white py-2 px-6 rounded-lg transition">Get Started</button>
        </div>
      </div>

      <h1 className='montserrat-heading text-red-600'>{error}</h1>
    </div>
    </>
  );
};

export default Pricing;
