import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/Home.jsx';
import WikiPage from './components/PageItem.jsx';
import Searchbar from "./components/Searchbar.jsx";
import Root from "./routers/Root.tsx";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://minecraft-ids.grahamedgecombe.com/items.json');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Navigate to={"/home"} replace />
        },
        {
          path: "home",
          element: <HomePage />
        },
        {
          path: "search",
          element: <Searchbar items={items} />
        },
        ...items.map((item) => ({
          path: `/${item.name?.toLowerCase()}`,
          element: <WikiPage item={item.name} />
        }))
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
