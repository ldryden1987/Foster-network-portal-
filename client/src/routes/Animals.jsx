import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import UploadAnimal from "../components/UploadAnimal";
import { useUser } from "../context/UserContext.jsx"
import EditAnimal from "../components/EditAnimal";
import DeleteAnimal from "../components/DeleteAnimal";
import { NavLink } from "react-router-dom";

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const { user } = useUser();

  //get request to fetch all animals from mongodb on load
  useEffect(() => {
    async function doFetch() {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/animals`
      );
      if (response.ok) {
        const result = await response.json();
        setAnimals(result.foundAnimals);
      }
    }

    doFetch();
  }, []);

    // Helper function to check if user can upload animals
  const canUploadAnimals = () => {
    return user && (user.role === "admin" || user.role === "manager" || user.role === "staff");
  };


  return (
    <div className="dark:bg-[#102542]">
      <Header />
      <Nav />
      <main className="flex flex-col m-2 ">
        <h1 className="text-center text-2xl font-bold my-4">Animals</h1>
        <p className="text-center mb-10">
          Here you can find all the animals available for adoption and foster.
        </p>
        {canUploadAnimals() && (
          <div className="flex justify-center mb-8">
            <UploadAnimal />
          </div>
        )}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">

            {animals.length > 0 ? animals.map((animal) => { 
              // creates a card for each animal object fetched from the db

              //creates a unique modal id for each edit modal
              const modalId = `edit_modal_${animal._id}`;

              //returns a card for each animal fetched
              return (
                <div
                  key={animal._id}
                  className="card flex flex-col w-96 h-[32rem] bg-base-100 mb-8 hover:shadow-md dark:shadow-[#F87060] relative group"
                  style={{ minWidth: '24rem', minHeight: '32rem' }}
                >

                  {/* Image as background */}
                  {canUploadAnimals() && (
                  /* Edit and delete tools in top-right corner */
                  <div className="absolute top-2 right-2 z-10">
                    <div className="flex justify-end gap-2">
                    {canUploadAnimals() && (
                      <>
                        <DeleteAnimal targetAnimal={animal} modalId={`delete_modal_${animal._id}`} />
                        <EditAnimal targetAnimal={animal} modalId={modalId} />
                      </>
                    )}
                    </div>
                  </div>
                    )}

                  <NavLink to={`/animals/${animal._id}`} className="no-underline w-full h-full" key={animal._id}>
                    <figure style={{backgroundImage: `url(${animal.blobUrl})`}} className="h-64 bg-cover bg-center group-hover:bg-[#F87060]"/>
                    {/* Animal details */}
                    <div className="card-body shadow-lg flex-1 flex flex-col justify-between bg-base-100 group-hover:bg-[#F87060] group-hover:text-[#102542]">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <h2 className="card-title mb-4 group-hover:text-[#102542]">{animal.name}</h2>
                          <p className="mb-2 group-hover:text-[#102542]">Status: {animal.status}</p>
                          <p className="mb-2 group-hover:text-[#102542]">Species: {animal.species}</p>
                          <p className="mb-2 group-hover:text-[#102542]">Breed: {animal.breed}</p>
                          <p className="mb-2 group-hover:text-[#102542]">Sex: {animal.sex}</p>
                          <p className="mb-2 group-hover:text-[#102542]">Approximate Age: {animal.age} {animal.age>1?"years":"year"}</p>
                          <p className="mb-2 group-hover:text-[#102542]">Weight: {animal.weight} lbs</p>
                          <p className="mb-2 group-hover:text-[#102542]">Description: {animal.shortDescription}</p>
                          
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              );
                //ternary operator to display message if no animals are available
            }): <p>No animals available for adoption at the moment.</p>}
        </div>

        
        {canUploadAnimals() && (
          
                <UploadAnimal />
        )}
      </main>

      <Footer />
    </div>
  );
}
