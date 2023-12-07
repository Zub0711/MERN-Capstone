const mongoose = require("mongoose");
// I start of by importing mongoose

// I then create the user model using new mongoose.Schema
const user = new mongoose.Schema(
  // I then set up the user model create 2 properties the email and the password both and strings and both are required for login.
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // I then create the collection Admin
  {
    collection: "Admin",
  }
);

// I then use the mongoose.model method
const model = mongoose.model("Admin", user);
// I then export the model
module.exports = model;
