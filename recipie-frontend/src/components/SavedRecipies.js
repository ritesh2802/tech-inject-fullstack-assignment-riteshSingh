import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const SavedRecipies = ({query}) => {
  const [recipies, setRecipies] = useState([]);
  const [userId, setUserId] = useState('');
 

  useEffect(()=>{
    const handleFetchSavedRecipies=async()=>{
        try {
          const resp = await axios.get(
            `http://localhost:8000/api/v1/savedRecipie/getSaved`,
            {
              withCredentials: true, // for protected routes
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(resp.data.data);
          setRecipies(resp.data.data)
          console.log(recipies);
        } catch (error) {
          console.log(error);
        }
      }
      handleFetchSavedRecipies();
  },[])


 

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const resp = await axios.get('http://localhost:8000/api/v1/users/getCurrentUser', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(resp.data.data)
        setUserId(resp.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/recipie/deleteRecipie/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        },
        withCredentials: true,
      });
      // fetchRecipes(new URLSearchParams(location.search).get('query')); // Refresh the recipes list
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveRecipe = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/api/v1/savedRecipie/save/${id}`,
        {},
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsaveRecipe = async (id) => {
    try {
     await axios.delete(
        `http://localhost:8000/api/v1/savedRecipie/unsave/${id}`,
      
        {
          withCredentials: true,
          headers: { headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
          }, },
        }
      );
      // console.log(resp)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Saved Recipes</h2>
      {recipies.length > 0 && (
        <div>
          <h3>Saved Results</h3>
          <div className="grid grid-cols-3 gap-6">
          {recipies.map((recipe) => (
            // <div key={recipie.recipie._id} className="bg-gray-100 rounded-md overflow-hidden shadow-md">
            //   <img src={recipie.recipie.recipieImg} alt={recipie.recipie.name} className="w-56 h-56 object-cover" />
            //   <div className="p-4">
            //     <div className="flex items-center mb-4">
            //       <span className="font-semibold text-gray-800">{recipie.user.email}</span>
            //     </div>
            //     <p className="text-gray-700">{recipie.title}</p>
            //     <Link to={`/recipes/${recipie.recipie._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            //       View Recipe
            //     </Link>
               
            //     <button onClick={() => handleUnsaveRecipe(recipie._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            //       UnSave Recipe
            //     </button>
            //   </div>
            // </div>
            <div key={recipe.recipie._id} className="bg-white rounded-md overflow-hidden shadow-md mb-4">
      <img src={recipe.recipie.recipieImg} alt={recipe.recipie.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-800">{recipe.user.email}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.recipie.name}</h3>
        <p className="text-gray-700 mb-4">{recipe.title}</p>
        <div className="flex justify-between items-center">
          <Link to={`/recipes/${recipe.recipie._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            View Recipe
          </Link>
          <button onClick={() => handleUnsaveRecipe(recipe._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Unsave Recipe
          </button>
        </div>
      </div>
    </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedRecipies;
