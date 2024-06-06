import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})


const app = express();

app.use(cors({
    origin:'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
    credentials:true
    
}))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb","extended":true}))
app.use(express.static("public"))
app.use(cookieParser());

// import routes


import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users",userRouter)

import recipieRouter from "./routes/recipie.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { get } from "mongoose"
app.use("/api/v1/recipie",recipieRouter)

import savedRecipieRouter from "./routes/savedRecipie.routes.js"
app.use("/api/v1/savedRecipie",savedRecipieRouter)
// http://localhost:8000/api/v1/users/register
// http://localhost:8000/api/v1/recipie/createRecipie
// http://localhost:8000/api/v1/savedRecipie/save


export {app}
