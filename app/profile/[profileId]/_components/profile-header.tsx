import { User } from "@prisma/client";
import Logo from "./u-rent-logo";
import Avatar from "./avatar";
import LocationProfile from "./location-rating";
import RatingProfile from "./rating-profile";
import UploadProfilePic from "./upload-profile-pic";
import { AlignCenterIcon, BookUser, UserCircle2 } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import NotVerifiedYet from "./not-verified-yet";
import { use } from "react";

interface ProfileHeaderProps {
    currentUser: User;
    user : User;
}


const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    currentUser,
    user
}) => {

    const convertDateTimeToString = (dateTime: Date): string => {
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear().toString();

        return `${day}.${month}.${year}`;
    };

    return (
        <div className="ml-16">
            <div color="mt-4">
            <NotVerifiedYet
            email={user.email}
            />
            </div>
            
            <div className="flex  mt-4 p-8 rounded-md border-2 border-gray-300 w-1/2 bg-[#10121a] text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <h3 className="text-4xl font-semibold flex justify-start items-center">
                    <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  text-[#475aa7] text-5xl">P</p> rofilübersicht
                </h3>

            </div>
            <div>
            <p className="flex font-bold text-sm text-gray-900/60"> Offline</p>
            <div className="mt-8 text-xl font-semibold ml-2 flex">
            <BookUser /> Profildetails
            </div>
            <div className="flex">
            
            <div className="flex mt-1   p-8  bg-gray-100 border-2 border-gray-900 mr-16 rounded-md w-1/2">
            
                <div className="">
                    <div className="bg-[#10121a] text-gray-100 p-2  rounded-lg border-2 border-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        <p className="font-bold text-lg  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] flex justify-center">
                            {currentUser.name.charAt(0).toUpperCase() || ""}{currentUser.name.slice(1)}
                        </p>
                    </div>
                    <div className="flex mt-4">
                    <Avatar
                imageUrl={currentUser.image}
                />
               <div className="items-center ml-8">
               <UploadProfilePic/>
               <div className="text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] mt-2 flex">
                <UserCircle2 className="mr-1"/> Mitglied seit : {convertDateTimeToString(currentUser.createdAt)}
                </div>
               </div>
                    </div>
                
                </div>
                
            </div>
            </div>
            
            
            </div>

           
        </div>
    );
}

export default ProfileHeader;