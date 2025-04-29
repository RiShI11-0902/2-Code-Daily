import React, { useState } from "react";
import "./App.css";

function App() {

  const [email, setEmail] = useState()
  const [loading, setloading] = useState()

  const handleSubmit = async () => {
    setloading(true)
    setTimeout(async () => {
      chrome.runtime.sendMessage({ type: 'STORE_EMAIL', payload: email });
      setloading(false)
    }, 500)
  };

  return (
    <div
  id="box"
  className="bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-[#9290C3] rounded-2xl p-6 w-[90%] max-w-md mx-auto flex flex-col gap-6 shadow-xl"
>
  <h1 className="text-2xl font-bold text-center text-white">Welcome to 2Code Daily</h1>
  <p className="tagline text-sm text-center">Ace your coding interviews with AI-powered LeetCode mock Interview!</p>

  <p className="text-center text-sm">
    Sign In on our Website First:&nbsp;
    <a
      href="https://2codedaily.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white underline"
    >
      2 Code Daily
    </a>
  </p>

  <section className="features">
    <h2 className="text-lg font-semibold mb-2 text-white">Key Features</h2>
    <ul className="space-y-3">
      <li className="flex items-start">
        <span className="mr-2 text-lg">💬</span>
        <span>AI interviewer that asks probing questions about your approach</span>
      </li>
      <li className="flex items-start">
        <span className="mr-2 text-lg">🧠</span>
        <span>Analyzes your thought process and solution quality</span>
      </li>
      <li className="flex items-start">
        <span className="mr-2 text-lg">📊</span>
        <span>Detailed feedback on time complexity, edge cases, and optimizations</span>
      </li>
      <li className="flex items-start">
        <span className="mr-2 text-lg">🔍</span>
        <span>Works directly with LeetCode problems - no setup needed</span>
      </li>
    </ul>
  </section>

  <footer className="flex flex-col gap-3">
    <input
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter same email you entered on our website."
      className="p-2 rounded-md text-sm bg-[#10194a] placeholder-[#ccc] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <div id="btns" className="flex flex-col sm:flex-row gap-2">
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-md text-sm w-full sm:w-1/2"
      >
        {loading ? "Registering..." : "Register Email"}
      </button>
      <a
        href="https://2codedaily.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{color:'white'}}
        className="bg-green-600 hover:bg-green-700  transition text-white p-2 rounded-md text-center text-sm w-full sm:w-1/2"
      >
        Unlock Premium Features
      </a>
    </div>
  </footer>
</div>

  );
}

export default App;
