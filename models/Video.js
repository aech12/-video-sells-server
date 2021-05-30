const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: String,
  date: Date,
  girls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Girl",
  }],
  likes: Number,
  picture: String
});

videoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Video = mongoose.model.Video || mongoose.model("Video", videoSchema);

module.exports = Video;
