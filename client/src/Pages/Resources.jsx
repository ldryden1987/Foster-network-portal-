import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ManageResource from "../components/ManageResource.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';


export default function ResourcesPage() {
const [resources, setResources] = useState([]);
const { user, loading } = useUser();

useEffect(() => {
    const fetchResources = async () => {
        try { const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/resources`);
                if (!response.ok) throw new Error('Failed to fetch resources');
                const data = await response.json();
                setResources(data);
            } catch (err) {
                alert(`Error: ${err}`);
            }
        };
        fetchResources();
    }, []);

// Check if user is admin or staff
const isAdminOrStaff = user && (user.role === 'admin' || user.role === 'staff');
console.log (user)
    // Group resources by category
    const resourcesByCategory = resources.reduce((acc, resource) => {
        const category = resource.category || 'Uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(resource);
        return acc;
    }, {});

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
                {Object.entries(resourcesByCategory).map(([category, resources]) => (
                    <div key={category}>
                        <h3>{category}</h3>
                        <ul>
                            {resources.map((resource) => (
                                <li key={resource._id}>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                        {resource.name}
                                    </a>
                                    <p>{resource.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {isAdminOrStaff && (
                <div>
                    <ManageResource/>
                </div>
            )}    
            <div>
                <Footer/>
            </div>
        </div>
    );
}
