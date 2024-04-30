import React, { useState } from 'react'
import Navbar from '../Commancomponents/Navbar'
import Footer from '../Commancomponents/Footer'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const navigate = useNavigate()
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://cv-genie-static-backend.onrender.com/api/admin/login",
                {
                    userName,
                    password
                });

            if (response.status === 200) {
                const token = response.data.token;

                console.log(token)
                localStorage.setItem("token", token);
                console.log("Logged in successfully as Admin");
                navigate("/admin-form");

            } else {
                console.log("Login failed");
                setError("Login Details Are Wrong!!");
                alert("invalid username and password")
                // Handle login error
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    console.log("invalid user");

                }

                else {
                    console.error("Error adding Student:", status);

                }
            }
        }
    }





    return (
        <div className='bg-green-50'>
            <Navbar />

            <div class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Admin login</h1>
                    <form action="#" onSubmit={handleAdminLogin}>
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">User Name</label>
                            <input type="text" id="name" value={userName} onChange={(e) => setUsername(e.target.value)} class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your User Name" required />
                        </div>
                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                            <a href="#"
                                class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                                Password?</a>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <input type="checkbox" id="remember" class="h-4 w-4 rounded border-gray-300 text-teal-900 focus:ring-indigo-500 focus:outline-none" checked />
                                <label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                            </div>

                        </div>
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-900 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900">Login</button>
                    </form>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default AdminLogin