import { User } from "@prisma/client";
import Logo from "./u-rent-logo";
import Avatar from "./avatar";
import LocationProfile from "./location-rating";
import RatingProfile from "./rating-profile";

interface ProfileHeaderProps {
    currentUser: User;
}


const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    currentUser
}) => {

    const convertDateTimeToString = (dateTime: Date): string => {
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear().toString();

        return `${day}.${month}.${year}`;
    };

    return (
        <div>
            <div className="flex justify-center mt-8 mb-8">
            <Logo/>
            </div>
            
            <div className="flex justify-center mt-4">
                <h3 className="text-4xl font-semibold flex justify-center items-center">
                    <p className="text-blue-800">{currentUser.name.charAt(0)}</p> {currentUser.name.slice(1)}
                </h3>

            </div>
            <div>
            <p className="flex justify-center text-sm text-gray-800/50"> Mitglied seit : {convertDateTimeToString(currentUser.createdAt)}</p>
            <div className="flex justify-center mt-8">
                <Avatar/>
               
            </div>
            <p className="flex justify-center text-sm font-bold text-gray-800/80 mt-2"> Profilbild bearbeiten </p>
            </div>

            <div className="mt-4">
                <div className="flex justify-center">
                    <LocationProfile/>
                    <div className="ml-4
                    mr-4">

                    </div>
                    <RatingProfile/>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;