const mongoose = require("mongoose");

const girlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: Date,
  picture: String,
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

girlSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Girl = mongoose.model.Girl || mongoose.model("Girl", girlSchema);

module.exports = Girl;
