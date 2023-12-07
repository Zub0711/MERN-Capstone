import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Home.css";
// I state of by importing react and my link tags

// I then create my Home page component
export default function Homepage() {
  // I return a h1,p,button and my link tags
  return (
    <div>
      <h1>
        Medi
        <Icon icon="bx:plus-medical" width="100" height="100" />
        Booking
      </h1>
      <div>
        <p>Welcome User !</p>
        <br></br>
        <p>To Book an Appointment Contact the Medical Center</p>
        <p>To view a booked appointment click the view appointment Button</p>
      </div>
      <Link to={"/User"}>
        <button>View Appointments</button>
      </Link>
      <Link to={"/Login"}>
        <button>Admin Login</button>
      </Link>
    </div>
  );
}
