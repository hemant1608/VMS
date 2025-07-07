const express =require("express");
const DB=require("./config/database");
const http=require("http")
require("dotenv").config();
const app=express();
const authRouter=require("./routes/user")
const visitorRouter=require("./routes/visitors")
const cookieParser=require("cookie-parser")


//middleware
app.use(cookieParser());
app.use(express.json());



//routes
app.use("/auth",authRouter)
app.use("/visitors",visitorRouter)

const Port=3000;





//listen my server

DB.connect().then(()=>{
console.log("DataBase Connect Successfully")
app.listen(Port,(req,res)=>{
console.log('app is listending on the port number '+Port)
})
}).catch((err)=>{
    console.log("Error in DB Connection "+err.message)
})

