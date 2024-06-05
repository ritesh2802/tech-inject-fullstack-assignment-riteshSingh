this is backend part full stack application for techinject => recipie backend

I have been trying to make server for this application.
1) user model is         
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipie' }],
        password:{
            type:String,
            required:[true,"Password is required"]

        },
2) recipie model=>
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
in user controller=> made function for login,signup,logout,save recipie , get saved recipie
in recipie controller => implemented crud operation for recipies

i am using Mongodb,express,nodejs for setting up server and for photo upload , functionality i am using multer and cloudiary
