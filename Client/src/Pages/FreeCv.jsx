import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Commancomponents/Navbar'
import Footer from '../Components/Commancomponents/Footer'
import { Link } from 'react-router-dom'
import freecv from '../assets/freecv.png'
import axios from 'axios'

const FreeCv = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [substep, setSubStep] = useState(1);
    const [url, setUrl] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedinUrl: '',
        summary: '',
        tech_skills: [],
        soft_skills: [],
        graduation: { degree_name: '', graduation_year: '', university_name: '', university_city: '' },
        twelfth: { twelfth_year: '', twelfth_school_name: '', twelfth_school_city: '', twelfth_board_name: '' },
        tenth: { tenth_year: '', tenth_school_name: '', tenth_school_city: '', tenth_board_name: '' },
        experience: { designation: '', start_month: '', start_year: '', end_month: '', end_year: '', company: '', company_city: '', work_description: '' }
        // Add more fields for each step
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleInputChange = (field, subfield, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: {
                ...prevFormData[field],
                [subfield]: value,
            },
        }));
    };

    // const handleAddItem = (field) => {
    //     setFormData({
    //         ...formData,
    //         [field]: [...formData[field], {}],
    //     });
    // };


    const handleClose = () => {
        setShowPopup(false);

    };

    const handleTechSkillInputChange = (index, value) => {
        const updatedTechSkills = [...formData.tech_skills];
        updatedTechSkills[index] = value;
        setFormData(prevFormData => ({
            ...prevFormData,
            tech_skills: updatedTechSkills
        }));
    };

    const handleSoftSkillInputChange = (index, value) => {
        const updatedSoftSkills = [...formData.soft_skills];
        updatedSoftSkills[index] = value;
        setFormData(prevFormData => ({
            ...prevFormData,
            soft_skills: updatedSoftSkills
        }));
    };

    const handleAddItem = (field) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: [...prevFormData[field], '']
        }));
    };

    const handleRemoveItem = (field, index) => {
        const updatedItems = [...formData[field]];
        updatedItems.splice(index, 1);
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: updatedItems
        }));
    };

    // const handleRemoveItem = (field, index) => {
    //     const updatedItems = [...formData[field]];
    //     updatedItems.splice(index, 1);
    //     setFormData({
    //         ...formData,
    //         [field]: updatedItems,
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        setError(null);

        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.linkedinUrl || !formData.summary || !formData.tech_skills || !formData.soft_skills || !formData.experience || !formData.graduation || !formData.twelfth || !formData.tenth) {
            setError("Filling all fields is compulsory.");
            setShowLoader(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:7001/api/client/generate-pdf", formData, {
                responseType: 'arraybuffer' // Ensure response type is arraybuffer to handle binary data (like PDF)
            });

            if (response.status === 200) {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);

                // Open PDF in new tab/window
                window.open(url, '_blank');

                // alert("Form has been submitted. Click on download button to download your CV.");
                setShowLoader(false);
                console.log('Form submitted:', formData);
            }
        } catch (error) {
            console.error("Error in building resume", error);
            setShowLoader(false);
            if (error.response) {
                const status = error.response.status;
                setError(`Error occurred in file submitting: ${status}`);
                setShowLoader(false);
            } else {
                setError("Error occurred in file submitting.");
            }
        }
    };

    const nextSubStep = () => {
        setSubStep((prevSubStep) => prevSubStep + 1);
    };

    const prevSubStep = () => {
        setSubStep((prevSubStep) => prevSubStep - 1);
    };


    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };


    const handleItemInputChange = (field, index, key, value) => {
        const updatedItems = [...formData[field]];
        updatedItems[index][key] = value;
        setFormData({
            ...formData,
            [field]: updatedItems,
        });
    };
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return (
        <div>
            <Navbar />
            <div className="flex items-center bg-gray-50 ">
                <div className=" mx-auto max-w-screen-xl sm:max-w-screen-lg lg:mx-auo md:max-w-screen-md lg:max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 shadow-lg bg-white rounded-md  ">
                    <div className="flex rounded-lg mr-4 ">
                        <div className="hidden md:block">
                            <img src={freecv} className='w-full' />
                        </div>

                    </div>
                    <div className="space-y-4">
                        <form onSubmit={handleSubmit}>
                            {/* Step 1 */}
                            {currentStep === 1 && (
                                <div>
                                    <h2 className='font-bold text-4xl '>Personal Details</h2>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                    />
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone No."
                                        className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                    />
                                    <textarea
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Your Address"
                                        className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                    />
                                    <input
                                        type="text"
                                        name="linkedinUrl"
                                        value={formData.linkedinUrl}
                                        onChange={handleChange}
                                        placeholder="Linkedin URL"
                                        className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                    />
                                    <textarea
                                        type="text"
                                        name="summary"
                                        value={formData.summary}
                                        onChange={handleChange}
                                        placeholder="Your summary"
                                        className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                    />



                                    <button type="button" onClick={nextStep} className="mt-4 bg-teal-900 text-white px-4 py-2 rounded-md float-right">Next</button>
                                </div>
                            )}



                            {/* Step 2 */}
                            {currentStep === 2 && (
                                <div>
                                    <h2 className='font-bold text-4xl mb-2'>Educational Details</h2>

                                    <div className="sm:col-span-2">

                                        <div>

                                            {
                                                substep === 1 && (
                                                    <div>
                                                        <h1>Graduation Details</h1>

                                                        <input
                                                            type="text"
                                                            placeholder="Enter Degree/ Feild Of Study"
                                                            className="border border-1 rounded-md px-3 py-2 mt-2 w-full "
                                                            value={formData.graduation.degree_name}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "graduation",
                                                                    "degree_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                        <input
                                                            type="text"
                                                            placeholder="Graduation year"
                                                            className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                                            value={formData.graduation.graduation_year}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "graduation",
                                                                    "graduation_year",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="University Name"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.graduation.university_name}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "graduation",
                                                                    "university_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="University city"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.graduation.university_city}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "graduation",
                                                                    "university_city",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                    </div>
                                                )}
                                            {
                                                substep === 2 && (

                                                    <div>
                                                        {/*  12th details */}
                                                        <h1>12th Details</h1>


                                                        <input
                                                            type="text"
                                                            placeholder="Twelfth Year"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.twelfth.twelfth_year}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "twelfth",
                                                                    "twelfth_year",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Twelfth School Name"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.twelfth.twelfth_school_name}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "twelfth",
                                                                    "twelfth_school_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Twelfth School City"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.twelfth.twelfth_school_city}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "twelfth",
                                                                    "twelfth_school_city",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Twelfth Board Name"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.twelfth.twelfth_board_name}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "twelfth",
                                                                    "twelfth_board_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                )}

                                            {
                                                substep === 3 && (

                                                    <div>
                                                        <h1>10th Details</h1>


                                                        <input
                                                            type="text"
                                                            placeholder="Tenth Year"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.tenth.tenth_year}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "tenth",
                                                                    "tenth_year",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Tenth School Name"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.tenth.tenth_school_name}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "tenth",
                                                                    "tenth_school_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Tenth School City"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.tenth.tenth_school_city}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "tenth",
                                                                    "tenth_school_city",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Tenth Board Name"
                                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                                            value={formData.tenth.tenth_board_name}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "tenth",
                                                                    "tenth_board_name",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                    </div>



                                                )}

                                            <div className="mt-4 flex justify-between">
                                                {substep === 1 && (
                                                    <div className="mt-4 flex justify-between w-full">
                                                        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                                                        <button type="button" onClick={nextSubStep} className="bg-teal-900 text-white px-4 py-2 rounded-md">Next</button>
                                                    </div>
                                                    // <button type="button" onClick={prevSubStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                                                )}
                                                {substep > 1 && substep < 3 && (
                                                    <div className="mt-4 flex justify-between w-full">
                                                        <button type="button" onClick={prevSubStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                                                        <button type="button" onClick={nextSubStep} className="bg-teal-900 text-white px-4 py-2 rounded-md">Next</button>
                                                    </div>
                                                )}
                                                {/* If all sub-steps are completed, show the main navigation */}
                                                {substep === 3 && (
                                                    <div className="mt-4 flex justify-between w-full">
                                                        <button type="button" onClick={prevSubStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                                                        <button type="button" onClick={nextStep} className="bg-teal-900 text-white px-4 py-2 rounded-md">Next</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3 */}
                            {currentStep === 3 && (
                                <div>
                                    <h2 className='font-bold text-4xl mb-2'>Professional Experience</h2>
                                    <div className="sm:col-span-2">

                                        <input
                                            type="text"
                                            placeholder="Designation"
                                            className="border border-1 rounded-md px-3 py-2 mt-2 w-full "
                                            value={formData.experience.designation}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    "designation",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Start Month"
                                            className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                            value={formData.experience.start_month}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    "start_month",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Start Year"
                                            className="border border-1 rounded-md px-3 py-2 mt-2 w-full"
                                            value={formData.experience.start_year}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    "start_year",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="End Month"
                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                            value={formData.experience.end_month}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    "end_month",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <input
                                            type="text"
                                            placeholder="End Year"
                                            className=" border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                            value={formData.experience.end_year}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    "end_year",
                                                    e.target.value
                                                )
                                            }
                                        />


                                        <input
                                            type="text"
                                            value={formData.experience.company}
                                            placeholder="Company Name"
                                            className="border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    "company",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <input
                                            type="text"
                                            value={formData.experience.company_city}
                                            placeholder="Company City"
                                            className="border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    "company_city",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <textarea
                                            type="text"
                                            value={formData.experience.work_description}
                                            placeholder="Work Discription"
                                            className="border border-1 rounded-md px-3 py-2 mt-2 w-full mb-2"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    "work_description",
                                                    e.target.value
                                                )
                                            }
                                        />


                                    </div>
                                    <button className='p-2 bg-teal-900 rounded-md text-white' onClick={() => {
                                        setShowPopup(true);
                                    }}>Add Experience</button>
                                    <div className="mt-4 flex justify-between">
                                        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                                        <button type="button" onClick={nextStep} className="bg-teal-900 text-white px-4 py-2 rounded-md">Next</button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className=' mx-auto w-full p-4'>
                                    <h2 className='font-bold text-4xl'>Skills</h2>
                                    <div className='w-80 bg-blue-900 h-0.5 mb-2 invisible'></div>
                                    <div className="sm:col-span-2 ">
                                        <h1>Tech Skills</h1>

                                        {formData.tech_skills.map((skill, index) => (
                                            <div key={index}>
                                                <input
                                                    type="text"
                                                    className="w-3/4 rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 my-1"
                                                    value={skill}
                                                    placeholder="Enter skill"
                                                    onChange={(e) =>
                                                        handleTechSkillInputChange(index, e.target.value)
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="bg-red-400 p-2 text-gray-100 p-4 mx-4 rounded-md"
                                                    onClick={() => handleRemoveItem("tech_skills", index)}
                                                >
                                                    <svg class="h-3 w-3 text-slate-50" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => handleAddItem("tech_skills")}
                                            className="p-2 my-2 bg-teal-900 rounded w-full text-gray-100"
                                        >
                                            Add Tech Skills
                                        </button>

                                        <h1>Soft Skills</h1>
                                        {formData.soft_skills.map((skill, index) => (
                                            <div key={index}>
                                                <input
                                                    type="text"
                                                    className="w-3/4 rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 my-1"
                                                    value={skill}
                                                    placeholder="Enter skill"
                                                    onChange={(e) =>
                                                        handleSoftSkillInputChange(index, e.target.value)
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="bg-red-400 p-2 text-gray-100 p-4 mx-4 rounded-md"
                                                    onClick={() => handleRemoveItem("soft_skills", index)}
                                                >
                                                    <svg class="h-3 w-3 text-slate-50" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => handleAddItem("soft_skills")}
                                            className="p-2 my-2 bg-teal-900 rounded text-gray-100 w-full"
                                        >
                                            Add Soft Skills
                                        </button>
                                    </div>
                                    <div className="mt-20 flex justify-between">
                                        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
                                    </div>

                                    <button type='submit' className='bg-teal-900 hover:bg-teal-900 text-white uppercase px-4 py-2  flex justify-center mt-2 cursor-pointer w-full rounded-md '>
                                        {showLoader ? (
                                            <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        ) : (
                                            <span class="relative z-10">Download Your Free CV </span>
                                        )}
                                    </button>
                                </div>

                            )}


                        </form>
                        {showPopup ? (
                            <div
                                className={`fixed inset-0 flex items-center justify-center ${showPopup ? "visible" : "hidden"
                                    }`}
                            >
                                <section className="rounded-3xl shadow-xl bg-white w-1/2 sm:w-1/2  lg:w-1/4 md:w-1/2">
                                    <div className="p-2 lg:p-2 md:p-12 text-center sm:p-12">
                                        <h2 className="mt-6 text-sm lg:text-md md:sm sm:text-sm font-bold">
                                            You can add only one experience in free version. Contact expert at  <span className="text-blue-950 underline uppercase"> CV-Genie</span>
                                        </h2>
                                        <div className="flex justify-center align-center ">

                                            <button
                                                className="mt-8 inline-block w-full rounded-full bg-red-500 py-4 text-sm font-bold text-white shadow-xl mb-2"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </button>

                                        </div>

                                    </div>
                                </section>
                            </div>
                        ) : (
                            ""
                        )}
                        {error && (
                            <div className="flex items-center justify-center bg-red-300 p-4 rounded-md">
                                <p className="text-center text-sm text-red-500">{error}</p>
                            </div>
                        )}
                    </div>

                </div>


            </div>
            <Footer />
        </div>
    )
}

export default FreeCv