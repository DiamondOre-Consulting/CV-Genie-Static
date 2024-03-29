import React from 'react'
import linkedin from '..//..//assets/linkedin.png'

const Services = () => {
    return (
        <>
            <section className='md:pl-10' id="services">
                <div>
                    <h1 className='text-4xl font-semibold text-center mb-1'>Our Services</h1>
                    <div className='w-44 h-1 bg-teal-900 border-0 rounded-tl-xl rounded-tr-xl  mb-10  mx-auto'></div>
                </div>
                <div className=' grid grid-cols-1 md:grid-cols-3 justify-center justify-items-center content-center'>
                    <div className='grid-col flex flex-col justify-center items-center'>
                        <img className='md:w-48' src="https://s3-alpha-sig.figma.com/img/b5d9/b578/9e9f16f8e9fb4e986f359fa2da456f34?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NnKvu2jvI5FMum4kl4N1EuMS-9x5V7t6kwjF5O1qEgBWhwAVLwzE7WQk9vqCC5LWPIPr956lkKAQxyciIrf~Fxb443QEaLzg-a1kW5HTEQMhqGnd9PmOLZ7rH-KVvvC6F2LR6i5XyJajce5CxWtOCKRbcPM1Uv9Oa9ct9uLIWNWGfdi~kBpqG-j7UuKXMtCixTol70MFprlxafKm6lKKdijDYSIz6o1DsvjsXdqFEZKaGds~BBkT87jXJuYJl4kz5tcFm-Ukv3yZ8qeXVVy2QkxcUUyPxkGOtFsPNmcdC4d6WFOtDossPlHKqFGLGkrS-dR0gBHv-kUqhg6SBGL3-Q__" alt="" />
                        <span className='mt-4 bg-teal-900 text-white rounded-full py-2 font-bold px-4 mb-4'>1</span>
                        <p className='text-gray-600'>Resume/CV Writing</p>
                    </div>

                    <div className=' flex flex-col justify-center items-center'>
                        <img className='w-72 md:w-48' src="https://s3-alpha-sig.figma.com/img/d180/ab8d/d636d52116dcab946c3dbe2d97052506?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=isB4V8o3R9dQEoU~B2rU7sDX7dQxdoo1B--qGp5Dj~RDZRmNWpS3dgH1fh61YsjvJUlZ4149FoTNk7RiXcbCfmAEQtxJRyvOsxWtQPhZ0VoYqCbrR0RvrSl87a6iOne2N8FTY2n20sCb8etapawL5NHHw1WqbgMFPQRLxCyAR7b7cO6ngDdgnhav~~73N-iV6ILCjqUBoHZTd7lMwhKaYzpXkjAPKSyQl4IGjCjbhKzxJagBkrBxWxZT40f9d3SRbg6GEhZsoXz3yQnzHGsCiugW8mHjR9MCOq7WrpXKidGoUDLYNO-UAFDD-191h3bvPxwNhj8oMeTwHzcHDv7~2w__" alt="" />
                        <span className='mt-4 bg-teal-900 text-white rounded-full py-2 font-bold px-4 mb-4'>2</span>
                        <p className='text-gray-600'>Cover Letter Writing</p>
                    </div>

                    <div className='grid-col flex flex-col justify-center items-center'>
                        <img className='h-60 rounded-md' src={linkedin} alt="" />
                        <span className='mt-10 bg-teal-900 text-white rounded-full py-2 font-bold px-4 mb-4'>3</span>
                        <p className='text-gray-600'>LinkedIn Profile Optimization</p>
                    </div>
                </div>

                <div className='flex justify-center mt-8'>
                <button class=" rounded-full text-white  hover:before:bg-tealborder-teal-900 relative h-[50px] w-auto overflow-hidden border  bg-teal-900 px-8 text-white  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-teal-900  hover:before:left-0 hover:before:w-full"><span class="relative z-10">Create Your Resume Now</span></button>
                </div>

            </section>
        </>
    )
}

export default Services