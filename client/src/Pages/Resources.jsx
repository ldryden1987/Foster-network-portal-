import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import AdminResources from "../components/AdminResources.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


export default function ResourcesPage() {
const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/resources`);
                if (!response.ok) throw new Error('Failed to fetch resources');
                const data = await response.json();
                setResources(data);
            } catch (err) {
                alert(`Error: ${err}`);
            }
        };
        fetchResources();
    }, []);

    
    return (
        <div>
            <Header/>
            <div>
                <nav>
                    <Link>Meet Your Future Friends!</Link>
                    <Link>Applications</Link>
                    <Link>About Us!</Link>
                    <Link to='/signin'>Login/Register</Link>
                </nav>
            </div>
            <div>
                <h2>FAQs</h2>
            </div>
            <div>
                <h2>Resources</h2>
                <ul>
                    {resources.map((resource) => (
                        <li key={resource.id}>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                {resource.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                Admin Access
                <AdminResources/>

            </div>        
            <div>
                <Footer/>
            </div>
        </div>
    );
}
