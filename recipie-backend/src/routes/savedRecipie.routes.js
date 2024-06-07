import {Router} from "express"
import {refreshAccessToken, loginUser, logoutUser, registerUser} from "../controllers/user.controller.js"
import {upload} from "../middleWares/multer.middleware.js"
import { jwtVerify } from "../middleWares/auth.middleare.js";
import { getSavedRecipies, saveRecipie, unsaveRecipie } from "../controllers/savedRecipie.controller.js";


const savedRecipieRouter = Router();


// secured routes
savedRecipieRouter
    .route("/save/:id")
    .post(jwtVerify,saveRecipie)
savedRecipieRouter
    .route("/unsave/:id")
    .delete(jwtVerify,unsaveRecipie)
savedRecipieRouter
    .route("/getSaved")
    .get(jwtVerify,getSavedRecipies)

    export default savedRecipieRouter;