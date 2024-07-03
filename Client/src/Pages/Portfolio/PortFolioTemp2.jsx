import React from 'react';
import Nav from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Nav';
import Hero from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Hero';
import About from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/About';
import Services from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Services';
import Products from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Products';
import ContactUs from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/ContactUs';
import Footer from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Footer';

const PortFolioTemp2 = ({ portfolioData, backgroundColor }) => {
  return (
    <>
      <div className='' style={{ backgroundColor }}>
        <Nav portfolioData={portfolioData} />
        <Hero portfolioData={portfolioData} />
      </div>
      <About portfolioData={portfolioData} />
      <Services  portfolioData={portfolioData}/>
      <Products portfolioData={portfolioData} />
      <ContactUs portfolioData={portfolioData}/>
      <Footer portfolioData={portfolioData}/>
    </>
  );
};

export default PortFolioTemp2;
