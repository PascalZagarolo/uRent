import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface ProfilePicBusinessProps {
    imageUrl?: string;
}

const ProfilePicBusiness: React.FC<ProfilePicBusinessProps> = ({
    imageUrl
}) => {
    return (
        <div className="relative sm:h-[132px] sm:w-[132px] h-[80px] w-[80px] shadow-lg rounded-full overflow-hidden group cursor-pointer">
          
            <img
                src={imageUrl || "/placeholder-person.jpg"}
                className="rounded-full object-cover sm:h-[132px] h-[80px] sm:w-[132px] w-[80px]"
                alt="Person"
            />

          
        </div>
    );
}

export default ProfilePicBusiness;