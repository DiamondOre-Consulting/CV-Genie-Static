import React from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const WebHero = ({ portfolioData }) => {
    const logoUrl = portfolioData.profileImage;
    // const backgroundColor = portfolioData.bgColor || '#000000';
    const primaryTextColor = portfolioData.primaryTextColor;
    const buttonBgColor = portfolioData.buttonColor;

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="px-10 pt-20" >
            <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
                <div className="order-1 lg:order-1">
                    {logoUrl && <img src={logoUrl} className="h-64 w-64 object-cover rounded-full lg:w-[400px] lg:h-[400px]" alt="" />}
                </div>
                <div className="order-2 lg:order-2 flex flex-col justify-center lg:items-start text-center sm:text-left">
                    <p className="mt-2 text-3xl md:text-lg sm:text-sm" style={{ color: primaryTextColor }}>Hi There</p>
                    <p className={`text-4xl font-bold md:text-7xl ${inView ? 'animate__animated animate__backInRight' : ''}`} ref={ref} style={{ color: primaryTextColor }}>I'm
                        <span className="webfont" style={{ color: buttonBgColor }}> {portfolioData.name}</span>.
                    </p>
                    <p className={`text-xl mt-4 md:text-2xl ${inView ? 'animate__animated animate__backInRight' : ''}`} ref={ref} style={{ color: primaryTextColor }}>{portfolioData.tagline}</p>
                    {/* <p className={`mt-2 lg:text-xl md:text-lg sm:text-sm ${inView ? 'animate__animated animate__backInRight' : ''}`} ref={ref} style={{ color: primaryTextColor }}>Designer and Developer devoted to
                        crafting beautiful web experiences focused on simplicity and purpose.
                    </p> */}
                    <div className="flex justify-center">
                        <button className={`text-lg md:text-2xl py-2 m-2 px-5 mt-10 hover:bg-zinc-800 rounded-full ${inView ? 'animate__animated animate__zoomIn' : ''}`} ref={ref} style={{ backgroundColor: buttonBgColor, color: primaryTextColor }}>
                            <a href='#contact'>Contact Me</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-stone-700 w-1/2 h-1 mt-20 mx-auto"></div>
        </section>
    );
};

export default WebHero;
