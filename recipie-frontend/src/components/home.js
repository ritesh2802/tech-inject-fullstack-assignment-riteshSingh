// src/components/Homepage.js
import React from 'react';
import FeaturedRecipies from './FeaturedRecipies';
import shahiPaneer from "../components/assets/shahiPaneer.jpg"
import choleMasale from "../components/assets/choleMasale.webp"
import dalMakhni from "../components/assets/dalMakhni.jpg"

const Home = () => {
  const featuredRecipes = [
    { _id: 1, name: 'Chole Masale', category: 'Indian', image: choleMasale },
    { _id: 2, name: ' Shahi Paneer Masala', category: 'Indian', image: shahiPaneer },
    { _id: 3, name: 'Daal Makhni', category: 'Indian', image: dalMakhni },
  ];
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
        <FeaturedRecipies recipes={featuredRecipes} />
      </div>

      {/* Call-to-action section */}
      <div className="bg-blue-500 py-16 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">Ready to get cooking?</h2>
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100">
          Explore Recipes
        </button>
      </div>
    </div>
  );
};

export default Home;

