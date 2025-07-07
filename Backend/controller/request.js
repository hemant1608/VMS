const User=require("../model/user");
const Request = require("../model/request");
const visitor = require("../model/visitor");

const createRequest = async (req)=>{
    try {

        // Extracting visitorId and personToMeet from the request body
        const { visitorId, personToMeet } = req.body;


        //createArray for personToMeet if it is not an array
        const personToMeetArray = [personToMeet._id]

        // Validate the request body
        if (!visitorId || !personToMeet || personToMeet.length === 0) {
            throw new Error("Invalid request body. 'visitorId' and 'personToMeet' are required.");
        }
 
        // Check if the visitor exists
        const visitor = await visitor.findById(visitorId);
        if (!visitor) {
            throw new Error("Visitor not found.");
        }

        // Check if the persons to meet exist
        const persons = await User.find({ _id: { $in: personToMeetArray } });
        if (persons.length !== personToMeetArray.length) {
            throw new Error("One or more persons to meet not found.");
        }

        // Create a new request
        const request = new Request({
            visitorId,
            personToMeet: personToMeetArray._id,
        });

        // Save the request to the database
        const savedRequest = await request.save();

        // You can return the created request or any other relevant information
        return savedRequest;

    } catch (error) {
        console.error("Error during request creation:", error);
    }
}

module.exports={createRequest}