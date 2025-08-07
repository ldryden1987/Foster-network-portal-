import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DisplayUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (userId) {
      fetchUser();
    } else {
      setError("No user ID provided");
      setLoading(false);
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const sessionToken = localStorage.getItem("sessionToken");
      
      if (!sessionToken) {
        setError("Please log in to view user details");
        navigate("/signin");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/user/${userId}`,
        {
          headers: {
            Authorization: sessionToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          role: data.user.role || "",
          status: data.user.status || ""
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || `Error ${response.status}: Failed to fetch user`);
        
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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const sessionToken = localStorage.getItem("sessionToken");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionToken,
          },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setMessage("User updated successfully!");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update user");
      }
    } catch (err) {
      console.error("Update user error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`)) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const sessionToken = localStorage.getItem("sessionToken");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: sessionToken,
          },
        }
      );

      if (response.ok) {
        setMessage("User deleted successfully!");
        setTimeout(() => {
          navigate("/dashboard/all-users");
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to delete user");
      }
    } catch (err) {
      console.error("Delete user error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800 border-red-200",
      manager: "bg-blue-100 text-blue-800 border-blue-200",
      staff: "bg-green-100 text-green-800 border-green-200",
      foster: "bg-purple-100 text-purple-800 border-purple-200",
      adopter: "bg-orange-100 text-orange-800 border-orange-200",
      volunteer: "bg-yellow-100 text-yellow-800 border-yellow-200",
      initial: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colors[role] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      denied: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading user details...</span>
      </div>
    );
  }

  if (error && !user) {
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
          <p className="text-gray-600">View and manage user information</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>

      {/* Status Messages */}
      {message && (
        <div className="mb-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 border border-red-200 rounded">
          {error}
        </div>
      )}

      {user && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* User Avatar and Basic Info */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700">
                  {user.firstName?.[0]?.toUpperCase() || user.name?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user.name || 'No Name'
                  }
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded border ${getRoleColor(user.role)}`}>
                    {user.role || 'No Role'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded border ${getStatusColor(user.status)}`}>
                    {user.status || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Details */}
          {!isEditing ? (
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <p className="mt-1 text-sm text-gray-900">{user.firstName || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <p className="mt-1 text-sm text-gray-900">{user.lastName || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="mt-1 text-sm text-gray-900">{user.role || 'Not assigned'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1 text-sm text-gray-900">{user.status || 'Unknown'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user.phone || 'Unknown'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Edit User
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete User
                </button>
              </div>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleUpdateUser} className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="string"
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={editData.role}
                    onChange={(e) => setEditData({...editData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="initial">Initial</option>
                    <option value="adopter">Adopter</option>
                    <option value="foster">Foster</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      firstName: user.firstName || "",
                      lastName: user.lastName || "",
                      email: user.email || "",
                      phone: user.phone || "",
                      role: user.role || "",
                      status: user.status || ""
                    });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}