import React from 'react';
import PortfolioNav from '../../Components/PortfolioWebsite/PortFolioComponent/PortfolioNav';
import WebNav from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebNav';
import WebHero from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebHero';
import Aboutme from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/Aboutme';
import Services from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/Services';
import WebContactus from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebContactus';
import WebFooter from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebFooter';
import WebAttachment from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebAttachment';
import WebProducts from '../../Components/PortfolioWebsite/PortFolioWebComponent.jsx/WebProducts';

const PortFolioTemp1 = ({ portfolioData, backgroundColor }) => {
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
