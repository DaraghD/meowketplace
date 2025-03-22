import { userData } from "@/lib/types/types";
import React from "react";

interface UserProfileProps {
  customer: userData;
}

const CustomerProfile: React.FC<UserProfileProps> = ({ customer }) => {
    console.log(customer);
    const verification_hint = "Verified means the user has not made a purchase yet"
    return (
        <div className="flex flex-col items-start justify-start bg-gray-100 ">
          <div className="bg-white p-6 w-full flex">
                <div className="w-1/3 flex flex-col items-start">
                    <img src="http://github.com/shadcn.png" alt="Profile" className="w-32 h-32 rounded-full mb-4"/>
                    <h1 className="text-3xl font-bold mb-2">{customer.username}</h1>
                    <p className="text-lg mb-2">Email: {customer.email}</p>
                    <p className="text-lg mb-2 underline cursor-help" title={verification_hint}>
                        {customer.is_verified ? "Verified" : "Not Verified"}
                    </p>
                </div>
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-3xl font-bold mb-4">Bio</h2>
                    <textarea placeholder={customer.bio && customer.bio !== "null" ? customer.bio : "Make a bio!"} className="w-64 h-32 p-2 border border-gray-300 rounded">
                    </textarea>
                    <p id="error_text" className="hidden"> No changes made</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>{
                        const bio_text = document.querySelector("textarea")?.value;
                        if(!bio_text || bio_text === "null" || bio_text === customer.bio){
                            document.querySelector("#error_text")?.classList.remove("hidden");
                        }else {
                            //post user to backend
                        }
                    }}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CustomerProfile;