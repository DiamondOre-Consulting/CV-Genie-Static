import React from 'react'
import genie from '../../assets/Genie.png'

const Hero = () => {
   
    return (
        <>
            <div className="py-12 md:py-20" id="home">
                <div className="lg:container mx-auto grid grid-cols-1 md:grid-cols-2 ">
                    <div className="md:col-span-1 px-8 md:pl-10">
                        <h1 className="text-4xl font-semibold text-teal-900 mb-4">Resume !!! आपका राजदूत है , </h1>
                        <p className='text-xl uppercase text-teal-900 mb-4'>Only 2% Resumes make it past the first round, Join the Top 2% of Successful Resumes and Land Your Dream Job Today !</p>
                      
                        <p className="leading-relaxed text-gray-500 mb-6 text-2xl text-teal-900 font-bold">
                        आपके राजदूत को अपने रुतबे के अनुसार ढलवाऐं ! आज ही संपर्क करें !!
                        </p>
                        <p className='capitilized text-gray-400 mb-4'><a href='https://www.diamondore.in/' target='_blank'>A Unit of Diamond Ore Consulting Pvt. Ltd</a></p>
                        <a href='#contact'><button className=" font-bold rounded-full text-teal-900 hover:before:bg-tealborder-teal-900 relative h-[50px] w-auto overflow-hidden border border-teal-900 bg-white px-8 text-teal-900  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-teal-900 before:transition-all before:duration-500 hover:text-white  hover:before:left-0 hover:before:w-full"><span className="relative z-10">Create Your Resume Now</span></button></a>

                    </div>
                    <div className="md:col-span-1 -mt-10 flex justify-center hidden md:flex">
                        <img src={genie} alt="Hero Image" className=" w-full lg:w-8/12" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero