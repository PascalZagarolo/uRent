
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
import { MdOutlineCardMembership } from "react-icons/md";
import UploadBusinessPics from "./upload-business-pics";
import { business } from '../../../../db/schema';


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






            <div className="flex w-full  ">

                <div className="flex rounded-md w-2/5">
                    <div className="w-full">
                        <div className=" dark:text-gray-100 w-full">
                            <div className="w-full text-lg  font-semibold line-clamp-1 whitespace-break-spaces break-all">
                                {user.name.charAt(0).toUpperCase() || ""}{user.name.slice(1)}
                            </div>
                            <div className="text-sm w-full line-clamp-1 whitespace-break-spaces break-all font-normal">
                                {user.email}
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
                                <div className="text-gray-900 text-sm mt-2 font-semibold flex dark:text-gray-300">
                                    <MdOutlineCardMembership className="mr-1" /> Mitglied seit : {convertDateTimeToString(user?.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {user.isBusiness && (
                    <div className="w-3/5 flex justify-end h-[240px] gap-x-2">
                    <UploadBusinessPics 
                    usedImages={user?.business?.businessImages}
                    businessId={user?.business?.id}
                    ownProfile={ownProfile}
                    />
                </div>
                )}

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
                        <StandortRender 
                        ownProfile={ownProfile}
                        />
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