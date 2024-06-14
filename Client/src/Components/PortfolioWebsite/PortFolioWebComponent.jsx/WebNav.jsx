import React, { useState } from 'react';

const WebNav = ({ portfolioData }) => {
    console.log("portfolio data in webnav",portfolioData)
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const { phone, name, primaryTextColor, buttonColor } = portfolioData;

  const handleWhatsAppChat = () => {
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <nav className=" w-full p-4 md:p-6 webfont shadow-xl z-10" style={{ backgroundColor: portfolioData.backgroundColor, color: primaryTextColor }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-md font-semibold" style={{ color: buttonColor }}>{name}</span>
          </div>
          <div className="hidden md:flex items-center justify-center space-x-5 md:space-x-8">
            <a href="/" className="text-xs md:text-md relative group">
              Home
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5" style={{ backgroundColor: buttonColor }}></span>
            </a>
            <a href="#aboutme" className="text-xs md:text-md relative group">
              About me
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: buttonColor }}></span>
            </a>
            <a href="#products" className="text-xs md:text-md relative group">
              Products
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: buttonColor }}></span>
            </a>
            <a href="#service" className="text-xs md:text-md relative group">
              Services
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: buttonColor }}></span>
            </a>
            <a href="#contact" className="text-xs md:text-md relative group">
              Get In Touch
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: buttonColor }}></span>
            </a>
          </div>
          <div className="flex items-center md:hidden">
            <button className="focus:outline-none" onClick={toggleMobileMenu} style={{ color: primaryTextColor }}>
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
          <div className="hidden md:flex items-center" onClick={handleWhatsAppChat}>
            <span className="cursor-pointer px-4 py-1 text-md rounded-md" style={{ backgroundColor: buttonColor }}>
              Let's talk
            </span>
          </div>
        </div>
        {showMobileMenu && (
          <div className="md:hidden">
            <div className="px-2 pt-6 text-center pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium border-1 border-white"
                style={{ color: primaryTextColor }}
              >
                Home
              </a>
              <a
                href="#aboutme"
                className="block px-3 py-2 rounded-md text-base font-medium"
                style={{ color: primaryTextColor }}
              >
                About me
              </a>
              <a
                href="#products"
                className="block px-3 py-2 rounded-md text-base font-medium"
                style={{ color: primaryTextColor }}
              >
                Products
              </a>
              <a
                href="#service"
                className="block px-3 py-2 rounded-md text-base font-medium"
                style={{ color: primaryTextColor }}
              >
                Services
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-base font-medium"
                style={{ color: primaryTextColor }}
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
