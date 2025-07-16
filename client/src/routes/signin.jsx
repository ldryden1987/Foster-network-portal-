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
                // navigate("/");
            } else {
                alert(result.error || 'Sign in failed');
                // navigate("/");
            }
        } catch (err) {
            alert('Network error. Please try again.');
            //  navigate("/");
        } finally {
            setLoading(false);
            // navigate("/");
        }
    };

    // Login Form
    return (
        <div className="flex items-center justify-center min-h-screen bg-F87060">
            <div className="flex flex-col items-center justify-center w-full">
                <div className='flex flex-col gap-2 w-full max-w-xs'>
                    <h1 className="text-xl font-bold m-2 self-center text-center">Sign In</h1>
                    <form onSubmit={handleSignIn} className="flex flex-col gap-2 self-center text-center">
                        <input
                            type="email"
                            className="input input-md m-2"
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            className="input input-md m-2"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <button
                            type="submit"
                            className="btn btn-primary input input-md m-2 cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="cursor-pointer hover:underline self-center text-center mt-4">
                        New? Click here to create a new account
                    </div>
                </div>
            </div>
        </div>
    );
}