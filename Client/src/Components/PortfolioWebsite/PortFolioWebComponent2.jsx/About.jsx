import React, { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ portfolioData }) => {

    const shouldRender = portfolioData && portfolioData.aboutMe && portfolioData.aboutMe.trim() !== '';

    useEffect(() => {
        gsap.fromTo('.about',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 80%',
                }
            }
        );

        gsap.fromTo('.aboutme',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                stagger: 0.25,
                scrollTrigger: {
                    trigger: '.aboutme',
                    start: 'top 80%',
                }
            }
        );

    }, []);

    const primaryTextColor = portfolioData.primaryTextColor;
    const secondaryTextColor = portfolioData.secondaryTextColor;
    const buttonBgColor = portfolioData.buttonColor;


    return shouldRender ? (
        <div className='px-10 my-10 ' id='aboutme'>
            <div className='md:flex gap-10 items-center flex-col'>
                <div className='flex flex-col w-full'>
                    <h1 className='font-bold text-6xl text-gray-900 about w-80 '>About Me</h1>
                    <div className='w-40 h-0.5 mb-4' style={{ backgroundColor: buttonBgColor }}></div>
                </div>
                <p className=' aboutme' style={{ color: primaryTextColor }}>
                    {portfolioData.aboutMe}
                </p>
            </div>
        </div>
    ) : null;
}

export default About;
