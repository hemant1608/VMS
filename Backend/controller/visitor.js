const { validationForVisitor } = require("../helper/visitor");
const Visitor =require("../model/visitor");
const { createRequest } = require("./request");

const createVisitor=async (req,res)=>{
    try {
        //to prevent from user to make changed in status or checkIntime
        const {fullName,email,phoneNumber,whomToMeet,departementToVisit,purposeToVisit}=req.body;

        validationForVisitor(req);

        const whomToMeetName= whomToMeet.firstName+" "+whomToMeet.lastName;

        const visitor =new Visitor({fullName,email,phoneNumber,whomToMeet:whomToMeetName,departementToVisit,purposeToVisit});

        const newVisitor=await visitor.save();

        if(newVisitor){
           const newRequest =    await createRequest(req);
           res.status(201).json({
                message:"Visitor created successfully",
                data:newVisitor,
                request:newRequest
            });
        }else{
            throw new Error("Visitor creation failed");
        }




        //create a request for the visitor
        
    } catch (error) {
        res.json(500).json({
            message:"error during creation of visitor due to->"+error.message,
        })
    }
}

module.exports={createVisitor};

