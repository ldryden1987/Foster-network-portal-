import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import React from "react";

function Home() {
  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Navigation Section */}
      <nav className="flex justify-end gap-4 py-4 text-[#102542] text-sm">
        <Link to="/" className="hover:underline">Meet Your Future Friends!</Link>
        <Link to="/applications" className="hover:underline">Applications</Link>
        <Link to="/about" className="hover:underline">About Us!</Link>
        <Link 
          to="/login" 
          className="bg-[#102542] text-white px-3 py-.5 rounded hover:bg-[#dc5a4e] transition"
        >
          Login/Register
        </Link>
      </nav>

      {/* Main Image */}
      <div className="flex justify-center my-6">
        <img src="https://via.placeholder.com/600x300" alt="Main" className="rounded shadow-md" />
      </div>

      {/* Featured Pets */}
      <section className="text-center my-10">
        <h2 className="text-2xl font-bold mb-4">Featured Pets</h2>
        <div className="flex justify-center gap-6">
          <img src="https://via.placeholder.com/150" alt="Pet 1" className="rounded shadow-md" />
          <img src="https://via.placeholder.com/150" alt="Pet 2" className="rounded shadow-md" />
          <img src="https://via.placeholder.com/150" alt="Pet 3" className="rounded shadow-md" />
        </div>
=======
    <div>
      <Header/>
      <div>
        <nav class= "space-x-20">
            <Link>Meet Your Future Friends!</Link>
            <Link>Applications</Link>
            <Link>About Us!</Link>
            <Link>Login/Register</Link>
            
        </nav>
      </div>
      <div>
        <img src="https://images.squarespace-cdn.com/content/v1/66ec3b49803ab81bf84f89e4/1726789423907-OMC6SOD7GIZ2NLNGMGM9/house-cat-lying-on-floor-8529064-scaled.jpg?format=2500w" alt="Main Image" />
      </div>

      {/* featured pet space */}
      <h2>Feature Pets</h2>
      <div class= "flex justify-center space-x-12">
        <img src="https://www.battersea.org.uk/sites/default/files/animal_images/068Nz00000TRyslIAD.webp" alt="Pet 1" class= "w-64"/>
        <img src="https://www.battersea.org.uk/sites/default/files/animal_images/068Nz00000TS2W7IAL.webp" alt="Pet 2" class="w-64" />
        <img src="https://www.battersea.org.uk/sites/default/files/animal_images/068Nz00000U9GfNIAV-thumb.webp?id=63463.0717202510449030052" alt="Pet 3" class="w-64" />
      </div>
>>>>>>> 55f3451ad7cc244e44fab9df03b233032a2d55aa

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


