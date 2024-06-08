import { Recipie } from "../models/recipie.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createRecipie=asyncHandler(async(req,res)=>{
    const {name,ingredients,category,instructions} = req.body;
    console.log(req.body);

    const recipieImgLocalPath =req.file?.path;
    console.log(req.file?.path)
    
    if(!recipieImgLocalPath){
        throw new ApiError(404,"recipie file is missing");
    }

    const recipieImg = await uploadOnCloudinary(recipieImgLocalPath);

    const recipie =await Recipie.create({
        name,
        ingredients,
        category,
        instructions,
        recipieImg:recipieImg.url,
        owner:req.user._conditions._id
       
    })
    res.status(200).json(
        new ApiResponse(200,"recipie created successfully",recipie)
    )
})

// Get all recipes
const getAllRecipies = asyncHandler(async (req, res) => {
  
        const recipies = await Recipie.find().populate('owner');
        return res.status(200).json(
            new ApiResponse(200,recipies,"recipie fetched successfully")
        )
   
});

const getRecipieById=asyncHandler(async(req,res)=>{
    console.log(req.params.id)
    const recipie = await Recipie.findById(req.params.id);
        if (!recipie) throw new ApiError(404,"recipie not found");
        res.json(recipie);
    
        new ApiResponse(200,"recipie send successfully",recipie)
    })

const deleteRecipie= asyncHandler(async(req,res)=>{
    const recipie= await Recipie.findById(req.params.id)
    
     // Check if the logged-in user is the owner of the recipe
     if (!req.user || recipie.owner.toString() !== req.user._conditions._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this recipe' });
    }
    await Recipie.deleteOne({ _id: req.params.id }); 
        if (!recipie) throw new ApiError(404,"recipie not found");
        res.json(recipie);

        await recipie.deleteOne();
        new ApiResponse(200,"recipie deleted successfully",recipie)
    })

    const updateRecipie= asyncHandler(async(req,res)=>{
        const { id } = req.params;
        const { name, category, ingredients, instructions } = req.body;
      
       
          const recipie = await Recipie.findById(id);
          if (!recipie) return res.status(404).json({ message: 'Recipe not found' });
        
            // Check if the logged-in user is the owner of the recipe
     if (!req.user || recipie.owner.toString() !== req.user._conditions._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this recipe' });
    }


      
        const recipieImgLocalPath =req.file?.path;
      
          
        //   console.log(" in upload",req.user)
      
          console.log("user ki id in upload",req.user._conditions._id)
          // if(!recipieImgLocalPath){
          //       throw new ApiError(404,"recipie file is missing");
          //   }
           
           if(recipieImgLocalPath){

           
          if (req.file) {
            // Upload new image to Cloudinary
            const result =  await uploadOnCloudinary(recipieImgLocalPath);
            recipie.recipieImg = result.url;
          }
        }
      
      
          recipie.name = name || recipie.name;
          recipie.category = category || recipie.category;
          recipie.ingredients = ingredients || recipie.ingredients;
          recipie.instructions = instructions || recipie.instructions;
      
          const updatedRecipe = await recipie.save();
          res.json(updatedRecipe);
        
          res.status(500).json({ message: "updated successfully" },updatedRecipe);
       
     
        })
  // Controller function for searching recipes
  const searchRecipies = asyncHandler(async (req, res) => {
    const { query } = req.query;
  
    // Construct the search query to match the query parameter across multiple fields
    const searchQuery = {
      $or: [
        { name: { $regex: new RegExp(query, 'i') } },
        { ingredients: { $regex: new RegExp(query, 'i') } },
        { category: { $regex: new RegExp(query, 'i') } }
      ]
    };
  
    try {
      // Execute the search query
      const searchResults = await Recipie.find(searchQuery);
  
      // Return the search results to the client
      res.status(200).json(searchResults);
    } catch (error) {
      console.error('Error searching recipes:', error);
      res.status(500).json({ message: 'Error searching recipes' });
    }
  });
  

export {createRecipie,updateRecipie,deleteRecipie,getAllRecipies,getRecipieById,searchRecipies}