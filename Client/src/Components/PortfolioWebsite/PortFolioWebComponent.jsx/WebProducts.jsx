import React from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const WebProducts = ({ portfolioData }) => {
    console.log(portfolioData);

    // Check if portfolioData.products array is not empty
    const shouldRender = portfolioData.products && portfolioData.products.length > 0;

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });


    const primaryTextColor = portfolioData.primaryTextColor;
    const buttonBgColor = portfolioData.buttonColor;
    const secondaryTextColor = portfolioData.secondaryTextColor;
    const backgroundColor = portfolioData.bgColor || '#000000';

    return shouldRender ? (
        <div className=''>
            <div className="p-8 pt-10 pb-10" id='service'>
                <h1 className={`text-5xl webfont font-bold text-center mt-6 ${inView ? 'animate__animated animate__backInLeft' : ''}`} ref={ref} style={{ color: buttonBgColor }}>
                    Our Products
                </h1>
                <div className='w-28 h-0.5 mb-10 mx-auto' style={{ backgroundColor: buttonBgColor }}></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-4 px-10'>
                {portfolioData.products.map((product, index) => (
                    <div key={product._id} className={`bg-white rounded-xl border-0 shadow-xl overflow-hidden ${inView ? 'animate__animated animate__fadeIn' : ''}`} ref={ref}>
                        <div className="relative">
                            {product.productImage && <img className="w-full h-48 object-fit" src={product.productImage} alt="Product" />}
                        </div>
                        <div className="p-4 "  style={{backgroundColor: backgroundColor}}>
                            <div className="text-lg font-medium mb-2" style={{ color: buttonBgColor }}>{product.productName}</div>
                            <p className="text-sm" style={{ color: primaryTextColor }}>{product.productDescription}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='bg-stone-700 w-1/2 h-1 mt-20 mx-auto'></div>

        </div>
    ) : null;
};

export default WebProducts;
