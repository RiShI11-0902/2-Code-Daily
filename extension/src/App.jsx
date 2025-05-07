import React, { useState } from "react";
import "./App.css";
import { handleSubmit } from "./utils/storeEmail";

function App() {

  const [email, setEmail] = useState()
  const [loading, setloading] = useState()

  return (
    <div
    id="box"
    className="bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-[#9290C3] rounded-3xl p-8 w-[90%] max-w-xl mx-auto flex flex-col gap-8 shadow-2xl transition-all duration-300 hover:scale-[1.01]"
  >
    <h1 className="text-3xl font-extrabold text-center text-white tracking-wide">
      Welcome to <span className="text-blue-400">2Code Daily</span>
    </h1>
    <p className="text-center text-base text-[#ccc] italic">
      Ace your coding interviews with AI-powered LeetCode mock interviews!
    </p>
  
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white border-b border-blue-600 pb-1">
        How to Get Started
      </h2>
      <ul className="space-y-3 list-disc list-inside text-sm sm:text-base">
        <li>
          Create an account on{" "}
          <a
            href="https://2codedaily.com"
            className="text-blue-400 hover:underline"
            target="_blank"
          >
            2Code Daily
          </a>{" "}
          to get started.
        </li>
        <li>Enter the same email below you signed up with.</li>
        <li>
          Open any LeetCode question and click the{" "}
          <strong>Start Interview</strong> button at the bottom-right.
        </li>
        <li className="flex items-start gap-2">
          <span className="text-lg">🔍</span>
          <span>
            Track your progress on{" "}
            <a
              href="https://2codedaily.com"
              className="text-blue-400 hover:underline"
              target="_blank"
            >
              2Code Daily
            </a>
          </span>
        </li>
      </ul>
    </section>
  
    <footer className="flex flex-col gap-4">
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter the same email you used on our website"
        className="p-3 rounded-lg bg-[#10194a] placeholder-[#bbb] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div id="btns" className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => handleSubmit(email, setloading)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg text-sm w-full sm:w-1/2"
        >
          {loading ? "Saving..." : "Save Email"}
        </button>
        <a
          href="https://2codedaily.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 transition text-white p-3 rounded-lg text-center text-sm w-full sm:w-1/2"
        >
          Unlock Premium Features
        </a>
      </div>
    </footer>
  </div>
  
  );
}

export default App;
