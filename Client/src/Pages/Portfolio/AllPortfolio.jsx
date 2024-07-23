import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../Components/AdminComponent/AdminNavbar'
import Footer from '../../Components/Commancomponents/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AllPortfolio = () => { 

    const [allportfolio, setAllPortfolio] = useState([])

    useEffect(() => {
        const handleGetPortfolios = async () => {
            const token = localStorage.getItem("token")
            try {

                const response = await axios.get("http://localhost:7002/api/admin/all-portfolios",
                    {

                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }
                )

                if (response.status === 200) {
                    console.log("all portfolio", response.data)
                    setAllPortfolio(response.data);
                }

            }

            catch (error) {
                console.log(error)
            }
        }
        handleGetPortfolios();
    }, [])
    return (
        <>
            <AdminNavbar />
            <h1 className='text-center font-semibold text-4xl mt-4'>All Portfolio</h1>
            <div className='bg-teal-900 w-40 h-1 mx-auto  mb-10'></div>
            <div className='grid grid-cols-4 px-20 gap-6 mb-8'>

                {
                    allportfolio.map((portfolio)=>(
                         
                        <Link to={`/edit-portfolio/${portfolio.uniqueUserName}`} className='border px-4 py-2 cursor-pointer bg-gray-50 hover:bg-white border-1 border-black rounded-md'>
                            <p>{portfolio.name}</p>
                            <p>{portfolio.email}</p>
                            <p>+91 {portfolio.phone}</p>
                        </Link>
                            
                    ))

                }
              

            </div>
            <Footer />
        </>
    )
}

export default AllPortfolio