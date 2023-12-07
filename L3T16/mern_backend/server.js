const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const Login = require("../mern_backend/controllers/loginController");
const Appointment = require("../mern_backend/controllers/appointmentController");
// I start of by importing express,mongoose,helmet,cors,app and I create a var and assign my port to it.
// I also import my login and appointment controllers

app.use(cors());
app.use(helmet());
app.use(express.json());
// I then use app.use and use cors,helmet and express.json()

const uri =
  "mongodb+srv://R4FYZ6Br3evIw1ak:R4FYZ6Br3evIw1ak@cluster0.rlscruj.mongodb.net/?retryWrites=true&w=majority";

// I assign my mongoDb connection string to the uri var.
mongoose.connect(uri, {
  dbName: "test",
});
// I then use mongoose.connect method with my uri var to connect to my database.

// I then use the mongoose.connection.once method to alert the user when they have successfully connected to the database.
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// I then create a post request and use my login controller followed by the function createDefaultAdmin.
app.post("/Login/Default", Login.createDefaultAdmin);

// I then create another post request and use my login controller followed by my loginAdmin function.
app.post("/Login/Admin", Login.loginAdmin);

// I then create a post request and use my Appointment controller followed by my  createAppointments function.
app.post("/Dashboard/Add", Appointment.createAppointments);

// I then create a get request and use my Appointment controller followed by my getAppointment.
app.get("/Dashboard/Display", Appointment.getAppointment);

// I create a put request and use my Appointment controller followed by my editAppointment function
app.put("/Dashboard/Edit", Appointment.editAppointment);

// I create a delete request and use my deleteAppointment function from my appointment controllers
app.delete("/Dashboard/Delete", Appointment.deleteAppointment);

// I then create a get request that will display the current user appointments using my displayUserAppointments function.
app.get("/Dashboard/UserAppointments", Appointment.displayUserAppointments);

app.post("/Login/Register", Login.CreateNewAdminUser);

// I then use app.listen and my port var followed by a arrow function this will start my server and alert the user once it jas started.
app.listen(port, () => {
  console.log("Application up and running on port: " + port);
});
