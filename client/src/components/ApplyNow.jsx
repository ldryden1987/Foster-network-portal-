import { useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function ApplyNow() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleApplyNow = () => {
    // Debug: Check what currentUser contains
  console.log("Current user:", user);
  console.log("Current user exists:", !!user);
    // Check if user is signed in
    if (user) {
      // User is signed in, go directly to application
      navigate("/apply");
    } else {
      // User is not signed in, show prompt
      setShowPrompt(true);
    }
  };

  const handleCreateAccount = () => {
    // Set URL parameter for current page and navigate to signup
    const currentPath = location.pathname + location.search;
    navigate(`/signup?returnTo=${encodeURIComponent(currentPath)}`);
  };

    const handleSignIn = () => {
    // Set URL parameter for current page and navigate to signin
    const currentPath = location.pathname + location.search;
    navigate(`/signin?returnTo=${encodeURIComponent(currentPath)}`);
  };


  const handleGoToApplication = () => {
    // User chose not to create account, go to application anyway
    navigate("/apply");
  };

  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <div>
      {/* Apply Now Button */}
      <button
        onClick={handleApplyNow}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Apply Now
      </button>

      {/* Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Sign Up for Faster Application</h3>
            <p className="text-gray-600 mb-6">
              Would you like to create an account? This will save your information and make future applications easier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCreateAccount}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </button>

                            <button
                onClick={handleSignIn}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Sign In
              </button>
              
              <button
                onClick={handleGoToApplication}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Continue Without Account
              </button>
              
              <button
                onClick={handleClosePrompt}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

