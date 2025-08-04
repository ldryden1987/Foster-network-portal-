import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../context/UserContext.jsx";

function Nav() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  //logout function
  const handleLogout = () => {
        logout();
        navigate('/');
    };

  return (
    <nav className="flex justify-end gap-4 py-4 text-sm">
      <Link to="/" className="hover:underline">Meet Your Future Friends!</Link>
      <Link to="/applications" className="hover:underline">Applications</Link>
      <Link to="/about" className="hover:underline">About Us!</Link>
      {user?.sessionToken ? (
        <Link to="/dashboard" className="hover:underline">My Dashboard</Link>
        ) : null}
      {user?.sessionToken ? (
        <button
          className="bg-[#102542] text-white px-3 py-.5 rounded hover:bg-[#dc5a4e] transition"
          onClick={handleLogout}
        >
          Log Out
        </button>
      ) : (
        <Link to="/signin" className="bg-[#102542] text-white px-3 py-.5 rounded hover:bg-[#dc5a4e] transition">
          Login/Register
        </Link>
      )}
    </nav>
  );
}

export default Nav;