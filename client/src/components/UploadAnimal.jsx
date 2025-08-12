import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";

export default function UploadAnimal() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  return (
    <div>
      {error && (
        <div className="text-red-600 font-bold text-center mb-4">
          {error}
        </div>
      )}
      
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

            const file = inputFileRef.current.files[0];

            const newBlob = await upload(file.name, file, {
              access: "public",
              handleUploadUrl: `${import.meta.env.VITE_SERVER_URL}/upload`,
            });

            setBlob(newBlob);
            
            // Added auth for authenctation middelware
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/animals`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionToken,
              },
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
              console.log("Animal uploaded successfully:", result);
              event.target.reset(); // Reset form
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
        <input id="intakeDate" className="input" type="text" placeholder="YYYY-MM-DD" required/> 

        <label htmlFor="animalWeight" className="label">Animal Weight (lbs)</label>
        <input id="animalWeight" className="input" type="text" placeholder="Weight" required/> 

        <label htmlFor="animalDescription" className="label">Animal Description</label>  
        <input id="animalDescription" className="input" type="text" placeholder="Description" required/>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
