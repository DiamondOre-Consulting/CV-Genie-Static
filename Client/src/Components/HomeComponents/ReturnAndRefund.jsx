import React from 'react'
import Navbar from '../Commancomponents/Navbar'
import Footer from '../Commancomponents/Footer'

const ReturnAndRefund = () => {
    return (
        <>
            <Navbar/>
            <div>
                <h1 className='text-center text-2xl font-bold underline mt-10'>Return and Refund </h1>
                <div className='mt-10 px-8 md:px-40 mb-20'>
                    <ol className="list-decimal">
                        <li><strong>Payment:</strong>
                            <ul className='list-disc ml-8'>
                                <li>Payment for CV Genie services is required upfront.</li>
                                <li>All payments are non-refundable once services have commenced.</li>
                            </ul>
                        </li>
                        <li><strong>Refunds:</strong>
                            <ul className='list-disc ml-8'>
                                <li>Refunds are not available once services have begun.</li>
                                <li>In the event of dissatisfaction with our services, please contact us to discuss potential resolutions.</li>
                            </ul>
                        </li>
                        <li><strong>Cancellation:</strong>
                            <ul className='list-disc ml-8'>
                                <li>Services may be cancelled prior to commencement for a full refund.</li>
                                <li>Once services have started, cancellation will not result in a refund.</li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </div>
           <Footer/>
        </>
    )
}

export default ReturnAndRefund