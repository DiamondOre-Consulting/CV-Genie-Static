import React from 'react';
import { Link } from 'react-router-dom';

const ResumeServices = () => {
    return (
        <div className='px-2 md:px-10 mt-20 mb-20'>

            <div className='flex md:flex-row flex-col justify-center items-center'>

                <div className='md:w-1/2 text-center'>
                    <h1 className='text-2xl md:text-3xl mb-4 font-semibold text-teal-900'>CREATE YOUR FREE CV</h1>
                    <ul className='list-disc list-inside text-left inline-block'>
                        <li className='flex items-center mb-2'>
                            <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>
                            Free of cost
                        </li>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg> Good for freshers</li>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>Limited experience can be added</li>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>Basic design templates</li>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>Easy to use interface</li>
                        <li className='flex items-center mb-8'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>Download in PDF format</li>

                    </ul>
                    <br></br>
                    <Link to={'/free-cv'} className='bg-teal-900 py-2 px-10 rounded-md text-white -ml-20 '>Create Free CV</Link>
                </div>

                <div className='w-1 h-48 bg-teal-900 mx-4 md:block  hidden'></div>

                <div className='md:w-1/2 md:pl-20 md:mt-0 mt-10'>
                    <h1 className='text-2xl md:text-3xl mb-4 font-semibold text-teal-900'>CREATE YOUR PREMIUM CV</h1>
                    <ul className='list-disc list-inside text-left inline-block'>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>Paid service</li>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>Professional design templates</li>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>ATS Optimized CV</li>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>Guaranteed Satisfaction</li>
                        <li className='flex items-center mb-2'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>Keyword Optimization</li>
                        <li className='flex items-center mb-10'>  <svg class="h-4 w-4 text-teal-900 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>24/7 Customer Support</li>
                    </ul>
                    <br></br>
                    <a  href = "#contact" className='bg-teal-900 py-2 px-10 rounded-md text-white '>Create Professional CV</a>
                </div>

            </div>

        </div>
    );
}

export default ResumeServices;
