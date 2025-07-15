import { useState, useEffect } from 'react';

export default function Signin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check for existing session token on component mount
    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('sessionToken', result.sessionToken);
                setIsLoggedIn(true);
                alert('Successfully signed in!');
                navigate("/");
            } else {
                alert(result.error || 'Sign in failed');
                navigate("/");
            }
        } catch (err) {
            alert('Network error. Please try again.');
             navigate("/");
        } finally {
            setLoading(false);
            navigate("/");
        }
    };

    // Login Form
    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn} >
                <input type="email" name="email" placeholder="Email" required 
               />
                <input type="password" name="password" placeholder="Password" required 
                />
                {/* disbles the button if loading so that you can not continually click on it */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}