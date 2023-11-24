const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const connection = mongoose.connect(process.env.mongoUrl);

const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, "birendra", {
    expiresIn: "1d",
  });
};
module.exports = { connection, generateToken };
