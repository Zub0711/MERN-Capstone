import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Adminpage";
import User from "./components/Userpage";
import Home from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
// I import react,routes,my stylesheet and my components

// I then set my routes and add my components to my app function
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/User" element={<User />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
