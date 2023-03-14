const express = require("express");
const Model = require("../models/model");
const app = express();
const cors = require("cors");

var bodyParser = require("body-parser");

const GetAll = require("../controllers/CommonControls/GetAll");
const TopPicked = require("../controllers/CommonControls/TopPicked");
const TopRated = require("../controllers/CommonControls/TopRated");
const Popular = require("../controllers/CommonControls/Popular");
const SearchListing = require("../controllers/CommonControls/SearchListing");

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

const router = express.Router();

// router.get("/", jwtVerifyUser, (req, res) => {
//   res.send("first enpoint successful");
// });

router.post("/getAll", async (req, res) => {
  await GetAll(req)
    .then((data) => {
      
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/search", (req, res) => {
  
  SearchListing(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/topPicks", (req, res) => {
  
  TopPicked(req)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/topRated", (req, res) => {
  
  TopRated(req)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/Popular", (req, res) => {
  Popular(req)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;
