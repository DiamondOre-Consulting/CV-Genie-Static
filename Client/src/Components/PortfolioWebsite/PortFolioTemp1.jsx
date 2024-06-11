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
  console.log(formData.backgroundColor)

  const backgroundColor = formData.backgroundColor || '#000000'; 
  const primaryTextColor = formData.primaryTextColor || '#ced4da'
  const secondaryTextColor = formData.secondaryTextColor || '#dee2e6'
  const buttonBgColor = formData.buttonBgColor || '#f97316'




  return (
    <div className='overflow-x-hidden bg-black'style={{ backgroundColor: backgroundColor }}>
    

    <WebNav formData={formData} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} backgroundColor={backgroundColor} buttonBgColor={buttonBgColor}/>
    <WebHero formData={formData} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} buttonBgColor={buttonBgColor}/>
    <Aboutme formData={formData} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} buttonBgColor={buttonBgColor}/>
    <WebAttachment formData={formData} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} buttonBgColor={buttonBgColor}/>
    <Services formData={formData} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} buttonBgColor={buttonBgColor}/>
    <WebProducts formData={formData} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} backgroundColor={backgroundColor}/>
    {/* <WebCaseStudy formData={formData}/> */}
    <WebContactus formData={formData} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} buttonBgColor={buttonBgColor}/>
    <WebFooter formData={formData} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} buttonBgColor={buttonBgColor}/> 

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
