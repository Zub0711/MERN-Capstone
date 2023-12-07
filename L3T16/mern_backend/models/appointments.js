const mongoose = require("mongoose");
// I start of by importing mongoose

// I then create the var appointments and use new mongoose.Schema to create the appointment model.
const appointments = new mongoose.Schema(
  // I add all the properties needed for booking an appointment eg patient name,time,date etc
  {
    id: {
      type: Number,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientLastName: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    medicalAid: {
      type: String,
      required: true,
    },
    smoker: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  // I then create the collection appointments
  {
    collection: "appointments",
  }
);
// I then use mongoose.model
const model = mongoose.model("appointments", appointments);
// I then export my model
module.exports = model;
