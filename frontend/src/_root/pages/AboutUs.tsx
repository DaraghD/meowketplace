import React, { useState } from 'react';

const AboutUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setFormStatus("Thank you for reaching out! We'll get back to you shortly.");
            setName("");
            setEmail("");
            setMessage("");
        }, 2000);
    };

    return (
        <div className="max-w-screen-lg mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">About Meowketplace</h1>
            <p className="text-xl text-center mb-6">
                Welcome to Meowketplace! The go-to platform for pet lovers. ❤️🐶🐱
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">Why Meowketplace?</h2>
                <p className="text-lg mb-4">
                    Because pets are family, finding trusted care should be easy. 🏡✨ At Meowketplace, we believe that every pet deserves the best care, and we’re here to make that a reality.
                </p>
                <p className="text-lg mb-4">
                    We’re a community of passionate pet parents who understand the importance of trust, quality, and comfort for your furry friends. 🐕🐾
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Unique Point</h2>
                <p className="text-lg mb-4">
                    Our unique point: All-in-one pet services with a personal touch. 💕🐾 Whether it's grooming, sitting, or walking, we have everything your pet needs.
                </p>
                <p className="text-lg mb-4">
                    Expert care that understands the bond you share with your furry friend! 🥰🐾 We provide services designed to nurture that special connection and ensure your pet feels loved, comfortable, and well-cared-for.
                </p>
            </section>

            <section className="text-center">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Join Our Community</h3>
                <p className="text-lg mb-4">
                    At Meowketplace, you’re not just a customer; you’re part of our family! 🐾💕 Join us today and be a part of a pet-loving community that cares.
                </p>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">Contact Us</h2>
                <p className="text-lg text-center mb-6">
                    Have any questions? We'd love to hear from you! Please fill out the form below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className={`px-6 py-2 text-white rounded-lg ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>

                {formStatus && (
                    <div className="mt-4 text-center text-green-600 font-semibold">
                        {formStatus}
                    </div>
                )}
            </section>
        </div>
    );
};

export default AboutUs;
