import React from "react";
import Navbar from "../pages/Navbar";

export const LegalPage = ({ title, children }) => {
  return (
    <>

    <Navbar />
    
    <div className="min-h-screen bg-stone-950 text-white px-6 pt-28">
      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold mb-6 border-b border-white/20 pb-4 tracking-wide">
          {title}
        </h1>
        <div className="space-y-6 text-base leading-relaxed text-gray-200">
          {children}
        </div>
      </div>
    </div>

    </>
  );
};
