import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";

export default function UploadAnimal() {
  const inputFileRef = useRef(null);
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  return (
    <div>
      {error && (
        <div className="text-red-600 font-bold text-center mb-4">
          {error}
        </div>
      )}
      <button
          className="btn max-w-100 mx-auto mb-8"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Upload New Animal
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Upload New Animal</h3>
      <form
        className="flex flex-col items-center gap-y-3"
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setError("");

          try {
            // Get session token from localStorage
            const sessionToken = localStorage.getItem("sessionToken");
            
            if (!sessionToken) {
              setError("You must be logged in to upload animals");
              setLoading(false);
              return;
            }

            //access the file from the image input ref
            const file = inputFileRef.current.files[0];

            //initialize upload to vercel blob storage
            const newBlob = await upload(file.name, file, {

              //must be public to be viewable on the web
              access: "public",

              //post request to server to get a signed url for upload
              handleUploadUrl: `${import.meta.env.VITE_SERVER_URL}/upload`,
            });
            
            // POST form data to server
            // Added auth for authenctation middelware 
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/animals`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionToken,
              },

              //converts form data to json
              body: JSON.stringify({ 
                name: event.target.animalName.value,
                species: event.target.animalSpecies.value,
                breed: event.target.animalBreed.value,
                sex: event.target.animalSex.value,
                age: event.target.animalAge.value,
                intake: event.target.intakeDate.value,
                weight: event.target.animalWeight.value,
                description: event.target.animalDescription.value,
                blobUrl: newBlob.url
              }),
            });

            if (response.ok) {
              const result = await response.json();
              // Ensure reload happens after everything is done
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
              setBlob(null);
            } else {
              const errorData = await response.json();
              setError(errorData.error || "Failed to upload animal");
            }

          } catch (err) {
            console.error("Upload error:", err);
            setError(`Upload failed: ${err.message}`);
          } finally {
            setLoading(false);
          }
        }}
      >
        <label htmlFor="file" className="label">Upload Animal Image</label>
        <input
          id="file"
          ref={inputFileRef}
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          required
        />

          {/* inputs and labels for the rest of animal data */}
        <label htmlFor="animalName" className="label">Animal Name</label>
        <input id="animalName" className="input" type="text" placeholder="Animal Name" required/>

        <label htmlFor="animalSpecies" className="label">Animal Species</label>
        <input id="animalSpecies" className="input" type="text" placeholder="Species" required/>

        <label htmlFor="animalBreed" className="label">Animal Breed</label>
        <input id="animalBreed" className="input" type="text" placeholder="Breed" required/> 

        <label htmlFor="animalSex" className="label">Animal Sex</label>  
        <input id="animalSex" className="input" type="text" placeholder="Sex" required/> 
        
        <label htmlFor="animalAge" className="label">Animal Age (years)</label>
        <input id="animalAge" className="input" type="text" placeholder="Age" required/> 

        <label htmlFor="intakeDate" className="label">Intake Date</label>
        <input id="intakeDate" className="input" type="date" placeholder="YYYY-MM-DD" required/> 

        <label htmlFor="animalWeight" className="label">Animal Weight (lbs)</label>
        <input id="animalWeight" className="input" type="text" placeholder="Weight" required/> 

        <label htmlFor="animalDescription" className="label">Animal Description</label>  
        <input id="animalDescription" className="input" type="text" placeholder="Description" required/>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
        <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
    </div>
  );
}
