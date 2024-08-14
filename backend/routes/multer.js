const express = require("express");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const app = express();



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const fn = crypto.randomBytes(20).toString('hex') + path.extname(file.originalname);
    cb(null, fn);
  },
});

const upload = multer({ storage: storage });

// Your other routes and middleware

module.exports = upload;
