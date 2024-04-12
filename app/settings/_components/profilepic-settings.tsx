import Image from "next/image";
import ChangeProfilePic from "./change-profile-pic";

interface ProfilePicSettingsProps {
    imageUrl : string
    thisUserId : string
}

const ProfilePicSettings: React.FC<ProfilePicSettingsProps> = ({
    imageUrl,
    thisUserId
}) => {
    return ( 
        <div className="w-full flex items-center gap-x-8">
            <Image
                src={imageUrl ? imageUrl : "/placeholder-person.jpg"}
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full w-24 h-24 object-cover" />
                <div className="">
<ChangeProfilePic 
thisUserId = {thisUserId}
/>
                </div>
        </div>
     );
}
 
export default ProfilePicSettings;