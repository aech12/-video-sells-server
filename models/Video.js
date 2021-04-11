const mongoose = require("mongoose");

const girlSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: Date,
  girl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Girl",
  },
});

girlSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const Girl = mongoose.model("Girl", userSchema);

module.exports = Girl;
