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

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/refunds' element={<CancellationRefunds />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/shipping' element={<ShippingPolicy />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/Contact-us' element={<ContactSection />} />
          <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
          <Route path='/progress' element={<Protected><ProgressPage /></Protected>} />
          <Route path='/paymentsuccess' element={<Protected><PaymentSuccess /></Protected>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
