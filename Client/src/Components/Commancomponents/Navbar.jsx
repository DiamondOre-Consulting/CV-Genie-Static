import React from 'react'
import logo from '../../assets/logo.png'

const Navbar = () => {

    const handleWhatsAppChat = () => {
        const phoneNumber = "9811839410";
        const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}`;
        window.open(url, '_blank');
    };


    return (
        <>
            <nav className="md:pt-6">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-teal-900 md:rounded-3xl">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-10" alt="CV Genielogo" />
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full sm:block sm:w-auto " id="navbar-default">
                        <ul className="items-center font-sm flex flex-col p-4 md:p-0 mt-4 border border-0 md:border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li className='relative group'>
                                <a href="#home" className="block py-2 px-3 text-white  rounded md:bg-transparent md:p-0" aria-current="page">Home</a>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gray-200 group-hover:w-full group-hover:transition-all"></span>
                            </li>
                            <li className='relative group'>
                                <a href="#services" className="block py-2 px-3 text-white rounded  md:hover:bg-transparent md:border-0 md: md:p-0">Services</a>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gray-200 group-hover:w-full group-hover:transition-all"></span>
                            </li>
                            <li className='relative group'>
                                <a href="#template" className="block py-2 px-3 text-white rounded  md:hover:bg-transparent md:border-0 md: md:p-0">Templates</a>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gray-200 group-hover:w-full group-hover:transition-all"></span>
                            </li>
                            <li className='relative group'>
                                <a href="#feature" className="block py-2 px-3 text-white rounded  md:hover:bg-transparent md:border-0 md: md:p-0">Features</a>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gray-200 group-hover:w-full group-hover:transition-all"></span>
                            </li>
                            <li className='relative group'>
                                <a href="#contact" className="block py-2 px-3 text-white rounded  md:hover:bg-transparent md:border-0 md: md:p-0">Contact</a>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gray-200 group-hover:w-full group-hover:transition-all"></span>
                            </li>
                            <li onClick={handleWhatsAppChat}>
                                <a href="#" className="block py-2 px-3 text-teal-900 rounded-full  bg-white  md:border-0 md: md:py-1 md:px-2 text-sm">Chat with us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar