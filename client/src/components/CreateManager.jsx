import { useState, useEffect } from "react";

export default function CreateManager() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPromoteForm, setShowPromoteForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);

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
        console.log("API Response:", data);
        // Filter out admin and manager users - only show staff users for promotion
        const staffUsers = (data.users || []).filter(user => user.role === 'staff');
        setUsers(staffUsers);
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

  //Select User Handler finds by user_id
  const handleUserSelect = (e) => {
    const userId = e.target.value;
    if (userId) {
      const user = users.find((u) => u._id === userId);
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  // Create new manager
  const handleCreateManager = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    // Add manager role to the data
    data.role = 'manager';

    if (!data.name || !data.email || !data.password) {
      setMessage("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/addUser`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": sessionToken
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setMessage("Manager created successfully.");
        fetchUsers();
        event.target.reset();
        setShowCreateForm(false);
      } else {
        const errorResult = await response.json();
        setMessage(`Failed to create manager: ${errorResult.error || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Promote existing user to manager
  const handlePromoteToManager = async (event) => {
    event.preventDefault();
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
          body: JSON.stringify({ role: 'manager' }),
        }
      );

      if (response.ok) {
        setMessage(`${selectedUser.name} has been promoted to Manager.`);
        fetchUsers();
        setSelectedUser(null);
        setShowPromoteForm(false);
      } else {
        const errorResult = await response.json();
        setMessage(`Failed to promote user: ${errorResult.error || 'Unknown error'}`);
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
          className="flex-1 px-4 py-2 rounded bg-[#102542] text-[#CDD7D6] font-semibold cursor-pointer"
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setShowPromoteForm(false);
            setSelectedUser(null);
          }}
        >
          {showCreateForm ? "Cancel Create" : "Create New Manager"}
        </button>
        <button
          className="flex-1 px-4 py-2 rounded bg-[#102542] text-[#CDD7D6] font-semibold cursor-pointer"
          onClick={() => {
            setShowPromoteForm(!showPromoteForm);
            setShowCreateForm(false);
          }}
        >
          {showPromoteForm ? "Cancel Promote" : "Promote to Manager"}
        </button>
      </div>

      {/* Success/Error message */}
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800 border border-blue-200">
          {message}
        </div>
      )}

      {/* Create New Manager Form */}
      {showCreateForm && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Create New Manager</h3>
          <form onSubmit={handleCreateManager} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Manager Name"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Manager Email"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Initial Password"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Manager"}
            </button>
          </form>
        </div>
      )}

      {/* Promote to Manager Form */}
      {showPromoteForm && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Promote Staff to Manager</h3>
          <div className="mb-4 flex flex-col gap-1">
            <label className="text-sm font-medium">
              Select Staff Member:
            </label>
            <select
              onChange={handleUserSelect}
              value={selectedUser?._id || ""}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Select a Staff Member --</option>
              {loadingUsers ? (
                <option>Loading users...</option>
              ) : users.length === 0 ? (
                <option>No staff members available</option>
              ) : (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))
              )}
            </select>
          </div>
          {selectedUser && (
            <form onSubmit={handlePromoteToManager} className="flex flex-col gap-4">
              <div className="p-3 rounded bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Confirm:</strong> Promote {selectedUser.name} to Manager role?
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Promoting..." : "Promote to Manager"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}