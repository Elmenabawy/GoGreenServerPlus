// UserModel.js
const mongoose = require('mongoose');
const validator = require('validator'); // Import the validator library

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val); // Use validator.isEmail for email validation
      },
      message: "{VALUE} is not a valid email",
    },
  },
  isAdmin: {
    type: Boolean,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  consumption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumption',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
