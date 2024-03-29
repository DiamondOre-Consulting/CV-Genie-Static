import React from 'react'
import Navbar from '../../Components/Commancomponents/Navbar'
import Hero from '../../Components/HomeComponents/Hero'
import Services from '../../Components/HomeComponents/Services'
import Templates from '../../Components/HomeComponents/Templates'
import Features from '../../Components/HomeComponents/Features'
import Howitworks from '../../Components/HomeComponents/Howitworks'
import Contactus from '../../Components/HomeComponents/Contactus'
import Testimonials from '../../Components/HomeComponents/Testimonials'
import Footer from '../../Components/Commancomponents/Footer'


const MainHome = () => {
  return (
    <>
    <div className='bg-green-50' >
        <Navbar/>
        <Hero/>
        <Services/>
        <Templates/>
        <Features/>
        <Howitworks/>
        <Testimonials/>
        <Contactus/>
        <Footer/>
    
    </div>
   
    </>
  )
}

export default MainHome