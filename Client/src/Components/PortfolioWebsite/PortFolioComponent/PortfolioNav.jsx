import React, { useState } from 'react'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';

const PortfolioNav = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    
    return (
        <>
            <nav className="md:pt-6">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-teal-900 md:rounded-3xl">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-10" alt="CV Genie Logo" /> <span className='text-white logoside text-2xl'>CV-Genie</span>
                    </a>
                    <button
                        onClick={handleToggleMenu}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200   "
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
                                <Link to={'/'}><a href="#home" className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0" aria-current="page">Home</a></Link>
                            </li>
                          
                            <li className='relative group'>
                                <a href="#contact" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:p-0">Logout</a>
                            </li>
                            <li className='relative group'>
                       
                            <img className='w-10 h-10  rounded-full' src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="" />
                        
                            </li>
                           

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default PortfolioNav