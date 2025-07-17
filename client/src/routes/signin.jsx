import { useNavigate } from "react-router";
import { useState, useEffect } from 'react';


export default function Signin() {
    // const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
                // navigate("/");
            } else {
                setErrorMessage(result.error || 'Sign in failed');
            }
        } catch (err) {
            setErrorMessage('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Login Form
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-500 p-8">
            <div className="flex flex-col items-center justify-center w-full bg-white max-w-md">
                <div className='flex flex-col gap-2 w-full max-w-md text-black p-6'>
                    <h1 className="text-xl font-bold m-2 self-center text-center">Sign In</h1>
                    <form onSubmit={handleSignIn} className="flex flex-col gap-2 self-center text-center w-full p-2" >
                        <input
                            type="email"
                            className="input input-md m-2 bg-white border-black w-full"
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            className="input input-md m-2 bg-white border-black w-full"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <button
                            type="submit"
                            className="m-2 px-4 py-2 rounded bg-black text-white font-semibold cursor-pointer w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className='text-center mt-4'>
                        {errorMessage && (<div className="text-red-600 font-bold text-xl
                     self-center text-center mt-4">
                            {errorMessage}
                            </div>)}
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <span>Don't have an account?</span>
                            <a href="/signup" className="text-blue-600 underline whitespace-nowrap">Click here to create one!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}