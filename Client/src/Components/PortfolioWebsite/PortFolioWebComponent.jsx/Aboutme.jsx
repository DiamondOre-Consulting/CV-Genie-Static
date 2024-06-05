import React from 'react'

const Aboutme = ({ formData }) => {


    const logoUrl = formData.image ? URL.createObjectURL(formData.image) : null;

    return (

        <>
            <h1 className='text-center text-3xl mt-4 font-semibold'> About Me</h1>

            <div className='mt-8 mb-8 px-20 text-center'>
                <p>{formData['aboutme']}
                </p>
             

            </div>


        </>
    )
}

export default Aboutme