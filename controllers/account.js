const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const accountRouter = require('express').Router()
const User = require('../models/User')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// ROUTES
// /change_email
// /change_password
// /cancel_subscription
// /delete_account

accountRouter.post('/change_email', async (req, res) => {
  const body = req.body

  try {
    const user = await User.findOne({ username: body.username })
    user.email = body.new_email
    await user.save()
    res.status(200).send(user)
  }
  catch (e){
    res.status(500).send(e);
  }   
})

accountRouter.post('/change_password', async (req, res) => {
  const body = req.body

  const saltRounds = 10;
  const newPasswordHash = await bcrypt.hash(body.new_password, saltRounds)

  try {
    const user = await User.findOne({ username: body.username })
    user.passwordHash = newPasswordHash
    await user.save()
    res.status(200).send(user)
  }
  catch (e){
    res.status(500).send(e);
  }   
})

accountRouter.post('/cancel_subscription', async (req, res) => {
  const body = req.body

  try {
    const deletedSubscription = await stripe.subscriptions.del(
    body.subscriptionId);
    const user = await User.findOne({username: body.username})
    delete user.clientId
    user.save()
    res.send(deletedSubscription);
  }
  catch (e) {
    res.status(500).send(e);
  }
})

accountRouter.post('/delete_account', async (req, res) => {
  const body = req.body

  try {
    const deletedUser = await User.deleteOne({ username: body.username })
    res.status(200).send(deletedUser)
  }
  catch (e){
    res.status(500).send(e);
  }   
})

module.exports = accountRouter