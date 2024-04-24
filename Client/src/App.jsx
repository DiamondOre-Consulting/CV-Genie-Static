import { useState } from 'react'
import './App.css'
import MainHome from './Pages/HomePage/MainHome'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Checkout from './Components/HomeComponents/Checkout'
import AdminLogin from './Components/HomeComponents/AdminLogin'
import AdminForm from './Components/HomeComponents/AdminForm'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainHome />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/' element={<MainHome/>}/>
          <Route path='/admin-login' element={<AdminLogin/>}/>
          <Route path='/admin-form' element={<AdminForm/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
