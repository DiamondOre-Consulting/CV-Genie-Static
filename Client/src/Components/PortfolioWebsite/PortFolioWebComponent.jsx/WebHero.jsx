import React from 'react';

const WebHero = ({ formData }) => {
    // Create a URL for the logo image if it exists in the form data
    const logoUrl = formData.image ? URL.createObjectURL(formData.image) : null;

    return (
        <div className=' w-screen flex flex-col bg-customBrown items-center justify-center webfont '>

            <div className='flex flex-col  text-center justify-center mt-24'>
                <h1 className='text-white text-5xl md:text-8xl font-bold'>Hello,</h1><br></br>
                <h1 className=' text-5xl md:text-8xl text-white font-bold'> I'm {formData['full-name']}.</h1>
                <div className='w-full h-0.5 bg-customGold'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 flex  mt-6 mb-10 px-10'>
                <div className='flex justify-end mr-20'>
                    {logoUrl && <img src={logoUrl} className='w-42 h-66 border border-gray-300 ' alt="" />}
                </div>


                <div className='flex flex-col justify-center  md:pr-20 -ml-10 justify-start mt-8 md:px-0 px-6'>
                    <span className='uppercase font-bold text-gray-200 mb-2 text-xl md:text-2xl'>{formData['tagline']}</span>
                    <p className='text-gray-300 mt-2 md:pr-10'>{formData['shortsummery']}</p>
                    {/* <a class="mt-8 inline-flex w-1/2 items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/25 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                        href="#">
                        Contact US
                    </a> */}
                </div>

            </div>

           
        </div>
    );
}

export default WebHero;
