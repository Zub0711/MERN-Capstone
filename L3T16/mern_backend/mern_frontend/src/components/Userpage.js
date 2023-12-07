import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./User.css";
// import useEffect,useState and react
// I then import Link and my table styling components

// I then create my User page Component
export default function Userpage() {
  const [viewAppointments, setViewAppointments] = useState([]);
  //  I create the states for display the appointments to the user

  // I create a user effect that will display the appointments to the user whenever the page loads
  useEffect(() => {
    // I use a async function
    const getAppointment = async () => {
      // and a try catch block followed by a fetch method too retrieve the data
      try {
        const res = await fetch("/Dashboard/UserAppointments");
        const data = await res.json();
        // i then set the state to the retrieved data
        setViewAppointments(data);
      } catch (error) {
        // I use the catch block to log error to the console if unsuccessful
        console.log();
      }
    };
    // I the call back my getAppointment function
    getAppointment();
  }, []);

  //  I then begin the mapping process
  // I create the var data and use the map method to map the appointments
  const data = viewAppointments.map((appointment) => {
    // I create two vars to format the date
    const dateFormat = new Date(appointment.date);
    const fixedDate = dateFormat.toDateString().substring(0, 15);
    // I then use a return statement to return the mapped appointments in a table format and add the delete and openEditBox functions

    return (
      <tr>
        <td>{appointment.patientName}</td>
        <td>{appointment.patientLastName}</td>
        <td>{fixedDate}</td>
        <td>{appointment.time}</td>
        <td>{appointment.type}</td>
      </tr>
    );
  });

  // In the return statement I add two navigation buttons
  // I then add my imported table styling components and my mapped data
  return (
    <div>
      <h1>
        {" "}
        <Icon icon="bx:plus-medical" width="100" height="100" />
        Appointment List
      </h1>
      <Link to={"/Login"}>
        <button>Admin Login</button>
      </Link>
      <Link to={"/"}>
        <button>Back to Home</button>
      </Link>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Patients First Name </th>
            <th>Patients Last Name </th>
            <th>Date</th>
            <th>Time</th>
            <th>Type </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{data}</MDBTableBody>
      </MDBTable>
    </div>
  );
}
