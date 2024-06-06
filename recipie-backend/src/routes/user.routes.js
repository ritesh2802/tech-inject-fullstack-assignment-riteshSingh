import {Router} from "express"
import {refreshAccessToken, loginUser, logoutUser, registerUser, getCurrentUser} from "../controllers/user.controller.js"
import {upload} from "../middleWares/multer.middleware.js"
import { jwtVerify } from "../middleWares/auth.middleare.js";

const userRouter = Router();
// register
userRouter
    .route("/register")
    .post(registerUser)

userRouter
    .route("/login")
    .post(loginUser)

// secured routes
userRouter
    .route("/logout")
    .post(jwtVerify,logoutUser)
userRouter
    .route("/getCurrentUser")
    .get(jwtVerify,getCurrentUser)

userRouter
    .route("/refreshToken")
    .post(refreshAccessToken)








export default userRouter