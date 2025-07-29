import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handlePayment from '../utils/paymentFunction';
import PlanModal from './PlanModal';
import useUserStore from '../store/store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Sidebar = ({ 
  setSidebarOpen, 
  scrollToTop, 
  notify, 
  showSolvedView, 
  showProgressView, 
  showProfileView, 
  showQuestionsView 
}) => {
  const { user, removeUser } = useUserStore();
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState('coding-sheet-btn')

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`, 
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        removeUser();
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
  };

  const handleNavigation = (action) => {
    action();
    setSidebarOpen(false);
  };

  const menuItems = [
    {
      name: 'Coding Sheet',
      action: showQuestionsView,
      testId: 'coding-sheet-btn'
    },
    {
      name: 'Solved',
      action: showSolvedView,
      testId: 'solved-btn'
    },
    {
      name: 'Progress',
      action: showProgressView,
      testId: 'progress-btn'
    },
    {
      name: 'Go Premium',
      action: () => user?.isSubscribed ? notify() : navigate('/pricing'),
      testId: 'premium-btn'
    },
    {
      name: 'Account',
      action: showProfileView,
      testId: 'account-btn'
    },
    {
      name: 'Log Out',
      action: handleLogout,
      testId: 'logout-btn'
    }
  ];

  return (
    <>
      <section 
        className="sidebar fixed h-screen w-64 bg-stone-950 border-r border-white text-white z-40"
        aria-label="Main navigation"
      >
        <div className="p-4 bg-stone-950">
          <Link 
            to="/" 
            className="text-2xl text-[#9290C3] font-semibold p-2 cursor-pointer transition duration-200 hover:text-white"
            aria-label="Home"
          >
            2Code Daily
          </Link>
          
          <ul className="space-y-4 flex flex-col mt-5 text-[#f0f1f6]">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  handleNavigation(item.action)
                  setSelected(item.testId)
                }}
                className={`text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200 hover:text-white ${item.testId == selected ? 'bg-gray-800' : '' } `}
                data-testid={item.testId}
                aria-label={item.name}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        
      </section>

      {showModal && (
        <PlanModal 
          showModal={showModal} 
          setShowModal={setShowModal} 
          handlePayment={handlePayment} 
          user={user} 
        />
      )}
    </>
  );
};

export default Sidebar;