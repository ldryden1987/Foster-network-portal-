import { useState, useEffect } from "react";

export default function LongEditAnimal({ targetAnimal, modalId }) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    sex: "",
    age: "",
    intake: "",
    weight: "",
    shortDescription: "",
    longDescription: "",
    medicalNotes: "",
    tags: [],
    status: "initial",
    blobUrl: ""
  });

  //useEffect to populate form data when targetAnimal changes
  useEffect(() => {
    if (targetAnimal) {
      setFormData({
        name: targetAnimal.name || "",
        species: targetAnimal.species || "",
        breed: targetAnimal.breed || "",
        sex: targetAnimal.sex || "",
        age: targetAnimal.age || "",
        intake: targetAnimal.intake || "",
        weight: targetAnimal.weight || "",
        shortDescription: targetAnimal.shortDescription || "",
        longDescription: targetAnimal.longDescription || "",
        medicalNotes: targetAnimal.medicalNotes || "",
        tags: targetAnimal.tags || [],
        status: targetAnimal.status || "initial",
        blobUrl: targetAnimal.blobUrl || ""
      });
    }
  }, [targetAnimal]);

  //handleChange function to update form data state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <button
        className="btn max-w-100 mx-auto mb-8"
        onClick={(e) => {
          document.getElementById(modalId).showModal()
          e.preventDefault();
        }}
      >
        Edit
      </button>
      <dialog id={modalId} className="modal dark:hover:text-white" onClick={(e) => {

        }}>
        <div className="modal-box" onClick={(e) => {

          }}>
          <h3 className="font-bold text-lg"> Quick Edit </h3>
          <form
            className="flex flex-col items-center gap-y-3"
            onSubmit={async (event) => {
              event.preventDefault();
              // POST form data to server
              try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/animals/${targetAnimal._id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: formData.name,
                    species: formData.species,
                    breed: formData.breed,
                    sex: formData.sex,
                    age: formData.age,
                    intake: formData.intake,
                    weight: formData.weight,
                    shortDescription: formData.shortDescription,
                    longDescription: formData.longDescription,
                    medicalNotes: formData.medicalNotes,
                    tags: formData.tags,
                    status: formData.status,

                    blobUrl: formData.blobUrl,
                  }),
                });

                if (response.ok) {
                  // Ensure reload happens after everything is done
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                } else {
                  alert("Error updating animal. Please try again.");
                }
              } catch (err) {
                //TODO: add user friendly error handling
                console.log(err.message);
              }
            }}
          >
            <label htmlFor="name" className="label">
              Animal Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="Animal Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="species" className="label">
              Animal Species
            </label>
            <input
              id="species"
              className="input"
              type="text"
              placeholder="Species"
              value={formData.species}
              onChange={handleChange}
              required
            />

            <label htmlFor="breed" className="label">
              Animal Breed
            </label>
            <input
              id="breed"
              className="input"
              type="text"
              placeholder="Breed"
              value={formData.breed}
              onChange={handleChange}
              required
            />

            <label htmlFor="sex" className="label">
              Animal Sex
            </label>
            <input
              id="sex"
              className="input"
              type="text"
              placeholder="Sex"
              value={formData.sex}
              onChange={handleChange}
              required
            />

            <label htmlFor="age" className="label">
              Animal Age (years)
            </label>
            <input
              id="age"
              className="input"
              type="text"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label htmlFor="intake" className="label">
              Intake Date
            </label>
            <input
              id="intake"
              className="input"
              type="date"
              placeholder="YYYY-MM-DD"
              value={formData.intake}
              onChange={handleChange}
              required
            />

            <label htmlFor="weight" className="label">
              Animal Weight (lbs)
            </label>
            <input
              id="weight"
              className="input"
              type="text"
              placeholder="Weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />

            <label htmlFor="shortDescription" className="label">
              Animal Short Description
            </label>
            <input
              id="shortDescription"
              className="input"
              type="text"
              placeholder="Short Description"
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />

            <label htmlFor="longDescription" className="label">
              Animal Long Description
            </label>
            <input
              id="longDescription"
              className="input"
              type="text"
              placeholder="Long Description"
              value={formData.longDescription}
              onChange={handleChange}
              required
            />
            <label htmlFor="medicalNotes" className="label">
              Animal Medical Notes
            </label>
            <input
              id="medicalNotes"
              className="input"
              type="text"
              placeholder="Medical Notes"
              value={formData.medicalNotes}
              onChange={handleChange}
            />
            <label htmlFor="tags" className="label">
              Animal Tags (comma separated)
            </label>
            <input
              id="tags"
              className="input"
              type="text"
              placeholder="Tags"
              value={formData.tags.join(", ")}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(tag => tag.trim()) })}
              required
            />
            <label htmlFor="status" className="label">
              Animal Status
            </label>
            <select
              id="status"
                className="select select-bordered w-full max-w-xs"
                value={formData.status}
                onChange={handleChange}
                required
            >
                <option value="initial">Initial</option>
                <option value="Needs Adoption">Needs Adoption</option>
                <option value="Needs Foster">Needs Foster</option>
                <option value="Adopted">Adopted</option>
                <option value="Fostered">Fostered</option>
            </select>

            <button className="btn" type="submit">
              Submit Changes
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={(e) => {
                e.preventDefault()
                document.getElementById(modalId).close();
                }} className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
