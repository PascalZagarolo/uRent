'use client';



import { Button } from "@/components/ui/button";
import { business, users } from "@/db/schema";
import axios from "axios";
import { format } from "date-fns";
import { AlignCenter, BuildingIcon, CarIcon, MapPinIcon, User2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCardMembership } from "react-icons/md";
import { businessAddress } from '../../../../../db/schema';
import { GiTargetPoster } from "react-icons/gi";

interface ProfileViewProps {
    thisUser: typeof users.$inferSelect;
    inseratArray: number;
    inseratOwner: typeof users.$inferSelect;
    thisBusiness: typeof business.$inferSelect;

}

const ProfileView: React.FC<ProfileViewProps> = ({
    thisUser,
    inseratArray,
    inseratOwner,
    thisBusiness
}) => {

    const params = useParams();


    const [firstReload, setFirstReload] = useState(false);

    /*
    useEffect(() => {
        axios.patch(`/api/inserat/${params.inseratId}/view`);
    },[]) 
*/
    const router = useRouter();

    return (
        <div className="px-4 py-4 bg-[#171923] xl:min-w-[360px] sm:w-2/5 w-full 
          rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
         dark:from-[#2a3046] dark:via-[#23283b] dark:to-[#191d2a]
         ">

            {thisBusiness && (
                <div className="bg-[#171923]  p-4 text-sm font-semibold flex">
                  <BuildingIcon className="w-4 h-4 mr-2" />  Gewerblicher Händler
                </div>
            )}

            <div className="bg-[#1b1d28] p-4 w-full rounded-b-md">
                <div className="flex items-center w-full text-gray-100">
                    <Image
                        src={thisUser.image || "/placeholder-person.jpg"}
                        width={40}
                        height={40}
                        className="rounded-full h-[40px] w-[40px] border border-gray-100 dark:border-gray-800"
                        alt="User-Bild"
                    />
                    <div className="font-semibold ml-2 flex items-center text-md w-3/4 truncate">
                        {thisUser.name}


                    </div>

                </div>

                <div>
                    <div>
                        <p className="text-xs font-semibold  mt-2 flex dark:text-gray-100/90 text-gray-400">
                            <MdCardMembership className="w-4 h-4 mr-2" /> Mitglied seit: {format(new Date(thisUser.createdAt), "dd.MM.yyyy")}
                        </p>
                    </div>
                </div>
                <div className="flex gap-x-1 mt-4">
                    <div className="text-sm flex items-center">
                        <GiTargetPoster className="w-4 h-4 mr-2" />   {inseratArray} {inseratArray === 1 ? "Inserat" : "Inserate"} online
                    </div>
                </div>

            </div>
            {thisBusiness && (
                <div className="bg-[#1b1d28] p-4 w-full rounded-t-md mt-2 ">
                    <h1 className="flex items-center gap-x-2 text-sm font-semibold">
                        <MapPinIcon className="w-4 h-4 text-rose-600" />Firmenstandort
                    </h1>
                    <div >
                        {thisBusiness?.businessAddresses?.map((business) => (
                            business.isPrimary && (
                                <div key={business.id}>

                                    <div className="mt-2">
                                        <Image
                                            src={business?.image}
                                            width={600}
                                            height={600}
                                            className="w-full rounded-none h-[80px] object-cover"
                                            alt="Business-Bild"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <div className="text-xs mt-1 w-full ml-auto flex justify-end font-semibold">
                                            {business?.street},  {business?.postalCode} {business?.city}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4">
                <Button className="w-full flex bg-[#1f222f]  dark:text-gray-100 text-gray-300 dark:hover:bg-[#282b3b]"
                    onClick={() => { router.push(`/profile/${inseratOwner.id}`) }}>
                    <User2 className="w-6 h-6 mr-2" />  Zum Profil
                </Button>
            </div>
        </div>
    );
}

export default ProfileView;