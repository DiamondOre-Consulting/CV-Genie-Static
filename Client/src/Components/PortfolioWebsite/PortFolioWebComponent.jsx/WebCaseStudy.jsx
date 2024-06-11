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
                <div className=" pb-10" id="casestudy">
                    <div className="p-8 ">
                        <h1 className="text-5xl webfont font-bold text-gray-300 mb-2 text-center mt-6">
                            Case Study
                        </h1>
                        <div className="w-28 h-0.5 bg-orange-500 mx-auto mb-10"></div>
                    </div>
                    {formData?.caseStudies?.map((caseStudy, index) => (
                        <ul key={index} class="grid grid-cols-1 xl:grid-cols-1 gap-y-10 gap-x-6 items-start md:ml-10  p-8">
                            <li class="relative flex flex-col sm:flex-row xl:flex-row items-start">
                                <div class="order-1 sm:ml-6 xl:ml-6">
                                    <h3 class="mb-1 text-slate-900 font-semibold">
                                        <span class="mb-1 block text-sm leading-6 text-orange-500 uppercase">{caseStudy?.projectName}</span>
                                     
                                    </h3>
                                    <div class="prose prose-slate prose-sm text-gray-400">
                                        <p>{caseStudy?.description}</p>
                                    </div><a
                                        class="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
                                        href={caseStudy?.links}>Explore More

                                        <svg class="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                                            width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M0 0L3 3L0 6"></path>
                                        </svg></a>
                                </div>
                                {caseStudy.image && <img src={URL.createObjectURL(caseStudy.image)} alt="" class="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-[17rem]" width="1216" height="640" />}
                            </li>

                        </ul>
                    ))}


                    {/* <div className="mt-10">
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
                    </div> */}

                    <div className='bg-stone-700 w-1/2 h-1 mt-20 mx-auto'></div>

                </div>


            )}
        </>
    );
};

export default WebCaseStudy;
