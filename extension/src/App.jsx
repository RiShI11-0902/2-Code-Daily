import React, { useState } from "react";
import "./App.css";

function App() {

  const [email, setEmail] = useState()
  const [loading, setloading] = useState()

  const handleSubmit = async () => {
    setloading(true)
    // Redirect user to the landing page for registration
    // window.open("https://your-landing-page-url.com", "_blank"); // Replace with your actual landing page URL

    setTimeout(async () => {
      chrome.runtime.sendMessage({ type: 'STORE_EMAIL', payload: email });
      // await chrome.storage.local.set({ email: email })
      setloading(false)
    }, 500)
  };

  return (
    <div id="box">
      <h1>Welcome to 2Code Daily</h1>
      <p className="tagline">Ace your coding interviews with AI-powered LeetCode solutions!</p>

      <p>Sign In on our Website First: <a href="https://2codedaily.com" target="_blank" style={{ color: 'white' }}>2 Code Daily</a> </p>

      <section className="features">
        <h2>Key Features</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 text-lg">💬</span>
            <span className="text-blue-100">AI interviewer that asks probing questions about your approach</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-lg">🧠</span>
            <span className="text-blue-100">Analyzes your thought process and solution quality</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-lg">📊</span>
            <span className="text-blue-100">Detailed feedback on time complexity, edge cases, and optimizations</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-lg">🔍</span>
            <span className="text-blue-100">Works directly with LeetCode problems - no setup needed</span>
          </li>
        </ul>
      </section>

      <footer className="cta-section">
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter same email you entered on our website." />
        <div id='btns'>
          <button onClick={handleSubmit}>{loading ? "Registering..." : "Register Email"}</button>
          <button class="cta-button"> <a href="https://2codedaily.com" target="_blank" style={{ color: 'white' }}>Unlock Premium Features</a></button>
        </div>
      </footer>
    </div>
  );
}

export default App;
