import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../Components/AdminComponent/AdminNavbar';
import Footer from '../..//Components/Commancomponents/Footer'

const EditPortfolio = () => {
    const { uniqueUserName } = useParams();
    const [portfolio, setPortfolio] = useState({
        name: '',
        email: '',
        phone: '',
        tagline: '',
        aboutMe: '',
        profileImage: '',
        services: [],
        products: [],
        address: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        primaryTextColor: '',
        secondaryTextColor: '',
        bgColor: '',
        buttonColor: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [popup, setPopUp] = useState(false)
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`http://localhost:7002/api/admin/portfolio/${uniqueUserName}`);
                setPortfolio(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (error) {
                setError('Error fetching portfolio data');
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [uniqueUserName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('contact.')) {
            const contactField = name.split('.')[1];
            setPortfolio({ ...portfolio, contact: { ...portfolio.contact, [contactField]: value } });
        } else if (name.startsWith('socialMedias.')) {
            const socialField = name.split('.')[1];
            setPortfolio({ ...portfolio, socialMedias: { ...portfolio.socialMedias, [socialField]: value } });
        } 

        else {
            setPortfolio({ ...portfolio, [name]: value });
        }
    };


    const handleServiceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedServices = [...portfolio.services];
        updatedServices[index] = { ...updatedServices[index], [name]: value };
        setPortfolio({ ...portfolio, services: updatedServices });
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...portfolio.products];
        updatedProducts[index] = { ...updatedProducts[index], [name]: value };
        setPortfolio({ ...portfolio, products: updatedProducts });
    };

    const handleAddService = () => {
        setPortfolio({ ...portfolio, services: [...portfolio.services, { heading: '', description: '' }] });
    };

    const handleRemoveService = (index) => {
        const updatedServices = portfolio.services.filter((_, i) => i !== index);
        setPortfolio({ ...portfolio, services: updatedServices });
    };

    const handleAddProduct = () => {
        setPortfolio({ ...portfolio, products: [...portfolio.products, { productName: '', productDescription: '', productImage: '' }] });
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = portfolio.products.filter((_, i) => i !== index);
        setPortfolio({ ...portfolio, products: updatedProducts });
    };

    const handleSubmit = async (e) => {
        setShowLoader(true);
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:7002/api/admin/edit-portfolio/${uniqueUserName}`, portfolio, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPopUp(true);
            setShowLoader(false);

        } catch (error) {
            setError('Error updating portfolio');
            setPopUp(true);
            setShowLoader(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;



    return (
        <>
            <AdminNavbar />
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mb-8">Edit Portfolio</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-2/3 mx-auto shadow-xl px-8 py-6">
                    <div className="flex flex-col gap-2">
                        <label>Name</label>
                        <input type="text" name="name" value={portfolio.name} onChange={handleChange} className="border p-2 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Email</label>
                        <input type="email" name="email" value={portfolio.email} onChange={handleChange} className="border p-2 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Phone</label>
                        <input type="text" name="phone" value={portfolio.phone} onChange={handleChange} className="border p-2 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Tagline</label>
                        <input type="text" name="tagline" value={portfolio.tagline} onChange={handleChange} className="border p-2 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>About Me</label>
                        <textarea name="aboutMe" value={portfolio.aboutMe} onChange={handleChange} className="border p-2 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Profile Image</label>
                        {portfolio.profileImage && <img src={portfolio.profileImage} alt="Profile" className="w-32 h-32 object-cover mb-2" />}
                        <input type="text" name="profileImage" value={portfolio.profileImage} onChange={handleChange} className="border p-2 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Address</label>
                        <input
                            type="text"
                            name="contact.address"
                            value={portfolio.contact.address}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Facebook</label>
                        <input
                            type="text"
                            name="socialMedias.facebook"
                            value={portfolio.socialMedias.facebook}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Twitter</label>
                        <input
                            type="text"
                            name="socialMedias.twitter"
                            value={portfolio.socialMedias.twitter}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>LinkedIn</label>
                        <input
                            type="text"
                            name="socialMedias.linkedin"
                            value={portfolio.socialMedias.linkedin}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Instagram</label>
                        <input
                            type="text"
                            name="socialMedias.instagram"
                            value={portfolio.socialMedias.instagram}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mt-4 mb-2">Services</h3>
                        {portfolio.services.map((service, index) => (
                            <div key={index} className="border p-4 rounded mb-2">
                                <div className="flex justify-between items-center">
                                    <h4 className='text-2xl font-bold'>Service {index + 1}</h4>
                                    <button type="button" onClick={() => handleRemoveService(index)} className="text-red-500">Remove</button>
                                </div>
                                <div className="flex flex-col gap-2 mb-4">
                                    <label>Service Heading</label>
                                    <input type="text" name="heading" value={service.heading} onChange={(e) => handleServiceChange(index, e)} className="border p-2 rounded" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Service Description</label>
                                    <input type="text" name="description" value={service.description} onChange={(e) => handleServiceChange(index, e)} className="border p-2 rounded" />
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddService} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add Service</button>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mt-4 mb-2">Products</h3>
                        {portfolio.products.map((product, index) => (
                            <div key={index} className="border p-4 rounded mb-2">
                                <div className="flex justify-between items-center">
                                    <h4 className='text-2xl font-bold'>Product {index + 1}</h4>
                                    <button type="button" onClick={() => handleRemoveProduct(index)} className="text-red-500">Remove</button>
                                </div>
                                <div className="flex flex-col gap-2 mb-4">
                                    <label>Product Name</label>
                                    <input type="text" name="productName" value={product.productName} onChange={(e) => handleProductChange(index, e)} className="border p-2 rounded" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Product Description</label>
                                    <input type="text" name="productDescription" value={product.productDescription} onChange={(e) => handleProductChange(index, e)} className="border p-2 rounded" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Product Image</label>
                                    {product.productImage && <img src={product.productImage} alt="Profile" className="w-32 h-32 object-cover mb-2" />}

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className="flex flex-col gap-2">
                        <label>Primary Color</label>
                        <input
                            type="color"
                            name="primaryTextColor"
                            value={portfolio.primaryTextColor}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Secondary Color</label>
                        <input
                            type="color"
                            name="secondaryColor"
                            value={portfolio.secondaryTextColor}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Background Color</label>
                        <input
                            type="color"
                            name="bgColor"
                            value={portfolio.bgColor}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Button Color</label>
                        <input
                            type="color"
                            name="buttonColor"
                            value={portfolio.buttonColor}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div> */}


                    <button type="submit" className='px-2 py-3 bg-teal-900 text-gray-100 w-full' disabled={showLoader}>
                        {showLoader ? (
                            <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        ) : (
                            <span class="relative z-10">Update Portfolio</span>
                        )}
                    </button>

                </form >

            </div >
            <Footer />

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
                                <button onClick={() => setPopUp(false)} type="button" data-behavior="cancel" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                                        Portfolio has been updated sucessfully
                                    </h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            Thank you!!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button type="button" data-behavior="commit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-900 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setPopUp(false)} >
                                    okk
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditPortfolio