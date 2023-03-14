const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Model = require("./models/model");

const commonRoutes = require("./routes/commonRoutes");
const signUp = require("./routes/SignUpRoute");

const login = require("./routes/Login");
const myUserProfile = require("./routes/myUserProfile");
const addToFavourites = require('./routes/addToFavourites')
const removeFromFavourites = require('./routes/removeFromFavourites')




require('dotenv').config();
const app = express();

// ADD THIS
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(express.json());
const dbSchema = Model.dbSchema;
const path = require('path')

require("dotenv").config();
const mongoString = process.env.DATABASE_URL;
mongoose.set("strictQuery", true);
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");

  app.listen(process.env.PORT || 5000, () => {
    console.log(`app listenig on port ${process.env.PORT}`);
  });
});

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// Unprotected routes
app.use("/api", commonRoutes);
// Common routes for user and host signup/login
app.use("/signUp", signUp);
app.use("/login", login);
app.use("/user", myUserProfile)
app.use("/user", addToFavourites)
app.use("/user", removeFromFavourites)

app.use("*",(req,res)=>{
  res.status(404).json("Invalid Path")
})
