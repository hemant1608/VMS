const mongoose = require('mongoose');
const validator = require('validator');

const visitorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [3, 'Full name must be at least 3 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email is required'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address'
    }
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, 'en-IN'); // For Indian numbers
      },
      message: 'Please provide a valid phone number'
    }
  },
  checkInTime: {
    type: String,
    required: [true, 'Check-in time is required'],
    trim: true
  },
  checkOutTime: {
    type: String,
    trim: true,
    default: ''
  },
  dateOfVisit: {
    type: String,
    required: [true, 'Date of visit is required'],
    trim: true,
    validate: {
      validator: function (v) {
        return validator.isDate(v);
      },
      message: 'Please provide a valid date (YYYY-MM-DD)'
    }
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['pending', 'checked-in', 'checked-out', 'rejected'],
    default: 'pending'
  },
  whomToMeet: {
    type: String,
    required: [true, 'Whom to meet is required'],
    trim: true
  },
  departementToVisit: {
    type: String,
    required: [true, 'Department to visit is required'],
    trim: true
  },
  purposeToVisit: {
    type: String,
    required: [true, 'Purpose to visit is required'],
    trim: true,
    minlength: [5, 'Purpose should be at least 5 characters long']
  }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
