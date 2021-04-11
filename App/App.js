const express = require("express");
const app = express();
const cors = require("cors");
// const config = require('./config/config')
// C:\Users\Alex\Documents\Coding\video-sells-server\App
const logger = require("./config/logger.js");
// const usersRouter = require('./controllers/User')

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// app.use('/api/users', usersRouter)

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

module.exports = app