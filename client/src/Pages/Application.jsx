import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import React from "react";
import ApplyNow from '../components/ApplyNow.jsx'
import Nav from "../components/Nav.jsx";


function scrollToSection(e, id) {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function Application() {
    return (
        <div className="min-h-screen bg-white flex flex-col dark:bg-[#102542]">
            <Header />
            <Nav />
                {/* Left Sidebar */}
            <main className="flex flex-1 p-8 gap-8 dark:bg-[#102542]">

                <aside className="w-48 dark:bg-[#102542]">
                    <nav className="flex flex-col gap-4 text-black-600 font-semibold dark:bg-[#102542]">
                        <Link to="#home" 
                            onClick={(e) => scrollToSection(e, "home")}
                                className="transition-all duration-200 hover:underline hover:scale-120" >Home</Link>
                        <Link to="#adopt" 
                            onClick={(e) => scrollToSection(e, "adopt")} className="transition-all duration-200 hover:underline hover:scale-120">Adopt</Link>
                        <Link to="#foster" 
                            onClick={(e) => scrollToSection(e, "foster")} className="transition-all duration-200 hover:underline hover:scale-120">Foster</Link>
                        <Link to="#volunteer" 
                            onClick={(e) => scrollToSection(e, "volunteer")} className="transition-all duration-200 hover:underline hover:scale-120">Volunteer</Link>
                    </nav>
                </aside>

                {/* Center Content */}
                <section className="flex-1 space-y-8 dark:bg-[#102542]">
                    <article>
                        <section id="home" className="text-xl text-black font-bold mb-2 dark:text-white">Adopt</section>
                        <p className="text-black dark:text-white">Adopting a pet from an animal rescue is more than just bringing home a furry friend—it's giving a second chance to an animal who may have faced abandonment, neglect, or hardship. Rescues carefully match pets with adopters to ensure compatibility, often providing background information, behavioral assessments, and support throughout the transition. Whether you're looking for a playful kitten, a gentle senior dog, or a quirky rabbit, adoption opens the door to unconditional love and companionship. Plus, every adoption helps reduce overcrowding in shelters and makes room for another animal in need.</p>
                    </article>

                    <article>
                        <section id="foster" className="text-xl text-black font-bold mb-2 dark:text-white">Foster Program</section>
                        <p className="text-black dark:text-white">Fostering is the unsung hero of animal rescue. By opening your home temporarily, you provide a safe, nurturing space for pets who may be recovering from surgery, too young for adoption, or simply overwhelmed by shelter life. Foster families help animals build confidence, learn basic manners, and prepare for their forever homes. It's a flexible commitment—some fosters stay just a few days, others a few months—but every moment matters. Fostering not only saves lives, it also gives you a front-row seat to transformation, watching scared or shy animals blossom with love and care.</p>
                    </article>

                    <article>
                        <section id="volunteer" className="text-xl text-black font-bold mb-2 dark:text-white">Volunteer Opportunities</section>
                        <p className="text-black dark:text-white">Volunteers are the heartbeat of every rescue. From walking dogs and cleaning enclosures to helping with transport, photography, or social media, there's a role for every skill set. Volunteering connects you with a passionate community of animal lovers and gives you the chance to directly impact lives—both human and animal. Whether you're comforting a nervous cat or helping an adopter find their perfect match, your time and energy ripple outward in powerful ways. Even a few hours a month can make a lasting difference</p>
                    </article>

                    <h1 className="text-3xl font-bold text-black dark:text-white">Join Our Mission</h1>
                <p className="text-black max-w-2xl dark:text-white">
                    Whether you’re interested in adopting, fostering, or volunteering, we welcome your support!
                    Click the button below to get started with your application.
                </p>

                <ApplyNow/>

                {/* Changed to a Component SLA 
                <Link to="/apply">
                    <button className="bg-[#102542] text-white px-6 py-3 rounded hover:bg-[#F87060] transition duration-300 dark:bg-[#F87060] dark:hover:bg-[#CDD7D6] dark:hover:text-black">
                        Apply Now
                    </button>
                </Link> */}

                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Application;