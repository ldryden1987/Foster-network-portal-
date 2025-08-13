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
                        <p className="text-black dark:text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam magni earum nobis quos molestias rem, a odit impedit reprehenderit commodi molestiae reiciendis quo provident porro sit, eos omnis minus deleniti explicabo praesentium adipisci, placeat delectus! Obcaecati corrupti omnis, officiis blanditiis molestiae quis explicabo. Maiores autem praesentium consequuntur incidunt, necessitatibus veniam cumque ab aliquid aperiam optio ut, facere corrupti et eos officiis dolores alias hic. Excepturi possimus doloribus id quidem facilis! Temporibus quo tempore at atque? Quaerat, repellat possimus? Nesciunt suscipit, natus minus culpa fuga voluptatum, sapiente exercitationem nisi adipisci veritatis fugiat repellendus reprehenderit aliquid voluptate numquam dolorem cumque ad quia?</p>
                    </article>

                    <article>
                        <section id="foster" className="text-xl text-black font-bold mb-2 dark:text-white">Foster Program</section>
                        <p className="text-black dark:text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum voluptates quisquam temporibus, architecto animi neque in, earum illum libero blanditiis sapiente rerum deleniti exercitationem mollitia et. Nisi neque voluptatem voluptate, ut cupiditate, ipsum natus sapiente illo, laudantium minus ipsam exercitationem nulla dolor soluta repellat? Excepturi, unde, quos aut beatae magni cumque quidem neque est asperiores quisquam dignissimos porro quam impedit voluptatibus, maiores hic! Nostrum odio voluptate ea nam illum, hic repellat fugiat blanditiis dolorum architecto mollitia voluptatum possimus iusto sunt, temporibus quibusdam minima expedita, voluptates debitis non dolorem animi ab necessitatibus? Eos voluptates accusantium excepturi voluptatum adipisci molestiae aliquam consequatur?</p>
                    </article>

                    <article>
                        <section id="volunteer" className="text-xl text-black font-bold mb-2 dark:text-white">Volunteer Opportunities</section>
                        <p className="text-black dark:text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolor repellat dignissimos recusandae soluta tenetur voluptatum totam eligendi illo, ad temporibus repudiandae impedit quaerat similique fuga officiis molestias, voluptate assumenda dolore eos error est eveniet, magnam nobis. Repellendus eaque, unde eos nulla odio at asperiores rem excepturi ipsam facere. Recusandae odit ad ipsa illo quae numquam aliquam adipisci? Ratione ex deserunt aperiam quos dignissimos reiciendis nisi vel sapiente quo, adipisci accusantium consectetur eius laudantium rerum! Laborum, fugiat? A, soluta excepturi, voluptas voluptatum optio non accusamus fugiat recusandae aliquid, nam eius iure explicabo illo! Nisi ratione voluptatum corrupti tempore, voluptates voluptatibus!</p>
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