import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User }from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})

// generate access and refresh token 
const generateAccessAndRefreshTokens=async(userId)=>{
    try{
        const user =await  User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken =  user.generateRefreshToken();
        user.refreshToken = refreshToken ;
        await user.save({validateBeforeSave:false})

        return {accessToken, refreshToken}
    }
    catch(err){
        throw new ApiError(500,"something went wrong while generating token")
    }
}




// register
const registerUser = asyncHandler(async(req,res)=>{
    
    
    //take details from the user
    const {email,password} = req.body
    console.log(email)
    console.log(password)
    // validation for empty field
    if(
        [email,password].some((field)=>field?.trim()==="")
    
    ){
        throw new ApiError(404,"All fields are required")
    }

    // check if user already exists
    const existedUser= await User.findOne(
        {
            email
        }
    )

    if(existedUser){
        throw new ApiError(409,"user already exists")
    }
    
    // create user obj in db
    const user =await User.create({
        email,
        password,
        
    })

    // reove pass and refresh token
    const createdUser = await User.findById(user._id).select(
        "-password  -refreshToken"
    )

    //check if user is created
    if(!createdUser){
        throw new ApiError(500,"error while registering the user")
    }

    // retrun res
    res.status(200).json(
        new ApiResponse(200,"user created successfully")
    )
})


//login
const loginUser = asyncHandler(async(req,res)=>{
    // take user details => email ,username ,password  
    //check if details are not empty 
    // validate password
    // genrate access token and refresh toke
    // send them through cookies
    console.log(req.body)
    const {email,password} =  req.body;

    console.log("email => ",email)
    if(!email){
        throw new ApiError(400,"enter username or email ")

    }

    const user = await User.findOne({
        email
    })

    if(!user){
        throw new ApiError(404,"user not found")
    }

    const isValidPassword = user.isPasswordCorrect(password);
    
    if(!isValidPassword){
        throw new ApiError(401,"invalid crediantials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:false,
        secure:false
    }
    
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{user:loggedInUser ,accessToken, refreshToken},'user logged in successfully'))


}) 

//logout
const logoutUser = asyncHandler(async(req,res)=>{
    
    // for logout i need to clear refresh token and cookies 
    //  for that i user's access is required but here i don't have that so 
    // creata a middleware which can provide access to user
    // see auth.middleware.js => jwtVerify 
    console.log(req.user)
    await User.findByIdAndUpdate(req.user._id,
        {  
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))


})

// get current user
const getCurrentUser= asyncHandler(async(req,res)=>{
    const user = User.findById(req.user._id);
    if(!user){
        throw new ApiError(404,"no user found")
    }

    return res.status(200).json(new ApiResponse(200,user,"user fetched"))
})



// refresh token
const refreshAccessToken =asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies?.refreshToken || req.body;
    
    try {
        if(!incomingRefreshToken){
            throw new ApiError(404,"unauthorised token");
        }
    
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.ACCESS_TOKEN_SECRET);
        
        if(!decodedToken){
            throw new ApiError(404,"unauthorised token");
        }
    
        const user = await User.findById(decodedToken._id);
    
        if(user.refreshToken!==incomingRefreshToken){
            throw new ApiError(404,"token is expired");
    
        }

        const options={
            httpOnly:true,
            secure:true
        }

        const {accessToken,newRefreshToken} = generateAccessAndRefreshTokens(user._id);

        return res.status(200).cookie("access Token",accessToken,options).cookie("refresh Token",newRefreshToken,options).json(
            new ApiResponse(200,{accessToken, refreshToken:newRefreshToken},"new refresh Token generated")
        )
    
    } catch (error) {
        throw new ApiError(404,error);

    }
}) 






export  {registerUser,loginUser, logoutUser, refreshAccessToken,getCurrentUser}