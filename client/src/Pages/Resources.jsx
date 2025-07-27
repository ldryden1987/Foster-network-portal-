import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Nav from "../components/Nav.jsx";
import DisplayResources from "../components/DisplayResources.jsx"
import DisplayFAQs from "../components/DisplayFAQs.jsx";
import { Link } from "react-router-dom";



export default function ResourcesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Nav />
        
            <main className="flex flex-1 px-8 py-8 gap-8 h-screen">
                {/* Resources Section - Left */}
                <section className="w-1/2 h-full overflow-y-auto  p-6 max-h-[calc(100vh-220px)">
                    <DisplayResources/>
                </section>
                
                {/* FAQs Section - Right */}
                <section className="w-1/2 h-full overflow-y-auto  p-6 max-h-[calc(100vh-220px)]">
                    <DisplayFAQs/>
                </section>
            </main>
            <Footer />
        </div>
    );
}




