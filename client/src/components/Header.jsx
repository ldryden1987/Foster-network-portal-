import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo_main.png"


function Header() {
<<<<<<< HEAD
  return (
    <>
      <header
        style={{
          display: "flex",
          padding: "1rem",
          backgroundColor: "#F87060",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#102542" }}>Safe Paws Animal Rescue</h1>
=======
    return(
        <header style={{display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "102542", alignItems: "center"}}> 
          <img src="https://via.placeholder.com/150" alt="Company Logo"  />
            <h1>Safe Paws Animal Rescue</h1>
            
            <div>
                <p>Join our mission to help pets find homes</p>
                
            </div>
        </header>
>>>>>>> 55f3451ad7cc244e44fab9df03b233032a2d55aa

        <div style={{ flexGrow: 1, justifyContent: "left" }}>
          <img src={logo} style={{height:"50px", marginLeft:"25px" }} alt="Company Logo" />
        </div>

        <div>
          <p style={{ color: "#102542", fontSize: "x-small", }}>
            Join our mission to help pets find homes
          </p>
        </div>
      </header>
    </>
  );
}

export default Header;
