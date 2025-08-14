
export default function DeleteAnimal({ targetAnimal, modalId }) {
  return (
    <div>
      <button
        className="btn max-w-100 mx-auto mb-8"
        onClick={(e) => {
          document.getElementById(modalId).showModal()
          e.preventDefault()
        }}
      >
        Delete
      </button>
      <dialog id={modalId} className="modal hover:text-white">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Animal</h3>
          <p>Are you sure you want to delete {targetAnimal.name}?</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={async () => {
                try {
                  const response = await fetch(
                    `${import.meta.env.VITE_SERVER_URL}/animals/${targetAnimal._id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (response.ok) {
                    document.getElementById(modalId).close();
                    window.location.reload(); // Refresh the page to see changes
                  } else {
                    console.error("Failed to delete animal");
                  }
                } catch (error) {
                  console.error("Error deleting animal:", error);
                }
              }}
            >
              Confirm Delete
            </button>
            <button
              className="btn"
              onClick={(e) => {
                document.getElementById(modalId).close();
                e.preventDefault();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}