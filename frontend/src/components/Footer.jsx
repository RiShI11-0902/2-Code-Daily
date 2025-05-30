import React from 'react';
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-stone-950 montserrat-heading text-white py-10 shadow-2xl shadow-[#a9a8d8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-10 text-center md:text-left">
          
          {/* 2Code Daily Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#9290C3]">2Code Daily</h2>
            <p className="text-[#535C91] max-w-xs mx-auto md:mx-0">
              Practice LeetCode problems like a pro. Turn coding challenges into interactive mock interviews.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#9290C3]">Quick Links</h3>
            <ul className="space-y-2 text-[#535C91]">
              <li>
                <Link to="/" className="hover:text-lavender transition">Home</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-lavender transition">Pricing</Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#9290C3]">Legal</h3>
            <ul className="space-y-2 text-[#535C91]">
              <li>
                <Link to="/terms-conditions" className="hover:text-lavender transition">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-lavender transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refunds" className="hover:text-lavender transition">Cancellation & Refunds</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-lavender transition">Shipping Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#9290C3]">Contact Us</h3>
            <p className="text-[#535C91] break-all">
              Email: <a href="mailto:contact2codedaily@gmail.com" className="hover:text-lavender transition">contact2codedaily@gmail.com</a>
            </p>
            <p className="text-[#535C91]">Support Hours: Mon–Fri, 10 AM – 6 PM IST</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#535C91] pt-4 text-center">
          <p className="text-sm text-[#535C91]">
            © 2025 2Code Daily. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
