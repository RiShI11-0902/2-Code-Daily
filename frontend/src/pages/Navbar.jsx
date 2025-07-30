"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useUserStore from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
///{ setopenForm, openForm }
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openForm, setopenForm] = useState(false)
  const { user } = useUserStore();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);


  return (
    <>
      <nav className=" montserrat-heading bg-stone-950 fixed text-white w-full p-5 z-50 shadow-lg">
        <div className="container mx-auto flex justify-around items-center px-4">
          {/* Logo */}
          <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-[#9290C3]">2</span>
            <span className="text-white">Code Daily</span>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden text-3xl z-50" onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>

          {/* Navigation Links */}
          <ul
            className={`${menuOpen
              ? "top-0 bg-black w-full h-fit p-5 pt-28"
              : "-top-96"
              } md:flex md:items-center absolute md:static left-0 w-full md:w-auto transition-all duration-300 ease-in z-40 text-center`}
          >
            <li className="mx-4 my-4 md:my-0">
              <Link
                to="/"
                className="text-[#9290C3] hover:text-[#535C91] transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="text-[#9290C3] hover:text-[#535C91] transition duration-300"
              >
                About us
              </Link>
            </li>
            <li className="mx-4 my-4 md:my-0">
              <Link
                to="/contact-us"
                className="text-[#9290C3] hover:text-[#535C91] transition duration-300"
              >
                Contact Us
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
              {user ? (
                user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg uppercase">
                    {user.name?.charAt(0)}
                  </div>
                )
              ) : (
                <button
                  onClick={() => setopenForm(true)}
                  className="bg-blue-50 text-[#07071a] px-4 py-2 rounded-3xl hover:text-[#6a64e1] transition duration-300"
                >
                  Sign In
                </button>
              )}
            </li>

          </ul>
        </div>
      </nav>

      {/* Modal */}
      {openForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn px-4">
          <div className="bg-white text-black rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-slideUp">
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

      {/* Tailwind Keyframes */}
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
