import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
    navigate('/searchRecipies');
  };

 

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">MyRecipes</div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              className="border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search recipes..."
            />
            <button type="submit" className="hidden">Search</button>
          </form>
          <Link to={'/savedRecipies'} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            My Saved Recipes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
