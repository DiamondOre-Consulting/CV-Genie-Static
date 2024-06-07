import React from 'react';

const WebProducts = ({ formData }) => {
    console.log(formData);

    // Check if formData.products array is not empty
    const shouldRender = formData.products && formData.products.length > 0;

    // Render the component only if formData.products is not empty
    return shouldRender ? (
        <div className='bg-black'>
            <div className="p-8 pt-10 pb-10" id='service'>
                <h1 className="text-5xl webfont font-bold  text-gray-300 text-center mt-6">
                    Our Products
                </h1>
                <div className='w-28 h-0.5 bg-orange-500 mb-10 mx-auto'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-4 px-10'>
                {formData.products.map((product, index) => (
                    <div key={index} className="bg-white rounded-xl border border-4 border-stone-700 overflow-hidden">
                        <div className="relative">
                            {product.image && <img className="w-full h-48 object-fit" src={URL.createObjectURL(product.image)} alt="Product" />}
                            {/* <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">3 min read
                            </div> */}
                        </div>
                        <div className="p-4 bg-black">
                            <div className="text-lg font-medium text-gray-300 mb-2 ">{product.heading}</div>
                            <p className="text-gray-400 text-sm">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='bg-stone-700 w-1/2 h-1 mt-20 mx-auto'></div>

        </div>
    ) : null;
};

export default WebProducts;
