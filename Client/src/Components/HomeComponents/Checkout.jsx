import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Commancomponents/Navbar';
import Footer from '../Commancomponents/Footer';
import axios from 'axios';
import Typewriter from 'typewriter-effect/dist/core';

const Checkout = () => {
    
    const typeRef = useRef(null);
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    

    const handleSearch = async () => {
        try {
            setShowLoader(true);
            const response = await axios.post('https://cv-genie-static-backend.onrender.com/api/client/my-profile', { email });
            if (response.status === 200) {
                setProfile(response.data);
                console.log(response.data)
                setError("");
            } else {
                setError("No data found");
                setProfile(null);
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message || "An error occurred");
            setProfile(null);
        } finally {
            setShowLoader(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://cv-genie-static-backend.onrender.com/api/client/payment', {
            name: profile.name,
            number: profile.number,
            amount: profile.amount
        })
        .then(response => {
            window.location.href = response.data
        })
        .catch(error => {
            console.log(error);
        })
    }


    useEffect(() => {
        const typewriter = new Typewriter(typeRef.current, {
            loop: true,
            delay: 75,
        });

        typewriter
            .typeString('<span class="text-teal-800">R</span>eady To')
            .pauseFor(500)
            .typeString(' Invest In')
            .pauseFor(500)
            .typeString(' Your ')
            .pauseFor(500)
            .typeString('<span class="text-green-800 underline"> Career</span> !!!')
            .pauseFor(2000)
            .deleteAll()
            .start();

        return () => {
            typewriter.stop();
        };
    }, []);


    return (
        <div className='bg-green-50 min-h-screen flex flex-col'>
            <Navbar />
            <div className="container mx-auto flex-grow py-8">
                <h1 className="text-3xl text-center font-bold mb-4">CHECK OUT</h1>
                <p ref={typeRef} className='text-3xl text-center mb-4'></p>
                <div className="flex justify-center items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by Email"
                        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-teal-900 text-white rounded-r-md hover:bg-teal-800 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {showLoader ? (
                    <div className="flex justify-center items-center">
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                ) : (
                    profile && (
                        <div className="rounded-md mx-auto text-gray-800 bg-gray-50 border w-fit">
                            <div className='pl-4 pr-24 text-xl py-4 mt-2'>
                                <p><span className="font-semibold mb-1">Name :</span> {profile.name}</p>
                                <p><span className="font-semibold mb-1">Email :</span> {profile.email}</p>
                                <p><span className="font-semibold mb-1">Phone :</span> {profile.phone}</p>
                                <p><span className="font-semibold mb-1">Total Amount :</span> {profile.amount}</p>
                            </div>
                            {profile.paid ? (
                                <button className='bg-green-600 hover:bg-green-700 text-gray-100 w-full disable cursor-not-allowed !px-0 mt-4 p-4'>
                                        You Have Already Paid
                                </button>
                            ) : (
                                <button onClick={handleSubmit} className='bg-red-600 hover:bg-red-700 text-gray-100 w-full !px-0 mt-4 p-4'>
                                    Pay Now {profile.amount}
                                </button>
                            )}
                        </div>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Checkout;
