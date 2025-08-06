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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione quasi, harum quo eos eligendi consequatur, hic amet libero quis, alias nulla! Optio, expedita? Corporis est non commodi perspiciatis cum quod autem dolore, iste totam animi ex dolorum laborum officiis recusandae corrupti amet repudiandae quia beatae sit, provident sint. Maiores, tempora nulla. Repudiandae iusto voluptatem expedita ducimus repellat! Quaerat natus, magnam cum aliquam earum ex similique itaque omnis rem eaque vel minima iusto, doloremque sunt est tempore delectus perferendis alias fuga! Iste atque sint similique impedit animi at ratione perferendis rerum ea et repudiandae voluptatum porro facere laboriosam, ad fuga cupiditate!
          </p>
          <p className="text-2xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus quas dolores cum magnam ea nostrum fugit saepe architecto voluptas a. Perferendis recusandae rem omnis magnam, obcaecati fuga dolorum porro consequatur eum mollitia voluptas dolore voluptates officia nemo ad? Vel repellendus neque harum veniam voluptatum quae laborum at id dolore optio, modi nulla similique eum rerum labore molestias pariatur, ab ipsa praesentium dignissimos saepe quas distinctio provident dolorum. Aspernatur, mollitia nulla animi dolor, molestiae similique repudiandae aliquam ducimus, amet modi libero. Est aliquid quibusdam quod repudiandae ratione! Voluptates hic deserunt cum tempore nisi magnam et at delectus! Adipisci obcaecati necessitatibus temporibus.
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
