import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ fix the import
import handlePayment from '../utils/paymentFunction';
import PlanModal from './PlanModal';
import useUserStore from '../store/store';
import axios from 'axios';

const Sidebar = ({ setSidebarOpen, scrollToTop, notify, setShowSolved, setProgressBar }) => {
  const { user } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`, { withCredentials: true });
      if (res.status === 200) {
        useUserStore.getState().removeUser();
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <section className="sidebar fixed montserrat-heading h-screen w-64 bg-gray-900 text-white z-40">
        <div className="p-4">
          <Link to={"/"} className="text-2xl text-[#9290C3] font-semibold p-2 cursor-pointer transition duration-200">
            2Code Daily
          </Link>
          <ul className="space-y-4 flex flex-col mt-5 text-[#535C91]">
            <li onClick={() => {
              setShowSolved(false);
              setProgressBar(false);
              setSidebarOpen(false)
            }} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">
              Coding Sheet
            </li>
            <li onClick={() => {
              setShowSolved(true);
              setProgressBar(false);
              setSidebarOpen(false)
            }} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">
              Solved
            </li>
            <li onClick={() => {
              setSidebarOpen(false)
              setProgressBar(true)
            }} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">
              Progress
            </li>
            <li onClick={() => (user.isSubscribed ? notify() : setShowModal(true))} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">
              Go Premium
            </li>
            <li onClick={logout} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">
              Log Out
            </li>
          </ul>
        </div>
        <button onClick={scrollToTop} className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
          ↑ Top
        </button>
      </section>

      {/* ✅ Modal rendered outside the fixed sidebar */}
      {showModal && (
        <PlanModal showModal={showModal} setShowModal={setShowModal} handlePayment={handlePayment} user={user} />
      )}
    </>
  );
};

export default Sidebar;
