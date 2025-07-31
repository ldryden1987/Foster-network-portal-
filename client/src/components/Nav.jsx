import { Link } from "react-router-dom";
import React from "react";

function Nav() {
  return (
    <nav className="flex justify-end gap-4 py-4 text-[#102542] text-sm">
        <Link to="/animals" className="hover:underline">Meet Your Future Friends!</Link>
        <Link to="/applications" className="hover:underline">Applications</Link>
        <Link to="/about" className="hover:underline">About Us!</Link>
        <Link 
          to="/login" 
          className="bg-[#102542] text-white px-3 py-.5 rounded hover:bg-[#dc5a4e] transition"
        >
          Login/Register
        </Link>
        
      
    </nav>
  );
}

export default Nav;