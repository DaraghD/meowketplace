import Card from "@/components/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
    const [, setUserChoice] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChoice = (choice: string) => {
        setUserChoice(choice);

        if (choice === "advertise") {
            navigate("/product-listing");
        } else if (choice === "browse") {
            navigate("/search"); // PLACEHOLDER
        }
    };

    return (
        <div className="min-h-screen max-w-screen-lg mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center">
                Choose Your Option
            </h1>

            <p className="text-xl text-center mb-6">
                Welcome to Meowketplace! What would you like to do today?
            </p>

            <div className="flex justify-center gap-16">
                <Card
                    title="Advertise a Service 🐕"
                    onClick={() => handleChoice("advertise")}
                />
                <Card
                    title="Browse Services 🐾"
                    onClick={() => handleChoice("browse")}
                />
            </div>
        </div>
    );
};

export default Services;
