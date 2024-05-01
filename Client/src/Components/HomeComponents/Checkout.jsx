import React, { useEffect, useState } from 'react'
import Navbar from '../Commancomponents/Navbar';
import Footer from '../Commancomponents/Footer';
import axios from "axios";

const Checkout = () => {

    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    // const [form, setForm] = useState({name: '', number: ''});
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://cv-genie-static-backend.onrender.com/api/client/payment', {
            name: name,
            number: number,
            amount: amount
        })
        .then(response => {
            window.location.href = response.data
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleSearch = async () => {
        try {
            const response = await axios.post(`https://cv-genie-static-backend.onrender.com/api/client/my-profile`, {email}
            );
            if (response.status === 200) {
                console.log(response.data);
                setProfile(response.data);
                setName(response.data.name);
                setNumber(response.data.phone);
                setAmount(response.data.amount);
                setError(""); // Clear any previous error
            } else {
                setError("No data found"); // Set error message if response or data is empty
                // setProfile(null);
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message || "An error occurred"); // Use custom error message if available
            // setProfile(null);
        }
    };

    return (
        <div className='bg-green-50'>
        <Navbar/>
            <div className="container mx-auto min-h-screen  py-8">
                <h1 className="text-3xl text-center font-bold mb-4">CHECK OUT</h1>
                <div className="flex justify-center items-center  mb-4">
                    <input
                        type="text"
                        placeholder="Search by Email"
                        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-teal-900 text-white rounded-r-md hover:bg-teal-800 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                {error && <p>{error}</p>}
                {profile && (
                    <div className=" rounded-md  mx-auto text-gray-800 bg-gray-50 border w-fit">
                        <div className='pl-4 pr-24 text-xl py-4 mt-2'>
                        <p><span className="font-semibold mb-1">Name :</span> {profile.name}</p>
                        <p><span className="font-semibold mb-1">Email :</span> {profile.email}</p>
                        <p><span className="font-semibold mb-1">Phone :</span> {profile.phone}</p>
                        <p><span className="font-semibold mb-1">Total Amount :</span> {profile.amount}</p>
                        
                        </div>
                        {profile.ispaid ? (
                            <button className='bg-green-600 hover:bg-green-700 text-gray-100 w-full !px-0 mt-4 p-4'>
                                Paid
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className='bg-red-600 hover:bg-red-700 text-gray-100 w-full !px-0 mt-4 p-4' >
                                Pay Now {profile.amount}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <Footer/>
        </div>
    )
}

export default Checkout