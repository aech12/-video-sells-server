const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// signup, "admin/user" roles should be different schemas but since this is a test app it doesn't matter
usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (await User.findOne({ email: body.email })) {
      return response.status(500).send('Email already registered!');
  }
  if (await User.findOne({ username: body.username })) {
      return response.status(400).send('Username taken!');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    email: body.email,
    passwordHash,
    role: body.role ? body.role : 'user',
    clientId: body.clientId
  });

  try {
    const savedUser = await user.save();
    console.log(savedUser, 'saved')
    response.json(savedUser);
  }
  catch (err){
    response.status(500).send(err);
  }   
});

module.exports = usersRouter;
