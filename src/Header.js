import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{ padding: '10px', background: '#282c34', color: 'white' }}>
            <h1>My App</h1>
            <nav>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Home</Link>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
            </nav>
        </header>
    );
};

export default Header;