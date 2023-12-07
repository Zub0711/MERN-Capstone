const Appointment = require("../models/appointments");
// I start of by importing my Appointment Schema

// I then create the function generateId
const generateId = () => {
  return Math.floor(Math.random() * Date.now());
}; // I then use a return statement and the Math.floor method followed by a math.random and date.
//This function will generate the appointment ids and the math methods will round the number to an even number

// I the create the async function createAppointments using exports.
exports.createAppointments = async (req, res) => {
  // I then create the var id and assign the function generateId to it.
  const id = generateId();
  // I then create the var dateToNum this will be for the appointment time and use new date anf .getTime() ,methods.
  const dateToNum = new Date(req.body.date).getTime();
  // I then create the var newAppoint this will be the new appointment
  let newAppoint = new Appointment({
    // I use the id,patients first & last name,date,time and other info from the user import with the req.body method
    id: id,
    patientName: req.body.patientName,
    patientLastName: req.body.patientLastName,
    date: dateToNum,
    time: req.body.time,
    purpose: req.body.purpose,
    phoneNumber: req.body.phoneNumber,
    medicalAid: req.body.medicalAid,
    smoker: req.body.smoker,
    type: req.body.type,
  });

  // I then use the await method and the .save() method to save the new appointment
  await newAppoint.save();
  console.log("new appointment created" + newAppoint);
};

// I then create the function getAppointment and use async and .exports
exports.getAppointment = async (req, res) => {
  // I use a try catch block and create the var appointments I then use await appointments.fin()
  // This will display the appointments on the admin page
  try {
    const appointments = await Appointment.find();
    // I then use the res.send
    res.send(appointments);
  } catch (error) {
    // If it fails I will then console.log error to the console
    console.log(error);
  }
};

// I then create the async function that will enable the admin to edit an appointment
exports.editAppointment = async (req, res) => {
  // I start of with a try catch block
  try {
    // I create the var updated and use the await Appointment.findOneAndUpdate
    // This will take in the user inputs from the front end using the id to find the specific appointment
    const updated = await Appointment.findOneAndUpdate(
      { id: req.body.id },
      {
        id: req.body.id,
        patientName: req.body.patientName,
        patientLastName: req.body.patientLastName,
        date: req.body.date,
        time: req.body.time,
        purpose: req.body.purpose,
        phoneNumber: req.body.phoneNumber,
        medicalAid: req.body.medicalAid,
        smoker: req.body.smoker,
        type: req.body.type,
      },
      { new: true }
    );
    // I then use  res.status(200) and.json(updated) this will update the appointment upon success
    res.status(200).json(updated);
  } catch (error) {
    // A error will be logged to the console if unsuccessful
    console.log(error);
  }
};

// I then create the async delete function
exports.deleteAppointment = async (req, res) => {
  // I create a try catch block
  try {
    // I then use await and the findOneAndDelete method
    //This will find the appointment by its Id and then delete it
    await Appointment.findOneAndDelete({ id: req.body.id });
  } catch (error) {
    // If unsuccessful a error will be logged to the console
    console.log(error);
  }
};

// I then create the async displayUserAppointments
exports.displayUserAppointments = async (req, res) => {
  // I then create a try catch block
  try {
    // I create 3 vars currentDate,TwoWeeks and appointments
    // I then use the new Date().getTime()
    const currentDate = new Date().getTime();
    // I then use the new Date method and use the currentDate + 120960000 this number is the amount of seconds in a two week period
    // The user can only see appointments in within a two week period
    const twoWeeks = new Date(currentDate + 1209600000).getTime();
    // I then use await Appointment.find and set the date to $gt currentDate and $lt two weeks
    // This will find appointments greater then the current date and in less then two weeks
    const appointments = await Appointment.find({
      date: { $gt: currentDate, $lt: twoWeeks },
    });
    // I then use the res.send method to display the user appointments upon success
    res.send(appointments);
  } catch (error) {
    // if not then a error is logged to the console
    console.log(error);
  }
};
