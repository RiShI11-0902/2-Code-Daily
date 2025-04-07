"use client"
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {AiOutlineGoogle} from 'react-icons/ai'
import Register from "./Register";
import useUserStore from "../store/store";
import { Link } from "react-router";

const Navbar = ({setopenForm,openForm, SignIn}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const SignIn = ()=>{
  //   window.open("https://two-code-daily-1.onrender.com/auth/google/callback","_self ")
  // }

  // const user = useUserStore((state) => state.user)

  const {user} = useUserStore()

  console.log(user);
  


  return (
   <>
    <nav className=" montserrat-heading bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-white absolute top-0 left-0 w-full p-5">
      <div className="container mx-auto flex justify-around items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-[#9290C3]">2</span>
          <span className="text-white">Code Daily</span>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden text-3xl z-10" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Nav Links */}
        <ul
          className={`md:flex md:items-center absolute md:static left-0 w-full md:w-auto transition-all duration-300 ease-in ${
            menuOpen ? "top-0 bg-black w-full h-fit p-5 items-center mx-auto pt-28" : "-top-96"
          }`}
        >
          <li className="mx-4 my-4 md:my-0">
            <Link
              to={"/"}
              className="text-[#9290C3] hover:text-[#535C91] transition duration-300"
            >
              Home
            </Link>
          </li>
          <li className="mx-4 my-4 md:my-0">
            <Link
              to={"/pricing"}
              className="text-[#9290C3] hover:text-[#535C91] transition duration-300"
            >
              Pricing
            </Link>
          </li>
          {
            user &&  <Link to={"/dashboard"} className="mx-4 my-4 md:my-0 text-[#9290C3] hover:text-[#535C91] transition duration-300">

              Dashboard
          </Link>
          }
          {/* <li className="mx-4 my-4 md:my-0">
            {
               user ? <img src={user.image} className="w-10 rounded-full" /> : <button
               onClick={SignIn}
               className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition"
             >
               <AiOutlineGoogle className="w-5 h-5 mr-2" />
               Sign in with Google
             </button>
            }
          </li> */}
        </ul>
      </div>
    </nav>

    { openForm && <Register />}
   </>
  );
};

export default Navbar;
