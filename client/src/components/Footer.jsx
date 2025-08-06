import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo_main.png"

function Footer() {
  return (
    <footer className="footer p-5 bg-[#F87060] text-[#102542] rounded-t-lg mt-8 flex flex-row justify-between">
  <div>
    <p className="text-lg font-bold">SafePaws Animal Rescue</p>
    <img src={logo} style={{height:"50px"}} alt="SafePaws Logo" className="ml-10 w-24" />
  </div>

  <div className="flex flex-col items-center text-[#102542]">
    <span className="footer-title font-bold">Services</span>
    <Link className="link link-hover">Adopt</Link>
    <Link className="link link-hover">Volunteer</Link>
    <Link className="link link-hover">Foster</Link>
  </div>

  <div className="flex flex-col items-center text-[#102542]">
    <span className="footer-title font-bold">More Info</span>
    <Link className="link link-hover">About Us</Link>
    <Link className="link link-hover">Contact Us</Link>
  </div>

  <div className="flex flex-col items-center text-[#102542]">
    <span className="footer-title font-bold">Get Connected</span>
    <Link className="link link-hover" to="#">Facebook</Link>
    <Link className="link link-hover" to="#">LinkedIn</Link>
    <Link className="link link-hover" to="#">YouTube</Link>
    <Link className="link link-hover" to="#">Instagram</Link>
  </div>
</footer>

  );
}

export default Footer;
