import React from 'react';

const WebAttachment = ({ formData }) => {
    const handleDownload = () => {
        const url = URL.createObjectURL(formData.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = formData.file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const shouldRender = formData && formData.image.name && formData.image.name.trim() !== '';


    // Render the component only if formData.file is not null or undefined
    return shouldRender ? (
        <div className="p-6 rounded-lg bg-customBrown">
            <h2 className="text-5xl font-bold webfont text-center text-gray-100 mb-8">Attachment</h2>
            <p className="text-gray-200 mb-6 px-10 md:px-20">
                We have included a document that provides detailed insights and important information.
                Please feel free to download it for your reference.
            </p>
            <button
                onClick={handleDownload}
                className="bg-black text-white px-4 py-2 rounded-md flex items-center justify-center text-center mx-auto"
            >
                Download
            </button>
        </div>
    ) : null;
};

export default WebAttachment;
