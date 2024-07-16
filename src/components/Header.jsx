// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from "./Searchbar";

const Header = () => {

  return (
    <header style={styles.header}>
      <Link to="/"><div style={styles.logo}>Logo</div></Link>
      <SearchComponent />
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/">Home</Link></li>
          <li style={styles.navItem}><Link to="/esmerald">Wiki</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
};

export default Header;
