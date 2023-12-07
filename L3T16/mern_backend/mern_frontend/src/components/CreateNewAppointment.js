import React, { useState } from "react";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import "./Appointment.css";
// I import react,useState
// I then import my layout components eg textField , I then import AdapterDateFns & localizationProvider

// I then create my CreateNewAppointment component which will be used to create appointments
export default function CreateNewAppointment() {
  const [patientName, setPatientName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [medicalAid, setMedicalAid] = useState("");
  const [smoker, setSmoker] = useState("");
  const [type, setType] = useState("");
  // I then create the states for my adding appointments functionality

  // I then create a handle submit function
  const handleSubmit = (e) => {
    // I use e.preventDefault
    e.preventDefault();
    // I then create a fetch function that will perform my POST request to the backend
    fetch("/Dashboard/Add", {
      // I then use json.stringify and set the properties to my edit states
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // I then use json.stringify and pass in my states
      body: JSON.stringify({
        patientName,
        patientLastName,
        date,
        time,
        purpose,
        phoneNumber,
        medicalAid,
        smoker,
        type,
      }),
    });
    // I then use window.location.href that will take you the admin dashboard when a appointment is successfully added
    window.location.href = "/Admin";
  };

  // I then create a h1 and a form I add my imported style components and corresponding functions
  return (
    <div>
      <h1>New Appointment</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Patient Name"
          onChange={(e) => setPatientName(e.target.value)}
        />
        <TextField
          required
          label="Patient Last Name"
          onChange={(e) => setPatientLastName(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            required
            label="date"
            value={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            required
            label="time"
            value={time}
            onChange={(selectedTime) => {
              const stringifyTime = selectedTime.toString();
              const fixedTime = stringifyTime.substring(16, 21);
              setTime(fixedTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          required
          label="Purpose of the visit"
          onChange={(e) => setPurpose(e.target.value)}
        />
        <TextField
          required
          label="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <FormControl fullWidth required>
          <InputLabel>Medical Aid</InputLabel>
          <Select
            onChange={(e) => setMedicalAid(e.target.value)}
            value={medicalAid}
          >
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Smoker ?</InputLabel>
          <Select onChange={(e) => setSmoker(e.target.value)} value={smoker}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Type of visit</InputLabel>
          <Select onChange={(e) => setType(e.target.value)} value={type}>
            <MenuItem value={"Minor checkup"}>Minor Checkup</MenuItem>
            <MenuItem value={"Emergency checkup"}>Emergency checkup</MenuItem>
          </Select>
        </FormControl>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}
