import { useState, useEffect } from "react";

export default function CreateStaff() {
  // State variables
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [message, setMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

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
        const users = data.users;
        setUsers(users);
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

  // Create new Staff
  const handleCreateStaff = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    // Add manager role to the data
    data.role = "staff";
    data.status = "approved";

    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      setMessage("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setMessage("Staff created successfully.");
        fetchUsers();
        event.target.reset();
        setShowCreateForm(false);
      } else {
        const errorResult = await response.json();
        setMessage(
          `Failed to create Staff: ${errorResult.error || "Unknown error"}`
        );
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
            setShowCreateForm(!showCreateForm);
          }}
        >
          {showCreateForm ? "Cancel Create" : "Create New Staff"}
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
          <h3 className="mb-4 text-lg font-semibold">Create New Staff</h3>
          <form onSubmit={handleCreateStaff} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">First Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Last Name:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
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
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Address 1:</label>
              <input
                type="string"
                name="street1"
                placeholder="Address 1"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Address 2 :</label>
              <input
                type="string"
                name="street2"
                placeholder="Address 2"
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">City:</label>
              <input
                type="string"
                name="city"
                placeholder="City"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">State:</label>
              <input
                type="string"
                name="state"
                required
                placeholder="State"
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Zip Code:</label>
              <input
                type="string"
                name="zip"
                placeholder="Zip Code"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Phone Number:</label>
              <input
                type="string"
                name="phone"
                placeholder="Phone Number"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Staff"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
