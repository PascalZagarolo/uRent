'use client';



import { Button } from "@/components/ui/button";
import { users } from "@/db/schema";
import axios from "axios";
import { format } from "date-fns";
import { AlignCenter, CarIcon, User2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileViewProps {
    thisUser: typeof users.$inferSelect;
    inseratArray: number;
    inseratOwner: typeof users.$inferSelect;
    averageRating: number,
}

const ProfileView: React.FC<ProfileViewProps> = ({
    thisUser,
    inseratArray,
    inseratOwner,
    averageRating
}) => {

    const params = useParams();

    const [firstReload, setFirstReload] = useState(false);
    /*
    useEffect(() => {
        axios.patch(`/api/inserat/${params.inseratId}/view`);
    },[]) */

    const router = useRouter();

    return (
        <div className="px-4 py-4 bg-[#171923] xl:min-w-[360px] sm:w-2/5 w-full 
          rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
         dark:from-[#2a3046] dark:via-[#23283b] dark:to-[#191d2a]
         ">
            <div className="flex items-center  text-gray-100">
                <Image
                    src={thisUser.image || "/placeholder-person.jpg"}
                    width={40}
                    height={40}
                    className="rounded-full h-[40px] w-[40px] "
                    alt="User-Bild"
                />
                <div className="font-semibold ml-2 flex items-center w-3/4 truncate">
                    <p className="font-black text-xl text-[#49506c] dark:text-[#49506c]">
                        {thisUser.name.charAt(0).toUpperCase()}</p><div>{thisUser.name.slice(1)}</div>

                </div>
                <div className="flex ml-auto">
                    <Button variant="ghost" size="sm" className="ml-auto">
                        Folgen
                    </Button>
                </div>
            </div>
            
            <div>
                <div>
                    <p className="text-sm  mt-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] dark:text-gray-100/90 text-gray-400">
                        Aktiv seit : {format(new Date(thisUser.createdAt), "dd.MM.yyyy")}
                    </p>
                </div>
            </div>
            <div className="flex gap-x-1 mt-4">

                <div>
                    <p className=" mr-2 text-gray-200 dark:text-gray-100">
                        Zufriedenheit :
                    </p>
                </div>
                <div className="flex">
                 {!isNaN(averageRating) ? <p className="font-semibold flex dark:text-gray-100 text-gray-200"> {averageRating} / 5  <CarIcon className="ml-2" /> </p>  : 
                 <p className="text-sm text-gray-100/80">keine Bewertungen vorhanden</p>} 

                </div>

            </div>
            <div className="mt-2 flex text-gray-200 dark:text-gray-100 ">
                offene Anzeigen <p className="ml-2">({inseratArray})</p>
            </div>

            <div className="mt-4">
                <Button className="w-full flex bg-[#1f222f]  dark:text-gray-100 text-gray-300 dark:hover:bg-[#282b3b]" onClick={() => { router.push(`/profile/${inseratOwner.id}`) }}>
                    <User2 className="w-6 h-6 mr-2" />  Zum Profil
                </Button>
            </div>
        </div>
    );
}

export default ProfileView;