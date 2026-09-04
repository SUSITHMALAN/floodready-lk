import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { SignupPage } from './pages/SignupPage.tsx'
import './App.css'

function App() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}

export default App
