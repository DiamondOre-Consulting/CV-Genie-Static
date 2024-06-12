import React from 'react';

const WebFooter = ({ portfolioData }) => {
    console.log(portfolioData);

    return (
        <>
            <footer className="flex flex-col space-y-4 justify-center">
                {portfolioData?.socialMedias && (
                    <div className="flex justify-center space-x-5 mt-4 ml-10 mr-10">
                        {portfolioData?.socialMedias?.facebook && (
                            <a href={portfolioData.socialMedias.facebook} target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="Facebook" />
                            </a>
                        )}
                        {portfolioData?.socialMedias?.linkedin && (
                            <a href={portfolioData.socialMedias.linkedin} target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt="LinkedIn" />
                            </a>
                        )}
                        {portfolioData?.socialMedias?.instagram && (
                            <a href={portfolioData.socialMedias.instagram} target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="Instagram" />
                            </a>
                        )}
                        {portfolioData?.socialMedias?.twitter && (
                            <a href={portfolioData.socialMedias.twitter} target="_blank" rel="noopener noreferrer">
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
