import { userData } from "@/lib/types/types";
import React from "react";
import CustomerProfile from "@/components/profile/CustomerProfile.tsx";

interface UserProfileProps {
  business: userData;
}

const BusinessProfile: React.FC<UserProfileProps> = ({ business }) => {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col">
        <CustomerProfile customer={business} />
        <div className="w-full flex flex-col items-center mt-4">
          <h2 className="text-2xl font-bold mb-4">Business Information</h2>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;