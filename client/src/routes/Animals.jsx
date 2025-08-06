import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { useState, useRef, useEffect } from "react";
import UploadAnimal from "../components/UploadAnimal";

export default function Animals() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [animals, setAnimals] = useState([]);

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
console.log(animals);
console.log(animals.length);
  return (
    <div>
      <Header />
      <Nav />
      <main className="flex flex-col m-2">
        <h1 className="text-center text-2xl font-bold my-4">Animals</h1>
        <p className="text-center mb-10">
          Here you can find all the animals available for adoption.
        </p>
        <div className="flex flex-row items-center gap-x-10">
            {animals.length > 0 ? animals.map((animal) => (
                <div key={animal._id} className="card w-96 bg-base-100 mb-4 hover:shadow-md shadow-[#F87060]">
                    <figure>
                    <img src={animal.blobUrl} style={{ width:384, height:270}} alt={animal.name+" image"} />
                    </figure>
                    <div className="card-body shadow-lg">
                    <h2 className="card-title">{animal.name}</h2>
                    <p>Species: {animal.species}</p>
                    <p>Breed: {animal.breed}</p>
                    <p>Sex: {animal.sex}</p>
                    <p>Approximate Age: {animal.age} {animal.age>1?"years":"year"}</p>
                    <p>Weight: {animal.weight} lbs</p>
                    <p>Description: {animal.description}</p>
                    </div>
                </div>
                )): <p>No animals available for adoption at the moment.</p>}
        </div>

        {/* upload animal component needs admin authentication  */}
        <button
          className="btn max-w-100 mx-auto mb-8"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Upload New Animal
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Upload New Animal</h3>
            <UploadAnimal />
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </main>

      <Footer />
    </div>
  );
}
