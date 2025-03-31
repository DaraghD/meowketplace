import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const [, setUserChoice] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChoice = (choice: string) => {
        setUserChoice(choice);

        if (choice === 'advertise') {
            navigate('/product-listing');
        } else if (choice === 'browse') {
            navigate('/search'); // PLACEHOLDER
        }
    };

    return (
        <div className="min-h-screen max-w-screen-lg mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Choose Your Option</h1>
            <p className="text-xl text-center mb-6">
                Welcome to Meowketplace! What would you like to do today? 🐾
            </p>

            <div className="flex justify-center gap-6">
                <button
                    onClick={() => handleChoice('advertise')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Advertise a Service 🐕
                </button>
                <button
                    onClick={() => handleChoice('browse')}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Browse Services 🐾
                </button>
            </div>
        </div>
    );
};

export default Services;
