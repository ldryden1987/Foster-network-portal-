import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    //checks for existing session
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
        const userWithToken = { ...userData, sessionToken: token }; // Add sessionToken to user objec
        setUser(userWithToken);
        localStorage.setItem('sessionToken', token);
    };
    // Check for existing session on app load
    useEffect(() => {
        const sessionToken = localStorage.getItem('sessionToken');
        if (sessionToken) {
            fetchUserProfile(sessionToken);
        } else {
            setLoading(false);
        }
    }, []);

        const fetchUserProfile = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/profile`, {
                // headers: { 'Authorization': token }
                headers: { 'Authorization': `Bearer ${token}` } // Add "Bearer " prefix }
            });
            
            if (response.ok) {
                const userData = await response.json();
                const userWithToken = { ...userData, sessionToken: token }; 
                setUser(userWithToken);
            } else {
                localStorage.removeItem('sessionToken');
                setUser(null);
            }
        } catch (err) {
            localStorage.removeItem('sessionToken');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('sessionToken');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};