import { useState, useEffect } from "react";

export default function ManagePasswords() {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);

    // Filter out admin users from the list
  const filteredUsers = users.filter(user => user.role !== 'admin');

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
            Authorization: sessionToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.users || []);
      } else {
        setMessage("Error fetching Users");
        setUsers([]); // Set empty array on error
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setUsers([]); // Set empty array on error
    } finally {
      setLoadingUsers(false);
    }
  };

  //Select User Handler finds by user_id
  const handleUserSelect = (e) => {
    const userId = e.target.value;
    if (userId) {
      const user = users.find((r) => r._id === userId);
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  //reset password
  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const newPassword = data.newPassword;

    if (!newPassword) {
      setMessage("Please enter a new password.");
      setLoading(false);
      return;
    }

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/userUpdate/resetPasswordAdmin/${selectedUser._id}`;

      const requestBody = { newPassword: newPassword };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionToken,
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();

      if (response.ok) {
        try {
          const result = JSON.parse(responseText);
          setMessage("Password reset successfully.");
          event.target.reset();
          fetchUsers();
        } catch (parseError) {
          setMessage("Success but invalid response format");
        }
      } else {
        try {
          const errorResult = JSON.parse(responseText);
          setMessage(
            `Failed to reset password: ${errorResult.error || "Unknown error"}`
          );
        } catch (parseError) {
          setMessage(
            `Failed to reset password: ${response.status} - ${responseText}`
          );
        }
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-2 p-4 rounded-lg">
      {/* Action Button */}
      <div className="flex gap-4 mb-6">
        <button
          className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition"
          onClick={() => {
            setShowUpdateForm(!showUpdateForm);
          }}
        >
          {showUpdateForm ? "Close Reset Password" : "Reset Password"}
        </button>
      </div>

      {/* Success/Error message */}
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800 border border-blue-200">
          {message}
        </div>
      )}

      {/*Reset Password Form */}
      {showUpdateForm && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Reset User Password</h3>
          <div className="mb-4 flex flex-col gap-1">
            <label className="text-sm font-medium">Select User:</label>
            <select
              onChange={handleUserSelect}
              value={selectedUser?._id || ""}
              className="vp-2 rounded border dark:bg-black dark:text-white  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-blue-200 dark:focus:border-blue-500"
            >
              <option value="">-- Select a User --</option>
              {loadingUsers ? (
                <option>Loading users...</option>
              ) : (
                filteredUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))
              )}
            </select>
          </div>
          {selectedUser && (
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
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
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
