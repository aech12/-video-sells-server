const bcrypt = require("bcrypt");
const adminRouter = require("express").Router();
const Girl = require("../../models/Girl");
const Video = require("../../models/Video");
const User = require("../../models/User");
//window.localStorage.clear() add this to backend

// GIRLS /add /update /add-videoToGirl /delete
adminRouter.post("/add-girl", async (request, response) => {
  const {name, birthday, picture, videos} = request.body;
  
  const videosInDb = await Promise.all(
    videos.map(async video=> {
      const videoInDb = await Video.findById(video.id)
      return Promise.resolve(videoInDb)
    })
  )
  const girl = new Girl({
    name,
    birthday,
    videos: videosInDb,
    picture
  });

  try {
    if (await Girl.findOne({ name })) {
      return response.status(500).send('Name taken! Model is already registered!');
    }
    const savedGirl = await girl.save();
    response.status(200).json(savedGirl);
  }
  catch (err){
    response.status(500).send(err);
  }   
});


adminRouter.post("/update-girl", async (request, response) => {
  const {name, birthday, picture} = request.body;

  try {
    const girl = await Girl.findOne({ name })
    if (!girl) {
      return response.status(500).send('Model does not exist!');
    }
    const updatedGirl = {...girl, name, birthday, picture}
    response.status(200).json(savedGirl);
  }
  catch (err){
    response.status(500).send(err);
  }   
});

adminRouter.post("/add-girl-to-video", async (req, res) => {
  const body = req.body;
  const video = await Video.findById(body.videoId)
  const girl = await Girl.findById(body.girlId)

  try {
    if (video.videos.includes(body.girlId)) {
      res.status(401).send('Model already has that video')
    }
    video.girls = [...video.girls, girl]
    const savedVideo = await video.save();
    res.json(savedVideo);
  }
  catch (e){
    res.status(401).send(e);
  }   
});

adminRouter.post("/delete-girl", async (request, response) => {
  const body = request.body;

  try {
    const girl = await Girl.findById(body.girlId)
    const deletedGirl = await Girl.deleteOne({ _id: girl._id });
    response.json(deletedGirl);
  }
  catch (err){
    response.status(500).send(err);
  }   
});





// VIDEOS /add /update /add-girl /delete
adminRouter.post("/add-video", async (req, res) => {
  const {title, href, girls, likes, picture} = req.body;

  const girlsInDb = await Promise.all(
    girls.map(async girl=> {
      const girlInDb = await Girl.findById(girl.id)
      return Promise.resolve(girlInDb)
    })
  )

  const video = new Video({
    title,
    href,
    date: new Date(),
    girls: girlsInDb,
    likes,
    picture
  });

  try {
    const savedVideo = await video.save();
    res.json(savedVideo);
  }
  catch (err){
    res.status(500).send(err);
  }
});

adminRouter.post("/update-video", async (request, response) => {
  const {title} = request.body;

  try {
    const video = await Video.findOne({ name })
    if (!video) {
      return response.status(500).send('Video does not exist!');
    }
    const updatedVideo = {...video, title}
    response.status(200).json(updatedVideo);
  }
  catch (err){
    response.status(500).send(err);
  }   
});

adminRouter.post("/add-video-to-girl", async (req, res) => {
  const body = req.body;
  const video = await Video.findById(body.videoId)
  const girl = await Girl.findById(body.girlId)

  try {
    if (girl.videos.includes(body.videoId)) {
      res.status(401).send('Video already added to that model')
    }
    girl.videos = [...girl.videos, video]
    const savedGirl = await girl.save();
    res.json(savedGirl);
  }
  catch (e){
    res.status(401).send(e);
  }   
});

adminRouter.post("/delete-video", async (request, response) => {
  const body = request.body;

  try {
    const video = await Video.findById(body.videoId)
    const deletedVideo = await Video.deleteOne({ _id: video._id });
    response.json(deletedVideo);
  }
  catch (err){
    response.status(500).send(err);
  }  
});





// USERS
adminRouter.get("/all_users", async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users);
  }
  catch (e){
    res.status(500).send(e);
  }  
});

module.exports = adminRouter;
