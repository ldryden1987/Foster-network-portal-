import ManageResource from "../components/ManageResource.jsx";
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';


export default function DisplayResources() {
const [resources, setResources] = useState([]);
const { user, loading } = useUser();

//use Effect for Resources
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
 <div className="flex flex-col h-full">
            {isAdminOrStaff && (
                <div className="mb-6">
                    <ManageResource />
                </div>
            )}
            
            <div className="flex-1 overflow-y-auto bg-[#102542] p-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-white">Resources</h2>
                <div className="space-y-6">
                    {Object.entries(resourcesByCategory).map(([category, resources]) => (
                        <div key={category} className="w-full mx-auto rounded-lg shadow p-6 bg-[#F87060]">
                            <h3 className="text-xl font-semibold mb-4 text-blue-900">{category}</h3>
                            <ul className="space-y-4">
                                {resources.map((resource) => (
                                    <li key={resource._id}>
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            //keeps the other site from having access to info from this site
                                            rel="noopener noreferrer"
                                            className="text-[#CDD7D6] font-medium hover:underline"
                                        >
                                            {resource.name}
                                        </a>
                                        <p className="text-sm dark:text-black">{resource.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
