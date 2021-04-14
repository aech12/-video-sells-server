const config = require('./config/config')
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = config.PORT || 3001;
const middleware = require('./middleware/middleware')
const logger = require("./config/logger.js");
// C:\Users\Alex\Documents\Coding\video-sells-server\
const signupRouter = require('./controllers/signup')
const loginRouter = require('./controllers/login')
// const authRoute = require("./routes/auth");

// APP CONFIG
app.use(cors());
app.use(express.json());
// app.use("/api/users", authRoute);

// ROUTES
app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
// ERROR ROUTES
app.use(middleware.unknownEndpointRoute)
app.use(middleware.errorRoute)

module.exports = app