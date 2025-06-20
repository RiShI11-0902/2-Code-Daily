import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const extractJobDescription = () => {
  const jdText = document.querySelector('#job-details');
  return jdText?.innerText.trim() || '';
};

const JDButton = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    const jd = extractJobDescription();
    if (!jd) {
      setError('Job description not found on this page.');
      setLoading(false);
      return;
    }

    chrome.runtime.sendMessage({ type: 'GET_EMAIL' }, async (response) => {
      if (response?.email) {
        try {
          await axios.post(`http://localhost:5000/create/interview`, { jd, email: response.email });
          setSuccess('✅ Interview created! Visit https://2codedaily.com to access it.');
        } catch (err) {
          console.error(err);
          setError(err.response?.data?.message || 'Something went wrong');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Could not retrieve user email.');
        setLoading(false);
      }
    });
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {error && (
        <div style={{ color: 'red', marginBottom: '6px', background: '#ffe5e5', padding: '4px 8px', borderRadius: '4px' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: 'green', marginBottom: '6px', background: '#e5ffe5', padding: '4px 8px', borderRadius: '4px' }}>
          {success}
        </div>
      )}
      <button
        onClick={handleClick}
        style={{
          backgroundColor: loading ? '#a5b4fc' : '#4f46e5',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Interview'}
      </button>
    </div>
  );
};

// Avoid injecting twice
if (!document.getElementById('jd_interview_button')) {
  const root = document.createElement("div");
  root.id = "jd_interview_button";
  document.body.appendChild(root);
  const rootDiv = ReactDOM.createRoot(root);
  rootDiv.render(<JDButton />);
}
