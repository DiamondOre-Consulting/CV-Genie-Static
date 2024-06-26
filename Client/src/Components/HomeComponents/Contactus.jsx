import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import axios from 'axios';

const Contactus = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);

    const handleClose = () => {
        setShowPopup(false);
    };

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

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);

        try {
            let resumeUrl = '';
            if (resumeFile) {
                const formData = new FormData();
                formData.append('myFileResume', resumeFile);

                const uploadResponse = await axios.post('https://cv-genie-static-backend.onrender.com/api/users/upload-resume', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                resumeUrl = uploadResponse.data;
            }

            const contactFormData = {
                ...formData,
                pdf: resumeUrl
            };

            await axios.post('https://cv-genie-static-backend.onrender.com/api/users/contact-form', contactFormData);

            setShowLoader(false);
            setShowPopup(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
            setResumeFile(null);
        } catch (error) {
            setShowLoader(false);
            console.error(error);
            alert('Failed to submit form. Please try again later.');
        }
    };

    const handleWhatsAppChat = () => {
        const phoneNumber = "8178087758";
        const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}`;
        window.open(url, '_blank');
    };


    return (
        <>
            <section className='' id="contact">
                <div className='py-6 sm:py-8 lg:py-12 '>
                    <div className='mx-auto  md:px-8 bg-teal-900'>
                        <div class="mb-10 md:mb-10">
                            <h2 class=" text-center text-2xl font-bold uppercase text-white lg:text-3xl py-6">Get in Touch</h2>
                        </div>

                        <div className='grid gap-4 sm:grid-cols-2 md:gap-4 xl:grid-cols-4 justify-center items-start pb-10'>
                            <div className='flex flex-col justify-start items-center'>
                                <div className='rounded-full px-4 py-2 w-fit text-center bg-gray-300  text-3xl text-teal-900'><i class="fa fa-map-marker" aria-hidden="true"></i></div>
                                <p className='uppercase font-semibold text-gray-200 mt-2'>Address</p>
                                <p className='text-sm text-gray-300'>Diamond Ore Consulting Pvt.Ltd.</p>
                                <p className='text-sm text-gray-300'>B-127, Second Floor, B Block, Sector 63,</p>
                                <p className='text-sm text-gray-300'>Noida, Uttar Pradesh </p>
                                <p className='text-sm text-gray-300'>201301</p>
                            </div>

                            <div className='flex flex-col items-center'>
                                <div className='rounded-full px-4 py-2 w-fit text-center bg-gray-300  text-3xl text-teal-900'><i class="fa fa-phone" aria-hidden="true"></i></div>
                                <p className='uppercase font-semibold text-gray-200 mt-2'>Phone</p>
                                <p className='text-sm text-gray-300'>+91 8178087758</p>
                            </div>

                            <div className='flex flex-col justify-center items-center'>
                                <div className='rounded-full px-4 py-2 w-fit text-center bg-gray-300  text-3xl text-teal-900'><i class="fa fa-envelope" aria-hidden="true"></i></div>
                                <p className='uppercase font-semibold text-gray-200 mt-2'>Email</p>
                                <a className='text-sm text-gray-300' href='mailto:admin@cvgenie.in'>admin@cvgenie.in</a>
                                {/* <p className='text-sm text-gray-300'>zoyas3423@gmail.com</p>
                                <p className='text-sm text-gray-300'>mani@gmail.com</p> */}

                            </div>

                            <div className='flex flex-col justify-center items-center'>
                                <div className='rounded-full px-4 py-2 w-fit text-center bg-gray-300  text-3xl text-teal-900'><i class="fa fa-whatsapp" aria-hidden="true"></i></div>
                                <p className='uppercase font-semibold text-gray-200 mt-2'>Chat online</p>
                                <p className='text-sm text-gray-300'><a className='underline cursor-pointer' onClick={handleWhatsAppChat}>Chat now</a></p>

                            </div>

                        </div>


                    </div>

                    <div className='grid gap-4 sm:grid-cols-1 md:gap-4 xl:grid-cols-2 px-10 md:px-20 justify-center items-start py-6'>
                        <div className='flex flex-col mt-4'>
                            <h1 className='text-black font-semibold text-4xl'>Message Us</h1>
                            <p className='text-sm mt-4 text-gray-400'>
                                Ready to elevate your professional profile? At CV-Genie, we specialize in crafting bespoke CVs tailored to your unique strengths and aspirations. Our dedicated team is committed to guiding you through the process, ensuring every detail reflects your potential. Let's collaborate to create a standout CV that opens doors to new opportunities. Reach out to us today and embark on a journey towards career success. With our expertise and personalized approach, we'll help you shine in today's competitive job market. Don't settle for an ordinary CV—let CV-Genie transform it into a powerful tool that showcases your talents and propels your career forward. Contact us now to get started on crafting your path to success.
                            </p>

                        </div>

                        <div className=''>
                            <form class="max-w-lg mx-auto" onSubmit={handleSubmit}>
                                <div class="mb-5">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input type="name" id="name" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " required value={formData.name} onChange={handleChange} />
                                </div>
                                <div class="mb-5">
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" id="email" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " required value={formData.email} onChange={handleChange} />
                                </div>

                                <div class="mb-5">
                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                    <input type="phone" id="phone" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " required value={formData.phone} onChange={handleChange} />
                                </div>

                                <div class="mb-5">
                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                                    <textarea type="text" id="message" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " required value={formData.message} onChange={handleChange} />
                                </div>

                                <div class="mb-5">
                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Upload Resume</label>
                                    <input type="file" id="resume" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg  block h-full w-full " onChange={handleFileChange} />
                                </div>


                                {/* <div class="mb-5">
                                    <label for="file" class="block mb-2 text-sm font-medium text-gray-900">Upload you updated resume</label>
                                    <input class="block w-full text-sm text-teal-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none   " id="file_input" type="file" />
                                </div>  */}


                                <button class="border-teal-900 text-white hover:before:bg-tealborder-teal-900 relative h-[50px] w-full rounded-md overflow-hidden border  bg-teal-900 px-8 text-white  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-teal-900 before:border-teal-900 border-1  hover:before:left-0 hover:before:w-full" disabled={showLoader}>
                                    {showLoader ? (
                                        <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    ) : (
                                        <span class="relative z-10">Submit</span>
                                    )}
                                </button>
                            </form>
                            {showPopup && (
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
                            )}




                        </div>

                    </div>

                </div>
            </section>

        </>
    )
}

export default Contactus