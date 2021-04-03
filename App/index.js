const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const authRoute = require("./routes/auth");

app.use(
  cors({
    origin: "http://localhost:8081"
  })
);
app.use(express.json());
app.use("/api/users", authRoute);
app.listen(PORT);

console.log(`Server running on port ${PORT}`);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/videos", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
