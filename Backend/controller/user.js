const User =require("../model/user")
const {userSignUpValidation}=require("../helper/user")
const bcrypt = require("bcrypt")
const JWT=require("jsonwebtoken")

const userSignUp =async (req,res)=>{

    try {
        const {firstName,lastName,email,password,role,designation}=req.body;
    //  form helper

    userSignUpValidation(req);

    //password encryption

    const hashedPassword =await bcrypt.hash(password,10);

    //creating the the instance of my model

    const user=User({firstName,lastName,email,password:hashedPassword,role,designation});

    
    //save the user

    const newUser=await user.save();

    res.status(201).json({
        message:"user created success",
        data:newUser,
        
    })

    } catch (error) {
        res.json({
            message:"user signup failed due to ->"+error.message
        })
    }

}

const userLogin =async (req,res)=>{
try {
    const {email,password}=req.body;

    if(!email||!password){
        throw new Error("need all the arguments")
    }

    const user=await User.findOne({email});

    if(!user){
        throw new error("Invalid crediantail")
    }

    
   
    
    const isverified=await bcrypt.compare(password,user.password);

    if(!isverified){
         throw new Error("Invalid crediantail")
    }
    const Payload={
        userid:user._id,
        role:user.role
    }
    const secret=process.env.JWT_SECRET;

    const Token=JWT.sign(Payload,secret)


   

    res.cookie("token",Token).json({
        message:"login Sucessful"
    })


} catch (error) {

    res.status(401).json({
        message:"error while login -> "+error.message
    })
    
}
}

const getAllAdminData= async (req,res)=>{
    try {
        const users=await User.find({role:"admin"},"firstName lastName designation _id ");

        res.status(200).json({
            message:"All admin data",
            data:users
        })
    } catch (error) {
        res.status(500).json({
            message:"Error while fetching admin data -> "+error.message
        })
    }
}
module.exports={userSignUp,userLogin,getAllAdminData};