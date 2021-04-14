const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  name: {
    type: String,
    minlength: 1,
    required: true
  },
  passwordHash: {
    type: String,
    minlength: 6,
    required: true
  },
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
