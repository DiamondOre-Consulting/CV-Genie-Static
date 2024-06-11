import React from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const Services = ({ formData  , primaryTextColor , secondaryTextColor,  buttonBgColor}) => {
    console.log("formData in PortfolioForm:", formData);

    // Check if formData.services exists and log its length
    console.log("Services:", formData.services);

    // Return null if formData.services is empty or undefined
    if (!formData.services || formData.services.length === 0) {
        return null;
    };



    const shouldRender = formData.services && formData.services.some(service =>

        service.heading.trim() !== '' ||
        service.description.trim() !== '' 
     
    );


    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });



    return (

        <>
            {shouldRender && (
                <div className=' pb-20'>
                    <div className="p-8 pt-10 pb-10" id='service'>
                        <h1 className={`text-5xl webfont font-bold   text-center mt-6 ${inView ? 'animate__animated animate__backInLeft' : ''}`} ref={ref} style={{color:secondaryTextColor}}>
                            Our Services
                        </h1>
                        <div className='w-28 h-0.5  mx-auto' style={{backgroundColor: buttonBgColor}}></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 mb-10">
                        {formData.services.map((service, index) => (
                            <div className={`p-8 rounded-md  border  border-stone-700 border-4 shadow-md  ${inView ? 'animate__animated animate__fadeIn' : ''}`} ref={ref} key={index} >
                                <div className=" rounded-full w-16 h-16 flex justify-center items-center text-stone-700 shadow-2xl border-1 border-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h2 className="uppercase mt-4 text-gray-100 webfont font-medium mb-3">
                                    {service.heading}
                                    {/* {service.heading || 'No Heading'} */}
                                </h2>
                                <p className="font-light text-sm  mb-3" style={{color : primaryTextColor}}>
                                    {service.description}
                                    {/* {service.description || 'No Description'} */}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className='bg-stone-700 w-1/2 h-1 mt-20 mx-auto'></div>

                </div>

                

            )}
        </>
    );
};

export default Services;

