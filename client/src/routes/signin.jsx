import { useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';


export default function Signin() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useUser(); // Get the login function from context

    // Check for existing session token on component mount
    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSignIn = async (event) => {
        console.log('Form submitted!'); // Debug log
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        console.log('Form data:', data); // Debug log

        try {console.log('Making request to:', `${import.meta.env.VITE_SERVER_URL}/signin`); // Debug log
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log('Response status:', response.status); // Debug log
            const result = await response.json();
            console.log('Response data:', result); // Debug log

            if (response.ok) {
                console.log('Login successful, calling login function...'); // Debug log
                login(result.user, result.sessionToken);
                // localStorage.setItem('sessionToken', result.sessionToken);
                setIsLoggedIn(true);
                console.log('Navigating to home...'); // Debug log
                navigate("/");
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