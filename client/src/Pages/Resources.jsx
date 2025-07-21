import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import DisplayResources from "../components/DisplayResources.jsx"
import DisplayFAQs from "../components/DisplayFAQs.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';


export default function ResourcesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <nav className="flex justify-end gap-6 px-8 py-4 text-sm bg-transparent shadow-none">
                <Link className="hover:underline" to="#">Meet Your Future Friends!</Link>
                <Link className="hover:underline" to="#">Applications</Link>
                <Link className="hover:underline" to="#">About Us!</Link>
                <Link className="bg-blue-900 px-3 py-1 rounded hover:bg-blue-700 text-white" to="/signin">Login/Register</Link>
            </nav>
            
            <main className="flex flex-1 px-8 py-8 gap-8">
                {/* Resources Section - Left */}
                <section className="w-1/2 h-full overflow-y-auto bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-220px)]">
                    <DisplayResources/>
                </section>
                
                {/* FAQs Section - Right */}
                <section className="w-1/2 h-full overflow-y-auto bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-220px)]">
                    <DisplayFAQs/>
                </section>
            </main>
            <Footer />
        </div>
    );
}




