import React, { useEffect, useState } from 'react';
import Nav from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Nav';
import Hero from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Hero';
import About from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/About';
import Services from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Services';
import Products from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Products';
import ContactUs from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/ContactUs';
import Footer from '../../Components/PortfolioWebsite/PortFolioWebComponent2.jsx/Footer';

const PortFolioTemp2 = ({ uniqueUserName }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(`https://cv-genie-static-backend.onrender.com/api/admin/portfolio/${uniqueUserName}`);
        const data = await response.json();

        if (response.ok) {
          setPortfolioData(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [uniqueUserName]);

  if (loading) return <div className='flex justify-center items-center h-screen text-center text-2xl'>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const backgroundColor = portfolioData.bgColor || '#000000';

  return (
    <>
      <div style={{ backgroundColor }}>
        <Nav portfolioData={portfolioData} />
        <Hero portfolioData={portfolioData} />
      </div>
      <About portfolioData={portfolioData} />
      <Services portfolioData={portfolioData} />
      <Products portfolioData={portfolioData} />
      <ContactUs portfolioData={portfolioData} />
      <Footer portfolioData={portfolioData} />
    </>
  );
};

export default PortFolioTemp2;
