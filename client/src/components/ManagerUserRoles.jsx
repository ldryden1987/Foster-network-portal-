import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";

export default function ManagerUserRoles() {
  const [showPromoteForm, setShowPromoteForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const { user } = useUser();

  // Define role hierarchy based on current user's role
  const getRoleOptions = (currentUserRole) => {
    switch (currentUserRole) {
      case "admin":
        return [
          { value: "manager", label: "Manager" },
          { value: "staff", label: "Staff" },
          { value: "foster", label: "Foster" },
          { value: "adopter", label: "Adopter" },
          { value: "initial", label: "Initial" }
        ];
      case "manager":
        return [
          { value: "staff", label: "Staff" },
          { value: "foster", label: "Foster" },
          { value: "adopter", label: "Adopter" },
          { value: "initial", label: "Initial" }
        ];
      case "staff":
        return [
          { value: "foster", label: "Foster" },
          { value: "adopter", label: "Adopter" },
          { value: "initial", label: "Initial" }
        ];
      default:
        return [];
    }
  };

  // Filter users based on current user's permissions
  const getEligibleUsers = (allUsers, currentUserRole) => {
    switch (currentUserRole) {
      case "admin":
        return allUsers.filter(u => u.role !== "admin"); // Can modify all except admins
      case "manager":
        return allUsers.filter(u => u.role !== "admin" && u.role !== "manager"); // Can't modify admins or managers
      case "staff":
        return allUsers.filter(u => u.role !== "admin" && u.role !== "manager" && u.role !== "staff"); // Can't modify admins, managers, or staff
      default:
        return [];
    }
  };

  const eligibleUsers = getEligibleUsers(users, user?.role);
  const roleOptions = getRoleOptions(user?.role);

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
  const handleChangeRole = async (event) => {
    event.preventDefault();
    if (!selectedUser) {
      setMessage("Please select a user.");
      return;
    }
    
    const formData = new FormData(event.currentTarget);
    const newRole = formData.get("role");
    
    if (!newRole) {
      setMessage("Please select a role.");
      return;
    }
    
    setLoading(true);
    setMessage("");

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/updateUser/${selectedUser._id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": sessionToken
          },
          body: JSON.stringify({ 
            role: newRole, 
            status: 'approved' 
          }),
        }
      );

      if (response.ok) {
        setMessage(`${selectedUser.firstName}'s role changed to ${newRole}.`);
        fetchUsers();
        setSelectedUser(null);
        setShowPromoteForm(false);
      } else {
        const errorResult = await response.json();
        setMessage(`Failed to change user role: ${errorResult.error || 'Unknown error'}`);
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
          onClick={() => {
            setShowPromoteForm(!showPromoteForm);
          }}
        >
          {showPromoteForm ? "Cancel Change" : "Change User Role"}
        </button>
      </div>

      {/* Success/Error message */}
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800 border border-blue-200">
          {message}
        </div>
      )}

      {/* Change User Form */}
      {showPromoteForm && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Change User Role</h3>
          <div className="mb-4 flex flex-col gap-1">
            <label className="text-sm font-medium">
              Select User:
            </label>
            <select
              onChange={handleUserSelect}
              value={selectedUser?._id || ""}
              className="vp-2 rounded border dark:bg-black dark:text-white  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-blue-200 dark:focus:border-blue-500"
            >
              <option value="">-- Select a User --</option>
              {loadingUsers ? (
                <option>Loading users...</option>
              ) : eligibleUsers.length === 0 ? (
                <option>No users available to modify</option>
              ) : (
                eligibleUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email}) - Current: {user.role}
                  </option>
                ))
              )}
            </select>
          </div>
          
          {selectedUser && (
            <form onSubmit={handleChangeRole} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  New Role:
                </label>
                <select
                  name="role"
                  required
                  className="vp-2 rounded border dark:bg-black dark:text-white  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-blue-200 dark:focus:border-blue-500"
                >
                  <option value="">-- Select New Role --</option>
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="p-3 rounded bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Confirm:</strong> Change {selectedUser.firstName}'s role from {selectedUser.role} to the selected role?
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Changing Role..." : "Change Role"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}