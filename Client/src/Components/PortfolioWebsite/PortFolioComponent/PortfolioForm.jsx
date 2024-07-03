import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../assets/template.png';
import axios from 'axios';
import AdminNavbar from '../../AdminComponent/AdminNavbar';
import { useParams } from 'react-router-dom';

const socialMediaIcons = {
    facebook: 'https://img.icons8.com/fluent/30/000000/facebook-new.png',
    twitter: 'https://img.icons8.com/fluent/30/000000/twitter.png',
    linkedin: 'https://img.icons8.com/fluent/30/000000/linkedin.png',
    instagram: 'https://img.icons8.com/fluent/30/000000/instagram-new.png',
};



const PortfolioForm = () => {
    const { templateId } = useParams();
    const [popup, setPopUp] = useState(false)
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
   
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(false);

    // Function to get default colors based on condition
    const getDefaultColors = () => {
        if (templateId === '1') {
            return {
                backgroundColor: "#000000",
                primaryTextColor: "#ced4da",
                secondaryTextColor: "#dee2e6",
                buttonBgColor: "#f97316",
            };
        } else if (templateId === '2') {
            return {
                backgroundColor: "#EDE9FE",
                primaryTextColor: "#6B7280",
                secondaryTextColor: "#F43F5E",
                buttonBgColor: "#0891B2",
            };
        } else {
            return {
                backgroundColor: "#FF00FF",
                primaryTextColor: "#FFFF00",
                secondaryTextColor: "#FF0000",
                buttonBgColor: "#0000FF",
            };
        }
    };

    // Initialize state with default colors
    const {
        backgroundColor: initialBgColor,
        primaryTextColor: initialPrimaryTextColor,
        secondaryTextColor: initialSecondaryTextColor,
        buttonBgColor: initialButtonBgColor,
    } = getDefaultColors();

    const [backgroundColor, setBackgroundColor] = useState(initialBgColor);
    const [primaryTextColor, setPrimaryTextColor] = useState(initialPrimaryTextColor);
    const [secondaryTextColor, setSecondaryTextColor] = useState(initialSecondaryTextColor);
    const [buttonBgColor, setButtonBgColor] = useState(initialButtonBgColor);

    const getTemplateDetails = (id) => {
        switch(id) {
            case '1':
                return "Template 1 Details";
            case '2':
                return "Template 2 Details";
            case '3':
                return "Template 3 Details";
            default:
                return "Unknown Template";
        }
    }

    
    const handleProfileImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('myFileImage', file);
            const response = await axios.post('https://cv-genie-static-backend.onrender.com/api/admin/upload-profile-pic', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (!response.data) {
                throw new Error('Error uploading profile image');
            }

            return response.data;
        } catch (error) {
            console.error('Error uploading profile image:', error);
            return null;
        }
    };

    const handleProductImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('myProductImage', file);
            const response = await axios.post('https://cv-genie-static-backend.onrender.com/api/admin/upload-product-image', formData);

            if (!response.data) {
                throw new Error('Error uploading product image');
            }

            return response.data;
        } catch (error) {
            console.error('Error uploading product image:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        setShowLoader(true);
        e.preventDefault();
      
        const formData = new FormData(e.target);  
        let profileImageUrl = null;
        if (profileImage) {
            profileImageUrl = await handleProfileImageUpload(profileImage);
        }
        const updatedProducts = await Promise.all(
            products.map(async (product) => {
                let productImageUrl = null;
                if (product.image) {
                    productImageUrl = await handleProductImageUpload(product.image);
                }
                return {
                    productName: product.heading,
                    productDescription: product.description,
                    productImage: productImageUrl,
                };
            })
        );

        const payload = {
            name: formData.get('full-name'),
            uniqueUserName: formData.get('userName'),
            tagline: formData.get('tagline'),
            aboutMe: formData.get('aboutme'),
            profileImage: profileImageUrl, 
            services: services,
            products: updatedProducts,
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            facebook: socialMediaLinks.facebook,
            twitter: socialMediaLinks.twitter,
            linkedin: socialMediaLinks.linkedin,
            instagram: socialMediaLinks.instagram,
            bgColor: backgroundColor,
            primaryTextColor: primaryTextColor,
            secondaryTextColor: secondaryTextColor,
            buttonColor: buttonBgColor,
            portfolioId: templateId,
        };

        try {
            const response = await axios.post('https://cv-genie-static-backend.onrender.com/api/admin/create-portfolio', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    templateId: templateId, // Include templateId in form data
                  }),
            });
            const data = response.data;
            const productsData = data.products.map(product => ({
                _id: product._id,
                image: product.image,
                heading: product.heading,
                description: product.description,
            }));
            // Do something with the response data if needed
            // navigate('web-preview'); // Navigate to web preview page
            console.log('portfolio created sucessufully') 
        
            setPopUp(true)
            setShowLoader(false);
        } catch (error) {
            console.error('Error:', error);
            setShowLoader(false);
        }
    };

    const handleBackgroundColorChange = (e) => {
        setBackgroundColor(e.target.value);
    };

    const addService = () => {
        setServices([...services, { heading: '', description: '' }]);
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...services];
        updatedServices[index][field] = value;
        setServices(updatedServices);
    };

    const handlePrimaryTextColorChange = (e) => {
        setPrimaryTextColor(e.target.value);
    };

    const handleSecondaryTextColorChange = (e) => {
        setSecondaryTextColor(e.target.value);
    };

    const handleButtonBgColor = (e) => {
        setButtonBgColor(e.target.value);
    };

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


    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };


    return (
        <>
           <AdminNavbar/>
            <div className="grid md:grid-cols-4 grid-cols-1">
                <div className="bg-white border rounded-lg shadow relative m-4 md:m-10 col-span-4 md:col-span-3">
                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold">Portfolio Website Form</h3>
                        <h1 className='text-2xl text-center font-bold py-4'>Create Portfolio for {getTemplateDetails(templateId)}</h1>
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
                                    <label htmlFor="full-name" className="text-sm font-medium text-gray-900 block mb-2">
                                        UserName
                                    </label>
                                    <input type="text" name="userName" id="useName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="person-image" className="text-sm font-medium text-gray-900 block mb-2">
                                        Upload Your Image
                                    </label>
                                    <input type="file" name="image" id="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" onChange={handleProfileImageChange} />


                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="tagline" className="text-sm font-medium text-gray-900 block mb-2">
                                        Tagline
                                    </label>
                                    <input type="text" name="tagline" id="tagline" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
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

                                    <div className="mb-4">
                                        <label for="backgroundColor" className="text-sm font-medium text-gray-900 block mb-2">
                                            Select Background Color
                                        </label>
                                        <input type="color" id="backgroundColor" name="backgroundColor" value={backgroundColor} onChange={handleBackgroundColorChange} className='cursor-pointer' />

                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="primaryTextColor" className="text-sm font-medium text-gray-900 block mb-2">
                                            Select Primary Text Color
                                        </label>
                                        <input type="color" id="primaryTextColor" name="primaryTextColor" value={primaryTextColor} onChange={handlePrimaryTextColorChange} className='cursor-pointer' />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="secondaryTextColor" className="text-sm font-medium text-gray-900 block mb-2">
                                            Select Secondary Text Color
                                        </label>
                                        <input type="color" id="secondaryTextColor" name="secondaryTextColor" value={secondaryTextColor} onChange={handleSecondaryTextColorChange} className='cursor-pointer' />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="secondaryTextColor" className="text-sm font-medium text-gray-900 block mb-2">
                                            Select Button Colors
                                        </label>
                                        <input type="color" id="buttonBgColor" name="buttonBgColor" value={buttonBgColor} onChange={handleButtonBgColor} className='cursor-pointer' />

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

            {popup && (
                <div id="YOUR_ID" class="fixed z-50 inset-0 overflow-y-auto">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
                    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
            
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            
                    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button onClick={()=> setPopUp(false)}  type="button" data-behavior="cancel" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span class="sr-only">Close</span>
                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Portfolio has been created sucessfully
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Thank you!!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button type="button" data-behavior="commit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-900 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={()=> setPopUp(false)} >
                               okk
                            </button>
                         
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
};

export default PortfolioForm;
