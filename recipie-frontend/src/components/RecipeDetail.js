import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    // console.log(  {id})
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/recipie/getRecipie/${id}`);
        console.log(response.data)
        setRecipe(response.data);
        console.log("Res"+recipe)
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
   

<div className="max-w-3xl mx-auto p-6">
<h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>

<div className="mb-4">
  <img src={recipe.recipieImg} alt={recipe.name} className="w-full h-auto rounded-lg" />
</div>

<div className="bg-gray-100 p-4 rounded">
  <h3 className="text-xl font-bold mb-2">Ingredients</h3>
  <ul className="list-disc ml-6">
    {recipe.ingredients.length > 0 ? (
        (recipe.ingredients).map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))
      ) : (
        <li>No ingredients available</li>
      )}
  </ul>
</div>

<div className="mt-6">
  <h3 className="text-xl font-bold mb-2">Category</h3>
  <p>{recipe.category}</p>
</div>

<div className="mt-6">
  <h3 className="text-xl font-bold mb-2">Instructions</h3>
  <p>{recipe.instructions}</p>
</div>
</div>

  );
};

export default RecipeDetail;
