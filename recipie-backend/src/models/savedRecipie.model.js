import mongoose,{Schema} from "mongoose"

const savedRecipieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipie: {
    type: Schema.Types.ObjectId,
    ref: 'Recipie',
    required: true
  }
});

export const SavedRecipie = mongoose.model('SavedRecipie', savedRecipieSchema);


