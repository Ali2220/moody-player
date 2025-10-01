const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected To MongoDB");
    })
    .catch((err) => {
      console.log("Error Connecting to MongoDB", err);
    });
}

module.exports = connectDB;
