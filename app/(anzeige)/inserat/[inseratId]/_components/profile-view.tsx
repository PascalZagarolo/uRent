'use client';



import { Button } from "@/components/ui/button";
import { business, userTable } from "@/db/schema";
import axios from "axios";
import { format } from "date-fns";
import { AlignCenter, BuildingIcon, Globe2Icon, MailIcon, MapPinIcon, PhoneIcon, TruckIcon, User2, UserIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { MdCardMembership, MdOutlineStarRate } from "react-icons/md";
import { businessAddress } from '../../../../../db/schema';
import { GiTargetPoster } from "react-icons/gi";
import { FaFax } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface ProfileViewProps {
    thisUser: typeof userTable.$inferSelect | any;
    inseratArray: number;
    inseratOwner: typeof userTable.$inferSelect;
    thisBusiness: typeof business.$inferSelect;

}

const ProfileView: React.FC<ProfileViewProps> = ({
    thisUser,
    inseratArray,
    inseratOwner,
    thisBusiness
}) => {

    const params = useParams();




    /*
     useEffect(() => {
         const gainView = async () => {
            await axios.patch(`/api/inserat/${params.inseratId}/view`);
         }

         gainView();
     },[]) 
     */


    const router = useRouter();

    return (
        <div className={cn(`px-4 py-4 bg-[#171923]  w-full 
        sm:rounded-md 
       dark:from-[#2a3046] dark:via-[#23283b] dark:to-[#191d2a]
       `, thisUser?.subscription?.subscriptionType === "ENTERPRISE" && "  border-indigo-800")}>
            {thisUser?.subscription?.subscriptionType === "ENTERPRISE" && (
                <div className="ml-auto  from-indigo-600 to-indigo-800 bg-gradient-to-br text-gray-200 p-2 rounded-t-md flex justify-center items-center text-md font-semibold">
                   uRent Enterprise  
                </div>
            )}

            <div className={cn("bg-[#1b1d28] p-4 w-full rounded-b-md shadow-lg", 
            thisUser?.subscription?.subscriptionType === "ENTERPRISE" && "border-r border-b border-l border-indigo-800"
            )}>
                <div className="flex items-center w-full text-gray-100">
                    <Image
                        src={thisUser.image || "/placeholder-person.jpg"}
                        width={40}
                        height={40}
                        className="rounded-full h-[40px] w-[40px] border border-gray-100 dark:border-gray-800"
                        alt="User-Bild"
                    />
                    <div className="font-semibold ml-2 flex items-center text-base w-3/4 line-clamp-1">
                        {thisUser.name}
                    </div>


                </div>
                {(thisUser?.sharesRealName && (thisUser?.vorname || thisUser?.nachname)) && (
                    <div className="text-sm text-gray-200  flex items-center mt-1 text-gray-200/90">
                        {thisUser.vorname} {thisUser.nachname}
                    </div>
                )}
                {thisUser?.sharesEmail && (
                    <div className="text-sm text-gray-200 font-semibold flex items-center">
                        {thisUser.email}
                    </div>
                )}
                
                <div className="flex gap-x-1 mt-4">
                    <div className="text-sm flex items-center text-gray-200/80">
                        {inseratArray} {inseratArray === 1 ? "Inserat" : "Inserate"} online
                    </div>
                </div>
                <div>
                    <div>
                        <p className="text-sm mt-1 flex dark:text-gray-100/90 text-gray-400">
                            Mitglied seit {format(new Date(thisUser.createdAt), "dd.MM.yyyy")}
                        </p>
                    </div>
                </div>
            </div>
            {thisBusiness && thisBusiness?.businessAddresses.length > 0 && (
                <div className="bg-[#1b1d28] p-4 w-full rounded-t-md mt-2 shadow-lg">
                    <h1 className="flex items-center gap-x-2 text-sm font-semibold">
                        <MapPinIcon className="w-4 h-4 text-rose-600" /> Firmenstandort
                    </h1>
                    <div >
                        {thisBusiness?.businessAddresses?.map((business: typeof businessAddress.$inferSelect) => (
                            business.isPrimary && (
                                <div key={business.id}>

                                    <div className="mt-2">
                                        {business?.image ? (
                                            <Image
                                                src={business?.image}
                                                width={600}
                                                height={600}
                                                className="w-full rounded-none h-[80px] object-cover"
                                                alt="Business-Bild"
                                            />
                                        ) : (
                                            <div className="h-[80px] bg-[#161923]">
                                                <p className="flex h-full justify-center items-center text-gray-200/70 text-xs">Kein Bild vorhanden</p>
                                            </div>
                                        )}
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

            {thisBusiness && (
                <div className="bg-[#1b1d28] shadow-lg p-4 w-full rounded-md mt-2">
                    <h1 className="w-full text-sm font-medium flex">
                        Weitere Kontaktdaten
                    </h1>
                    <Separator
                        className="w-full bg-[#1b1d28] py-1 h-[0.5px]"
                    />
                    <div>

                        <div className="w-full flex text-xs items-center">
                            <Globe2Icon className="w-4 h-4 mr-2" /> Website
                            <div className="text-xs mt-2 w-full ml-auto flex justify-end font-semibold">
                                {thisBusiness?.website ? thisBusiness?.website : "-"}
                            </div>
                        </div>

                        <div className="w-full flex text-xs items-center">
                            <MailIcon className="w-4 h-4 mr-2" /> Email
                            <div className="text-xs mt-2 w-full ml-auto flex justify-end font-semibold">
                                {thisBusiness?.email ? thisBusiness?.email : "-"}
                            </div>
                        </div>

                        <div className="w-full flex text-xs items-center">
                            <PhoneIcon className="w-4 h-4 mr-2" /> Tel.
                            <div className="text-xs mt-2 w-full ml-auto flex justify-end font-semibold">
                                {thisBusiness?.telephone_number ? thisBusiness?.telephone_number : "-"}
                            </div>
                        </div>

                        <div className="w-full flex text-xs items-center">
                            <FaFax className="w-4 h-4 mr-2" /> Fax
                            <div className="text-xs mt-2 w-full ml-auto flex justify-end font-semibold">
                                {thisBusiness?.fax ? thisBusiness?.fax : "-"}
                            </div>
                        </div>
                        <div className="text-xs text-gray-200/60 mt-2">
                            * Kontaktdaten aus dem Profil können von den Kontakdaten des Inserats abweichen.
                        </div>
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