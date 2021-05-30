const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const {JWT_SECRET} = require('../config/config')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  console.log('login', user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json('Invalid username or password')
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, JWT_SECRET, {expiresIn: "30 days"})

  response
    .status(200)
    .send({ token, email: user.email, name: user.name, username:user.username, role: user.role })
})

loginRouter.post('/test-jwt', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(body.token, JWT_SECRET)
  if (!decodedToken.id) {
    response.status(401).send('Could not verify token! Token missing or invalid')
  }
  response.send(decodedToken)
})

module.exports = loginRouter