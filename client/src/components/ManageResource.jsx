import { useState, useEffect } from 'react';

export default function ManageResource() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);
    const [loadingResources, setLoadingResources] = useState(true);

    // Fetch all resources when component loads
    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/resources`);
            if (response.ok) {
                const data = await response.json();
                setResources(data);
            } else {
                setMessage('Error fetching resources');
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
            const resource = resources.find(r => r._id === resourceId);
            setSelectedResource(resource);
        } else {
            setSelectedResource(null);
        }
    };

    // Add Resource Handler
    const handleAddResource = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        const resourceData = {
            name: data.name,
            description: data.description,
            category: data.category || 'general',
            url: data.url
        };

        try {
            const sessionToken = localStorage.getItem('sessionToken');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/resources`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionToken
                },
                body: JSON.stringify(resourceData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Resource created successfully!');
                setShowAddForm(false);
                event.target.reset();
                fetchResources();
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
        setMessage('');

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        const resourceData = {
            name: data.name,
            description: data.description,
            category: data.category,
            url: data.url
        };

        try {
            const sessionToken = localStorage.getItem('sessionToken');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/resources/${selectedResource._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionToken
                },
                body: JSON.stringify(resourceData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Resource updated successfully!');
                setShowUpdateForm(false);
                setSelectedResource(null);
                fetchResources();
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
        if (!window.confirm(`Are you sure you want to delete "${selectedResource.name}"?`)) {
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const sessionToken = localStorage.getItem('sessionToken');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/resources/${selectedResource._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': sessionToken
                }
            });

            if (response.ok) {
                setMessage('Resource deleted successfully!');
                setShowUpdateForm(false);
                setSelectedResource(null);
                await fetchResources();
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
        <div style={{ maxWidth: 500, margin: "2rem auto", padding: "2rem", background: "#f9f9f9", borderRadius: 8, boxShadow: "0 2px 8px #0001" }}>
            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <button 
                    style={{ flex: 1, padding: "0.5rem 1rem", borderRadius: 4, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}
                    onClick={() => {
                        setShowAddForm(!showAddForm);
                        setShowUpdateForm(false);
                        setSelectedResource(null);
                    }}
                >
                    {showAddForm ? "Close Add Form" : "Add Resource"}
                </button>
                
                <button 
                    style={{ flex: 1, padding: "0.5rem 1rem", borderRadius: 4, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}
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
                <div style={{ marginBottom: "1rem", padding: "0.75rem", borderRadius: 4, background: "#e0f7fa", color: "#00796b" }}>
                    {message}
                </div>
            )}

            {/* Add Resource Form */}
            {showAddForm && (
                <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ marginBottom: "1rem" }}>Add New Resource</h3>
                    <form onSubmit={handleAddResource} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                            <label>Category:</label>
                            <select name="category" required style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}>
                                <option value="">Select Category</option>
                                <option value="General">General</option>
                                <option value="Pet Care">Pet Care</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Forms">Forms</option>
                                <option value="Training">Training</option>
                            </select>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Resource Title"
                                required
                                style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                            <label>Description:</label>
                            <textarea
                                name="description"
                                placeholder="Brief Description of Resource"
                                rows="3"
                                required
                                style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                            <label>URL:</label>
                            <input
                                type="url"
                                name="url"
                                placeholder="Link for Resource"
                                style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                            />
                        </div>
                        <button type="submit" disabled={loading}
                            style={{ padding: "0.5rem 1rem", borderRadius: 4, border: "none", background: "#1976d2", color: "#fff", cursor: "pointer" }}>
                            {loading ? 'Creating...' : 'Create Resource'}
                        </button>
                    </form>
                </div>
            )}

            {/* Update/Delete Resource Form */}
            {showUpdateForm && (
                <div>
                    <h3 style={{ marginBottom: "1rem" }}>Update/Delete Resource</h3>
                    
                    <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <label>Select Resource to Update:</label>
                        <select
                            onChange={handleResourceSelect}
                            value={selectedResource?._id || ''}
                            style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
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
                        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                <label>Category:</label>
                                <select
                                    name="category"
                                    defaultValue={selectedResource.category}
                                    required
                                    style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">Select Category</option>
                                    <option value="General">General</option>
                                    <option value="Pet Care">Pet Care</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="Forms">Forms</option>
                                    <option value="Training">Training</option>
                                </select>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={selectedResource.name}
                                    placeholder="Resource Title"
                                    required
                                    style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    defaultValue={selectedResource.description}
                                    placeholder="Brief Description of Resource"
                                    rows="3"
                                    required
                                    style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                <label>URL:</label>
                                <input
                                    type="url"
                                    name="url"
                                    defaultValue={selectedResource.url}
                                    placeholder="Link for Resource"
                                    style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                                />
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <button type="submit" disabled={loading}
                                    style={{ flex: 1, padding: "0.5rem 1rem", borderRadius: 4, border: "none", background: "#388e3c", color: "#fff", cursor: "pointer" }}>
                                    {loading ? 'Updating...' : 'Update Resource'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                    style={{ flex: 1, padding: "0.5rem 1rem", borderRadius: 4, border: "none", background: "#d32f2f", color: "#fff", cursor: "pointer" }}
                                >
                                    {loading ? 'Deleting...' : 'Delete Resource'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}