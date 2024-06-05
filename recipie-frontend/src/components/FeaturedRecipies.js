// src/components/FeaturedRecipes.js
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedRecipies = ({ recipes }) => {
  // console.log(typeof JSON.parse(recipes))
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* {recipes.map((recipe) => (
        <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
            <p className="text-gray-600 mb-4">{recipe.category}</p>
            <Link to={`/recipes/${recipe._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              View Recipe
            </Link>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default FeaturedRecipies;
