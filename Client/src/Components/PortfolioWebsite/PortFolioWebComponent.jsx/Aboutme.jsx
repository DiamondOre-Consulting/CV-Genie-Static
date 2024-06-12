import React from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const Aboutme = ({ portfolioData }) => {
    const shouldRender = portfolioData && portfolioData.aboutMe && portfolioData.aboutMe.trim() !== '';

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const primaryTextColor = portfolioData.primaryTextColor;
    const secondaryTextColor = portfolioData.secondaryTextColor;
    const buttonBgColor = portfolioData.buttonColor;

    return shouldRender ? (
        <div id='aboutme'>
            <h1 className={`text-center text-5xl pt-20 font-semibold webfont ${inView ? 'animate__animated animate__backInLeft' : ''}`} ref={ref} style={{ color:  buttonBgColor }}>
                About Me
            </h1>
            <div className='w-28 h-0.5 mx-auto mb-10' style={{ backgroundColor: buttonBgColor }}></div>
            <div className={`mt-8 pb-8 md:px-20 px-10 text-center ${inView ? 'animate__animated animate__backInUp' : ''}`} ref={ref} style={{ color: primaryTextColor }}>
                <p>{portfolioData.aboutMe}</p>
            </div>
            <div className='bg-stone-700 w-1/2 h-1 mt-10 mx-auto'></div>
        </div>
    ) : null;
}

export default Aboutme;
