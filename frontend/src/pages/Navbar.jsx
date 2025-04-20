"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useUserStore from "../store/store";
import { Link, useNavigate } from "react-router";
import AuthModal from "../components/AuthModal";

const Navbar = ({ setopenForm, openForm }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="montserrat-heading bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-white fixed top-0 left-0 w-full p-5 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-[#9290C3]">2</span>
            <span className="text-white">Code Daily</span>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden text-3xl z-50" onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>

          {/* Navigation Links */}
          <ul
            className={`md:flex md:items-center absolute md:static bg-black md:bg-transparent left-0 w-full h-screen md:w-auto text-center transition-all duration-500 ease-in-out z-40 ${
              menuOpen ? "top-0 opacity-100 p-20" : "-top-96 opacity-0"
            }`}
          >
            <li className="mx-4 my-4 md:my-0">
              <Link
                to="/"
                className="text-[#9290C3] hover:text-[#535C91] transition duration-300"
              >
                Home
              </Link>
            </li>
            <li className="mx-4 my-4 md:my-0">
              <Link
                to="/pricing"
                className="text-[#9290C3] hover:text-[#535C91] transition duration-300"
              >
                Pricing
              </Link>
            </li>
            {user && (
              <li className="mx-4 my-4 md:my-0">
                <Link
                  to="/dashboard"
                  className="text-[#9290C3] hover:text-[#535C91] transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="mx-4 my-4 md:my-0">
              <button
                onClick={() => setopenForm(true)}
                className="bg-blue-50 text-[#07071a] px-4 py-2 rounded-3xl hover:bg-white hover:text-[#1B1A55] transition duration-300"
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Animated AuthModal */}
      {openForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn px-4 ">
          <div className="bg-white text-black rounded-2xl shadow-2xl w-full  max-w-md p-6 relative animate-slideUp">
            {/* Close Button */}
            <button
              onClick={() => setopenForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FiX size={22} />
            </button>

            <AuthModal isOpen={openForm} onClose={() => setopenForm(false)} />
          </div>
        </div>
      )}

      {/* Tailwind Keyframes (for animation) */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
