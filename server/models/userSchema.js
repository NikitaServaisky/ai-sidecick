const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please valid email"],
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
    default: null,
    required: false,
  },
  profileLevel: {
    type: String,
    enum: [ 'basic', 'full' ],
    default: 'basic',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', RegistrationSchema);
module.exports = User;