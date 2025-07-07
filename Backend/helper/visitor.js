const validator=require("validator");


const validationForVisitor=(req)=>{
     const {fullName,email,phoneNumber,whomToMeet,departementToVisit,purposeToVisit}=req.body;

    if(!fullName||!email||!phoneNumber||!whomToMeet||!departementToVisit||!purposeToVisit){
            throw new Error("ALL Parameter Require")
        }
    
    if(!validator.isEmail(email)){
            throw new Error("Required a valid Email")
        }
    if(!validator.isMobilePhone(phoneNumber)){
        throw new Error("Require a Valid Phone Number")
    }

    if(!validator.isLength(purposeToVisit,"",{min:5})){
        throw new Error("Purpose to meet must contain 5 char")
    }
}

module.exports={validationForVisitor}