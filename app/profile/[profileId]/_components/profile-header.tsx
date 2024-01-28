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


interface ProfileHeaderProps {
    currentUser: User;
    user: User;
    ownProfile: boolean;
}


const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    currentUser,
    user,
    ownProfile
}) => {

    const convertDateTimeToString = (dateTime: Date): string => {
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear().toString();

        return `${day}.${month}.${year}`;
    };

    return (
        <div className="ml-16">
            {!user.confirmedMail && (
                <div className="mt-4">
                    <NotVerifiedYet
                        email={user.email}
                    />
                </div>
            )}

            <div className="flex   p-8 rounded-md border-2 border-gray-300  bg-[#10121a] text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <h3 className="text-4xl font-semibold flex justify-start items-center">
                    <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  text-[#475aa7] text-5xl">P</p> rofilübersicht
                </h3>

            </div>
            <div>
                <p className="flex font-bold text-sm text-gray-900/60"> Offline</p>
                <div className="mt-8 text-xl font-semibold ml-2 flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                    <BookUser className="mr-1" /> Profildetails
                </div>
                <div className="flex">

                    <div className="flex mt-1   p-8  bg-white border-2 border-gray-200  rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">

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
                                    <UploadProfilePic />
                                    <div className="text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] mt-2 flex">
                                        <UserCircle2 className="mr-1" /> Mitglied seit : {convertDateTimeToString(currentUser.createdAt)}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="ml-8 mt-1 w-1/2  p-8  bg-white border-2 border-gray-400  border-dashed rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">

                            <div className="w-full ">
                                <p className="flex justify-center font-semibold items-center text-lg">
                                    Du hast ein Gewerbe ?
                                </p>
                            </div>
                            <div className="mt-16">
                                <a href="/..." className="underline flex justify-center"> Hier dein Gewerbe registrieren </a>
                            </div>
                           

                    </div>

                </div>
                <div className="mt-8 text-xl font-semibold ml-2 flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.)]">
                    <UserCircle2 className="mr-1" /> Über mich
                </div>
                <div>
                <ProfileDescription ownProfile={true}
                    user={user}
                />
                </div>

                <div className="mt-8 text-xl font-semibold ml-2 flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.)]">
                    <Contact className="mr-1" /> Kontakt
                </div>
                <div>
                    <ContactOptions/>
                </div>
            </div>


        </div>
    );
}

export default ProfileHeader;