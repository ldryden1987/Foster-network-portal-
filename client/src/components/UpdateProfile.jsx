import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";

export default function UpdateProfile() {
  const { user, updateUser } = useUser();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // Initialize form data with user information
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || ""
      });
    }
  }, [user]);

  // Handle profile form input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update profile information
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/updateUser/${user._id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": sessionToken
          },
          body: JSON.stringify(profileData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessage("Profile updated successfully!");
        // Update user context with new data
        if (updateUser) {
          updateUser({ ...user, ...profileData });
        }
        setShowProfileForm(false);
      } else {
        const errorResult = await response.json();
        setMessage(`Failed to update profile: ${errorResult.error || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

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
        `${import.meta.env.VITE_SERVER_URL}/changePassword/:user_ID`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": sessionToken
          },
          body: JSON.stringify({
            currentPassword,
            newPassword
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
      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className="flex-1 px-4 py-2 rounded bg-[#102542] text-[#CDD7D6] font-semibold cursor-pointer"
          onClick={() => {
            setShowProfileForm(!showProfileForm);
            setShowPasswordForm(false);
            setMessage("");
          }}
        >
          {showProfileForm ? "Cancel Profile Update" : "Update Profile"}
        </button>
        <button
          className="flex-1 px-4 py-2 rounded bg-[#102542] text-[#CDD7D6] font-semibold cursor-pointer"
          onClick={() => {
            setShowPasswordForm(!showPasswordForm);
            setShowProfileForm(false);
            setMessage("");
          }}
        >
          {showPasswordForm ? "Cancel Password Update" : "Change Password"}
        </button>
      </div>

      {/* Success/Error message */}
      {message && (
        <div className={`mb-4 p-3 rounded border ${
          message.includes('successfully') 
            ? 'bg-green-50 text-green-800 border-green-200' 
            : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Update Profile Form */}
      {showProfileForm && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Update Profile Information</h3>
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Your Name"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder="Your Email"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="Your Phone Number"
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Address:</label>
              <textarea
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                placeholder="Your Address"
                rows="3"
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      )}

      {/* Change Password Form */}
      {showPasswordForm && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Change Password</h3>
          <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Current Password:</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">New Password:</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="p-3 rounded bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Password must be at least 6 characters long.
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}