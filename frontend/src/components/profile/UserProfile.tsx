import {userData} from "@/lib/types/types";
import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

interface UserProfileProps {
    user: userData;
}

const UserProfile: React.FC<UserProfileProps> = ({user}) => {
    const navigate = useNavigate();

    console.log("LOGGING USER");
    console.log(user);
    if(!user){
        navigate("/sign-in");
    }
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(files){
            const image = files[0];
            setFile(image);
        }
    };

    const uploadPicture = async () => {
        const formData = new FormData();

        if(file) {
            formData.append("profile_picture", file);
        }else{
            console.log("No file selected");
            alert("No file selected");
        }

        const response = await fetch("http://meowketplace.ie:8080/api/user/picture", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }
        const data = await response.text();
        console.log(data);
    }

const verification_hint = "Verified means the user has not made a purchase yet"
return (
    <div className="flex flex-col items-start justify-start bg-gray-100 ">
        <div className="bg-white p-6 w-full flex">
            <div className="w-1/3 flex flex-col items-start">
                <img src={`http://meowketplace.ie:8080/api/user/picture/${user.id}`} alt="Profile" className="w-32 h-32 rounded-full mb-4"/>
                <input
                    type="file"
                    className="mb-4"
                    onChange={handleFileChange}
                />
                <Button onClick={uploadPicture} className="bg-blue-500 text-white rounded hover:bg-blue-600"
                        style={{padding: "0.5rem 1rem"}}>
                    Upload Picture
                </Button>
                <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                <p className="text-lg mb-2">Email: {user.email}</p>
                <p className="text-lg mb-2 underline cursor-help" title={verification_hint}>
                    {user.is_verified ? "Verified" : "Not Verified"}
                </p>
            </div>
            <div className="w-full flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4">Bio</h2>
                <textarea placeholder={user.bio && user.bio !== "null" ? user.bio : "Make a bio!"}
                          className="w-64 h-32 p-2 border border-gray-300 rounded">
                    </textarea>
                <p id="error_text" className="hidden"> No changes made</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => {
                    const bio_text = document.querySelector("textarea")?.value;
                    if (!bio_text || bio_text === "null" || bio_text === user.bio) {
                        document.querySelector("#error_text")?.classList.remove("hidden");
                    } else {
                        //post user to backend
                    }
                }}>
                    Save Changes
                </button>
            </div>
        </div>
    </div>
);
}
;
export default UserProfile;