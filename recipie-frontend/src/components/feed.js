import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [userId,setUserId]=useState("");

  useEffect(()=>{
    const getCurrentUser= async()=>{
      
      try {
        const resp = await axios.get(" http://localhost:8000/api/v1/users/getCurrentUser",{
          headers: {   'Content-Type': 'application/json' },
          withCredentials: true,
      });
        console.log(resp.data.data)
        setUserId(resp.data.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getCurrentUser();
  
  })

  useEffect(() => {
    // Fetch recipes data from the backend API
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/recipie/getAllRecipies');
        console.log(response.data);
        setRecipes(response.data.data); // Assuming data structure
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Fetch recipes only once on component mount

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`http://localhost:8000/api/v1/recipie/deleteRecipie/${id}`, {
        withCredentials: true, // For protected routes
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(resp.data);
      setRecipes(recipes.filter((recipe) => recipe._id !== id)); // Update recipes state
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveRecipe = async (id) => {
    try {
      const resp = await axios.post(
        `http://localhost:8000/api/v1/savedRecipie/save/${id}`,
        {},
        {
          withCredentials: true, // For protected routes
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleFetchSavedRecipies=async()=>{
  //   try {
  //     const resp = await axios.get(
  //       `http://localhost:8000/api/v1/savedRecipie/getSaved`,
  //       {
  //         withCredentials: true, // for protected routes
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     console.log(resp.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row items-center justify-between mb-[10px]">
        <h1 className="text-4xl font-bold ">Recipe Feed</h1>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div key={recipe.name} className="bg-gray-100 rounded-md overflow-hidden shadow-md">
            <img src={recipe.recipieImg} alt={recipe.name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-gray-800">{recipe.name}</span>
                
              </div>
              <span className="font-semibold text-gray-800 "> {recipe?.owner.email}</span>
              
              <div className="flex justify-between gap-2 mt-3">
                <Link to={`/recipes/${recipe._id}`} className="bg-blue-500 text-white px-2 py-1 min-w-[40px] rounded-md hover:bg-blue-600">
                  View 
                </Link>
                {userId == recipe.owner?._id && ( // Conditional rendering for owner actions
                  // <div className="flex justify-between ">
                  <>
                    <Link to={`/recipes/${recipe._id}/update`} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">
                      Update 
                    </Link>
                    <button onClick={() => handleDelete(recipe._id)} className="bg-red-500 min-w-[80px] text-white px-2 py-1 rounded-md hover:bg-red-600">
                      Delete
                    </button>
                    </>
                  // </div>
                )}
                <button onClick={() => handleSaveRecipe(recipe._id)} className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">
                  Save 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

  )
}

export default Feed
  
      