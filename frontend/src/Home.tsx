import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Welcome to Meowketplace</h1>
            <p className="text-lg mb-6">Join us today!</p>
            <Link
                to="/signup"
                className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Sign Up
            </Link>
        </div>
    );
};

export default Home;
