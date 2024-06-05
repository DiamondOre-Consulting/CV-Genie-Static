import React from 'react'

const WebNav = ({formData}) => {

    const logoUrl = formData.logo ? URL.createObjectURL(formData.logo) : null;

    return (
        <>
            <nav className="bg-customGold absolute w-full  p-4 md:p-6 text-gray-100 webfont shadow-xl  z-10">
                {/* <div className="flex items-center space-x-4">
                {logoUrl && <img src={logoUrl} className="h-8 w-8 rounded-full border-1 border" alt="Logo" />}
                    <span className="text-xl font-semibold">{formData['website-name']}</span>
                </div> */}
                <div className="flex items-center justify-center text--gray-600 space-x-5 md:space-x-8">
                    <a href="/" className="hover:text-gray-800 text-xs md:text-normal">Home</a>
                    <a href="#aboutme" className="hover:text-gray-800 text-xs md:text-normal">About me</a>
                    <a href="#casestudy" className="hover:text-gray-800 text-xs md:text-normal">Case Studies</a>
                    <a href="#service" className="hover:text-gray-800 text-xs md:text-normal">Services</a>
                    <a href="#contact" className="hover:text-gray-800 text-xs md:text-normal">Get In Touch</a>
                 
                </div>
            </nav>
        </>
    )
}

export default WebNav