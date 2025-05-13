import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Agradecimento from '../pages/Agradecimento'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/obrigado" element={<Agradecimento />} />
      </Routes>
    </BrowserRouter>
  )
}
