import React from 'react'
import ReactDOM from 'react-dom/client';
import Button from './Button';
import "./App.css";

const root = document.createElement("div")
root.id = "ai_Interview"

document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);

console.log("Hello from content script!");
console.log("chrome:", chrome);
console.log("chrome.storage:", chrome?.storage);
console.log("chrome.storage.local:", chrome?.storage?.local);


rootDiv.render(
    <Button />
);