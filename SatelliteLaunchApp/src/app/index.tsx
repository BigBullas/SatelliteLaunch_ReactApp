import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SinglePayloadPage from './pages/SinglePayloadPage'
import PayloadsPage from './pages/PayloadsPage'
import Header from './components/Header/Header'
import Breadcrump from './components/Breadcrump/Breadcrump'

const App: React.FC = () => {
  const [desc, setDesc] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const changeBreadcrump = (newDesc: string, newPath: string) => {
    setDesc(newDesc);
    setPath(newPath);
  }
  return (
    <BrowserRouter>
      <Header />
      <Breadcrump desc={ desc } path= { path } />
      <Routes>
        <Route path="/" element={<PayloadsPage changeBreadcrump = {changeBreadcrump} />} />
        <Route path="/payloads/:id" element={<SinglePayloadPage changeBreadcrump = {changeBreadcrump} />} />
      </Routes>
    </BrowserRouter>
  )
}

{/* </HashRouter> */}

export default App