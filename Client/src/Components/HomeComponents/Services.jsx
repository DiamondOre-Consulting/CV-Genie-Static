import React from 'react'
import linkedin from '..//..//assets/linkedin.png'
import cvservices from '..//..//assets/cvservices.png'
import coverletterservices from '..//..//assets/coverletterservices.png'

const Services = () => {
    return (
        <>
            <section className='md:pl-10' id="services">
                <div>
                    <h1 className='text-4xl font-semibold text-center mb-1'>Our Services</h1>
                    <div className='w-44 h-1 bg-teal-900 border-0 rounded-tl-xl rounded-tr-xl  mb-10  mx-auto'></div>
                </div>
                <div className=' grid grid-cols-1 md:grid-cols-3 justify-center justify-items-center content-center'>
                    <div className='grid-col flex flex-col justify-center items-center'>
                        <img className='md:w-64' src={cvservices} alt="" />
                        <span className='mt-4 bg-teal-900 text-white rounded-full py-2 font-bold px-4 mb-4'>1</span>
                        <p className='text-gray-600'>Resume/CV Writing</p>
                    </div>

                    <div className=' flex flex-col justify-center items-center'>
                        <img className='w-72 md:w-48' src={coverletterservices} alt="" />
                        <span className='mt-4 bg-teal-900 text-white rounded-full py-2 font-bold px-4 mb-4'>2</span>
                        <p className='text-gray-600'>Cover Letter Writing</p>
                    </div>

                    <div className='grid-col flex flex-col justify-center items-center'>
                        <img className='h-60 rounded-md' src={linkedin} alt="" />
                        <span className='mt-10 bg-teal-900 text-white rounded-full py-2 font-bold px-4 mb-4'>3</span>
                        <p className='text-gray-600'>LinkedIn Profile Optimization</p>
                    </div>
                </div>

                {/* <div className='flex justify-center mt-8'>
                <button class=" rounded-full text-white  hover:before:bg-tealborder-teal-900 relative h-[50px] w-auto overflow-hidden border  bg-teal-900 px-8 text-white  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-teal-900  hover:before:left-0 hover:before:w-full"><span class="relative z-10">Create Your Resume Now</span></button>
                </div> */}

            </section>
        </>
    )
}

export default Services