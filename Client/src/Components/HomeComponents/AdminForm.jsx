import React from 'react'
import Navbar from '../Commancomponents/Navbar'
import Footer from '../Commancomponents/Footer'

const AdminForm = () => {
    return (
        <div className=''>
            <Navbar />
            <div className='grid  grid-cols-1 md:grid-cols-2 gap-4'>

                <div className=''>

                    <div class=" my-4 md:my-0 md:min-h-screen flex items-center justify-center ">
                        <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                            <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Add Details</h1>
                            <form action="#" className='w-full'>
                                <div class="mb-4">
                                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                    <input type="text" id="name" class=" w-full shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Name" required />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                    <input type="email" id="email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Email" required />
                                </div>
                                <div class="mb-4">
                                    <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                                    <input type="text" id="name" class=" w-full shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Phone No" required />
                                </div>

                                <div class="mb-4">
                                    <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Amount</label>
                                    <input type="text" id="name" class=" w-full shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Total Amount" required />
                                </div>

                                <button type="submit" class=" w-80 md:w-96 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-900 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900">Add Details</button>
                            </form>
                        </div>
                    </div>

                </div>

                <div>

            
                    <div class=" my-4 md:my-20  flex items-center justify-center w-full dark:bg-gray-950">

                        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Clients</h3>
                                
                            </div>
                            <div class="flow-root">
                                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                  
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-shrink-0">
                                                <img class="w-16 h-16 rounded-full" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="Bonnie image"/>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Bonnie Green
                                                </p>
                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    +914854855
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center  text-base font-semibold text-green-500 dark:text-white">
                                                Paid
                                            </div>
                                        </div>
                                    </li>
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-shrink-0">
                                                <img class="w-16 h-16 rounded-full" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="Bonnie image"/>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Bonnie Green
                                                </p>
                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    +914854855
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center  text-base font-semibold text-red-500 dark:text-white">
                                                Pending
                                            </div>
                                        </div>
                                    </li>
                                   
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