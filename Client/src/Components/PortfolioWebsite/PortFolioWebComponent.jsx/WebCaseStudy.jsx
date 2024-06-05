import React from 'react';

const WebCaseStudy = ({ formData }) => {
    console.log(formData);

    // Check if formData.caseStudies exists and has at least one case study with non-empty fields
    const shouldRender = formData.caseStudies && formData.caseStudies.some(caseStudy => 
        caseStudy.projectName.trim() !== '' ||
        caseStudy.description.trim() !== '' ||
        caseStudy.links.trim() !== '' ||
        caseStudy.image
    );

    // Render the component only if shouldRender is true
    return (
        <>
            {shouldRender && (
                <div className="bg-customBrown pb-10" id="casestudy">
                    <div className="p-8 mt-10">
                        <h1 className="text-5xl webfont font-bold text-gray-100 text-center mt-6">
                            Case Study
                        </h1>
                        <div className="w-28 h-0.5 bg-customBrown mx-auto"></div>
                    </div>

                    <div className="mt-10">
                        {formData?.caseStudies?.map((caseStudy, index) => (
                            <div key={index} className={`grid grid-cols-1 md:grid-cols-2 md:flex  ${formData?.caseStudies?.length % 2 === 0 && index % 2 !== 0 ? 'md:flex-row-reverse' : ''} justify-between px-10 mb-20`}>
                                <div className="md:pl-20 mt-8">
                                    <h1 className="text-white text-4xl font-bold webfont mb-2">{caseStudy?.projectName}</h1>
                                    <p className="text-gray-300 mb-4">{caseStudy?.description}</p>
                                    <a href={caseStudy?.links} className="bg-white text-gray-800 px-10 py-1 rounded-md">Link</a>
                                </div>
                                <div className="md:ml-56 md:mt-4 mt-8">
                                    {caseStudy.image && <img src={URL.createObjectURL(caseStudy.image)} className="w-42 h-66 border border-gray-300 rounded-md" alt="" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default WebCaseStudy;
