import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Login.css";
// I start of by importing react ,useEffect and useState

// I then create the function component login
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // I then create 2 states for the login function

  // I use useEffect to create a default admin login this is for the existing admin
  useEffect(() => {
    // I create the async function createAdminDefault
    const createAdminDefault = async () => {
      // I then use the await fetch method to create a post request and set the backend path to login/default
      await fetch("/Login/Default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //  I then use json.stringify to parse the default email and password
        body: JSON.stringify({
          email: "Admin@gmail.com",
          password: "password",
        }),
      });
    };
    // I then use an if statement followed by the getItem method to find the token
    if (localStorage.getItem("token")) {
      // if the jwt token is found then I use  window.location.href to navigate to the admin dashboard
    } else {
      // else I return the createAdminDefault function
      createAdminDefault();
    }
  }, []);
  // I then create a handle login function that will be used to process the admin login

  const handleLogin = async (e) => {
    // I use e.preventDefault
    e.preventDefault();
    // I then create a var that will perform a post request using await fetch
    const response = await fetch("/Login/Admin", {
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
    if (data.admin) {
      localStorage.setItem("token", data.admin);
      alert("Login Successful");
      window.location.href = "/Admin";
    } else {
      // else I return an alert of please retry
      alert("Please retry email/password");
    }
  };
  // In my return statement I create the input section for the email and login using form,label,input anf button tags
  return (
    <div>
      <h1>
        Log
        <Icon icon="bx:plus-medical" width="100" height="100" />
        in
      </h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          value={password}
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to={"/"}>
        <button>Back to Home</button>
      </Link>
    </div>
  );
}
