import React, { useState } from 'react'
import Navbar from '../Commancomponents/Navbar';
import Footer from '../Commancomponents/Footer';

const Checkout = () => {

    const [searchEmail, setSearchEmail] = useState('');
    const [personDetails, setPersonDetails] = useState(null);

    // Sample data array of objects
    const data = [
        {
            name: 'Zoya',
            email: 'zoya@gmail.com',
            phone: '1234567890',
            ispaid: 4000
        },
        {
            name: 'saniya',
            email: 'saniya@gmail.com',
            phone: '0987654321',
            ispaid: 5000
        },

        {
            name: 'zara',
            email: 'zara@gmail.com',
            phone: '1234567890',
            ispaid: 700
        },
        {
            name: 'haya',
            email: 'hya@gmail.com',
            phone: '0987654321',
            ispaid: 800
        }
    ];

    const handleSearch = () => {
        const foundPerson = data.find(person => person.email === searchEmail);
        setPersonDetails(foundPerson);
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
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-teal-900 text-white rounded-r-md hover:bg-teal-800 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                {personDetails && (
                    <div className=" rounded-md  mx-auto text-gray-800 bg-gray-50 border w-fit">
                        <div className='pl-4 pr-24 text-xl py-4 mt-2'>
                        <p><span className="font-semibold mb-1">Name :</span> {personDetails.name}</p>
                        <p><span className="font-semibold mb-1">Email :</span> {personDetails.email}</p>
                        <p><span className="font-semibold mb-1">Phone :</span> {personDetails.phone}</p>
                        <p><span className="font-semibold mb-1">Total Amount :</span> {personDetails.ispaid}</p>
                        </div>
                        <button className='bg-teal-800 hover:bg-teal-900 text-gray-100 w-full !px-0 mt-4 p-4 '>Pay Now {personDetails.ispaid}</button>
                    </div>
                )}
            </div>

            <Footer/>
        </div>
    )
}

export default Checkout