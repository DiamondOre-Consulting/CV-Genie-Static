import React from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const WebProducts = ({ formData  , primaryTextColor , secondaryTextColor , backgroundColor , buttonBgColor}) => {
    console.log(formData);

    // Check if formData.products array is not empty
    const shouldRender = formData.products && formData.products.length > 0;


    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });


    return shouldRender ? (
        <div className=''>
            <div className="p-8 pt-10 pb-10" id='service'>
                <h1 className={`text-5xl webfont font-bold   text-center mt-6 ${inView ? 'animate__animated animate__backInLeft' : ''}`} ref={ref} style={{color: secondaryTextColor}}>
                    Our Products
                </h1>
                <div className='w-28 h-0.5  mb-10 mx-auto' style={{backgroundColor: buttonBgColor}}></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-4 px-10'>
                {formData.products.map((product, index) => (
                    <div key={index} className={`bg-white rounded-xl border border-4 border-stone-700 overflow-hidden  ${inView ? 'animate__animated animate__fadeIn' : ''}`} ref={ref}>
                        <div className="relative">
                            {product.image && <img className="w-full h-48 object-fit" src={URL.createObjectURL(product.image)} alt="Product" />}
                            {/* <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">3 min read
                            </div> */}
                        </div>
                        <div className="p-4 " style={{ backgroundColor: backgroundColor }}>
                            <div className="text-lg font-medium  mb-2 " style={{color: secondaryTextColor}}>{product.heading}</div>
                            <p className=" text-sm" style={{color: primaryTextColor}}>{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='bg-stone-700 w-1/2 h-1 mt-20 mx-auto'></div>

        </div>
    ) : null;
};

export default WebProducts;
