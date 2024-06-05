import React from 'react';
import laptop from '..//../assets/laptop.png';
import tab from '..//../assets/tablet.png';
import phone from '..//../assets/phone.png';
import cvgenie from '..//../assets/cvgenie.png'
import { Link } from 'react-router-dom';

const PortfolioWebsiteServices = () => {
    
    return (
        <div className='grid grid-cols-1  md:grid-cols-2 gap-4 px-10 min-h-screen '>
            <div className='relative flex justify-center items-center'>
                <a href='https://www.cvgenie.in/' target='_blank' >
                    <div className='relative overflow-hidden'>
                        <img src={laptop} alt="Laptop" className='relative z-10 w-4/4' style={{ maxWidth: '100%' }} />
                        <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-20'>
                            <img
                                src={cvgenie}
                                alt="CVGenie"
                                className="absolute top-0 left-0 w-full h-full cursor-pointer object-cover object-top auto-slide rounded-md"
                                style={{ width: '72%', height: '78%', objectFit: 'cover', top: '10%', left: '13%' }}
                            />
                        </div>
                    </div>
                </a>

                <div className='hidden md:block'>
                    <img src={tab} alt="Tablet" className="absolute z-20 w-7/12 top-64 left-1/2 transform -translate-x-1/2" />
                    <div className='absolute  left-0 w-full h-full overflow-hidden z-20' style={{ top: "230px" }}>
                        <img
                            src={cvgenie}
                            alt="CVGenie"
                            className="absolute top-0 left-0 w-full h-full cursor-pointer object-cover object-top auto-slide rounded-md"
                            style={{ width: '30%', height: '46%', objectFit: 'cover', top: '10%', left: '35%' }}
                        />
                    </div>
                </div>

                <div className='hidden md:block'>
                    <img src={phone} alt="Phone" className="absolute z-30 w-4/12 top-80 right-0 transform -translate-x-1/2" />
                    <div className='absolute  left-0 w-full h-full overflow-hidden z-30' style={{ top: "230px" }}>
                        <img
                            src={cvgenie}
                            alt="CVGenie"
                            className="absolute top-0 left-0 w-full h-full cursor-pointer object-cover object-top auto-slide rounded-md"
                            style={{ width: '14%', height: '28%', objectFit: 'cover', top: '20%', left: '60%' }}
                        />
                    </div>
                </div>
            </div>

            <div className='flex items-center mt-10'>
                <div>
                    <h1 className='text-4xl text-gray-600 font-semibold uppercase'>Craft Your Digital Masterpiece</h1>
                    <div className='w-52 h-0.5 bg-teal-900 mb-6'></div>
                    <p className="text-md text-gray-700 mt-2">Empower your brand with our cutting-edge portfolio website creation services, tailored for <b>savvy salesmen </b> and <b>visionary entrepreneurs</b> seeking to dominate the digital landscape.</p>
                    <p className="text-gray-600 mt-2 font-bold text-xl">Our Platform Is Suitable For:</p>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li className='flex items-center'>
                            <svg class="h-5 w-5 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg> <span className='ml-2'>Salesmen looking to showcase their products or services.</span></li>


                        <li className='flex items-center'>
                            <svg class="h-5 w-5 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg> <span className='ml-2'>Entrepreneurs wanting to establish their online presence.</span></li>

                    </ul>
                    <p className="text-gray-600 mt-4 font-bold text-xl mb-4">Indulge In The Unparalleled Benefits Of Our Service:</p>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li className='flex items-start'>
                            <svg class="h-6 w-6 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg> <span className='ml-2'>Impeccably crafted, responsive designs ensuring seamless user experience across all devices.</span></li>
                        <li className='flex items-start'>
                            <svg class="h-6 w-6 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg> <span className='ml-2'>Intuitive, user-friendly interface empowering you to effortlessly curate your digital masterpiece.</span></li>


                        <li className='flex items-start'>
                            <svg class="h-7 w-7 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span className='ml-2'>Exquisite selection of customizable templates meticulously designed to resonate with your unique brand identity.</span>
                        </li>


                        <Link to={'/user-Signup'} className='bg-teal-900 px-10 py-2 rounded-md text-gray-100 rounded-md mt-8 float-right'>Create My Portfolio</Link>


                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PortfolioWebsiteServices;
