import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import { UserProvider } from './context/User.context'
import Test from './pages/Test'

export default function App() {
  return <UserProvider>
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/test' element={<Test/>} />
    </Routes>
  </UserProvider>
}
