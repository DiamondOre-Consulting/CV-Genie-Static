import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PortFolioTemp1 from './PortFolioTemp1';
import PortFolioTemp2 from './PortFolioTemp2';

const MainPortfolio = () => {
  const { uniqueUserName, portfolioId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        console.log('Fetching data for:', uniqueUserName);
        const response = await fetch(`https://cv-genie-static-backend.onrender.com/api/admin/portfolio/${uniqueUserName}`);
        const data = await response.json();

        if (response.ok) {
          console.log('Fetched data:', data);
          setPortfolioData(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [uniqueUserName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const backgroundColor = portfolioData.bgColor || '#000000';

  return (
    <>
      {portfolioId === '1' ? (
        <PortFolioTemp1 portfolioData={portfolioData} backgroundColor={backgroundColor} />
      ) : portfolioId === '2' ? (
        <PortFolioTemp2 portfolioData={portfolioData} backgroundColor={backgroundColor} />
      ) : (
        <div>Invalid portfolio ID</div>
      )}
    </>
  );
};

export default MainPortfolio;
