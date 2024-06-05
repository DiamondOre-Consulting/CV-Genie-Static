import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../assets/Property 1=Default.png';
import PortfolioNav from './PortfolioNav';

const PortfolioForm = ({ setFormData }) => {
    const [services, setServices] = useState([{ heading: '', description: '' }]);
    const [caseStudies, setCaseStudies] = useState([{ projectName: '', description: '', links: '', image: '' }]);
    const [socialMediaLinks, setSocialMediaLinks] = useState(['']);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const formDataObj = Object.fromEntries(data.entries());
        formDataObj.services = services; // Update formDataObj with the current state of services
        formDataObj.caseStudies = caseStudies;
        formDataObj.socialMediaLinks = socialMediaLinks;
        setFormData(formDataObj);
        navigate('web-preview');
    };


    const addService = () => {
        setServices([...services, { heading: '', description: '' }]);
    };
    
    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...services];
        updatedServices[index][field] = value;
        setServices(updatedServices);
    };
    

    const addCaseStudy = () => {
        setCaseStudies([...caseStudies, { projectName: '', description: '', links: '', image: '' }]);
    };

    const addSocialMediaLink = () => {
        setSocialMediaLinks([...socialMediaLinks, '']);
    };

    const handleSocialMediaLinkChange = (index, value) => {
        const updatedLinks = [...socialMediaLinks];
        updatedLinks[index] = value;
        setSocialMediaLinks(updatedLinks);
    };

    return (
        <>
            <PortfolioNav />
            <div className="grid grid-cols-4">
                <div className="bg-white border rounded-lg shadow relative m-10 col-span-3">
                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold">Portfolio Website Form</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="website-name" className="text-sm font-medium text-gray-900 block mb-2">
                                        Website Name
                                    </label>
                                    <input type="text" name="website-name" id="website-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="logo" className="text-sm font-medium text-gray-900 block mb-2">
                                        Upload Logo
                                    </label>
                                    <input type="file" name="logo" id="logo" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="full-name" className="text-sm font-medium text-gray-900 block mb-2">
                                        Full Name
                                    </label>
                                    <input type="text" name="full-name" id="full-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="person-image" className="text-sm font-medium text-gray-900 block mb-2">
                                        Upload Your Image
                                    </label>
                                    <input type="file" name="image" id="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="tagline" className="text-sm font-medium text-gray-900 block mb-2">
                                        Tagline
                                    </label>
                                    <input type="text" name="tagline" id="tagline" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                </div>
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">About Me</h4>
                                    <textarea id="aboutme" name="aboutme" rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Summary" ></textarea>
                                </div>
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">Services</h4>
                                    {services.map((service, index) => (
                                        <div key={index} className="space-y-4 mb-4">
                                            <input
                                                type="text"
                                                value={service.heading}
                                                onChange={(e) => handleServiceChange(index, 'heading', e.target.value)}
                                                placeholder="Service Heading"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            />
                                            <textarea
                                                value={service.description}
                                                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                                                rows="4"
                                                placeholder="Service Description"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                            ></textarea>
                                        </div>
                                    ))}


                                    <button type="button" onClick={addService} className="text-white bg-teal-900 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Service</button>
                                </div>
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">Case Studies</h4>
                                    {caseStudies.map((caseStudy, index) => (
                                        <div key={index} className="space-y-4 mb-4">
                                            <input type="text" name={`case-study-name-${index}`} placeholder="Project Name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                            <textarea name={`case-study-description-${index}`} rows="4" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" ></textarea>
                                            <input type="text" name={`case-study-links-${index}`} placeholder="Links" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                            <input type="file" name={`case-study-image-${index}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                        </div>
                                    ))}
                                    <button type="button" onClick={addCaseStudy} className="text-white bg-teal-900 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Case Study</button>
                                </div>
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">Social Media Links</h4>
                                    {socialMediaLinks.map((link, index) => (
                                        <div key={index} className="mb-4">
                                            <input type="text" name={`social-media-link-${index}`} value={link} onChange={(e) => handleSocialMediaLinkChange(index, e.target.value)} placeholder="Social Media Link" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                        </div>
                                    ))}
                                    <button type="button" onClick={addSocialMediaLink} className="text-white bg-teal-900 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Social Media Link</button>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 rounded-b">
                                <button className="text-white bg-teal-900 focus:ring-4 w-full focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-3 text-center" type="submit">
                                    Save all
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-10 mr-10">
                    <img src={img} alt="Portfolio" />
                </div>
            </div>
        </>
    );
};

export default PortfolioForm;
