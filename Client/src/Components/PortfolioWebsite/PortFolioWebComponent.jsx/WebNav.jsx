import React from 'react'

const WebNav = ({formData}) => {

    const logoUrl = formData.logo ? URL.createObjectURL(formData.logo) : null;

    return (
        <>
            <nav className="bg-black absolute w-full rounded-md p-6 text-white flex justify-between shadow-xl shadow-gray-800 z-10">
                <div className="flex items-center space-x-4">
                {logoUrl && <img src={logoUrl} className="h-8 w-8 rounded-full border-1 border" alt="Logo" />}
                    <span className="text-xl font-semibold">{formData['website-name']}</span>
                </div>
                <div className="flex space-x-4">
                    <a href="/" className="hover:text-gray-400">Home</a>
                    <a href="/case-studies" className="hover:text-gray-400">Case Studies</a>
                    <a href="/recent-work" className="hover:text-gray-400">Recent Work</a>
                    <a href="/contact" className="hover:text-gray-400">Get In Touch</a>
                    <a href="https://linkedin.com" className="hover:text-gray-400">LinkedIn</a>
                    <a href="https://github.com" className="hover:text-gray-400">GitHub</a>
                </div>
            </nav>
        </>
    )
}

export default WebNav