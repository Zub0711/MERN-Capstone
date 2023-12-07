const Admin = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// I start of by importing my user Schema
// I then import bcrypt and jwt

// I then create the async function using exports.createDefaultAdmin
exports.createDefaultAdmin = async (req, res) => {
  // I create the var adminUser ad use await admin.findOne
  // This is for the default admin account
  const adminUser = await Admin.findOne({
    email: "Admin@gmail.com",
  });
  // I then create a if statement if there is now current default admin
  if (!adminUser) {
    // Then I use a try catch block
    try {
      // I create teh var hashedPass and use await bcrypt.hash the password character limit will be set to 10
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      // I then use Admin.create to  create a admin account based on the users inputs
      await Admin.create({ email: req.body.email, password: hashedPass });
      // I then use the res.send method and set the status to ok upon success
      res.json({ status: "ok" });
    } catch (error) {
      // If unsuccessful then an error wil be logged to the console
      console.log(error);
    }
  }
};

// I then create the async function loginAdmin this  function will handle the login process fro the admin
exports.loginAdmin = async (req, res) => {
  // I then create the var adminUser and use the await Admin.findOne method
  const adminUser = await Admin.findOne({
    email: req.body.email,
  });
  // I then create a if statement to check if the admin user is not logged in it will then return an error message
  if (!adminUser) {
    return res.json({
      status: "error",
      message: "invaild username or password",
    });
  }
  // I then create the var checkPass and use bcrypt.compare req,body.password and adminUser.password
  // This will check if the password matches the admin account password
  const checkPass = await bcrypt.compare(req.body.password, adminUser.password);
  // I then create a if statement and set the condition to the checkPass var
  if (checkPass) {
    // I then create the token var so upon the condition of the if statement a jwt token will be created
    // Using jwt.sign
    const token = jwt.sign({ email: adminUser.email }, "jwt-secret");
    // I then return a res.send and set the token to the admin this means in the event that some gets

    return res.json({ status: "ok", admin: token });
  } else {
    // Else I console.log user not found and return a error status
    console.log("user not found");
    return res.json({ status: "error", admin: false });
  }
};

// I create the CreateNewAdminUser function this will be for if the admin wants to create another admin account
exports.CreateNewAdminUser = async (req, res) => {
  const adminUser = await Admin.findOne({
    email: req.body.email,
  });
  // I then create a if statement if there is now current default admin
  if (adminUser) {
    // Then I use a try catch block
    return res.json({ status: "error", error: "email already registered" });
  } else {
    // I create the var hashedPass and use await bcrypt.hash the password character limit will be set to 10
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    // I then use Admin.create to  create a admin account based on the users inputs
    await Admin.create({ email: req.body.email, password: hashedPass });
    // I then use the res.send method and set the status to ok upon success
    res.json({ status: "ok" });
  }
};
