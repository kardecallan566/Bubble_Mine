import React, { useState, useEffect } from 'react';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const apiUrl = 'https://minecraft-ids.grahamedgecombe.com/items.json';


  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowResults(false); 
  };


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const filteredResults = items.filter(item =>
        item.name && item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowResults(true); 
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search items..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {showResults && (
        <ul>
          {searchResults.map((item, index) => (
            <li key={index}><a href='/'>{item.name}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
