import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PortfolioForm from './PortFolioComponent/PortfolioForm';
import PortFolioTemp1 from './PortFolioTemp1';

const Portfolio = () => {
  const [formData, setFormData] = useState({});

  return (
    <>
     
      <Routes>
        <Route
          path="/"
          element={<PortfolioForm setFormData={setFormData} />}
        />
        <Route
          path="web-preview"
          element={<PortFolioTemp1 formData={formData} />}
        />
      </Routes>
    </>
  );
};

export default Portfolio;
