import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import UploadAnimal from "../components/UploadAnimal";
import EditAnimal from "../components/EditAnimal";
import DeleteAnimal from "../components/DeleteAnimal";

export default function Animals() {
  const [animals, setAnimals] = useState([]);

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

  return (
    <div className="dark:bg-[#102542]">
      <Header />
      <Nav />
      <main className="flex flex-col m-2">
        <h1 className="text-center text-2xl font-bold my-4">Animals</h1>
        <p className="text-center mb-10">
          Here you can find all the animals available for adoption.
        </p>
        <div className="grid grid-cols-4 items-center gap-x-10">

            {animals.length > 0 ? animals.map((animal) => { 
              // creates a card for each animal object fetched from the db

              //creates a unique modal id for each edit modal
              const modalId = `edit_modal_${animal._id}`;

              //returns a card for each animal fetched
              return (
                <div
                  key={animal._id}
                  className="card flex flex-col w-96 h-[32rem] bg-base-100 mb-4 hover:shadow-md dark:shadow-[#F87060] hover:bg-[#F87060] hover:text-[#102542] relative"
                  style={{ minWidth: '24rem', minHeight: '32rem' }}
                >

                  {/* Image as background */}
                  <figure style={{backgroundImage: `url(${animal.blobUrl})`}} className="h-64 bg-cover bg-center"/>
                  
                  {/* Edit and delete tools in top-right corner */}
                  <div className="absolute top-2 right-2 z-10">
                    <div className="flex justify-end gap-2">
                    <DeleteAnimal targetAnimal={animal} modalId={`delete_modal_${animal._id}`} />
                    <EditAnimal targetAnimal={animal} modalId={modalId} />
                    </div>
                  </div>

                  {/* Animal details */}
                  <div className="card-body shadow-lg flex-1 flex flex-col justify-between">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h2 className="card-title mb-4">{animal.name}</h2>
                        <p className="mb-2">Species: {animal.species}</p>
                        <p className="mb-2">Breed: {animal.breed}</p>
                        <p className="mb-2">Sex: {animal.sex}</p>
                        <p className="mb-2">Approximate Age: {animal.age} {animal.age>1?"years":"year"}</p>
                        <p className="mb-2">Weight: {animal.weight} lbs</p>
                        <p className="mb-2">Description: {animal.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
                //ternary operator to display message if no animals are available
            }): <p>No animals available for adoption at the moment.</p>}
        </div>

            {/* uses a model to house form for new animal and vercel blob image upload */}
            <UploadAnimal />
            
            
      </main>

      <Footer />
    </div>
  );
}
