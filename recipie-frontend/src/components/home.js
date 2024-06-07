// src/components/Homepage.js
import React, { useState,useEffect } from 'react';
import FeaturedRecipies from './FeaturedRecipies';
import shahiPaneer from "../components/assets/shahiPaneer.jpg"
import choleMasale from "../components/assets/choleMasale.webp"
import dalMakhni from "../components/assets/dalMakhni.jpg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate= useNavigate();
  const [recipes, setRecipes] = useState([]);
  let tempRecipes=[];

 
  useEffect(() => {
    // Fetch recipes data from the backend API
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/recipie/getAllRecipies');
        console.log(response.data);
        for(let i=0;i<3;i++){
          console.log(tempRecipes)
          tempRecipes.push(response.data.data[i]);
          console.log(tempRecipes)

        }
        setRecipes(tempRecipes); // only three
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Fetch recipes only once on component mount
  const handleExplore=()=>{
    navigate("/feed")
  }
  return (
    <div className="bg-gray-100">
      {/* Hero section */}
      <div className="bg-blue-500 text-white py-24 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Recipe App</h1>
        <p className="text-xl">Discover delicious recipes and unleash your culinary creativity</p>
      </div>

      {/* Featured recipes section */}
      <div className="container mx-auto py-16 px-10">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Recipes</h2>
        {/* Add your featured recipes here */}
        <FeaturedRecipies recipes={recipes} />
      </div>

      {/* Call-to-action section */}
      <div className="bg-blue-500 py-16 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">Ready to get cooking?</h2>
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100" onClick={handleExplore}>
          Explore Recipes
        </button>
      </div>
    </div>
  );
};

export default Home;

