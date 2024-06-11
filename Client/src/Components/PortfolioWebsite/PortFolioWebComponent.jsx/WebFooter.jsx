import React from 'react';

const WebFooter = ({ formData }) => {
    console.log(formData);

    return (
        <>
            <footer className="flex flex-col space-y-4 justify-center">
                {formData?.socialMediaLinks && (
                    <div className="flex justify-center space-x-5 mt-4 ml-10 mr-10">
                        {formData?.socialMediaLinks?.facebook && (
                            <a href={formData.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="Facebook" />
                            </a>
                        )}
                        {formData?.socialMediaLinks?.linkedin && (
                            <a href={formData.socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt="LinkedIn" />
                            </a>
                        )}
                        {formData?.socialMediaLinks?.instagram && (
                            <a href={formData.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="Instagram" />
                            </a>
                        )}
                        {formData?.socialMediaLinks?.twitter && (
                            <a href={formData.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" />
                            </a>
                        )}
                    </div>
                )}
                <p className="text-center text-gray-500 font-medium  py-4">&copy; 2024 Company Ltd. All rights reserved.</p>
            </footer>
        </>
    );
};

export default WebFooter;
