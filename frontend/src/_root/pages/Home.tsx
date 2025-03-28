import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { Context } from "@/context.tsx";

const Home: React.FC = () => {
    const context = useContext(Context);
    if(!context) {
        throw new Error("Context not found");
    }
    const {user} = context;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="header">
      <img
      src="/assets/images/Meowketplace header upscaled1.jpg"
      alt="banner"
      />
      <div className="header-text">
      <h1>Welcome to Meowketplace</h1>
      <p>Purr, Wag, Repeat - Find Pet Services with Ease</p>
      <p className="text-lg mb-6">Join us today!</p>
        {!user ? (
          <Link
            to="/sign-up"
            className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Sign Up
          </Link>
        ) : (
          <p> Welcome {user.username}!</p>
        )}
        </div>
</div>

      <div className="section1">
        <div className="text1">
          <h2>Where Pet Lovers can Find Trusted Services!</h2>
          <p>
            Here at Meowketplace you can sit back stress free knowing that you
            are getting the best services for your loved ones from business'
            advocated for by the community!
          </p>
        </div>
        <img
          src="/assets/images/cat-brushing.jpg"
          alt="Cat Brushing"
        />
      </div>
      <div className="section2">
        <img
        src = "/assets/images/cat-working.jpg"
          alt="Cat Brushing"
        />
        <div className="text2">
          <h2>A Place where Business' can Thrive!</h2>
          <p>
            As a business on Meowketplace you'll be given a wide range of
            options to advertise your quality services!
          </p>
        </div>
      </div>
      <div className="section3">
        <div className="text2">
          <h2>How it Works</h2>
          <p>
            As a business on Meowketplace you'll be given ratings from verified
            customers based on the quality of your service. This way customers
            are able to gain trust from business'.
          </p>
        </div>
        <img
          src="/assets/images/dog-lol.jpg"
          alt="Cat Brushing"
        />
      </div>
      <div className="section4">
        <h2>Want the Best Meowketplace Experience?</h2>
        <p>Get Meowketplace!</p>
      </div>
    </div>
  );
};

export default Home;
