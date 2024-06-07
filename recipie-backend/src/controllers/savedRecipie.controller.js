import { asyncHandler } from "../utils/asyncHandler.js";

import {SavedRecipie }from "../models/savedRecipie.model.js"
import mongoose from "mongoose";

const saveRecipie = asyncHandler(async (req, res) => {
  const  recipeId  =req.params.id;
  const userId = req.user._conditions._id;

   // Check if the recipe is already saved by the user
   const existingSavedRecipie = await SavedRecipie.findOne({ user: userId, recipie: recipeId });

   if (existingSavedRecipie) {
     return res.status(400).json({ message: 'Recipe already saved' });
   }

  const savedRecipie = new SavedRecipie({
    user: userId,
    recipie: recipeId
  });

  await savedRecipie.save();

  res.status(200).json({ message: 'Recipe saved successfully' ,data:savedRecipie});
});

const unsaveRecipie = asyncHandler(async (req, res) => {
  const recipeId =(req.params.id);
  const userId =(req.user._conditions._id);

  // Find the saved recipe entry
  console.log(recipeId+"    "+userId)
  const savedRecipie = await SavedRecipie.find({ user: userId, recipie: recipeId });

  if (!savedRecipie) {
    return res.status(404).json({ message: 'Saved recipe not found' });
  }

  // Delete the saved recipe entry
  await SavedRecipie.findByIdAndDelete({ _id: savedRecipie._id });

  res.status(200).json({ message: 'Recipe unsaved successfully' });
});


const getSavedRecipies = asyncHandler(async (req, res) => {
    const userId =  req.user._conditions._id;
  
    // Find all saved recipes for the user
    const fetchedRecipes = await SavedRecipie.find({ user: userId }).populate('recipie').populate('user');
  
    res.status(200).json({ message: 'Recipe fetched successfully' ,data:fetchedRecipes});
  });

export { saveRecipie ,getSavedRecipies,unsaveRecipie};
