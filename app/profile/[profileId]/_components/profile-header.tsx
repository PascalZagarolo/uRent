import { User } from "@prisma/client";
import Logo from "./u-rent-logo";
import Avatar from "./avatar";
import LocationProfile from "./location-rating";
import RatingProfile from "./rating-profile";
import UploadProfilePic from "./upload-profile-pic";
import { AlignCenterIcon, BookUser, Contact, Contact2, UserCircle2 } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import NotVerifiedYet from "./not-verified-yet";
import { use } from "react";
import { Separator } from "@/components/ui/separator";
import ProfileDescription from "./profile-description";
import ContactOptions from "./contact-options";
import ContactOptionsRender from "./contact-options";
import { db } from "@/utils/db";
import { CheckmarkIcon } from "react-hot-toast";


interface ProfileHeaderProps {
    currentUser: User;
    user: User;
    
}


const ProfileHeader: React.FC<ProfileHeaderProps> = async ({
    currentUser,
    user,
    
}) => {

    const convertDateTimeToString = (dateTime: Date): string => {
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear().toString();

        return `${day}.${month}.${year}`;
    };

    const contacts = await db.contactOptions.findUnique({
        where : {
            userId : user.id
        }
    })

    const isOwnProfile = currentUser?.id === user.id || user.emailVerified ? true : false;

    const ownProfile = currentUser?.id === user.id

    return (
        <div className=" px-4 ">
            
                <div className="mt-4 mb-4">
                    { isOwnProfile && !user.confirmedMail && (
                        <NotVerifiedYet
                        email={user.email}
                        isOwnProfile={isOwnProfile}
                    />
                    )}
                </div>
          

            
            <div className="">
                
                
                <div className="flex">

                    <div className="flex       
                       rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">

                        <div className="">
                        <div className=" text-gray-100     drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                <div className=" text-md flex gap-x-4">
                                   Name: <p className="font-semibold"> {user.name.charAt(0).toUpperCase() || ""}{user.name.slice(1)}</p>
                                </div>
                                <div className=" text-md flex gap-x-4">
                                   Email-Addresse: <div className="font-semibold flex"> {user.email} {user.emailVerified && <CheckmarkIcon className="ml-1 h-2 w-2"/> }</div>
                                </div>
                            </div>
                            <div className="flex mt-4">
                            <Avatar
                                    imageUrl={user.image}
                                />
                                <div className="items-center ml-8">
                                    {ownProfile && (
                                        <UploadProfilePic />
                                    )}
                                    <div className="text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] mt-2 flex dark:text-gray-300">
                                        <UserCircle2 className="mr-1" /> Mitglied seit : {convertDateTimeToString(user?.createdAt)}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    
                    
                </div>
                <div className="mt-8 text-md font-semibold ml-2 flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.)]">
                    <UserCircle2 className="mr-2 h-4 w-4" /> Über mich
                </div>
                <div>
                <ProfileDescription 
                ownProfile={ownProfile}
                    user={user}
                />
                </div>

                <div className="mt-8 text-md font-semibold ml-2 flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.)]">
                    <Contact className="mr-2 h-4 w-4" /> Kontakt
                </div>
                <div className="">
                <ContactOptionsRender
                    contacts={contacts}
                    ownProfile={ownProfile}
                    />
                </div>
            </div>


        </div>
    );
}

export default ProfileHeader;