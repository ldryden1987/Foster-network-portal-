import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Nav from "../components/Nav.jsx"; 
import { useUser } from "../context/UserContext.jsx";
import ContactForm from "../components/ContactForm";
import React from "react";

function Home() {
  const { user, loading } = useUser();
  console.log(user);

  return (
    <div className="flex flex-col min-h-screen dark:bg-[#102542] dark:text-white">
      {/* Header */}
      <Header />
      <Nav />

      {/* Main content */}
      <main className="flex flex-col lg:flex-row items-start justify-between gap-8 px-6 py-10 bg-[#00000] flex-grow text-[#102542] dark:text-white">
        
        {/* About Us Section */}
        <section className="lg:w-1/2 space-y-4">
          <h2 className="text-4xl font-black border-b-4 border-dotted border-[#102542] pb-2">ABOUT US</h2>
          <h3 className="text-2xl font-medium text-[#102542] dark:text-white">What makes SafePaws special!</h3>
          <p className="text-2xl" >
            We believe every animal deserves safety, compassion, and a chance to thrive. Founded on the principle that rescue is not just a service—but a promise—we work tirelessly to protect and rehome abandoned, neglected, and at-risk animals throughout our community. Whether it's a senior dog left behind, a litter of kittens found in a storm drain, or a misunderstood breed facing stigma, we step in with open arms and unwavering commitment.
          </p>
          <p className="text-2xl">
            Our team is made up of passionate volunteers, foster families, veterinary partners, and advocates who share one mission: to give animals the love and dignity they deserve. We don’t just rescue—we rehabilitate, educate, and connect. Through thoughtful matchmaking, behavioral support, and ongoing resources, we ensure every adoption is a lifelong success.
          </p>
          <p className="text-2xl">
            We also know that rescue is a community effort. That’s why we offer opportunities for fostering, volunteering, and outreach—so everyone can play a part in saving lives. Whether you're walking dogs, sharing our posts, or opening your home to a foster pet, you're helping us build a more compassionate world, one paw at a time.
          </p>

        </section>

        {/* Image Section */}
        <section className="lg:w-1/2 flex justify-center dark:text-white">
          <img 
            src="https://placecats.com/neo_banana/800/600" 
            alt="Cat licking bannana"
            className="rounded-lg shadow-lg max-w-full"
          />
        </section>
      </main>

      {/* Contact Section */}
        <section className="bg-[#00000] px-6 py-10 text-[#102542] dark:text-white">
          <h2 className="text-2xl font-bold mb-4">CONTACT US</h2>
          <ContactForm />
        </section>


      {/* Google Map Section */}
      <section className="bg-[#00000] px-6 py-10 text-[#102542] dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Visit Us</h2>

        {/* Embedded Google Map */}
        <div className="w-full h-96 mb-6">
          <iframe
            title="SPAR Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019578486323!2d-122.42121868468102!3d37.80098477975154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c53e38a07%3A0x6d70c3096d09ae32!2sRussian%20Hill%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1628300000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg border border-gray-400"
          ></iframe>
        </div>

        {/* Info Tabs */}
        {/* Labels above the content boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center dark:text-white">
          <h3 className="text-xl font-bold">Address</h3>
          <h3 className="text-xl font-bold">Hours</h3>
          <h3 className="text-xl font-bold">Phone</h3>
        </div>

        {/* Info blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-center dark:text-white">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-lg text-[#102542]">1234 Example St.</p>
            <p className="text-lg text-[#102542]"> San Francisco, CA 94109</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow dark:text-white">
            <p className="text-lg text-[#102542]">Mon–Fri: 10am – 6pm</p>
            <p className="text-lg text-[#102542]">Sat–Sun: 11am – 4pm</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow dark:text-white">
            <p className="text-lg text-[#102542]">(555) 123-4567</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
