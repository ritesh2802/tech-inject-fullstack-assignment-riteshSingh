import mongoose,{Schema} from "mongoose";

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

export const Recipie = mongoose.model("Recipie",recipieSchema)