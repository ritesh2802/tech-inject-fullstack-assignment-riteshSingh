import {Router} from "express"
import {refreshAccessToken, loginUser, logoutUser, registerUser} from "../controllers/user.controller.js"
import {upload} from "../middleWares/multer.middleware.js"
import { jwtVerify } from "../middleWares/auth.middleare.js";
import { createRecipie, deleteRecipie, getAllRecipies, getRecipieById, searchRecipies, updateRecipie } from "../controllers/recipie.controller.js";

const recipieRouter = Router();

// secured route
recipieRouter
    .route("/createRecipie")
    .post(jwtVerify,upload.single("recipieImg"),createRecipie)

recipieRouter
    .route("/updateRecipie/:id")
    .put(jwtVerify,upload.single("recipieImg"),updateRecipie)

recipieRouter
    .route("/getAllRecipies")
    .get(getAllRecipies)

recipieRouter
    .route("/getRecipie/:id")
    .get(getRecipieById)

recipieRouter
    .route("/deleteRecipie/:id")
    .delete(jwtVerify,deleteRecipie)
recipieRouter
    .route("/searchRecipies")
    .get(searchRecipies)

export default recipieRouter