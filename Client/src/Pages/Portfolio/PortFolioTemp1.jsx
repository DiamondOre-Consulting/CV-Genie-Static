import React, { useEffect, useState } from 'react';
import WebNav from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebNav';
import WebHero from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebHero';
import Aboutme from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/Aboutme';
import Services from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/Services';
import WebContactus from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebContactus';
import WebFooter from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebFooter';
import WebAttachment from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebAttachment';
import WebProducts from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebProducts';
import axios from 'axios';
import portfolioerrorpage from '..//../assets/portfolioErrorPage.svg'

const PortFolioTemp1 = ({ uniqueUserName }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`https://cv-genie-static-backend.onrender.com/api/admin/portfolio/${uniqueUserName}`)
        

        if (response.status === 200 ) {
          const data = response.data
          setPortfolioData(data);
          setLoading(false);
        } else {
          setError(response.message);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [uniqueUserName]);

  if (loading) return <div className='flex justify-center items-center h-screen text-center text-2xl'>Loading...</div>;
  if (error) return <div><img src={portfolioerrorpage} alt="" /> </div>;

  const backgroundColor = portfolioData.bgColor || '#000000';

  return (
    <div style={{ backgroundColor }}>
      <WebNav portfolioData={portfolioData} />
      <WebHero portfolioData={portfolioData} />
      <Aboutme portfolioData={portfolioData} />
      <WebAttachment portfolioData={portfolioData} />
      <Services portfolioData={portfolioData} />
      <WebProducts portfolioData={portfolioData} />
      <WebContactus portfolioData={portfolioData} />
      <WebFooter portfolioData={portfolioData} />
    </div>
  );
};

export default PortFolioTemp1;
