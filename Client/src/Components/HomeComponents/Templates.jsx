import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '..//..//assets/1.png'
import img2 from '..//..//assets/2.png'
import img3 from '..//..//assets/3.png'
import img4 from '..//..//assets/4.png'
import img5 from '..//..//assets/5.png'
import img6 from '..//..//assets/6.png'
import img7 from '..//..//assets/7.png'
import img8 from '..//..//assets/8.png'

const Templates = () => {
    const settings = {
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className='' id="template">
            <div className='mt-24'>
                <h1 className=' text-xl md:text-4xl font-semibold text-center mb-2'>Millions Of Impressive Templates</h1>
                <div className='w-44 h-1 bg-teal-900 border-0 rounded-tl-xl rounded-tr-xl  mb-24  mx-auto'></div>
            </div>

            <div className='slider-container'>
                <Slider {...settings}>
                    <div className='w-full '><img className='w-2/3 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl'src={img1} alt="" /></div>
                    <div className='w-full '><img className='w-2/3 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl' src={img2} alt="" /></div>
                    <div className='w-full '><img className='w-2/3 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl' src={img3} alt="" /></div>
                    <div className='w-full '><img className='w-2/3 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl' src={img4} alt="" /></div>
                    <div className='w-full '><img className='w-2/3 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl' src={img5} alt="" /></div>
                    <div className='w-full '><img className='w-2/3 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl' src={img6} alt="" /></div>
                </Slider>

                <style jsx global>{`
    .slick-prev,
    .slick-next {
        width: 50px;
        height: 50px;
        background-color: #123534;
        border: 1px solid #123534;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0px;
        cursor: pointer;
        z-index: 1; /* Ensure the buttons are above the slider */
    }

    .slick-prev:hover,
    .slick-next:hover {
        background-color: #123534; /* Darken the background color on hover */
    }

    .slick-prev {
        left: 10px;
    }

    .slick-next {
        right: 10px;
    }
    
`}</style>



            </div>
            <div className='mt-8 px-8'>
            <p className='text-center text-sm text-gray-500 mb-6 '>At CV Genie, we specialize in crafting professional handmade resumes/CVs using millions of appealing templates</p>
            <p className='text-center text-sm text-gray-600 mb-2'>Our goal is to leave a lasting impression on recruiters' minds. Each document is created with expert advice from recruiters and talent acquisition officers with extensive industry experience </p>
            <p className='text-center text-gray-600 text-sm'> Choose CV Genie for a resume/CV that stands out and captures the attention of potential employers</p>
            </div>
            
        </div>
    );
}

export default Templates;
