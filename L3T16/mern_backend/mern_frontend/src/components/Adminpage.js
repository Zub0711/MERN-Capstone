import React, { useEffect, useState } from "react";
import CreateNewAppointment from "./CreateNewAppointment";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// I import react,useEffect,useState and my CreateNewAppointment component
// I then import my layout components eg textField , I then import AdapterDateFns & localizationProvider

import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { Row, Col } from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
// I then import my bootstrap components and table components from md react and also jwtDecode
import "./Appointment.css";
// I then create my Admin page component
const Adminpage = () => {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientLastName, setNewPatientLastName] = useState("");
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [newPurpose, setNewPurpose] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newMedicalAid, setNewMedicalAid] = useState("");
  const [newSmoker, setNewSmoker] = useState("");
  const [newType, setNewType] = useState("");
  // I then create the states for my editing function
  // I create a useEffect function
  useEffect(() => {
    // I I create the var token and use the localStorage.getItem("token") method
    const token = localStorage.getItem("token");
    // I then use an if statement so if there is no token then in the event some gains access to page
    // Then the will be removed using window.location.href method
    if (!token) {
      localStorage.removeItem(token);
      window.location.href = "/Login";
    }
    // I then create another if statement so if the user has a token then they will have access to the dashboard
    if (token) {
      const user = jwtDecode(token);
      // I then create another if statement if the user token is removed the user will no longer have access to the admin page
      if (!user) {
        localStorage.removeItem(token);
        window.location.href = "/Login";
      } else {
        // I then call my populateAppointment function which will display the current appointments
        populateAppointments();
      }
    }
  }, []);

  // I then create my async populateAppointments function
  const populateAppointments = async () => {
    // I then use await fetch tp create a path to the backend
    await fetch("/Dashboard/Display")
      // I then use two .then methods to return res.json()
      // I then set my Appointment state to the returned data
      .then((res) => res.json())
      .then((appoint) => setAppointments(appoint));
  };

  // I create the function openEdit box this will open the edit box
  const openEditBox = (e) => {
    // I then create the var selectId then set it to e.target.value
    const selectedId = e.target.value;
    // I then set the states
    setOpen(true);
    setEditId(selectedId);
  };

  // I then use const closeEditBox this function will be used to close the edit box
  const closeEditBox = () => {
    // and then set the state to false this will result in the edit box closing
    setOpen(false);
  };
  // I then create the function handleDateChange this function will be used to format and set the date
  const handleDateChange = (selectedDate) => {
    // I set the state to the selected date param
    setNewDate(selectedDate);
  };
  // I then create the function handleTimeChange this function will be for setting the time
  const handleTimeChange = (selectedTime) => {
    // I create the var stringify time and use the selected time param and the .toString method
    const stringifyTime = selectedTime.toString();
    // I then create teh var fixedTime and use the for stringifyTime.subString this will format the time
    const fixedTime = stringifyTime.substring(16, 21);
    // I then set the state to the formatted time
    setNewTime(fixedTime);
  };
  // I then create the function for editing appointments handleEdit
  const handleEdit = (e) => {
    // I use e.preventDefault
    e.preventDefault();

    // I then create the convertedDate var and  use the newDate method and the .getTime method
    const convertedDate = newDate.getTime();
    // I then create a fetch request that will perform a PUT request to my backend
    fetch("/Dashboard/Edit", {
      // I set the method to put and the headers to application json
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // I then use json.stringify and set the properties to my edit states
      body: JSON.stringify({
        id: editId,
        patientName: newPatientName,
        patientLastName: newPatientLastName,
        date: convertedDate,
        time: newTime,
        purpose: newPurpose,
        phoneNumber: newPhoneNumber,
        medicalAid: newMedicalAid,
        smoker: newSmoker,
        type: newType,
      }),
    })
      // I then use two .then statements to return the fetched data
      .then((res) => res.json())
      .then((updated) => {
        // I the create the var edited and use the map method to return the edited appointments
        const edited = appointments.map((appointment) => {
          if (appointment.id === updated.id) {
            return updated;
          }
          return appointment;
        });
        // I then set my states
        setAppointments(edited);
        setOpen(false);
      })
      // and use a .catch to log an error if unsuccessful
      .catch((error) => {
        console.log(error);
      });
  };
  // I then create the function for deleting an appointment
  const handleDelete = async (e, id) => {
    // I then use await fetch to send a delete request to the backend
    await fetch("/Dashboard/Delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // I then use json.Stringify to find the id of the appointment once its done that the it will be delete
      body: JSON.stringify({
        id: id,
      }),
    });
    // I them callback the populateAppointments function
    populateAppointments();
  };

  // I then create a sign out function
  const handleSignOut = () => {
    // I use localStorage.removeItem this will remove the jwt token
    localStorage.removeItem("token");
    // I then use  window.location.href this will take the user to the login page upon sign out
    window.location.href = "/Login";
  };

  // I then begin the mapping process
  // I create the var data and use the map method to map the appointments

  const data = appointments.map((appointment) => {
    // I create two vars to format the date
    const dateFormat = new Date(appointment.date);
    const fixedDate = new Date(dateFormat).toString().substring(0, 15);
    // I then use a return statement to return the mapped appointments in a table format and add the delete and openEditBox functions
    return (
      <tr key={appointment.id}>
        <td>{appointment.patientName}</td>
        <td>{appointment.patientLastName}</td>
        <td>{fixedDate}</td>
        <td>{appointment.time}</td>
        <td>{appointment.purpose}</td>
        <td>{appointment.phoneNumber}</td>
        <td>{appointment.medicalAid}</td>
        <td>{appointment.smoker}</td>
        <td>{appointment.type}</td>
        <td>
          <button value={appointment.id} onClick={openEditBox}>
            Edit
          </button>
          <form>
            <button
              type="submit"
              onClick={(e) => handleDelete(e, appointment.id)}
            >
              Delete
            </button>
          </form>
        </td>
      </tr>
    );
  });

  // In my greater return statement I create a table and add all the appointment data inside
  // I then add the buttons followed by the corresponding functions
  // I also add my imported style components

  return (
    <div data-testid="adminTest">
      <Row>
        <Col md={2}>
          <button onClick={handleSignOut}>Sign out</button>
          <Link to={"/Register"}>
            <button>Create New Admin</button>
          </Link>
          <CreateNewAppointment />
        </Col>
        <Col md={10}>
          <MDBTable hover>
            <MDBTableHead>
              <tr>
                <th>Patient First Name</th>
                <th>Patient Last Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Purpose</th>
                <th>Phone Number</th>
                <th>Medical Aid</th>
                <th>Smoker</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {data}
              <Dialog onClose={closeEditBox} open={open}>
                <DialogTitle>Edit Appointment</DialogTitle>
                <DialogContent>
                  {" "}
                  <form onSubmit={handleEdit}>
                    <TextField
                      required
                      label="Patient Name"
                      onChange={(e) => setNewPatientName(e.target.value)}
                    />
                    <TextField
                      required
                      label="Patient Last Name"
                      onChange={(e) => setNewPatientLastName(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        required
                        label="date"
                        value={newDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        required
                        label="time"
                        value={newTime}
                        onChange={handleTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <TextField
                      required
                      label="Purpose of the visit"
                      onChange={(e) => setNewPurpose(e.target.value)}
                    />
                    <TextField
                      required
                      label="Phone Number"
                      onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />
                    <FormControl fullWidth required>
                      <InputLabel>Medical Aid</InputLabel>
                      <Select
                        onChange={(e) => setNewMedicalAid(e.target.value)}
                        value={newMedicalAid}
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth required>
                      <InputLabel>Smoker ?</InputLabel>
                      <Select
                        onChange={(e) => setNewSmoker(e.target.value)}
                        value={newSmoker}
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth required>
                      <InputLabel>Type of visit</InputLabel>
                      <Select
                        onChange={(e) => setNewType(e.target.value)}
                        value={newType}
                      >
                        <MenuItem value={"Minor checkup"}>
                          Minor Checkup
                        </MenuItem>
                        <MenuItem value={"Emergency checkup"}>
                          Emergency checkup
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <button onClick={closeEditBox}>Cancel</button>
                    <button type="submit">Save changes</button>
                  </form>
                </DialogContent>
              </Dialog>
            </MDBTableBody>
          </MDBTable>
        </Col>
      </Row>
    </div>
  );
};

export default Adminpage;
