import { asyncHandler } from "../utils/asyncHandler.js";

import {SavedRecipie }from "../models/savedRecipie.model.js"

const saveRecipie = asyncHandler(async (req, res) => {
  const  recipeId  =req.params.id;
  const userId = req.user._conditions._id;

  const savedRecipie = new SavedRecipie({
    user: userId,
    recipie: recipeId
  });

  await savedRecipie.save();

  res.status(200).json({ message: 'Recipe saved successfully' ,data:savedRecipie});
});

const getSavedRecipies = asyncHandler(async (req, res) => {
    const userId =  req.user._conditions._id;
  
    // Find all saved recipes for the user
    const fetchedRecipes = await SavedRecipie.find({ user: userId }).populate('recipie').populate('user');
  
    res.status(200).json({ message: 'Recipe fetched successfully' ,data:fetchedRecipes});
  });

export { saveRecipie ,getSavedRecipies};
