import React from 'react'
// import { Link } from 'react-router'
import { Link } from "react-router-dom"; // Import Link from react-router-dom


export const Footer = () => {
    return (
        <>

<footer className="bg-gradient-to-r from-[#070F2B] to-[#1B1A55] montserrat-heading text-white py-8 shadow-2xl shadow-[#a9a8d8]">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row md:justify-between mb-8">
      
      {/* 2Code Daily Section */}
      <div className="text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-4 text-[#9290C3]">2Code Daily</h2>
        <p className="text-[#535C91] w-80">
          Practice LeetCode problems like a pro. Turn coding challenges into interactive mock interviews.
        </p>
      </div>

      {/* Quick Links Section */}
      <div className="text-center md:text-left mb-6 md:mb-0">
        <h3 className="text-xl font-semibold mb-4 text-[#9290C3]">Quick Links</h3>
        <ul className="space-y-2 text-[#535C91]">
          <li>
            <Link to={"/"} className="text-[#535C91] hover:text-lavender transition">Home</Link>
          </li>
          <li>
            <Link to={"/pricing"} className="text-[#535C91] hover:text-lavender transition">Pricing</Link>
          </li>
        </ul>
      </div>

      {/* Legal Section */}
      <div className="text-center md:text-left mb-6 md:mb-0">
        <h3 className="text-xl font-semibold mb-4 text-[#9290C3]">Legal</h3>
        <ul className="space-y-2 text-[#535C91]">
          <li>
            <Link to="/terms-conditions" className="text-[#535C91] hover:text-lavender transition">Terms and Conditions</Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="text-[#535C91] hover:text-lavender transition">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/refunds" className="text-[#535C91] hover:text-lavender transition">Cancellation & Refunds</Link>
          </li>
          <li>
            <Link to="/shipping" className="text-[#535C91] hover:text-lavender transition">Shipping Policy</Link>
          </li>
        </ul>
      </div>

      {/* Contact Us Section */}
      <div className="text-center md:text-left">
        <h3 className="text-xl font-semibold mb-4 text-[#9290C3]">Contact Us</h3>
        <p className="text-[#535C91]">Email: <a href="mailto:contact2codedaily@gmail.com" className="hover:text-lavender transition">contact2codedaily@gmail.com</a></p>
        <p className="text-[#535C91]">Support Hours: Mon–Fri, 10 AM – 6 PM IST</p>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="pt-4 text-center">
      <p className="text-sm text-[#535C91]">
        © 2025 2Code Daily. All rights reserved.
      </p>
    </div>
  </div>
</footer>


        </>
    )
}
