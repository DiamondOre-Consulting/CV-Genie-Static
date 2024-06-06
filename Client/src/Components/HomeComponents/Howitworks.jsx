import React from 'react'

const Howitworks = () => {
    return (
        <>
            <section className=''>
                <div class="bg-gray-50 py-6 sm:py-8 lg:py-12 px-10">
                    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div class="mb-10 md:mb-16">
                            <h2 class=" text-center text-2xl font-bold text-teal-900 lg:text-3xl">How it Works?</h2>
                            {/* <p className='text-center text-red-600'>Process</p> */}
                        </div>

                        <div class="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">

                            <div class="flex flex-col rounded-xl border p-4 md:p-6 bg-white border-0 shadow-xl transition-all duration-700 hover:scale-110">
                                <p className='text-4xl mb-2'><i class="fa fa-headphones" aria-hidden="true"></i></p>
                                <h3 class="mb-2 text-lg font-semibold md:text-xl text-teal-900">Discussion</h3>
                                <p class="mb-4 text-gray-500">Once the payment is done, a professional resume writer will be assigned to you who will then reach out to discuss your expectation and ask for relevant details.</p>
                            </div>

                            <div class="flex flex-col rounded-xl border p-4 md:p-6 bg-white border-0 shadow-xl transition-all duration-700 hover:scale-110">
                                <p className='text-4xl mb-2'><i class="fa fa-file-image-o" aria-hidden="true"></i></p>
                                <h3 class="mb-2 text-lg font-semibold md:text-xl text-teal-900">First Draft</h3>
                                <p class="mb-4 text-gray-500">You will recive the first draft of your new resume to review and other feedback on, based on the information shared during your consultation call.</p>
                            </div>

                            <div class="flex flex-col rounded-xl border p-4 md:p-6 bg-white border-0 shadow-xl transition-all duration-700 hover:scale-110">
                                <p className='text-4xl mb-2'><i class="fa fa-file-text" aria-hidden="true"></i></p>
                                <h3 class="mb-2 text-lg font-semibold md:text-xl text-teal-900">Final File</h3>
                                <p class="mb-4 text-gray-500">After incopration your feedback and making the necessary revisions, the writer will be provide you with the final version of your resume.</p>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Howitworks