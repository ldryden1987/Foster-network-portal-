import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";

export default function UploadAnimal() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);

  return (
    <div>
      {/* needs authentication */}
        <form
          className="flex flex-col items-center gap-y-3"
          onSubmit={async (event) => {
            event.preventDefault();

            const file = inputFileRef.current.files[0];

            const newBlob = await upload(file.name, file, {
              access: "public",
              handleUploadUrl: `${import.meta.env.VITE_SERVER_URL}/upload`,
            });

            setBlob(newBlob);
            
             try {
            fetch(`${import.meta.env.VITE_SERVER_URL}/animals`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
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
            })} catch (err) {
                console.log(err.message);
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
          <input id="animalName"className="input"type="text" placeholder="Animal Name" required/>

          <label htmlFor="animalSpecies" className="label">Animal Species</label>
          <input id="animalSpecies" className="input"type="text" placeholder="Species" required/>

          <label htmlFor="animalBreed" className="label">Animal Breed</label>
          <input id="animalBreed" className="input"type="text" placeholder="Breed" required/> 

          <label htmlFor="animalSex"className="label">Animal Sex</label>  
          <input id="animalSex" className="input"type="text" placeholder="Sex" required/> 
          
          <label htmlFor="animalAge" className="label">Animal Age (years)</label>
          <input id="animalAge" className="input"type="text" placeholder="Age" required/> 

          <label htmlFor="intakeDate" className="label">Intake Date</label>
          <input id="intakeDate" className="input"type="text" placeholder="YYYY-MM-DD" required/> 
          {/* eventualy add calendar for easy date picking, for now must be YYYY-MM-DD */}

          <label htmlFor="animalWeight"className="label">Animal Weight (lbs)</label>
          <input id="animalWeight" className="input"type="text" placeholder="Weight" required/> 

          <label htmlFor="animalDescription"className="label">Animal Description </label>  
          <input id="animalDescription" className="input"type="text" placeholder="Description" required/>

          <button className="btn" type="submit">Upload</button>
        </form>
    </div>
  );
}
