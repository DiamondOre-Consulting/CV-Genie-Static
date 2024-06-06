import React from 'react';

const Aboutme = ({ formData }) => {
    // Check if formData.aboutme is empty
    const shouldRender = formData && formData.aboutme && formData.aboutme.trim() !== '';

    // Render the component only if shouldRender is true
    return shouldRender ? (
        <div className='bg-black' id='aboutme'>
            <h1 className='text-center text-gray-300 text-5xl pt-20  font-semibold webfont'> About Me</h1>
            <div className='w-28 h-0.5 bg-orange-500 mx-auto mb-10'></div>

            <div className='mt-8 pb-8 md:px-20 px-10 text-gray-400 pb-20 text-center'>
                <p>{formData.aboutme}</p>
            </div>
            <div className='bg-stone-700 w-1/2 h-1  mx-auto'></div>
        </div>
        
    ) : null;
}

export default Aboutme;
