import React from 'react';

const WebAttachment = ({ portfolioData }) => {
    const handleDownload = () => {
        const url = portfolioData.attachmentUrl;
        const a = document.createElement('a');
        a.href = url;
        a.download = portfolioData.attachmentName || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const primaryTextColor = portfolioData.primaryTextColor;
    const secondaryTextColor = portfolioData.secondaryTextColor;
    const buttonBgColor = portfolioData.buttonColor;

    const shouldRender = portfolioData && portfolioData.attachmentUrl && portfolioData.attachmentUrl.trim() !== '';

    return shouldRender ? (
        <div className="p-6 rounded-lg pt-20">
            <h2 className="text-5xl font-bold webfont text-center mb-8" style={{ color: secondaryTextColor }}>
                Attachment
            </h2>
            <p className="mb-6 px-10 md:px-20" style={{ color: primaryTextColor }}>
                We have included a document that provides detailed insights and important information.
                Please feel free to download it for your reference.
            </p>
            <button
                onClick={handleDownload}
                className="text-white px-4 py-2 rounded-md flex items-center justify-center text-center mx-auto"
                style={{ backgroundColor: buttonBgColor }}
            >
                Download
            </button>
            <div className='bg-stone-700 w-1/2 h-1 mt-20 mx-auto'></div>
        </div>
    ) : null;
};

export default WebAttachment;
