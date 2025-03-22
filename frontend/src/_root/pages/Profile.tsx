import {useEffect, useState} from "react";
import BusinessProfile from "@/components/profile/BusinessProfile.tsx";
import UserProfile from "@/components/profile/UserProfile.tsx";
import type {userData} from "@/lib/types/types.ts";
import {useNavigate} from "react-router-dom";


// want it to work for business and user
const Profile = () => {
    const [userData, setUserData] = useState<userData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch("http://localhost:8080/api/user/auth", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
            if (!response.ok) {
                console.log("Not ok response");
                alert("Unable to fetch user data, please sign in again")
                navigate("/sign-in");
                return;
            }
            const data = await response.json();

            setUserData(data);
            console.log(userData);

        };
        fetchUserData();
    }, []);

    if(!userData) {
        return null;
    }

    return (
        <>
            {userData?.is_business ? (
                <BusinessProfile business={userData} />
            ) : (
                <UserProfile user={userData} />
                //<BusinessProfile business={userData} />
            )}
        </>
    );

};

export default Profile;