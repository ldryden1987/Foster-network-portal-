import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import React from "react";


function Application() {
    return (
        <div>
            <Header />
                {/* Left Sidebar */}
            <main style={{ display: "flex", padding: "2rem" }}>

                <aside>
                    <nav>
                        <Link></Link>
                        <Link></Link>
                        <Link></Link>
                        <Link></Link>
                    </nav>
                </aside>

                {/* Center Content */}
                <section>
                    <article>
                        <h4>About Our Mission</h4>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas ex consequatur sit in numquam, pariatur est ratione officiis repellendus provident optio itaque quibusdam nobis fuga officia. Suscipit aperiam aut nemo?</p>
                    </article>

                    <article>
                        <h4>Foster Program</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vitae culpa quod praesentium nam officia facilis eos alias in error, delectus repellendus ut tenetur natus. Expedita aliquid mollitia repellat quos.</p>
                    </article>

                    <article>
                        <h4>Volunteer Opportunities</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, hic asperiores! Autem magni vitae distinctio adipisci unde facilis? Tempore laudantium earum officiis, repudiandae odio aspernatur minima alias corrupti qui totam.</p>
                    </article>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Application;