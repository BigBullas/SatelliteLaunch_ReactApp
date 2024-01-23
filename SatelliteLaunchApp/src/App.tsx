import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SinglePayloadPage from './pages/SinglePayloadPage'
import PayloadsPage from './pages/PayloadsPage'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/payloads" element={<PayloadsPage />} />
        <Route path="/payloads/:id" element={<SinglePayloadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
