import React from 'react';
import eshopLogo from '../../images/estudo-de-caso-lpe.png';

const Home = () => {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
  
    return (
      <div style={containerStyle}>
        <h1>eShop - LPE</h1>
        <img src={eshopLogo} alt="eShop Logo" />
      </div>
    );
  };

export default Home;
