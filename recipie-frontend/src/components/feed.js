import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
import FeaturedRecipies from './FeaturedRecipies';
import Cookies from 'js-cookie';


const Feed = () => {
  const [recipies, setRecipies] = useState([]);
  const navigate = useNavigate()
  let temprecipiesArr =[]
  const [userId,setUserId]=useState("");

  useEffect(() => {
    // Fetch recipies data from the backend API
    const fetchRecipies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/recipie/getAllRecipies');
       console.log(response.data);
       console.log(typeof response.data);

        // console.log( JSON.stringify(response.data.data))
        setRecipies(response.data.data)
        console.log("res "+ typeof recipies)
        
      } catch (error) {
        console.error('Error fetching recipies:', error);
      }

    };
    

    fetchRecipies();
    
  }, []); // Fetch recipies only once on component mount

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
    <div className="container mx-auto px-4 py-8">
      <div className='flex flex-row items-center justify-between mb-[10px]'>
        <h1 className="text-4xl font-bold ">Recipie Feed</h1>
      </div>
      <div className="grid grid-cols-3 gap-6">
        
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
      <button onClick={handleFetchSavedRecipies}>
        get save recipies
      </button>
    </div>
    // <div>
    //     ji
    // </div>
  );
};

export default Feed;
