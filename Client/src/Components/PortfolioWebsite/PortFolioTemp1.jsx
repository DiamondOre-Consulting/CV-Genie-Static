import React from 'react';
import PortfolioNav from './PortFolioComponent/PortfolioNav';
import WebNav from './PortFolioWebComponent.jsx/WebNav';
import WebHero from './PortFolioWebComponent.jsx/WebHero';
import Aboutme from './PortFolioWebComponent.jsx/Aboutme';
import Services from './PortFolioWebComponent.jsx/Services';
import WebCaseStudy from './PortFolioWebComponent.jsx/WebCaseStudy';
import WebContactus from './PortFolioWebComponent.jsx/WebContactus';
 import WebFooter from './PortFolioWebComponent.jsx/WebFooter';
import WebAttachment from './PortFolioWebComponent.jsx/WebAttachment';
import WebProducts from './PortFolioWebComponent.jsx/WebProducts';

const PortFolioTemp1 = ({ formData }) => {
  return (
    <div className='overflow-x-hidden'>
    

    <WebNav formData={formData}/>
    <WebHero formData={formData}/>
    <Aboutme formData={formData}/>
    <WebAttachment formData={formData}/>
    <Services formData={formData}/>
    <WebProducts formData={formData}/>
    {/* <WebCaseStudy formData={formData}/> */}
    <WebContactus formData={formData}/>
    <WebFooter formData={formData}/>

      {/* <h1>{formData['website-name']}</h1>
      <p>{formData['about-me']}</p> */}
      {/* <h2>Services</h2> */}
      {/* {formData.services.map((service, index) => (
        <div key={index}>
          <h3>{service.heading}</h3>
          <p>{service.description}</p>
        </div>
      ))} */}
      {/* <h2>Case Studies</h2> */}
      {/* {formData.caseStudies.map((caseStudy, index) => (
        <div key={index}>
          <h3>{caseStudy.projectName}</h3>
          <p>{caseStudy.description}</p>
          <a href={caseStudy.links}>Link</a>
          <img src={URL.createObjectURL(caseStudy.image)} alt={caseStudy.projectName} />
        </div>
      ))} */}
      {/* <h2>Social Media Links</h2> */}
      {/* {formData.socialMediaLinks.map((link, index) => (
        <a key={index} href={link}>{link}</a>
      ))} */}
    </div>
  );
};

export default PortFolioTemp1;
