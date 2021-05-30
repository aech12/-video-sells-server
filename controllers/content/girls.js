const bcrypt = require("bcrypt");
const girlsRouter = require("express").Router();
const Girl = require("../../models/Girl");
const {allGirlsInDB} = require('../../config/mockDB')

girlsRouter.post("/all_models", async (req, res) => {
  const { limit, offset } = req.body

  try {
    const girls = allGirlsInDB
    // const girls = await Girl.find({})
    const sortedGirls = girls.slice(offset, offset + limit)
    const respGirls = { pageElements: sortedGirls, totalCount: girls.length };
    res.status(200).json(respGirls);
  }
  catch (e){
    res.status(500).send(e);
  }   
});

girlsRouter.get(`/:id`, async (req, res, next) => {
  try {
    const girl = await Girl.findById(req.params.id.substring(1))
    if (girl) res.send(girl)
    else {
      res.status(404).send('Girl not found').end()
    }
  }
  catch(e) { next(e)}
});

module.exports = girlsRouter;