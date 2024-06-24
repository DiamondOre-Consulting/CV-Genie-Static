import React, { useEffect, useState } from 'react'
import Footer from '../Commancomponents/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import AdminNavbar from './AdminNavbar';

const AdminForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [allClients, setAllClients] = useState([]);
    const [editProfilePopup, setEditProfilePopup] = useState(false);
    const [currentClient, setCurrentClient] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const token = localStorage.getItem("token")
    console.log(token)

    const fetchAllClients = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                navigate("/admin-login");
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
        setShowLoader(true)
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                navigate("/admin-login");
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
                setShowLoader(false)
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
                navigate("/admin-login");
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


    //  Edit Profile 

    const handleEditProfile = (client) => {
        setCurrentClient(client);
        console.log("current Client", currentClient._id)
        setName(client.name);
        setEmail(client.email);
        setPhone(client.phone);
        setAmount(client.amount);
        setEditProfilePopup(true);
    };

    const handleUpdateClient = async () => {
        try {
            if (!token) {
                console.error("No token found");
                navigate("/admin-login");
                return;
            }
            const response = await axios.put(
                `https://cv-genie-static-backend.onrender.com/api/admin/edit-account/${currentClient._id}`,
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
                console.log("Updated Successfully");
                setEditProfilePopup(false);
                setCurrentClient(null);
                fetchAllClients();
            } else {
                console.log("Error in updating");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeletePopup = () => {

        setEditProfilePopup(false)
        setDeletePopup(true)
    }

    const handleDeleteClient = async () => {
        try {
            if (!token) {
                console.error("No token found");
                navigate("/admin-login");
                return;
            }
            const response = await axios.delete(
                `https://cv-genie-static-backend.onrender.com/api/admin/delete-account/${currentClient._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response:", response.data);
            if (response.status === 200) {
                console.log("Deleted Successfully");
                setEditProfilePopup(false);
                setDeletePopup(false)
                setCurrentClient(null);
                fetchAllClients();
            } else {
                console.log("Error in deleting");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div>
            <AdminNavbar />
            <Link to='/admin/portfolio-form' className='mt-4 bg-teal-900 text-white rounded-md float-right mx-10 py-4 px-4'>Create Portfolio</Link>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-28 md:mt-40 mb-20 px-8 md:px-20'>
                <div>
                    <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-lg">
                        <h1 className="text-2xl font-bold text-center mb-4">Add Details</h1>
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="w-full shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Name" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Email" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" className="w-full shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Phone No" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} id="amount" className="w-full shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Total Amount" required />
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-900 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900">
                                {showLoader ? (
                                    <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                ) : (
                                    <span class="relative z-10">Add Details</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                <div>
                    <div className="w-full max-w-2xl bg-white rounded-lg border shadow-md p-4 sm:p-8 h-[480px] overflow-y-auto md:mt-0 mt-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold leading-none text-gray-900">Latest Clients</h3>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200">
                                {allClients.map((client) => (
                                    <li key={client._id} className="py-3 sm:py-4">
                                        <div className="items-center space-x-4 md:flex sm:flex">
                                            <div className="flex-shrink-0">
                                                <img className="w-16 h-16 rounded-full" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="Client" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{client.name}</p>
                                                <p className="text-sm text-gray-500 truncate">{client.email}</p>
                                                <p className="text-sm text-gray-500 truncate">{client.phone}</p>
                                                <p className="text-red-600 cursor-pointer text-sm bg-red-200 rounded-md w-fit px-4 py-1 my-2" onClick={() => handleEditProfile(client)}>Edit Profile</p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-green-500">
                                                {client.paid ? "Paid" : "Pending"}
                                            </div>
                                            {/* <div>
                                                <p className="text-red-600 cursor-pointer text-sm bg-red-200 rounded-full px-4 py-1">Edit</p>
                                            </div> */}
                                            <div className="float-right text-sm">
                                                <select onChange={(e) => handlePaidStatusChange(client._id, e.target.value)} className="shadow-sm rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                                    <option>Select</option>
                                                    <option value={true}>Paid</option>
                                                    <option value={false}>Pending</option>
                                                </select>
                                            </div>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {editProfilePopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4'>
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full  md:w-1/3">
                        <svg class="h-6 w-6 float-right -mt-4 -mr-4 text-red-300 cursor-pointer hover:bg-gray-100" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" onClick={() => { setEditProfilePopup(false) }} /></svg>
                        <h2 className="text-2xl font-bold mb-4">Edit Client Profile</h2>
                        <div className="mb-4">
                            <label htmlFor="editName" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="editName" className="w-full shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="editEmail" className="w-full shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editPhone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} id="editPhone" className="w-full shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editAmount" className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} id="editAmount" className="w-full shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="flex flex-col justify-between">
                            <button onClick={handleUpdateClient} className="bg-teal-900 text-white py-2 px-4 rounded-md">Update Details</button>
                            <button onClick={handleDeletePopup} className="bg-red-600 text-white py-2 px-4 rounded-md mt-1">Delete Profile</button>
                        </div>
                    </div>
                </div>
            )}



            {
                deletePopup && (

                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4'>

                        <div class="mx-auto shadow-xl rounded-md bg-white max-w-md">

                            <div class="flex justify-end p-2">
                                <button onClick={() => setDeletePopup(false)} type="button"
                                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>

                            <div class="p-6 pt-0 text-center">
                                <svg class="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this Client?</h3>
                                <a href="#" onClick={handleDeleteClient}
                                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </a>
                                <a href="#" onClick={() => { setDeletePopup(false)  }}
                                    class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                                    data-modal-toggle="delete-user-modal">
                                    No, cancel
                                </a>
                            </div>

                        </div>

                    </div>
                )
            }
        </div>



    )
}

export default AdminForm;
