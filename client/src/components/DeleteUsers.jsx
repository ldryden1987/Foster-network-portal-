import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";

export default function ManagerUserRoles() {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const { user } = useUser();

  // Filter users based on current user's permissions
  const getEligibleUsers = (allUsers, currentUserRole) => {
    switch (currentUserRole) {
      case "admin":
        return allUsers.filter(u => u.role !== "admin"); // Can delete all except admins
      case "manager":
        return allUsers.filter(u => u.role !== "admin" && u.role !== "manager"); // Can't modify admins or managers
      default:
        return [];
    }
  };

  const eligibleUsers = getEligibleUsers(users, user?.role);

  // Fetch all users based on role when component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/allUsers`,
        {
          headers: {
            'Authorization': sessionToken,
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        setMessage("Error fetching Users");
        setUsers([]);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Select User Handler finds by user_id
  const handleUserSelect = (e) => {
    const userId = e.target.value;
    if (userId) {
      const user = users.find((u) => u._id === userId);
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  // Change existing user's role
  const handleDeleteUser = async (event) => {
    event.preventDefault();
    if (!selectedUser) {
      setMessage("Please select a user.");
      return;
    }
    
    const formData = new FormData(event.currentTarget);
    const deleteUserId = formData.get("userId");
    
    if (!deleteUserId) {
      setMessage("Please select a user to delete.");
      return;
    }
    
    setLoading(true);
    setMessage("");

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/deleteUser/${deleteUserId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": sessionToken
          }
        }
      );

      if (response.ok) {
        setMessage(`Deleted User.`);
        fetchUsers();
        setSelectedUser(null);
        setShowDeleteForm(false);
      } else {
        const errorResult = await response.json();
        setMessage(`Failed to Delete User: ${errorResult.error || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-2 p-4 rounded-lg">
      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition"
          onClick={() => setShowDeleteForm(!showDeleteForm)}
        >
          {showDeleteForm ? "Cancel Delete" : "Delete Users"}
        </button>
      </div>

      {/* Success/Error message */}
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800 border border-blue-200">
          {message}
        </div>
      )}

      {/* Delete User Form */}
      {showDeleteForm && (
        <form onSubmit={handleDeleteUser}>
          <h3 className="mb-4 text-lg font-semibold">Delete User</h3>
          <div className="mb-4 flex flex-col gap-1">
            <label className="text-sm font-medium">
              Select User to Delete:
            </label>
            <select
              onChange={handleUserSelect}
              value={selectedUser?._id || ""}
              name="userId"
              required
              className="vp-2 rounded border dark:bg-black dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-blue-200 dark:focus:border-blue-500"
            >
              <option value="">-- Select a User --</option>
              {loadingUsers ? (
                <option>Loading users...</option>
              ) : eligibleUsers.length === 0 ? (
                <option>No users available to delete</option>
              ) : (
                eligibleUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email}) - {user.role}
                  </option>
                ))
              )}
            </select>
          </div>

          {selectedUser && (
            <div className="p-3 rounded bg-yellow-50 border border-yellow-200 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Confirm:</strong> Are you sure you want to delete <b>{selectedUser.name}</b> ({selectedUser.email})?
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !selectedUser}
            className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete User"}
          </button>
        </form>
      )}
    </div>
  );
}