import { useState } from "react";
import { useUser } from "../context/UserContext.jsx";

export default function UpdatePassword () {
  const { user } = useUser();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

  console.log("Frontend debug:");
  console.log("- User object:", user);
  console.log("- User ID:", user._id);
  console.log("- URL:", `${import.meta.env.VITE_SERVER_URL}/userUpdate/changePassword/${user._id}`);

    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/changePassword/${user._id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": sessionToken
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        setMessage("Password updated successfully!");
        event.target.reset();
        setShowPasswordForm(false);
      } else {
        const errorResult = await response.json();
        setMessage(`Failed to update password: ${errorResult.error || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-lg mx-auto my-2 p-4 rounded-lg">
        <p>Please log in to update your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-2 p-4 rounded-lg">
      <button
        className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition"
        onClick={() => setShowPasswordForm((prev) => !prev)}
      >
        {showPasswordForm ? "Cancel" : "Change Password"}
      </button>
      {showPasswordForm && (
        <form className="mt-4" onSubmit={handleUpdatePassword}>
          <div className="mb-2">
            <label className="block mb-1" htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1" htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1" htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
      {message && (
        <div
          className={`mt-2 ${
            message === "Password updated successfully!" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}