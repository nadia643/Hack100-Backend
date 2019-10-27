/* eslint-disable func-names */
const mongoose = require('mongoose');
const isEmail = require('isemail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
});

userSchema.methods.sanitise = function () {
  const userObject = this.toObject();
  const { password, ...rest } = userObject;
  return rest;
};

const User = mongoose.model('User', userSchema);

module.exports = User;