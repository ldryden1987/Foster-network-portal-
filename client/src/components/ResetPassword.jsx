import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword({ userId, userName, onResetSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleResetClick = () => {
    setIsModalOpen(true);
    setError("");
    setSuccess("");
    setPasswordData({ newPassword: "", confirmPassword: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const validatePasswords = () => {
    if (!passwordData.newPassword) {
      setError("New password is required");
      return false;
    }
    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleConfirmReset = async () => {
    if (!userId) {
      setError("No user ID provided");
      return;
    }

    if (!validatePasswords()) {
      return;
    }

    setIsResetting(true);
    setError("");

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      console.log("Resetting password for user:", userId);

      if (!sessionToken) {
        setError("Please log in to reset passwords");
        navigate("/signin");
        return;
      }

      const url = `${import.meta.env.VITE_SERVER_URL}/userUpdate/user/resetPasswordAdmin/${userId}`;
      console.log("Reset password URL:", url);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: sessionToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: passwordData.newPassword
        }),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        console.log("Password reset successfully:", result);
        setSuccess(`Password reset successfully for ${userName || 'user'}`);
        
        // Clear form
        setPasswordData({ newPassword: "", confirmPassword: "" });
        
        // Call success callback if provided
        if (onResetSuccess) {
          onResetSuccess(userId, result);
        }

        // Close modal after 2 seconds
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess("");
        }, 2000);

      } else {
        console.error("Password reset failed:", result);
        setError(result.error || `Error ${response.status}: Failed to reset password`);

        if (response.status === 401) {
          navigate("/signin");
        } else if (response.status === 403) {
          setError("You don't have permission to reset passwords");
        }
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setIsResetting(false);
    }
  };

  const handleCancelReset = () => {
    setIsModalOpen(false);
    setError("");
    setSuccess("");
    setPasswordData({ newPassword: "", confirmPassword: "" });
  };

  // Don't render if no userId
  if (!userId) {
    return null;
  }

  return (
    <div>
      {/* Reset Password Button */}
      <button
        onClick={handleResetClick}
        disabled={isResetting}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-yellow-400 transition-colors"
      >
        Reset Password
      </button>

      {/* Reset Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reset Password
                </h3>
                <p className="text-sm text-gray-600">
                  for {userName || `User ${userId}`}
                </p>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 border border-red-200 rounded">
                {error}
              </div>
            )}

            {/* Password Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={isResetting || success}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={isResetting || success}
                />
              </div>
            </div>

            {/* Action Buttons */}
            {!success && (
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmReset}
                  disabled={isResetting}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-yellow-400 transition-colors"
                >
                  {isResetting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Resetting...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
                <button
                  onClick={handleCancelReset}
                  disabled={isResetting}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}