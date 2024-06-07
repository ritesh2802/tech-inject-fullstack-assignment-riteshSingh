import React, { useState,useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState();
    const navigate= useNavigate();
  useEffect(()=>{
    
    const getCurrentUser= async()=>{
      try {
        const resp = await axios.get(" http://localhost:8000/api/v1/users/getCurrentUser",{
          headers: {   'Content-Type': 'application/json' },
          withCredentials: true,
      });
        console.log(resp.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getCurrentUser();
  
  })
 

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      // http://localhost:8000/api/v1/users/login
      const config = {
        headers: {
          "Content-Type": "application/json",
          // 'Access-Control-Allow-Credentials': true,
          },
          withCredentials: true,
          
         
        }
        // axios.defaults.withCredentials = true;
        const response = await axios.post('http://localhost:8000/api/v1/users/login',{email,password},config);
        console.log(response.data);
        
        setUser(response.data)
        
        setLoading(true)
        // alert(response.data.message)
        setEmail('');
        setPassword('');
        login();
        navigate("/feed")
      } 
      catch (error) {
        console.error('Error uploading file:', error);
      }
      finally{
        setLoading(false)
    }
  
  };
  

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Log In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log In</button>
          <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
