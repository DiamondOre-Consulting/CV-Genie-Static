import React from 'react';
import { useParams } from 'react-router-dom';
import PortFolioTemp1 from './PortFolioTemp1';
import PortFolioTemp2 from './PortFolioTemp2';

const MainPortfolio = () => {
  const { uniqueUserName, portfolioId } = useParams();
  
  return (
    <>
      {portfolioId === '1' ? (
        <PortFolioTemp1 uniqueUserName={uniqueUserName} />
      ) : portfolioId === '2' ? (
        <PortFolioTemp2 uniqueUserName={uniqueUserName} />
      ) : (
        <div>Invalid portfolio ID</div>
      )}
    </>
  );
};

export default MainPortfolio;
