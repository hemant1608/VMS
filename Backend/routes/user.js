const express=require("express");

const  Router=express.Router();

//import the controller

const {userSignUp,userLogin,getAllAdminData}=require("../controller/user")

//creates routes

Router.post("/signup",userSignUp);
Router.post("/login",userLogin);
Router.get("/alldata",getAllAdminData);

module.exports=Router; 