import React from 'react';
import '../styles/PowerButton.css';

const PowerButton = ({icon, alt, ev}) => {
    return (
        <img className="power-button" src={icon} alt={alt} onClick={ev} />
    );
}

export default PowerButton;
