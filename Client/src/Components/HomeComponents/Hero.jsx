import React from 'react'
import genie from '../../assets/Genie.png'

const Hero = () => {
    return (
        <>
            <div className="py-12 md:py-20" id="home">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 ">
                    <div className="md:col-span-1 px-8 md:pl-10">
                        <h1 className="text-4xl font-semibold text-teal-900 mb-4">CV~Genie</h1>
                        <p className='text-4xl uppercase text-teal-900 mb-4'>Career Wish Granted !!!</p>
                        <p className='teext-xl mb-10'>Handcrafted by hiring professionals</p>
                        <p className="leading-relaxed text-gray-500 mb-6">
                            Are you ready to take your career to the next level? Look no further than CV~Genie ! We are your one-stop destination for professional resume, CV, cover letter, and LinkedIn profile optimization
                        </p>
                        <p className='capitilized text-gray-400 mb-4'>A Unit of Diamond Ore Consulting Pvt. Ltd</p>
                        <button class=" font-bold rounded-full text-teal-900 hover:before:bg-tealborder-teal-900 relative h-[50px] w-auto overflow-hidden border border-teal-900 bg-white px-8 text-teal-900  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-teal-900 before:transition-all before:duration-500 hover:text-white  hover:before:left-0 hover:before:w-full"><span class="relative z-10">Create Your Resume Now</span></button>

                    </div>
                    <div className="md:col-span-1 flex justify-center hidden lg:flex">
                        <img src={genie} alt="Hero Image" className="w-8/12" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero