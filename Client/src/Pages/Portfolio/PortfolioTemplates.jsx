import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioTemplates = ({ setSelectedTemplateId }) => {
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId); // Update selected template ID state
    // Redirect to portfolio form with selected template ID
  };

  return (
    <div>
      {/* Display templates and allow selection */}
      <Link to={`/admin/portfolio-form/1`} onClick={() => handleTemplateSelect(1)}>Template 1</Link>
      <Link to={`/admin/portfolio-form/2`} onClick={() => handleTemplateSelect(2)}>Template 2</Link>
      {/* Add more templates as needed */}
    </div>
  );
};

export default PortfolioTemplates;
