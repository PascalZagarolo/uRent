
import Avatar from "./avatar";
import LocationProfile from "./location-rating";
import RatingProfile from "./rating-profile";
import UploadProfilePic from "./upload-profile-pic";
import { AlignCenterIcon, BookUser, Contact, Contact2, UserCircle2 } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import NotVerifiedYet from "./not-verified-yet";

import ProfileDescription from "./profile-description";
import ContactOptionsRender from "./contact-options";

import { CheckmarkIcon } from "react-hot-toast";
import { contactOptions, users } from "@/db/schema";
import db from "@/db/drizzle";
import { eq, is } from 'drizzle-orm';
import StandortRender from "./standort-render";
import ContactRender from "./contact-render";
import BusinessDescription from "./business-description";
import { BiSolidBusiness } from "react-icons/bi";


interface ProfileHeaderProps {
    currentUser: typeof users.$inferSelect;
    user: typeof users.$inferSelect;
    thisContactOptions: typeof contactOptions.$inferSelect;
}


const ProfileHeader: React.FC<ProfileHeaderProps> = async ({
    currentUser,
    user,
    thisContactOptions,
}) => {

    const convertDateTimeToString = (dateTime: Date): string => {
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear().toString();

        return `${day}.${month}.${year}`;
    };



    const isOwnProfile = currentUser?.id === user.id || user.emailVerified ? true : false;

    const ownProfile = currentUser?.id === user.id

    return (
        <div className="px-4">

            <div className="mt-4 mb-4">
                {isOwnProfile && !user.confirmedMail && (
                    <NotVerifiedYet
                        email={user.email}
                        isOwnProfile={isOwnProfile}
                    />
                )}
            </div>






            <div className="flex w-full gap-x-4">

                <div className="flex rounded-md w-1/2">
                    <div className="">
                        <div className=" dark:text-gray-100">
                            <div className=" text-md flex gap-x-4">
                                Name: <p className="font-semibold"> {user.name.charAt(0).toUpperCase() || ""}{user.name.slice(1)}</p>
                            </div>
                            <div className=" text-md flex sm:gap-x-0 gap-x-4">
                                Email<p className="hidden sm:block mr-2">-Adresse</p> : <div className="font-semibold flex sm:ml-4"> {user.email} {user.emailVerified && <CheckmarkIcon className="ml-1 h-2 w-2" />}</div>
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
                <div className="w-1/2 flex justify-end gap-4">
                    <div className="w-1/2 p-8 h-full dark:bg-[#191919]">
                        1
                    </div>
                    <div className="w-1/2">
                        <div className="h-1/2 p-8 dark:bg-[#191919]">
                            2
                        </div>
                        <div className="h-1/2 p-8 dark:bg-[#191919]">
                            3
                        </div>
                    </div>
                </div>

            </div>
            {user.isBusiness ? (
                <>
                    <div className="mt-8 text-md font-semibold ml-2 flex items-center">
                    <BiSolidBusiness className="flex w-4 h-4 mr-2" /> über uRent
                    </div>
                    <div>
                        <BusinessDescription
                            ownProfile={ownProfile}
                            user={user}
                        />
                    </div>
                </>
            ) : (

                <>
                    <div className="mt-8 text-md font-semibold ml-2 flex ">
                    
                    <UserCircle2 className="mr-2 h-4 w-4" /> Über mich
                    </div>
                    <div>
                    <ProfileDescription
                            ownProfile={ownProfile}
                            user={user}
                        />
                    </div>
                </>

            )}

            {!user.isBusiness && (
                <div className="mt-8 text-md font-semibold ml-2 flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.)]">
                    <Contact className="mr-2 h-4 w-4" /> Kontakt
                </div>
            )}

            {user.isBusiness ? (
                <div className="w-full flex gap-4 mt-4">
                    <div className="w-1/2 ">
                        <StandortRender />
                    </div>
                    <div className="w-1/2 ">
                        <ContactRender />
                    </div>
                </div>
            ) : (
                <ContactOptionsRender
                    thisContactOptions={thisContactOptions}
                    ownProfile={ownProfile}
                />
            )}




        </div>
    );
}

export default ProfileHeader;