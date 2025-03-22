import { userData } from "@/lib/types/types";
import React from "react";
import UserProfile from "@/components/profile/UserProfile.tsx";

interface UserProfileProps {
  business: userData;
}

const BusinessProfile: React.FC<UserProfileProps> = ({ business }) => {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col">
            <UserProfile user={business}/>
            <div className="w-full flex flex-col items-center mt-4">
                <h2 className="text-2xl font-bold mb-4">Business Information</h2>
            </div>
            <div className="w-full flex flex-col items-center mt-4">
                <p className="text-lg mb-2">Business Rating: {business.business_rating}</p>
                <p className="text-lg mb-2">Total Services Sold: TODO</p>
            </div>
        </div>
    </div>
  );
};

export default BusinessProfile;