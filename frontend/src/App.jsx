import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Protected from './components/Protected'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProgressPage from './pages/ProgressPage'

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
          <Route path='/progress' element={<Protected><ProgressPage /></Protected>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
