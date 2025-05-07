'use client'

import { userTable } from "@/db/schema";
import BusinessHeaderAvatar from "../business-header/business-header-avatar";
import ContactUser from "../business-header/contact-user";
import ProfilePicBusiness from "../business-header/profile-pic-business";




interface ProfileRenderHeaderProps {
    userImage: string;
    ownProfile: boolean;
    currentUser : typeof userTable.$inferSelect;
}

const ProfileRenderHeader: React.FC<ProfileRenderHeaderProps> = ({
    ownProfile,
    userImage,
    currentUser
}) => {
   
   

   
    return (
        <div className="relative">
            <div className="h-[320px] w-full  shadow-lg" />
           {ownProfile ? (
            <div className="absolute bottom-[-40px] left-8">
            <BusinessHeaderAvatar existingImageUrl={userImage} userId={currentUser?.id} />
        </div>
           ) : (
            <div>
                <ProfilePicBusiness imageUrl={userImage} />
            </div>
           )}
            {!ownProfile && (
            <div className="absolute bottom-[-20px] right-8">
                <ContactUser 
                currentUser={currentUser}
                />
            </div>
           )}
        </div>
    );
};

export default ProfileRenderHeader;
