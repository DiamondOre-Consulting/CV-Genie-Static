import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import Navbar from '../Components/Commancomponents/Navbar'
import Footer from '../Components/Commancomponents/Footer'

const UserSignup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");;

    const handleSignup = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(
                'http://localhost:5001/api/users/signup',
                {
                    name,
                    phone,
                    password
                }
            )

            if (response.status === 200) {

                console.log("signup")
                navigate('/login')


            }

        }
        catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <Navbar/>

    <div className='min-h-screen flex flex-col justify-center'>
            <div
                class="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div class="w-full">
                    <div class="text-center">
                        <h1 class="text-3xl font-semibold text-gray-900">Signup</h1>
                        <p class="mt-2 text-gray-500">Create Your Account</p>
                    </div>
                    <div class="mt-5">
                        <form action="" onSubmit={handleSignup}>

                            <div class="relative mt-6">
                                <input type="text" name="name" id="name" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} class="peer mt-1 w-full border-b-2 border-gray-400 px-2 py-2 rounded-md  focus:outline-none" autocomplete="NA" />
                                
                            </div>

                            <div class="relative mt-4">
                                <input type="text" name="Phone" id="Phone" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} class="peer mt-1 w-full border-b-2 border-gray-400 px-2 py-2 rounded-md  focus:outline-none" autocomplete="NA" />

                            </div>
                            <div class="relative mt-4">
                                <input type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} class="peer peer mt-1 w-full border-b-2 border-gray-400 px-2 py-2 rounded-md  focus:outline-none" />
   
                            </div>
                            <div class="my-6">
                                <button type="submit" class="w-full rounded-md bg-teal-900 px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign up</button>
                            </div>
                            <p class="text-center text-sm text-gray-500">Have an account? 
                                <Link to={'/user-login'}
                                    class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none ml-1">Sign
                                    
                                </Link>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    <Footer/>
    </>
   
  )
}

export default UserSignup