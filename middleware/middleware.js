const logger = require('../config/logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method, '  Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('Headers:  ', request.headers)
  next()
}

const jwtExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.body.token = authorization.substring(7)
  }
  next()
}

const unknownEndpointRoute = (request, response) => {
  response.status(404).send({ error: '404! unknown endpoint' })
}

const errorRoute = (e, req, res, next) => {
  console.error('ERROR middleware: ', e.message)

  if (e.name === 'CastError') {
    return res.status(400).send( 'malformatted id' )
  } else if (e.name === 'ValidationError') {
    return res.status(400).json( e.message )
  } else if (e.name === 'JsonWebTokenError') {
    return res.status(401).json( 'invalid token' )
  } else if (e.name === 'TokenExpiredError') {
    return res.status(401).json( 'token expired' )
  } else if (e.name === 'ReferenceError') {
    return res.status(401).send('Wrong format or no body')
  }

  next(error)
}

module.exports = {
  requestLogger,
  jwtExtractor,
  unknownEndpointRoute,
  errorRoute
}