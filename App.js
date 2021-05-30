const config = require('./config/config')
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = config.PORT || 3001;
const morgan = require('morgan')
const logger = require("./config/logger.js");
// C:\Users\Alex\Documents\Coding\video-sells-server\
const signupRouter = require('./controllers/signup')
const loginRouter = require('./controllers/login')
const stripeRouter = require('./controllers/stripe')
const accountRouter = require('./controllers/account')
const adminRouter = require('./controllers/content/admin')
const videoRouter = require('./controllers/content/video')
const girlsRouter = require('./controllers/content/girls')
// const stripeWebhookRouter = require('./controllers/stripe_webhook')
const mw_ = require('./middleware/middleware')
// const authRoute = require("./routes/auth");

// APP CONFIG
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
// app.use("/api/users", authRoute);

// ROUTES
app.use(mw_.jwtExtractor)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/stripe', stripeRouter)
app.use('/admin', adminRouter)
app.use('/account', accountRouter)
app.use('/video', videoRouter)
app.use('/models', girlsRouter)
// app.use('/stripe-webhook', stripeWebhookRouter)
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
// UNHANDLED ERRORS
app.use(mw_.unknownEndpointRoute)
app.use(mw_.errorRoute)

module.exports = app