import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/esmerald">Página da Esmeralda</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
