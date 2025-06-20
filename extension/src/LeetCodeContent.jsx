import React from 'react'
import ReactDOM from 'react-dom/client';
import LeetCodeButton from './LeetCodeButton';
import "./App.css";

const root = document.createElement("div")
root.id = "ai_Interview"

document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);



rootDiv.render(
    <LeetCodeButton />
);