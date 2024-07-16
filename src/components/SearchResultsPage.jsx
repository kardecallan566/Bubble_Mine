import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SearchResultsPage = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const apiUrl = 'https://minecraft-ids.grahamedgecombe.com/items.json';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredResults = data.filter(item =>
          item.name && item.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  const toTitleCase = (str) => {
    if (str.includes(' ')) {
      const parts = str.split(' ');
      const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
      const joinedString = capitalizedParts.join('_');
      return joinedString;
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <ul>
        {searchResults.map((item, index) => (
          <li key={index}>
            <Link to={`/item/${toTitleCase(item.name)}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
