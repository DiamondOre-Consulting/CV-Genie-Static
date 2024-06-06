import React, { useState } from 'react';

const WebNav = ({ formData }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <>
            <nav className="bg-stone-700 fixed w-full p-4 md:p-6 text-gray-100 webfont shadow-xl z-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        {/* <div className='bg-orange-500 w-5 h-5 rounded-full'></div> */}
                        <span className="text-md font-semibold text-gray-200 ">{formData['full-name']}</span>
                    </div>
                    <div className="hidden md:flex items-center justify-center space-x-5 md:space-x-8">
                        <a href="/" className="hover:text-gray-100 text-xs md:text-md relative group">
                            Home
                            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-orange-500"></span>
                        </a>
                        <a href="#aboutme" className="hover:text-gray-100 text-xs md:text-md relative group">
                            About me
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#casestudy" className="hover:text-gray-100 text-xs md:text-md relative group">
                            Case Studies
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#service" className="hover:text-gray-100 text-xs md:text-md relative group">
                            Services
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#contact" className="hover:text-gray-100 text-xs md:text-md relative group">
                            Get In Touch
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                        </a>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button className="text-gray-200 hover:text-gray-100 focus:outline-none" onClick={toggleMobileMenu}>
                            <svg
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 5H20V7H4V5ZM4 11H20V13H4V11ZM4 17H20V19H4V17Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden md:flex items-center">
                        <span className="bg-stone-600 hover:bg-orange-500 cursor-pointer px-4 py-1 text-md rounded-md">
                            Let's talk
                        </span>
                    </div>
                </div>
                {showMobileMenu && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a
                                href="/"
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Home
                            </a>
                            <a
                                href="#aboutme"
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                About me
                            </a>
                            <a
                                href="#casestudy"
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Case Studies
                            </a>
                            <a
                                href="#service"
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Services
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default WebNav;
