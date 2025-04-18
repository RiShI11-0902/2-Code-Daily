import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Protected from './components/Protected'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProgressPage from './pages/ProgressPage'
import PaymentSuccess from './pages/PaymentSuccess'
import Pricing from './pages/Pricing'
import { CancellationRefunds } from './pages/CancellationRefunds'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { ShippingPolicy } from './pages/ShippingPolicy'
import { TermsConditions } from './pages/TermsConditions'
import ContactSection from './pages/Contact'
import AboutUs from './pages/About'

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pricing' element={<Pricing />} />
          
          {/* <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
          <Route path='/progress' element={<Protected><ProgressPage /></Protected>} />
          <Route path='/paymentsuccess' element={<Protected><PaymentSuccess /></Protected>} /> */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/progress' element={<ProgressPage />} />
          <Route path='/paymentsuccess' element={<PaymentSuccess />} />
          <Route path='/interview' element={<InterviewPage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
