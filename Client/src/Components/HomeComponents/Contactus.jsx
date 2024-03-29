import React, { useState } from 'react'
import logo from '..//..//assets/logo.png'
import emailjs from 'emailjs-com';
emailjs.init('v4J4xN9s0rL7eRYnG');
const Contactus = () => {
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
                alert('Form submitted successfully!');
            }, (error) => {
                console.error(error.text);
                alert('Failed to submit form. Please try again later.');
            });
    };


    const handleWhatsAppChat = () => {
        const phoneNumber = "8448875033";
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
                                <p className='text-sm text-gray-300'>+91 097736 93017</p>
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
                                Yes, the generated WhatsApp API link will work on mobile devices as well. When the link is clicked on a mobile device, it will typically open the WhatsApp application (if installed) or prompt the user to download the WhatsApp application if it's not installed. Once the WhatsApp application is opened, it will redirect the user to the chat screen with the specified phone number pre-filled.
                                It's worth noting that the behavior may vary slightly depending on the device and browser settings. However, in most cases, clicking the link should open the WhatsApp application or redirect to the WhatsApp website to initiate the chat with the specified phone number.
                            </p>
                            <div>
                                <img className="w-10" src={logo} alt="" />
                                <p className='text-sm mt-4 text-gray-400'>Yes, the generated WhatsApp API link will work on mobile devices as well.  </p>
                            </div>


                        </div>

                        <div className=''>
                            <form class="max-w-lg mx-auto" onSubmit={handleSubmit}>
                                <div class="mb-5">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input type="name" id="name" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={formData.name} onChange={handleChange}/>
                                </div>
                                <div class="mb-5">
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" id="email" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={formData.email} onChange={handleChange}/>
                                </div>

                                <div class="mb-5">
                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                    <input type="phone" id="phone" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={formData.phone} onChange={handleChange}/>
                                </div>

                                <div class="mb-5">
                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                                    <textarea type="text" id="message" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={formData.message} onChange={handleChange}/>
                                </div>

                                {/* <div class="mb-5">
                                    <label for="file" class="block mb-2 text-sm font-medium text-gray-900">Upload you updated resume</label>
                                    <input class="block w-full text-sm text-teal-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-teal-900 dark:border-teal-600 dark:placeholder-gray-400" id="file_input" type="file" />
                                </div> */}


                                <button class="border-teal-900 text-white hover:before:bg-tealborder-teal-900 relative h-[50px] w-full rounded-md overflow-hidden border  bg-teal-900 px-8 text-white  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-teal-900 before:border-teal-900 border-1  hover:before:left-0 hover:before:w-full"><span class="relative z-10">Submit</span></button>
                            </form>



                        </div>

                    </div>

                </div>
            </section>

        </>
    )
}

export default Contactus