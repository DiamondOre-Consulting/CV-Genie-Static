import React, { useEffect, useState } from 'react'
import emailjs from 'emailjs-com';
emailjs.init('v4J4xN9s0rL7eRYnG');
import logo from '..//..//assets/greenlogo.png'

const PopUpForm = ({ closeModal , setShowModal }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 1000);
    }, []);




    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        // Replace placeholders with form data
        const templateParams = {
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            Message: formData.message
        };

        // Send email using EmailJS
        emailjs.send('service_cswvwur', 'template_q45ioi6', templateParams, 'v4J4xN9s0rL7eRYnG')
            .then((result) => {
                console.log(result.text);
                setShowLoader(false);
                setShowModal(false) 
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });

            }, (error) => {
                setShowLoader(false);
                setIsVisible(false);
                setShowModal(false);
                setShowPopup(false);
                console.error(error.text);
                alert('Failed to submit form. Please try again later.');
            });
    };




    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                <div className={`bg-white p-6 rounded-md w-full max-w-lg mx-4 transform ${isVisible ? 'scale-100' : 'scale-90'} transition-transform duration-500`}>
                    <div className='flex items-center'>
                    <h2 className="text-2xl mb-4">Contact Us</h2>
                    <img className='w-16 animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium rounded-lg tracking-wide text-white' src={logo} alt="" />
                    </div>
                   
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                            <input type="text" id="name" name="name" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
                            <input type="phone" id="phone" name="phone" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required value={formData.phone} onChange={handleChange} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
                            <textarea id="message" name="message" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required value={formData.message} onChange={handleChange}></textarea>
                        </div>
                        <button type='submit' class="border-teal-900 text-white hover:before:bg-tealborder-teal-900 relative h-[50px] w-full rounded-md overflow-hidden border  bg-teal-900 px-8 text-white  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-teal-900 before:border-teal-900 border-1  hover:before:left-0 hover:before:w-full" disabled={showLoader}>
                            {showLoader ? (
                                <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            ) : (
                                <span class="relative z-10">Submit</span>
                            )}
                        </button>
                        <button type="button" onClick={closeModal} className="mt-2 w-full bg-gray-300 text-black p-2 rounded-md">Close</button>
                    </form>
                    {/* {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center">

                            <section className="rounded-lg shadow-xl bg-white w-4/5 sm:w-3/5 lg:w-1/3">
                                <div className="p-6 text-center">
                                    <h2 className="text-xl font-bold text-teal-green-900 mb-4">Thank you!!</h2>
                                    <p className="text-sm text-gray-600 mb-6">We will connect with you soon.</p>
                                    <button
                                        className="block w-full px-4 py-2 bg-teal-900 text-sm font-semibold text-white rounded-lg shadow-md  focus:outline-none "
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </section>
                        </div>
                    )} */}
                </div>
            </div>
        </>
    )
}

export default PopUpForm