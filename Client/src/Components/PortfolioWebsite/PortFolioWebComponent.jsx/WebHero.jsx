import React from 'react';

const WebHero = ({ formData }) => {
    // Create a URL for the logo image if it exists in the form data
    const logoUrl = formData.image ? URL.createObjectURL(formData.image) : null;

    return (
        <div className='min-h-screen w-screen flex bg-black items-center justify-center'>
            <div className='grid grid-cols-2 gap-10 '>

                <div className='flex flex-col mt-10 px-20'>
                    <span className='uppercase font-bold text-gray-600 mb-2'>Hello !! There welcome to my site</span>
                    <h1 className='text-gray-300 text-4xl font-bold'>I'm {formData['full-name']}</h1>
                    <p className='text-gray-300 mt-2 '>{formData['tagline']}</p>
                    <a class="mt-8 inline-flex w-1/2 items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/25 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                        href="#">
                        Contact US
                    </a>
                </div>

                <div className='flex justify-center items-center'>
                    {logoUrl && <img src={logoUrl} className='w-80 h-80 border border-gray-300 rounded-full' alt="" />}
                </div>
            </div>
        </div>
    );
}

export default WebHero;
