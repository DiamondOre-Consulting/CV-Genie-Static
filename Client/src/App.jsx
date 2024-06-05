import { useState } from 'react'
import './App.css'
import MainHome from './Pages/HomePage/MainHome'
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Checkout from './Components/HomeComponents/Checkout'
import AdminLogin from './Components/HomeComponents/AdminLogin'
import AdminForm from './Components/HomeComponents/AdminForm'
import TermsofServices from './Components/HomeComponents/TermsofServices'
import ReturnAndRefund from './Components/HomeComponents/ReturnAndRefund'
import FreeCv from './Pages/FreeCv'
import UserSignup from './Pages/UserSignup'
import UserLogin from './Pages/UserLogin'
import Portfolio from './Components/PortfolioWebsite/Portfolio'



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
          <Route path='/free-cv' element={<FreeCv/>}/>
          <Route path='/user-Signup'element={<UserSignup/>}/>
          <Route path='/user-login' element={<UserLogin/>}/>
          <Route path='/terms-of-services' element={<TermsofServices/>}/>
          <Route path='/return-and-refund' element={<ReturnAndRefund/>}/>
          <Route path='/portfolio-website/*' element={<Portfolio/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
