import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function AnimalId() {
  const { animalId } = useParams();
  const [animal, setAnimal] = useState([]);

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
  console.log(animal);
  return (
    <div className="dark:bg-[#102542] ">
      <Header />
      <Nav />
      <main className="grid grid-cols-4 items-center justify-items-center">
        <hero className="card flex flex-col bg-base-100 mb-4 hover:shadow-md dark:shadow-[#F87060] hover:bg-[#F87060] hover:text-[#102542]">
            <h1 className="text-center text-2xl font-bold my-2">{animal.name}</h1>
          <figure
            style={{ backgroundImage: `url(${animal.blobUrl})` }}
            className="h-96 w-96 bg-cover bg-center m-10"
          />
          <main>Animal Profile</main>
          <button linkto="/apply"className="btn bg-[#F87060] text-[#102542]"> Adopt {animal.name}</button>
        </hero>

        <span className="flex flex-col gap-2 col-span-3 m-10">
            <div>long description</div>
            <div>medical notes</div>
            <div>care instructions</div>
        </span>

      </main>
      <Footer />
    </div>
  );
}
