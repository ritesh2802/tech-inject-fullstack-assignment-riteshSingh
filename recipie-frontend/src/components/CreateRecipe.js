import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    ingredients: [''],
    category: '',
    instructions: '',
    recipieImg: null,
  });
  const [recipieImg, setRecipieImg] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(()=>{
     
    console.log(formData)
  },)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index]= event.target.value;
    setFormData({ ...formData, ingredients: newIngredients });
    
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    const values = [...formData.ingredients];
    values.splice(index, 1);
    setFormData({ ...formData, ingredients: values });
  };

  const handleFileChange = (event) => {
    
    const file = event.target.files[0];
    console.log(file)
    setFormData({ ...formData, recipieImg: file });
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === 'ingredients') {
        formData[key].forEach(ingredient => {
          data.append('ingredients', ingredient);
        });
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
     const resp= await axios.post('http://localhost:8000/api/v1/recipie/createRecipie', data, {
        headers: {   'Content-Type': 'multipart/form-data' },
        withCredentials: true,
    });
    console.log(resp);
      setMessage('Recipe created successfully!');
      navigate("/feed")
      
    } catch (error) {
      setMessage('Error creating recipe');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
            Ingredients
          </label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Ingredient
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipieImg">
            Recipe Image
          </label>
          <input
            type="file"
            name='recipieImg'
            id="recipieImg"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Recipe Preview"
              className="mt-2 w-full max-w-xs mx-auto"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Create Recipe
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default CreateRecipe;
