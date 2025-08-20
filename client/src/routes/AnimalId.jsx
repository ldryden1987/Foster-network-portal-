import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LongEditAnimal from "../components/LongEditAnimal";
import DeleteAnimal from "../components/DeleteAnimal";
import { useUser } from "../context/UserContext";

export default function AnimalId() {
  const { animalId } = useParams();
  const [animal, setAnimal] = useState([]);
  const { user } = useUser();
console.log(animalId, "animalId");
  useEffect(() => {
    async function doFetch() {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/animals/${animalId}`
      );
      if (response.ok) {
        const result = await response.json();
        setAnimal(result.foundAnimal);
      }
    }

    doFetch();
  }, []);
  console.log(animal, "animal");
  const canUploadAnimals = () => {
    return user && (user.role === "admin" || user.role === "manager" || user.role === "staff");
  };
  return (
    <div className="dark:bg-[#102542] relative">
      <Header />
      <Nav />
      
      {canUploadAnimals() && (
      <div className="absolute right-2 flex gap-2">
        <LongEditAnimal
          targetAnimal={animal}
          modalId={`edit_modal_${animal._id}`}
        />
        <DeleteAnimal
          targetAnimal={animal}
          modalId={`delete_modal_${animal._id}`}
        />
      </div>
      )} 

      <main className="grid grid-cols-4 items-center justify-items-center">
        <span className="card flex flex-col bg-base-100 mb-4 ">
          <h1 className="text-center text-2xl font-bold my-2">{animal.name}</h1>
          <figure
            style={{ backgroundImage: `url(${animal.blobUrl})` }}
            className="h-96 w-96 bg-cover bg-center m-10"
          />
          <main>
            <span className="flex flex-col gap-2 col-span-3 m-10">
              <div>Status: {animal.status || "Unknown"}</div>
              <div>Apporximate Age: {(animal.age>1?animal.age+" years old": animal.age+" year old") || "Unknown"}</div> 
              <div>Species: {animal.species || "Unknown"}</div>
              <div>Breed: {animal.breed || "Unknown"}</div>
              <div>{animal.shortDescription}</div>
              </span>
          </main>
          <NavLink to={`/apply`} className={"btn bg-[#F87060] text-[#102542]"}>
            <button> Adopt {animal.name}</button>
          </NavLink>
        </span>

        <span className="grid grid-rows-2 gap-2 col-span-3 m-10">
          <div>
            <h1>Animal Description:</h1>
            {animal.longDescription || `No Description for ${animal.name}`}
          </div>
          <div>
            <h1>Medical Notes:</h1>
            {animal.medicalNotes || `No Medical Notes for ${animal.name}`}
          </div>
        </span>

      </main>
      <Footer />
    </div>
  );
}
