import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Nav from "../components/Nav.jsx"; 
import { Link } from "react-router-dom";
import React from "react";
import { useUser } from '../context/UserContext.jsx';

// function Home() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <Header />
//       <Nav />

function Home() {
   const { user, loading } = useUser();
  console.log (user)
  return (
    <div>
      <Header/>
      <div>
        <Nav />
      </div>

      {/* Main Image */}
      <div className="flex justify-center my-8 px-4">
        <img
          src="https://images.squarespace-cdn.com/content/v1/66ec3b49803ab81bf84f89e4/1726789423907-OMC6SOD7GIZ2NLNGMGM9/house-cat-lying-on-floor-8529064-scaled.jpg?format=2500w"
          alt="Main"
          className="rounded-xl shadow-lg max-w-5xl w-full h-100 object-cover"
        />
      </div>


      <section className="text-center my-10">
        <h2 className="text-2xl font-bold mb-4">Featured Pets</h2>
        <div className="flex flex-wrap justify-center gap-20">
          {/* Pet 1 */}
          <div className="flex flex-col items-center w-[300px]">
            <img
              src="https://www.battersea.org.uk/sites/default/files/animal_images/068Nz00000U9GfNIAV-thumb.webp?id=63463.0717202510449030052"
              alt="Pet 1"
              className="w-full h-[300px] object-cover rounded shadow-md"
            />
            <p className="mt-3 font-semibold text-gray-800">Roscoe</p>
          </div>

          {/* Pet 2 */}
          <div className="flex flex-col items-center w-[300px]">
            <img
              src="https://placecats.com/300/200"
              alt="Pet 2"
              className="w-full h-[300px] object-cover rounded shadow-md"
            />
            <p className="mt-3 font-semibold text-gray-800">Bert</p>
          </div>

          {/* Pet 3 */}
          <div className="flex flex-col items-center w-[300px]">
            <img
              src="https://placecats.com/neo/300/200"
              alt="Pet 3"
              className="w-full h-[300px] object-cover rounded shadow-md"
            />
            <p className="mt-3 font-semibold text-gray-800">Earnie</p>
          </div>
        </div>


        {/* View All Pets Button */}
        <div className="mt-6">
          <Link to="/adopt">
            <button className="bg-[#102542] text-white px-6 py-3 rounded hover:bg-[#dc5a4e] transition duration-300">
              Click here to view all our available pets
            </button>
          </Link>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="text-center bg-[#fef7f4] py-10 px-6">
        <h3 className="text-xl font-bold mb-4">Welcome</h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          Thank you for visiting SafePaws Animal Rescue! We are dedicated to connecting loving families with amazing animals. Whether you're looking to adopt, foster, or volunteer, there's a place for you here.
        </p>
      </section>

    <section className="p-4 mx-auto">
  <div className="grid grid-cols-2 gap-4 items-start">

    {/*  Resources button & text */}
    <div className="flex flex-col items-center space-y-2 text-center">
      <button className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition">
        Resources
      </button>
      <p className="text-sm text-gray-700 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
      </p>
    </div>

     {/* volunteer button & events */}
    <div className="flex flex-col items-center space-y-2 text-center">
      <button className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition">
        Volunteer
      </button>
      <p className="text-sm text-gray-700 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
      </p>
    </div>

    {/*  events button & text */}
    <div className="flex flex-col items-center space-y-2 text-center">
      <button className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition">
        Events
      </button>
      <p className="text-sm text-gray-700 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
      </p>
    </div>

     {/*  Applications button & text */}
    <div className="flex flex-col items-center space-y-2 text-center">
      <button className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition">
        Applications
      </button>
      <p className="text-sm text-gray-700 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
      </p>
    </div>

  </div>
</section>
      <Footer />
    </div>
    
  );
}

export default Home;


