const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const middlewares = require("./middleware/errors")
const CONNECTDB = require("./config/db");


//Load Config
dotenv.config();



CONNECTDB();

const app = express();

//cross orign
// app.use(cors());
app.use(
  cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.json());



//ROUTES




app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//Logging
  app.use(morgan("dev"));



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);