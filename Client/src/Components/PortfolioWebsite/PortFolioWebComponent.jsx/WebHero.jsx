import React from 'react';

const WebHero = ({ formData }) => {
    // Create a URL for the logo image if it exists in the form data
    const logoUrl = formData.image ? URL.createObjectURL(formData.image) : null;

    return (
        <>

            <section class="px-10 pt-32  bg-black">

                <div class="grid lg:grid-cols-2 items-center justify-items-center gap-5">
                    <div class="order-1 lg:order-1 shadow-2xl ">
                        {logoUrl && <img src={logoUrl} class="h-64 w-64 object-cover rounded-full lg:w-[400px] lg:h-[400px] " alt="" />}
                    </div>
                    <div class="order-2 lg:order-2  flex flex-col justify-center lg:items-start text-center sm:text-left ">
                        <p class="mt-2 text-3xl md:text-lg sm:text-sm text-white">Hi There</p>
                        <p class="text-4xl font-bold md:text-7xl  text-white ">I'm
                            <span class="text-orange- webfont"> {formData['full-name']}</span>.
                        </p>
                        <p class="text-xl mt-4 md:text-2xl text-white">{formData['tagline']} <span>
                            {/* <Typewriter
                            words={['Full Stack Dev.', 'Software Dev.', 'Web Designer.', 'Programmer.']}
                            loop={5}
                            cursor
                            cursorStyle='|'
                            typeSpeed={50}
                            deleteSpeed={50}
                            delaySpeed={1000}

                        /> */}
                        </span></p>
                        <p class="mt-2 lg:text-xl md:text-lg sm:text-sm  text-white ">Designer and Developer devoted to
                            crafting beautiful web experiences
                            focused on simplicity and purpose.</p>
                        <div class='flex'>
                            <button class="text-lg md:text-2xl bg-orange-600 text-white py-2 m-2 px-5 mt-10 hover:bg-zinc-800 rounded-full"><a href='#contact'>Contact Me</a></button>
                            {/* <button class="text-lg md:text-2xl bg-orange-600 text-white py-2 m-2 px-5 mt-10 hover:bg-zinc-800 rounded-full "  > 🎉</button> */}
                        </div>

                       
                    </div>

                </div>
                <div className='bg-stone-700 w-1/2 h-1 mt-20 mx-auto'></div>
            </section>
        </>
        // <div className=' w-screen flex flex-col bg-stone-900 items-center justify-center webfont '>

        //     <div className='flex flex-col  text-center justify-center mt-24'>
        //         <h1 className='text-white text-5xl md:text-8xl font-bold'>Hello,</h1><br></br>
        //         <h1 className=' text-5xl md:text-8xl text-white font-bold'> I'm {formData['full-name']}.</h1>
        //         <div className='w-full h-0.5 bg-customGold'></div>
        //     </div>

        //     <div className='grid grid-cols-1 md:grid-cols-2 gap-2 flex ml-10 md:ml-10 mt-6 mb-10 px-10'>
        //         <div className='flex justify-end mr-20'>
        //             {logoUrl && <img src={logoUrl} className='w-48  h-66 border border-gray-300 ' alt="" style={{}} />}
        //         </div>


        //         <div className='flex flex-col justify-center  md:pr-20 -ml-10 justify-start mt-8 md:px-0 px-6'>
        //             <span className='uppercase font-bold text-gray-200 mb-2 text-xl md:text-2xl'>{formData['tagline']}</span>
        //             <p className='text-gray-300 mt-2 md:pr-10'>{formData['shortsummery']}</p>
        //             {/* <a class="mt-8 inline-flex w-1/2 items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/25 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
        //                 href="#">
        //                 Contact US
        //             </a> */}
        //         </div>

        //     </div>


        // </div>
    );
}

export default WebHero;
