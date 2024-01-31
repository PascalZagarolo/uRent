'use client';


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Inserat, User } from "@prisma/client";
import axios from "axios";
import { AlignCenter, CarIcon, User2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProfileViewProps {
    user: User;
    inseratArray: Inserat[];
    inseratOwner: User;
    averageRating: number,
}

const ProfileView: React.FC<ProfileViewProps> = ({
    user,
    inseratArray,
    inseratOwner,
    averageRating
}) => {

    const params = useParams();

    useEffect(() => {
        axios.patch(`/api/inserat/${params.inseratId}/view`);
    })

    const router = useRouter();

    return (
        <div className="px-4 py-4 bg-gradient-to-b from-[#586392] via-[#5a6288] to-[#565e82] w-[400px] border border-black rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
            <div className="flex items-center  text-gray-100">
                <Image
                    src={user.image || "/placeholder-person.jpg"}
                    width={40}
                    height={40}
                    className="rounded-full  "
                    alt="User-Bild"
                />
                <div className="font-semibold ml-2 flex items-center">
                    <p className="font-black text-xl text-[#262a3c]">{user.name.charAt(0).toUpperCase()}</p><div>{user.name.slice(1)}</div>

                </div>
                <div className="flex ml-auto">
                    <Button variant="ghost" size="sm" className="ml-auto">
                        Folgen
                    </Button>
                </div>
            </div>
            <div>
                <div className="mt-1">
                    <div><Badge className="bg-[#2d3144]"> Gewerblicher Händler </Badge></div>
                </div>
            </div>
            <div>
                <div>
                    <p className="text-sm text-white/50 mt-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                        Aktiv seit : 12.12.12
                    </p>
                </div>
            </div>
            <div className="flex gap-x-1 mt-4">

                <div>
                    <p className="font-bold mr-2 text-[#1d1f2c]">
                        Zufriedenheit :
                    </p>
                </div>
                <div className="flex">
                 {!isNaN(averageRating) ? <p className="font-semibold flex"> {averageRating} / 5  <CarIcon className="ml-2" /> </p>  : <p className="font-semibold italic text-sm text-gray-900/50">keine Bewertungen vorhanden</p>} 

                </div>

            </div>
            <div className="mt-2 flex text-[#1d1f2c] font-bold ">
                offene Anzeigen <p className="ml-2">({inseratArray.length})</p>
            </div>

            <div className="mt-4">
                <Button className="w-full flex bg-[#1f222f] border border-black12" onClick={() => { router.push(`/profile/${inseratOwner.id}`) }}>
                    <User2 className="w-6 h-6 mr-2" />  Zum Profil
                </Button>
            </div>
        </div>
    );
}

export default ProfileView;