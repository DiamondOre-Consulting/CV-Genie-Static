import React from 'react';
import Navbar from '../Commancomponents/Navbar';
import Footer from '../Commancomponents/Footer';

const TermsofServices = () => {
    return (
        <>
            <Navbar />
            <div>
                <h1 className='text-center text-2xl font-bold underline mt-10'>Terms and Conditions for CV Genie Services</h1>
                <div className='mt-10 px-8 md:px-40 mb-10'>
                    <ol className='list-decimal'>
                        <li className='mb-2'><strong>Acceptance of Terms:</strong> By using the services provided by CV Genie, you agree to abide by the following terms and conditions.</li>
                        <li className='mb-2'><strong>Service Description:</strong> CV Genie offers resume and portfolio crafting services aimed at representing individuals' professional journeys accurately and uniquely. Our services include resume writing, portfolio creation, and personalized career advice.</li>
                        <li className='mb-2'><strong>Client Responsibility:</strong> Clients are responsible for providing accurate and truthful information about their professional experiences, achievements, and goals. CV Genie is not liable for any consequences resulting from inaccurate or misleading information provided by the client.</li>
                        <li className='mb-2'><strong>Intellectual Property Rights:</strong> All materials, including resumes, portfolios, and advice provided by CV Genie, are the intellectual property of CV Genie and may not be reproduced, distributed, or used for any purpose other than personal career development without explicit permission.</li>
                        <li className='mb-2'><strong>Confidentiality:</strong> CV Genie respects the privacy of its clients and will not disclose any confidential information shared during the course of our services to third parties without the client's consent, except as required by law.</li>
                        <li className='mb-2'><strong>Payment:</strong> Payment for CV Genie services is required upfront and is non-refundable once services have commenced. Prices are subject to change without prior notice.</li>
                        <li className='mb-2'><strong>Quality Assurance:</strong> While CV Genie strives to provide high-quality services, we do not guarantee employment or specific outcomes as a result of using our services. Client satisfaction is important to us, and we will make reasonable efforts to address any concerns or issues that arise.</li>
                        <li className='mb-2'><strong>Limitation of Liability:</strong> CV Genie shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our services, including but not limited to loss of data, loss of revenue or profits, or damages resulting from the use or inability to use our services.</li>
                        <li className='mb-2'><strong>Indemnification:</strong> Clients agree to indemnify and hold CV Genie harmless from any claims, damages, or liabilities arising out of or related to the use of our services, including but not limited to claims of intellectual property infringement or defamation.</li>
                        <li className='mb-2'><strong>Governing Law:</strong> These terms and conditions shall be governed by and construed in accordance with the laws of the Government of India. Any dispute arising out of or related to these terms and conditions shall be resolved exclusively by the courts of the Government of India.</li>
                        <li><strong>Modification of Terms:</strong> CV Genie reserves the right to modify these terms and conditions at any time without prior notice. Clients are responsible for reviewing the terms periodically for changes. Continued use of our services after the posting of changes constitutes acceptance of those changes.</li>
                    </ol>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsofServices;
