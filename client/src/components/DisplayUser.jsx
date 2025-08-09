import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getRoleColor, getStatusColor} from "../utils/userColors"
import DeleteUser from "./DeleteUser";
import ResetPassword from "./ResetPassword";
import UpdateUser from "./UpdateUser";

export default function DisplayUser() {
  const { userId: user_ID } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user_ID) {
      fetchUser();
    } else {
      setError("No user ID provided");
      setLoading(false);
    }
  }, [user_ID]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const sessionToken = localStorage.getItem("sessionToken");

      if (!sessionToken) {
        setError("Please log in to view user details");
        navigate("/signin");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/user/${user_ID}`,
        {
          headers: {
            Authorization: sessionToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data.user);
      } else {
        const errorData = await response.json();
        setError(
          errorData.error || `Error ${response.status}: Failed to fetch user`
        );

        if (response.status === 401) {
          navigate("/signin");
        } else if (response.status === 403) {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Fetch user error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading user details...</span>
      </div>
    );
  }

  if (error && !selectedUser) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-600">View user information</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 border border-red-200 rounded">
          {error}
        </div>
      )}

      {selectedUser && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* User Avatar and Basic Info */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700">
                  {selectedUser.firstName?.[0]?.toUpperCase() ||
                    selectedUser.name?.[0]?.toUpperCase() ||
                    "?"}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedUser.firstName && selectedUser.lastName
                    ? `${selectedUser.firstName} ${selectedUser.lastName}`
                    : selectedUser.name || "No Name"}
                </h2>
                <p className="text-gray-600">{selectedUser.email}</p>
                <div className="flex gap-2 mt-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded border ${getRoleColor(
                      selectedUser.role
                    )}`}
                  >
                    {selectedUser.role || "No Role"}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded border ${getStatusColor(
                      selectedUser.status
                    )}`}
                  >
                    {selectedUser.status || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Details Display - READ ONLY */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.firstName || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.lastName || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.phone || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.role || "Not assigned"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.status || "Unknown"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Joined
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.createdAt
                    ? new Date(selectedUser.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>

              </div>
                            {/* Admin/Manager User Maintenance Buttons */}
              <div className="px-6 py-4 border-t flex flex-row gap-2 justify-center">
                <ResetPassword
                  userId={selectedUser._id}
                  userName={
                    selectedUser.firstName && selectedUser.lastName
                      ? `${selectedUser.firstName} ${selectedUser.lastName}`
                      : selectedUser.email
                  }
                />
                <UpdateUser
                  userId={selectedUser._id}
                  userData={selectedUser}
                  userName={
                    selectedUser.firstName && selectedUser.lastName
                      ? `${selectedUser.firstName} ${selectedUser.lastName}`
                      : selectedUser.email
                  }
                />
                <DeleteUser
                  userId={selectedUser._id}
                  userName={
                    selectedUser.firstName && selectedUser.lastName
                      ? `${selectedUser.firstName} ${selectedUser.lastName}`
                      : selectedUser.email
                  }
                  onDeleteSuccess={() => {
                    navigate("/dashboard");
                  }}
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
