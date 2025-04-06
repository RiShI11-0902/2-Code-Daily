import React, { useState } from "react";
import "./App.css";

function App() {

  const [email, setEmail] = useState()
  const [loading, setloading] = useState()

  const handleSubmit = async () => {
    setloading(true)
    // Redirect user to the landing page for registration
    // window.open("https://your-landing-page-url.com", "_blank"); // Replace with your actual landing page URL
    
    setTimeout( async ()  =>{
      chrome.runtime.sendMessage({ type: 'STORE_EMAIL', payload: email });
      // await chrome.storage.local.set({ email: email })
      setloading(false)
    },500)
  };

  return (
    <div id="box">
      <h1>Welcome to 2Code Daily</h1>
      <p className="tagline">Ace your coding interviews with AI-powered LeetCode solutions!</p>

      <section className="features">
        <h2>Key Features</h2>
        <ul className="feature-list">
          <li>💡 Get AI-powered mock interviews tailored to your needs.</li>
          <li>⏱️ Practice with AI for better time management.</li>
          <li>📈 Track your progress and improve over time.</li>
          <li>🔗 Seamlessly integrates with LeetCode for a smooth experience.</li>
        </ul>
      </section>

      <footer className="cta-section">
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter same email you entered on our website." />
        <div id='btns'>
          <button onClick={handleSubmit}>{loading ? "Registering..." : "Register Email"}</button>
          <button class="cta-button"> <a href="http://localhost:5173" target="_blank" style={{color:'white'}}>Unlock Premium Features</a></button>
        </div>
      </footer>
    </div>
  );
}

export default App;
