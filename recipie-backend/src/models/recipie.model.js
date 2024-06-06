import mongoose,{Schema} from "mongoose";
import {SavedRecipie} from "../models/savedRecipie.model.js";

const recipieSchema = new Schema(
    {
        name: { type: String, required: true },
        ingredients: { type: [String], required: true },
        category: { type: String, required: true },
        instructions: { type: String, required: true },
        recipieImg:{type:String},
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    }
);

recipieSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
      await SavedRecipie.deleteMany({ recipie: this._id });
      next();
    } catch (error) {
      next(error);
    }
  });

export const Recipie = mongoose.model("Recipie",recipieSchema)