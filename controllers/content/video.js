const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const videoRouter = require('express').Router()
const Video = require("../../models/Video");
const {allVideosInDB} = require('../../config/mockDB')

videoRouter.get("/all_videos", async (req, res) => {
  try {
    // const videos = await Video.find({}).populate('girls', { name: 1})
    const videos = allVideosInDB
    res.status(200).json(videos);
  }
  catch (e){
    res.status(500).send(e);
  }   
});

videoRouter.post("/top_videos", async (req, res) => {
  const { limit, offset } = req.body

  try {
    const videos = allVideosInDB
    // const videos = await Video.find({})
    const sortedVideos = videos.sort((a,b)=> (a.likes < b.likes) ?  1 : -1).slice(offset, offset + limit)
    const respVideos = { pageElements: sortedVideos, totalCount: videos.length };
    res.status(200).json(respVideos);
  }
  catch (e){
    res.status(500).send(e);
  }   
});

videoRouter.post("/recent_videos", async (req, res) => {
  const { limit, offset } = req.body

  try {
    const videos = allVideosInDB
    // const videos = await Video.find({})
    const sortedVideos = videos.sort((a,b)=> (a.date > b.date) ?  1 : -1).slice(offset, offset + limit)
    const respVideos = { pageElements: sortedVideos, totalCount: videos.length };
    res.status(200).json(respVideos);
  }
  catch (e){
    res.status(500).send(e);
  }   
});

videoRouter.get(`/:id`, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id.substring(1)).populate('girls', { name: 1, picture: 1})
    if (video) res.send(video)
    else {
      res.status(404).send('Girl not found').end()
    }
  }
  catch(e) { next(e)}
});



module.exports = videoRouter