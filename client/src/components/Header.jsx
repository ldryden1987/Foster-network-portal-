import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo_main.png"


function Header() {
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
        <div style={{ flexGrow: 1, justifyContent: "left" }}>
          <Link to = "/">
          <img src={logo} style={{height:"50px", marginLeft:"25px" }} alt="Company Logo" />
          </Link>
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
