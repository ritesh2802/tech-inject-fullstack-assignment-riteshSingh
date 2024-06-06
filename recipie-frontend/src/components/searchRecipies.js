import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const SearchRecipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipies, setRecipies] = useState([]);
  const [userId,setUserId]=useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/v1/recipie/searchRecipies', {
        params: { query: searchQuery }
      });
      setRecipies(response.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };
  
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
 
  const handleDelete=async(id,token)=>{
    try {
      const resp = await axios.delete(`http://localhost:8000/api/v1/recipie/deleteRecipie/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'},
        withCredentials: true,
    });
      console.log(resp.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveRecipie = async (id) => {
    try {
      const resp = await axios.post(
        `http://localhost:8000/api/v1/savedRecipie/save/${id}`,
        {},
        {
          withCredentials: true, // for protected routes
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
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Search Recipes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Search:</label>
          <input type="text" value={searchQuery} onChange={handleChange} />
        </div>
        <button type="submit">Search</button>
      </form>
      {recipies.length > 0 && (
        <div>
          <h3>Search Results</h3>
          {
            recipies.map((recipie,index )=>(
                  <div key={recipie.name} className="bg-gray-100 rounded-md overflow-hidden shadow-md">
                  <img src={recipie.recipieImg} alt={recipie.name} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <span className="font-semibold text-gray-800">{recipie.owner.email}</span>
                    </div>
                    <p className="text-gray-700">{recipie.title}</p>
                    <Link to={`/recipes/${recipie._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      View Recipe
                    </Link>
                    {userId ==recipie.owner._id && 
                    <>
                    <Link to={`/recipes/${recipie._id}/update`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Update Recipe
                    </Link>
                    <button onClick={()=>handleDelete(recipie._id)}>
                      delete
                    </button>
                    </>
                    }
                    <button onClick={()=>handleSaveRecipie(recipie._id)}>
                      saveRecipie
                    </button>
                  </div>
                </div>
            ))
          }
          
        </div>
      )}
    </div>
  );
};

export default SearchRecipes;
