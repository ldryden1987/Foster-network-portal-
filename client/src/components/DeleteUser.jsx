import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteUser({ userId, userName, onDeleteSuccess }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    console.log("Delete button clicked!"); 
    console.log("Current isConfirmOpen:", isConfirmOpen);
    setIsConfirmOpen(true);
    console.log("Setting isConfirmOpen to true");
    setError("");
  };

  const handleConfirmDelete = async () => {
    if (!userId) {
      setError("No user ID provided");
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const sessionToken = localStorage.getItem("sessionToken");
      console.log("Session token:", sessionToken);
      console.log("User ID to delete:", userId);

      if (!sessionToken) {
        setError("Please log in to delete users");
        navigate("/signin");
        return;
      }

      const url = `${import.meta.env.VITE_SERVER_URL}/userUpdate/user/${userId}`;
      console.log("Delete URL:", url);

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: sessionToken,
          'Content-Type': 'application/json',
        },
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        console.log("User deleted successfully:", result);
        
        // Close confirmation modal
        setIsConfirmOpen(false);
        
        // Call success callback if provided
        if (onDeleteSuccess) {
          onDeleteSuccess(userId, result);
        } else {
          // Default behavior - navigate back to dashboard
          navigate("/dashboard", { 
            state: { 
              message: `User ${userName || userId} deleted successfully`,
              type: "success"
            }
          });
        }
      } else {
        console.error("Delete failed:", result);
        setError(result.error || `Error ${response.status}: Failed to delete user`);

        if (response.status === 401) {
          navigate("/signin");
        } else if (response.status === 403) {
          setError("You don't have permission to delete users");
        }
      }
    } catch (err) {
      console.error("Delete user error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setError("");
  };

  console.log("Current component state:", { 
  isConfirmOpen, 
  isDeleting, 
  error, 
  userId, 
  userName 
});

  return (
    <div>
      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400 transition-colors"
      >
        {isDeleting ? "Deleting..." : "Delete User"}
      </button>

      {/* Error Display */}
      {error && (
        <div className="mt-2 p-2 bg-red-50 text-red-800 border border-red-200 rounded text-sm">
          {error}
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete User
                </h3>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {userName || `user ${userId}`}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400 transition-colors"
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </div>
                ) : (
                  "Yes, Delete"
                )}
              </button>
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}