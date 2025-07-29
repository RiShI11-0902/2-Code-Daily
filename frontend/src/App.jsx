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
import AuthenticateExtension from './pages/AuthenticateExtension'

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/authenticate-extension' element={<AuthenticateExtension />} />
          <Route path='/contact-us' element={<ContactSection />} />
          <Route path='/about-us' element={<AboutUs />} />

          <Route path='/pricing' element={<Pricing />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/refunds' element={<CancellationRefunds />} />
          <Route path='/shipping' element={<ShippingPolicy />} />

          <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
          <Route path='/progress' element={<Protected><ProgressPage /></Protected>} />
          <Route path='/paymentsuccess' element={<Protected><PaymentSuccess /></Protected>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
