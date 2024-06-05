import React from 'react';

const Aboutme = ({ formData }) => {
    // Check if formData.aboutme is empty
    const shouldRender = formData && formData.aboutme && formData.aboutme.trim() !== '';

    // Render the component only if shouldRender is true
    return shouldRender ? (
        <div className='' id='aboutme'>
            <h1 className='text-center text-gray-500 text-5xl mt-6 font-semibold webfont'> About Me</h1>
            <div className='w-28 h-0.5 bg-customBrown mx-auto'></div>

            <div className='mt-8 mb-8 md:px-20 px-10 text-center'>
                <p>{formData.aboutme}</p>
            </div>
        </div>
    ) : null;
}

export default Aboutme;
