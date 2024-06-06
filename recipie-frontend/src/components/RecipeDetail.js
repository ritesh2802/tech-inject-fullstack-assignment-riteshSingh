import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/recipie/getRecipie/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Recipe not found');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
      <ol className="list-decimal list-inside">
        {recipe.instructions.map((instruction, index) => (
          <li key={index} className="text-gray-700 mb-2">{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
