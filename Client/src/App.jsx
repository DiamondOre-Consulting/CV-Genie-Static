import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainHome from './Pages/HomePage/MainHome';
import Checkout from './Components/HomeComponents/Checkout';
import AdminLogin from './Components/AdminComponent/AdminLogin';
import AdminForm from './Components/AdminComponent/AdminForm';
import TermsofServices from './Components/HomeComponents/TermsofServices';
import ReturnAndRefund from './Components/HomeComponents/ReturnAndRefund';
import FreeCv from './Pages/FreeCv';
import UserSignup from './Pages/UserSignup';
import UserLogin from './Pages/UserLogin';
import PortfolioForm from './Components/PortfolioWebsite/PortFolioComponent/PortfolioForm';
import PortfolioTemplates from './Pages/Portfolio/PortfolioTemplates';
import MainPortfolio from './Pages/Portfolio/MainPortfolio';
import Facebook from './tracking/Facebook';

function App() {
  return (
    <BrowserRouter>
      <Facebook />
      <Routes>
        <Route path='/' element={<MainHome />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin-form' element={<AdminForm />} />
        <Route path='/free-cv' element={<FreeCv />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/terms-of-services' element={<TermsofServices />} />
        <Route path='/return-and-refund' element={<ReturnAndRefund />} />
        <Route path='/admin/portfolio-form/:templateId' element={<PortfolioForm />} />
        <Route path='/admin/portfolio-templates' element={<PortfolioTemplates />} />
        <Route path='/portfolio/:portfolioId/:uniqueUserName' element={<MainPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
