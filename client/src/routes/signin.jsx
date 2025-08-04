import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Nav from "../components/Nav.jsx";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";

export default function Signin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useUser(); // Get the login function from context

  // Check for existing session token on component mount
  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (response.ok) {
        login(result.user, result.sessionToken);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setErrorMessage(result.error || "Sign in failed");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Login Form
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Nav />
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center w-full bg-[#F87060] max-w-md">
          <div className="flex flex-col gap-2 w-full max-w-md text-black p-6">
            <h1 className="text-xl font-bold m-2 self-center text-center">
              Sign In
            </h1>
            <form
              onSubmit={handleSignIn}
              className="flex flex-col gap-2 self-center text-center w-full p-2"
            >
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
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
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
                <span>Don't have an account?</span>
                <a
                  href="/signup"
                  className="text-[#CDD7D6] underline whitespace-nowrap"
                >
                  Click here to create one!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
