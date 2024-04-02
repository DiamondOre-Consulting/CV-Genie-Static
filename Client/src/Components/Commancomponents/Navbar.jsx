import React, { useState } from 'react';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleWhatsAppChat = () => {
        const phoneNumber = "9811839410";
        const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}`;
        window.open(url, '_blank');
    };

    return (
        <nav className="md:pt-6">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-teal-900 md:rounded-3xl">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-10" alt="CV Genie Logo" />
                </a>
                <button
                    onClick={handleToggleMenu}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-expanded={isMenuOpen ? "true" : "false"}
                    aria-controls="navbar-default"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
                    <ul className="items-center font-sm flex flex-col p-4 md:p-0 mt-4 border border-0 md:border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li className='relative group'>
                            <a href="#home" className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0" aria-current="page">Home</a>
                        </li>
                        <li className='relative group'>
                            <a href="#services" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:p-0">Services</a>
                        </li>
                        <li className='relative group'>
                            <a href="#template" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:p-0">Templates</a>
                        </li>
                        <li className='relative group'>
                            <a href="#feature" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:p-0">Features</a>
                        </li>
                        <li className='relative group'>
                            <a href="#contact" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:p-0">Contact</a>
                        </li>
                        <li onClick={handleWhatsAppChat}>
                            <a href="#" className="block py-2 px-3 text-teal-900 rounded-full bg-white md:border-0 md:py-1 md:px-2 text-sm">Chat with us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
