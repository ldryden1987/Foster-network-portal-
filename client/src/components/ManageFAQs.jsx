import { useState, useEffect } from 'react';

export default function ManageFAQs() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [faqs, setFaqs] = useState([]);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [loadingFaqs, setLoadingFaqs] = useState(true);

    // Fetch all FAQs when component loads
    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/faqs`);
            if (response.ok) {
                const data = await response.json();
                setFaqs(data);
            } else {
                setMessage('Error fetching FAQs');
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setLoadingFaqs(false);
        }
    };

    //Select FAQ Handler finds by faq_id
    const handleFaqSelect = (e) => {
        const faqId = e.target.value;
        if (faqId) {
            const faq = faqs.find(f => f._id === faqId);
            setSelectedFaq(faq);
        } else {
            setSelectedFaq(null);
        }
    };

    // Add FAQ Handler
    const handleAddFaq = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        const faqData = {
            question: data.question,
            answer: data.answer,
            category: data.category || 'general'
        };

        try {
            const sessionToken = localStorage.getItem('sessionToken');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/faqs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionToken
                },
                body: JSON.stringify(faqData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('FAQ created successfully!');
                setShowAddForm(false);
                event.target.reset();
                fetchFaqs();
                 // Refresh the page after successful creation
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

    // Update FAQ Handler
    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        const faqData = {
            question: data.question,
            answer: data.answer,
            category: data.category
        };

        try {
            const sessionToken = localStorage.getItem('sessionToken');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/faqs/${selectedFaq._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionToken
                },
                body: JSON.stringify(faqData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('FAQ updated successfully!');
                setShowUpdateForm(false);
                setSelectedFaq(null);
                fetchFaqs();
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

    // Delete FAQ Handler
    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete this FAQ: "${selectedFaq.question}"?`)) {
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const sessionToken = localStorage.getItem('sessionToken');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/faqs/${selectedFaq._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': sessionToken
                }
            });

            if (response.ok) {
                setMessage('FAQ deleted successfully!');
                setShowUpdateForm(false);
                setSelectedFaq(null);
                await fetchFaqs();
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
            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
                <button
                    className="flex-1 m-2 px-4 py-2 rounded bg-[#102542] text-[#CDD7D6] font-semibold cursor-pointer"
                    onClick={() => {
                        setShowAddForm(!showAddForm);
                        setShowUpdateForm(false);
                        setSelectedFaq(null);
                    }}
                >
                    {showAddForm ? "Close Add Form" : "Add FAQ"}
                </button>
                <button
                    className="flex-1 m-2 px-4 py-2 rounded bg-[#102542] text-[#CDD7D6] font-semibold cursor-pointer"
                    onClick={() => {
                        setShowUpdateForm(!showUpdateForm);
                        setShowAddForm(false);
                    }}
                >
                    {showUpdateForm ? "Close Update Form" : "Update/Delete FAQ"}
                </button>
            </div>

            {/* Success/Error message */}
            {message && (
                <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800 border border-blue-200">
                    {message}
                </div>
            )}

            {/* Add FAQ Form */}
            {showAddForm && (
                <div className="mb-8">
                    <h3 className="mb-4 text-lg font-semibold">Add New FAQ</h3>
                    <form onSubmit={handleAddFaq} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Category:</label>
                            <select
                                name="category"
                                required
                                className="p-2 rounded border dark:bg-black dark:text-white  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-blue-200 dark:focus:border-blue-500"
                            >
                                <option value="">Select Category</option>
                                <option value="General">General</option>
                                <option value="Adoption">Adoption</option>
                                <option value="Fostering">Fostering</option>
                                <option value="Pet Care">Pet Care</option>
                                <option value="Volunteering">Volunteering</option>
                                <option value="Donations">Donations</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Question:</label>
                            <input
                                type="text"
                                name="question"
                                placeholder="FAQ Question"
                                required
                                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Answer:</label>
                            <textarea
                                name="answer"
                                placeholder="FAQ Answer"
                                rows="4"
                                required
                                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="m-2 px-4 py-2 rounded bg-[#102542] text-[#CDD7D6] font-semibold cursor-pointer"
                        >
                            {loading ? 'Creating...' : 'Create FAQ'}
                        </button>
                    </form>
                </div>
            )}

            {/* Update/Delete FAQ Form */}
            {showUpdateForm && (
                <div>
                    <h3 className="mb-4 text-lg font-semibold">Update/Delete FAQ</h3>
                    <div className="mb-4 flex flex-col gap-1">
                        <label className="text-sm font-medium">Select FAQ to Update:</label>
                        <select
                            onChange={handleFaqSelect}
                            value={selectedFaq?._id || ''}
                            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">-- Select an FAQ --</option>
                            {loadingFaqs ? (
                                <option>Loading FAQs...</option>
                            ) : (
                                faqs.map((faq) => (
                                    <option key={faq._id} value={faq._id}>
                                        {faq.question}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    {selectedFaq && (
                        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Category:</label>
                                <select
                                    name="category"
                                    defaultValue={selectedFaq.category}
                                    required
                                    className="p-2 rounded border dark:bg-black dark:text-white  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-blue-200 dark:focus:border-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    <option value="General">General</option>
                                    <option value="Adoption">Adoption</option>
                                    <option value="Pet Care">Pet Care</option>
                                    <option value="Volunteering">Volunteering</option>
                                    <option value="Donations">Donations</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Question:</label>
                                <input
                                    type="text"
                                    name="question"
                                    defaultValue={selectedFaq.question}
                                    placeholder="FAQ Question"
                                    required
                                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Answer:</label>
                                <textarea
                                    name="answer"
                                    defaultValue={selectedFaq.answer}
                                    placeholder="FAQ Answer"
                                    rows="4"
                                    required
                                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60"
                                >
                                    {loading ? 'Updating...' : 'Update FAQ'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="flex-1 py-2 px-4 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
                                >
                                    {loading ? 'Deleting...' : 'Delete FAQ'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}