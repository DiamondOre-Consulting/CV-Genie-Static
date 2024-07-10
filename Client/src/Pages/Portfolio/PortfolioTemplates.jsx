import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../Components/AdminComponent/AdminNavbar';
import Footer from '../..//Components/Commancomponents/Footer'


const PortfolioTemplates = ({ setSelectedTemplateId }) => {
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId); // Update selected template ID state
    // Redirect to portfolio form with selected template ID
  };

  return (
    <div>
      <AdminNavbar/>
      <div className='h-screen'>

     
    <div className='grid grid-cols-4 px-20 mt-10 gap-10 '>
      {/* Display templates and allow selection */}
      <Link to={`/admin/portfolio-form/1`} onClick={() => handleTemplateSelect(1)} className='border rounded-md border-1 h-96 bg-orange-300 text-gray-100 text-2xl font-bold flex items-center text-center justify-center'>Template 1</Link>
      <Link to={`/admin/portfolio-form/2`} onClick={() => handleTemplateSelect(2)} className='border border-1 rounded-md h-96 bg-green-300  text-2xl text-gray-100 font-bold flex items-center text-center justify-center'>Template 2</Link>
      {/* Add more templates as needed */}
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PortfolioTemplates;
