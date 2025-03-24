import {useContext } from "react";
import BusinessProfile from "@/components/profile/BusinessProfile.tsx";
import UserProfile from "@/components/profile/UserProfile.tsx";
import type {userData} from "@/lib/types/types.ts";
import { Context } from "@/context.tsx";


// want it to work for business and user
const Profile = () => {
    const context = useContext(Context);
    if(!context){
        throw new Error("Context not found");
    }
    const {user} = context;

    if(!user) {
        console.log(9999999);
        return window.location.href = "/sign-in";
    }

    return (
        <>
            {user?.is_business ? (
                <BusinessProfile business={user as userData} />
            ) : (
                <UserProfile user={user as userData} />
                //<BusinessProfile business={userData} />
            )}
        </>
    );

};

export default Profile;