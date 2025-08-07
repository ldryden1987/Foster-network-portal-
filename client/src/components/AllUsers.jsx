import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Filter states
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Apply filters whenever users, selectedRole, selectedStatus, or searchTerm changes
  useEffect(() => {
    applyFilters();
  }, [users, selectedRole, selectedStatus, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const sessionToken = localStorage.getItem("sessionToken");

      if (!sessionToken) {
        setError("Please log in to view users");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/allUsers`,
        {
          headers: {
            Authorization: sessionToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
        setMessage(`Found ${data.users?.length || 0} total users`);
      } else {
        const errorData = await response.json();
        setError(
          errorData.error || `Error ${response.status}: Failed to fetch users`
        );
        setUsers([]);
      }
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(`Network error: ${err.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    // Filter by role
    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter((user) => user.status === selectedStatus);
    }

    // Filter by search term (name or email)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((user) => {
        const fullName = `${user.firstName || ""} ${
          user.lastName || ""
        }`.toLowerCase();
        const name = (user.name || "").toLowerCase();
        const email = (user.email || "").toLowerCase();

        return (
          fullName.includes(searchLower) ||
          name.includes(searchLower) ||
          email.includes(searchLower)
        );
      });
    }

    setFilteredUsers(filtered);

    // Update message with filter results
    if (selectedRole || selectedStatus || searchTerm) {
      setMessage(`Showing ${filtered.length} of ${users.length} users`);
    } else {
      setMessage(`Found ${users.length} total users`);
    }
  };

  const clearFilters = () => {
    setSelectedRole("");
    setSelectedStatus("");
    setSearchTerm("");
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-blue-100 text-blue-800",
      staff: "bg-green-100 text-green-800",
      foster: "bg-purple-100 text-purple-800",
      adopter: "bg-orange-100 text-orange-800",
      volunteer: "bg-yellow-100 text-yellow-800",
      initial: "bg-gray-100 text-gray-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      denied: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Get unique roles and statuses for filter dropdowns
  const availableRoles = [
    ...new Set(users.map((user) => user.role).filter(Boolean)),
  ].sort();
  const availableStatuses = [
    ...new Set(users.map((user) => user.status).filter(Boolean)),
  ].sort();

   const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Users</h2>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Roles</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              disabled={!selectedRole && !selectedStatus && !searchTerm}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedRole || selectedStatus || searchTerm) && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedRole && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Role: {selectedRole}
                <button
                  onClick={() => setSelectedRole("")}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedStatus && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Status: {selectedStatus}
                <button
                  onClick={() => setSelectedStatus("")}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
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

      {/* Users Table */}
      {filteredUsers.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Phone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    onClick={() => handleUserClick(user._id)}
                    className="hover:bg-blue-50 cursor-pointer transition-colors"
                    title="Click to view user details"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.firstName?.[0]?.toUpperCase() ||
                              user.name?.[0]?.toUpperCase() ||
                              "?"}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.name || "No Name"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role || "No Role"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone || "Unknown"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !error && (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <div className="text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4.002 4.002 0 01-3.5 2.25h.5"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {selectedRole || selectedStatus || searchTerm
                  ? "No users match your filters"
                  : "No users found"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedRole || selectedStatus || searchTerm
                  ? "Try adjusting your search criteria or clearing filters."
                  : "There are no users available to display."}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
