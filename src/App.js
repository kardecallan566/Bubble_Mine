import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import HomePage from './components/Home.jsx';
import WikiPage from './components/PageItem.jsx';
import Search from "./components/Searchbar.jsx";
import SearchResultsPage from './components/SearchResultsPage.jsx'; 
import Root from "./routers/Root.tsx";

const App = () => {
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
          path: "search/",
          element: <Search />
        },
        {
          path: "item/:itemName",
          element: <WikiPage />
        },
        {
          path: "search/:query",
          element: <SearchResultsPage />
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
