const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  email: {
    type: String,
    minlength: 1,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    minlength: 6,
    required: true
  },
  role: String,
  clientId: String
});

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
