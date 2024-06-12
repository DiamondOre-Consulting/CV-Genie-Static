import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioNav from './PortFolioComponent/PortfolioNav';
import WebNav from './PortFolioWebComponent.jsx/WebNav';
import WebHero from './PortFolioWebComponent.jsx/WebHero';
import Aboutme from './PortFolioWebComponent.jsx/Aboutme';
import Services from './PortFolioWebComponent.jsx/Services';
import WebContactus from './PortFolioWebComponent.jsx/WebContactus';
 import WebFooter from './PortFolioWebComponent.jsx/WebFooter';
import WebAttachment from './PortFolioWebComponent.jsx/WebAttachment';
import WebProducts from './PortFolioWebComponent.jsx/WebProducts';

const PortFolioTemp1 = () => {
  const { uniqueUserName } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(`http://localhost:7001/api/admin/portfolio/${uniqueUserName}`);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  console.log(portfolioData)

  const backgroundColor = portfolioData.bgColor || '#000000';
  return (
    <div className='overflow-x-hidden' style={{ backgroundColor }}>
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
