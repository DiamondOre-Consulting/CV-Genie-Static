import { useState } from 'react'
import './App.css'
import MainHome from './Pages/HomePage/MainHome'
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Checkout from './Components/HomeComponents/Checkout'
import AdminLogin from './Components/AdminComponent/AdminLogin'
import AdminForm from './Components/AdminComponent/AdminForm'
import TermsofServices from './Components/HomeComponents/TermsofServices'
import ReturnAndRefund from './Components/HomeComponents/ReturnAndRefund'
import FreeCv from './Pages/FreeCv'
import UserSignup from './Pages/UserSignup'
import UserLogin from './Pages/UserLogin'
import PortfolioForm from './Components/PortfolioWebsite/PortFolioComponent/PortfolioForm'
import PortFolioTemp1 from './Components/PortfolioWebsite/PortFolioTemp1'
import Facebook from './tracking/Facebook'




function App() {


  return (
    <>
      <BrowserRouter>
      <Facebook />
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
          <Route path='/admin/portfolio-form' element={<PortfolioForm/>}/>
          <Route path='/portfolio/:uniqueUserName' element={<PortFolioTemp1/>}/>
       
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
