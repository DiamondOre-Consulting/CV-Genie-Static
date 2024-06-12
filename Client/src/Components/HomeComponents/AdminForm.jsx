import React, { useEffect, useState } from 'react'
import Navbar from '../Commancomponents/Navbar'
import Footer from '../Commancomponents/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const AdminForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [allClients, setAllClients] = useState([]);

    const fetchAllClients = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                navigate("/login");
                return;
            }
            const clientsResponse = await axios.get('https://cv-genie-static-backend.onrender.com/api/admin/all-clients', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (clientsResponse.status === 200) {
                console.log(clientsResponse.data);
                setAllClients(clientsResponse.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllClients();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                navigate("/login");
                return;
            }
            const response = await axios.post(
                "https://cv-genie-static-backend.onrender.com/api/admin/register",
                {
                    name,
                    email,
                    phone,
                    amount
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response:", response.data);
            if (response.status === 200) {
                console.log("Registered Successfully");
                alert("client has been registerd sucessfully");
                setName("");
                setEmail("");
                setPhone("");
                setPhone("");
                setAmount("");
                fetchAllClients();
            } else {
                console.log("Error in registering");
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    console.log("Invalid user");
                } else {
                    console.error("Error adding Client:", status);
                }
            }
        }
    };

    const handlePaidStatusChange = async (id, paid) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                navigate("/login");
                return;
            }
            const response = await axios.put(
                `https://cv-genie-static-backend.onrender.com/api/admin/client/${id}`,
                { paid },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response:", response.data);
            if (response.status === 200) {
                const updatedClients = allClients.map(client => {
                    if (client._id === id) {
                        return { ...client, paid };
                    }
                    return client;
                });
                setAllClients(updatedClients);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className=''>
            <Navbar />
            <Link to= '/portfolio-form' className='mt-4  bg-teal-900 text-white rounded-md float-right mx-10 py-4 px-4'>Create Portfolio</Link>
            <div className='grid  grid-cols-1 md:grid-cols-2 gap-4  mt-20'>
                <div className=''>
                    <div class=" my-4 md:my-0 md:min-h-screen flex items-center justify-center ">
                        <div class="bg-white  shadow-md rounded-lg px-8 py-6 max-w-md">
                            <h1 class="text-2xl font-bold text-center mb-4 ">Add Details</h1>
                            <form action="#" className='w-full' onSubmit={handleRegister}>
                                <div class="mb-4">
                                    <label for="name" class="block text-sm font-medium text-gray-700  mb-2">Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" class=" w-full shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Name" required />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700  mb-2">Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Email" required />
                                </div>
                                <div class="mb-4">
                                    <label for="phone" class="block text-sm font-medium text-gray-700  mb-2">Phone</label>
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} id="name" class=" w-full shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Phone No" required />
                                </div>

                                <div class="mb-4">
                                    <label for="phone" class="block text-sm font-medium text-gray-700  mb-2">Total Amount</label>
                                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} id="name" class=" w-full shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Total Amount" required />
                                </div>

                                <button type="submit" class=" w-80 md:w-96 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-900 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900">Add Details</button>
                            </form>
                        </div>
                    </div>

                </div>

                <div>


                    <div class=" my-4 md:my-20  flex items-center justify-center w-full ">

                        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8  ">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-xl font-bold leading-none text-gray-900 ">Latest Clients</h3>

                            </div>
                            <div class="flow-root">
                                <ul role="list" class="divide-y divide-gray-200 ">

                                    {
                                        allClients.map((client) => (
                                            <li key={client._id} class="py-3 sm:py-4">
                                                <div class="flex items-center space-x-4">
                                                    <div class="flex-shrink-0">
                                                        <img class="w-16 h-16 rounded-full" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="Bonnie image" />
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900 truncate ">{client.name}</p>
                                                        <p class="text-sm text-gray-500 truncate ">{client.email}</p>
                                                        <p class="text-sm text-gray-500 truncate ">{client.phone}</p>
                                                    </div>
                                                    <div class="inline-flex items-center text-base font-semibold text-green-500 ">
                                                        {client.paid ? "Paid" : "Pending"}
                                                    </div>
                                                    <div>
                                                        <p className='text-red-600 cursor-pointer text-sm bg-red-200 rounded-full px-4  py-1'>Edit</p>
                                                    </div>

                                                </div>
                                                <div className='float-right text-sm'>
                                                    <select onChange={(e) => handlePaidStatusChange(client._id, e.target.value)}>
                                                        <option>Select</option>
                                                        <option value={true}>Paid</option>
                                                        <option value={false}>Pending</option>
                                                    </select>
                                                </div>
                                            </li>
                                        ))
                                    }




                                </ul>
                            </div>
                        </div>

                    </div>

                </div>

            </div>


            <Footer />
        </div>
    )
}

export default AdminForm