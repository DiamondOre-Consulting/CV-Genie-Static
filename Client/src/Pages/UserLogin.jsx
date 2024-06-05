import React from 'react'
import Footer from '../Components/Commancomponents/Footer'
import Navbar from '../Components/Commancomponents/Navbar'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    return (
        <>
            <Navbar/>
            <div className='min-h-screen flex flex-col justify-center'>
            <div
                class="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div class="w-full">
                    <div class="text-center">
                        <h1 class="text-3xl font-semibold text-gray-900">Sign in</h1>
                        <p class="mt-2 text-gray-500">Sign in below to access your account</p>
                    </div>
                    <div class="mt-5">
                        <form action="">
                            <div class="relative mt-6">
                                <input type="email" name="email" id="email" placeholder="Email Address" class="peer mt-1 w-full border-b-2 border-gray-400 px-2 py-2 rounded-md  focus:outline-none" autocomplete="NA" />
                               
                            </div>
                            <div class="relative mt-6">
                                <input type="password" name="password" id="password" placeholder="Password" class="peer peer mt-1 w-full border-b-2 border-gray-400 px-2 py-2 rounded-md  focus:outline-none" />
                                
                            </div>
                            <div class="my-6">
                                <button type="submit" class="w-full rounded-md bg-teal-900 px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign in</button>
                            </div>
                            <p class="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                                <Link to={'/user-signup'}
                                    class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none ml-1">Sign
                                    up
                                </Link>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </>
    )
}

export default UserLogin