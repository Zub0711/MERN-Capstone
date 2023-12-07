import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Icon } from "@iconify/react";
import "./Reg.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      }
    }
  }, []);

  // I then create the function for registering a new admin which is done in the admin page
  const handleRegister = async (e) => {
    // I use e.preventDefault
    e.preventDefault();
    // I then create a var that will perform a post request using await fetch
    const response = await fetch("/Login/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // I use json.stringify to set the property to my email and password state
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // I the store the fetch data in the data var
    const data = await response.json();
    // I then use an if statement to check and alert if the login is successful
    if (data.status === "ok") {
      alert("Registration Successful");
      window.location.href = "/Admin";
    } else {
      // Else send alert messaging saying Email has already been used
      alert("Email has already been used");
    }
  };
  // In my return statement I create the input section for the email and login using form,label,input anf button tags
  return (
    <div>
      <h1>
        Regi
        <Icon icon="bx:plus-medical" width="100" height="100" />
        ster
      </h1>
      <form onSubmit={handleRegister}>
        <label>Email</label>
        <input
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          value={password}
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <Link to={"/Admin"}>
        <button>Back to Dashboard</button>
      </Link>
    </div>
  );
}
