'use client'

import BusinessHeaderAvatar from "../business-header/business-header-avatar";
import ProfilePicBusiness from "../business-header/profile-pic-business";




interface ProfileRenderHeaderProps {
    userImage: string;
    ownProfile: boolean;
    currentUserId: string;
}

const ProfileRenderHeader: React.FC<ProfileRenderHeaderProps> = ({
    ownProfile,
    userImage,
    currentUserId
}) => {
   
   

   
    return (
        <div className="relative">
            <div className="h-[320px] w-full bg-[#222222] shadow-lg" />
           {ownProfile ? (
            <div className="absolute bottom-[-40px] left-8">
            <BusinessHeaderAvatar existingImageUrl={userImage} userId={currentUserId} />
        </div>
           ) : (
            <div>
                <ProfilePicBusiness imageUrl={userImage} />
            </div>
           )}
        </div>
    );
};

export default ProfileRenderHeader;
