const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");

const app = express();

var port = process.env.PORT || 3000;
// multer diskstorage
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/myupload");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({ storage: storage }).single("profilepic");

// set ejs
app.set("view engine", "ejs");
// static folder
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index");
});
// desc: post
app.post("/upload", (req, res) => {
  upload(req, res, error => {
    if (error) {
      res.render("index", {
        message: error
      });
    } else {
      res.render("index", {
        message: "successfully uploaded",
        filename: `myupload/${req.file.filename}`
      });
    }
  });
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
