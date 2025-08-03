import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Nav from "../components/Nav.jsx";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showSignInLink, setShowSignInLink] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event) {
    try {
      setLoading(true);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("sessionToken", result.sessionToken);
        alert(`You have successfully created an account! Please sign in to continue.`);
        navigate("/signin");
      } else {
        if (result.error === "User already exists") {
          console.log(result.error);
          setErrorMessage(result.error);
          // Show the Signin button
          setShowSignInLink(true);
        } else { 
          console.log(result.error);
          setErrorMessage(result.error || "Signup failed");
          setShowSignInLink(false);
        }
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Nav />
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center w-full bg-[#F87060] max-w-md">
          <div className="flex flex-col gap-2 w-full max-w-md text-black p-6">
            <h1 className="text-xl font-bold m-2 self-center text-center">
              Sign Up
            </h1>
            <form
              onSubmit={handleSignUp}
              className="flex flex-col gap-2 self-center text-center w-full p-2"
            >
              <input
                type="text"
                className="input input-md m-2 bg-[#CDD7D6] border-black w-full"
                name="firstName"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                className="input input-md m-2 bg-[#CDD7D6] border-black w-full"
                name="lastName"
                placeholder="Last Name"
                required
              />
              <input
                type="email"
                className="input input-md m-2 bg-[#CDD7D6] border-black w-full"
                name="email"
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="input input-md m-2 bg-[#CDD7D6] border-black w-full"
                name="password"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="m-2 px-4 py-2 rounded bg-[#102542] text-[#CDD7D6] font-semibold cursor-pointer w-full"
                disabled={ loading }
              >
                Sign Up
              </button>
            </form>
            <div className="text-center mt-4">
              {errorMessage && (
                <div
                  className="text-red-600 font-bold text-xl
                     self-center text-center mt-4"
                >
                  {errorMessage}
                </div>
              )}
              <div className="flex justify-center items-center gap-2 mt-2">
                <span>Have an account already?</span>
                <Link
                  to="/signin"
                  className="text-[#CDD7D6] underline whitespace-nowrap"
                >
                  Click here to sign in!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
