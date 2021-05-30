const config = require('./config/config')
const app = require('./App.js')
const mongoose = require('mongoose')
const logger = require('./config/logger')

// CONNECT TO DB
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('MongoDB connecting to', config.MONGODB_URI)
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

// APP
app.listen(config.PORT, () => {
  logger.info(`App running on port ${config.PORT}`)
})