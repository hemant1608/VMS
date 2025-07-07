const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      required: true,
    },
    personToMeet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 8, // Expires in 8 hours
    },
  },
  { timestamps: true }
);

// Optional validation: Max 2 people to meet
requestSchema.path("personToMeet").validate(function (value) {
  return value.length <= 2;
}, "You can only assign up to 2 persons to meet.");

module.exports = mongoose.model("Request", requestSchema);
