import { useState, useEffect } from "react";

export default function ManageResource() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [loadingResources, setLoadingResources] = useState(true);

  // Fetch all resources when component loads
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/resources`
      );
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      } else {
        setMessage("Error fetching resources");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoadingResources(false);
    }
  };

  //Select Resource Handler finds by resource_id
  const handleResourceSelect = (e) => {
    const resourceId = e.target.value;
    if (resourceId) {
      const resource = resources.find((r) => r._id === resourceId);
      setSelectedResource(resource);
    } else {
      setSelectedResource(null);
    }
  };

  // Add Resource Handler
  const handleAddResource = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const resourceData = {
      name: data.name,
      description: data.description,
      category: data.category || "general",
      url: data.url,
    };

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/resources`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionToken,
          },
          body: JSON.stringify(resourceData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Resource created successfully!");
        setShowAddForm(false);
        event.target.reset();
        fetchResources();
        // // Refresh the page after successful creation
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (err) {
      setMessage(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update Resource Handler
  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const resourceData = {
      name: data.name,
      description: data.description,
      category: data.category,
      url: data.url,
    };

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/resources/${selectedResource._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionToken,
          },
          body: JSON.stringify(resourceData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Resource updated successfully!");
        setShowUpdateForm(false);
        setSelectedResource(null);
        fetchResources();
        // Refresh the page after successful creation
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (err) {
      setMessage(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete Resource Handler
  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${selectedResource.name}"?`
      )
    ) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/resources/${selectedResource._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: sessionToken,
          },
        }
      );

      if (response.ok) {
        setMessage("Resource deleted successfully!");
        setShowUpdateForm(false);
        setSelectedResource(null);
        await fetchResources();
        // Refresh the page after successful creation
        setTimeout(() => window.location.reload(), 1000);
      } else {
        const result = await response.json();
        setMessage(`Error: ${result.error}`);
      }
    } catch (err) {
      setMessage(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-2 p-4 rounded-lg">
      {/* /* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition"
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowUpdateForm(false);
            setSelectedResource(null);
          }}
        >
          {showAddForm ? "Close Add Form" : "Add Resource"}
        </button>
        <button
          className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition"
          onClick={() => {
            setShowUpdateForm(!showUpdateForm);
            setShowAddForm(false);
          }}
        >
          {showUpdateForm ? "Close Update Form" : "Update/Delete Resource"}
        </button>
      </div>

      {/* Success/Error message */}
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800 border border-blue-200">
          {message}
        </div>
      )}

      {/* Add Resource Form */}
      {showAddForm && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Add New Resource</h3>
          <form onSubmit={handleAddResource} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Category:</label>
              <select
                name="category"
                required
                className="p-2 rounded border dark:bg-black dark:text-white  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-blue-200 dark:focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="Pet Care">Pet Care</option>
                <option value="Emergency">Emergency</option>
                <option value="Forms">Forms</option>
                <option value="Training">Training</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium ">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Resource Title"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Description:</label>
              <textarea
                name="description"
                placeholder="Brief Description of Resource"
                rows="3"
                required
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">URL:</label>
              <input
                type="url"
                name="url"
                placeholder="Link for Resource"
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition"
            >
              {loading ? "Creating..." : "Create Resource"}
            </button>
          </form>
        </div>
      )}

      {/* Update/Delete Resource Form */}
      {showUpdateForm && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Update/Delete Resource</h3>
          <div className="mb-4 flex flex-col gap-1">
            <label className="text-sm font-medium">
              Select Resource to Update:
            </label>
            <select
              onChange={handleResourceSelect}
              value={selectedResource?._id || ""}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Select a Resource --</option>
              {loadingResources ? (
                <option>Loading resources...</option>
              ) : (
                resources.map((resource) => (
                  <option key={resource._id} value={resource._id}>
                    {resource.name}
                  </option>
                ))
              )}
            </select>
          </div>
          {selectedResource && (
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Category:
                </label>
                <select
                  name="category"
                  defaultValue={selectedResource.category}
                  required
                  className="p-2 rounded border dark:bg-black dark:text-white  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-blue-200 dark:focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="Pet Care">Pet Care</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Forms">Forms</option>
                  <option value="Training">Training</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedResource.name}
                  placeholder="Resource Title"
                  required
                  className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description:</label>
                <textarea
                  name="description"
                  defaultValue={selectedResource.description}
                  placeholder="Brief Description of Resource"
                  rows="3"
                  required
                  className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  URL:
                </label>
                <input
                  type="url"
                  name="url"
                  defaultValue={selectedResource.url}
                  placeholder="Link for Resource"
                  className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded bg-green-600 font-semibold hover:bg-green-700 transition disabled:opacity-60"
                >
                  {loading ? "Updating..." : "Update Resource"}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded bg-red-600 font-semibold hover:bg-red-700 transition disabled:opacity-60"
                >
                  {loading ? "Deleting..." : "Delete Resource"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
