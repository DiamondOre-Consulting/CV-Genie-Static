import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../assets/template.png';
import Navbar from '../../Commancomponents/Navbar'

const socialMediaIcons = {
    facebook: 'https://img.icons8.com/fluent/30/000000/facebook-new.png',
    twitter: 'https://img.icons8.com/fluent/30/000000/twitter.png',
    linkedin: 'https://img.icons8.com/fluent/30/000000/linkedin.png',
    instagram: 'https://img.icons8.com/fluent/30/000000/instagram-new.png',
};

const PortfolioForm = ({ setFormData }) => {
    const [services, setServices] = useState([]);
    // const [caseStudies, setCaseStudies] = useState([]);
    const [products, setProducts] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const formDataObj = Object.fromEntries(data.entries());
        formDataObj.services = services;
        // formDataObj.caseStudies = caseStudies;
        formDataObj.products = products;
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

    // const handleCaseStudyChange = (index, field, value) => {
    //     const updatedCaseStudies = [...caseStudies];
    //     updatedCaseStudies[index][field] = value;
    //     setCaseStudies(updatedCaseStudies);
    // };

    // const addCaseStudy = () => {
    //     setCaseStudies([...caseStudies, { projectName: '', description: '', links: '', image: null }]);
    // };

    // const handleCaseStudyImageChange = (index, e) => {
    //     const file = e.target.files[0];
    //     const updatedCaseStudies = [...caseStudies];
    //     updatedCaseStudies[index].image = file;
    //     setCaseStudies(updatedCaseStudies);
    // };

    const handleSocialMediaLinkChange = (platform, value) => {
        setSocialMediaLinks({
            ...socialMediaLinks,
            [platform]: value,
        });
    };

    const removeService = (index) => {
        const updatedServices = [...services];
        updatedServices.splice(index, 1);
        setServices(updatedServices);
    };

    // const removeCaseStudy = (index) => {
    //     const updatedCaseStudies = [...caseStudies];
    //     updatedCaseStudies.splice(index, 1);
    //     setCaseStudies(updatedCaseStudies);
    // };


    const addProduct = () => {
        setProducts([...products, { heading: '', description: '', image: null }]);
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const handleProductImageChange = (index, e) => {
        const file = e.target.files[0];
        const updatedProducts = [...products];
        updatedProducts[index].image = file;
        setProducts(updatedProducts);
    };

    const removeProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    return (
        <>
           <Navbar/>
            <div className="grid md:grid-cols-4 grid-cols-1">
                <div className="bg-white border rounded-lg shadow relative m-4 md:m-10 col-span-4 md:col-span-3">
                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold">Portfolio Website Form</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-6 gap-6">
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
                                    <label htmlFor="shortsummery" className="text-sm font-medium text-gray-900 block mb-2">
                                        Short Summary
                                    </label>
                                    <input type="text" name="shortsummery" id="shortsummery" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                </div>
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">About Me</h4>
                                    <textarea id="aboutme" name="aboutme" rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Summary"></textarea>
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
                                            <button
                                                type="button"
                                                onClick={() => removeService(index)}
                                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Remove Service
                                            </button>

                                        </div>
                                    ))}
                                    <button type="button" onClick={addService} className="text-white bg-teal-900  focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Service</button>
                                </div>

                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">Products</h4>
                                    {products.map((product, index) => (
                                        <div key={index} className="space-y-4 mb-4">
                                            <input
                                                type="text"
                                                value={product.heading}
                                                onChange={(e) => handleProductChange(index, 'heading', e.target.value)}
                                                placeholder="Product Heading"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            />
                                            <textarea
                                                value={product.description}
                                                onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                                                rows="4"
                                                placeholder="Product Description"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                            ></textarea>
                                            <input
                                                type="file"
                                                onChange={(e) => handleProductImageChange(index, e)}
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeProduct(index)}
                                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Remove Product
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addProduct}
                                        className="text-white bg-teal-900 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Add Product
                                    </button>
                                </div>

{/*                                 
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">Case Studies</h4>
                                    {caseStudies.map((caseStudy, index) => (
                                        <div key={index} className="space-y-4 mb-4">
                                            <input type="text" onChange={(e) => handleCaseStudyChange(index, 'projectName', e.target.value)} value={caseStudy.projectName} placeholder="Project Name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                            <textarea type="text" onChange={(e) => handleCaseStudyChange(index, 'description', e.target.value)} value={caseStudy.description} rows="4" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"></textarea>
                                            <input type="text" onChange={(e) => handleCaseStudyChange(index, 'links', e.target.value)} value={caseStudy.links} placeholder="Links" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                            <input type="file" onChange={(e) => handleCaseStudyImageChange(index, e)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                            <button
                                                type="button"
                                                onClick={() => removeCaseStudy(index)}
                                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Remove CaseStudy
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addCaseStudy} className="text-white bg-teal-900 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Case Study</button>
                                </div> */}
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">Social Media Links</h4>
                                    {Object.keys(socialMediaIcons).map((platform) => (
                                        <div key={platform} className="mb-4 flex items-center">
                                            <img src={socialMediaIcons[platform]} alt={`${platform} icon`} className="mr-2" />
                                            <input type="text" name={`social-media-link-${platform}`} value={socialMediaLinks[platform] || ''} onChange={(e) => handleSocialMediaLinkChange(platform, e.target.value)} placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                        </div>
                                    ))}
                                </div>
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-900 block mb-2">Contact Us</h4>
                                    <div className="mb-4">
                                        <label htmlFor="address" className="text-sm font-medium text-gray-900 block mb-2">
                                            Address
                                        </label>
                                        <input type="text" name="address" id="address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">
                                            Email
                                        </label>
                                        <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-900 block mb-2">
                                            Phone
                                        </label>
                                        <input type="tel" name="phone" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="file" className="text-sm font-medium text-gray-900 block mb-2">
                                            Attach File
                                        </label>
                                        <input type="file" name="file" id="file" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                    </div>
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
                <div className="mt-10 ml-10 md:ml-0 mr-10">
                    <img src={img} alt="Portfolio" />
                </div>
            </div>
        </>
    );
};

export default PortfolioForm;
