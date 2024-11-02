'use client'

import { Button } from "@/components/ui/button";

import { ArrowDown, ArrowUp } from "lucide-react";

import { inserat, priceprofile } from "@/db/schema";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { AiFillProfile } from "react-icons/ai";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import AddPriceProfileCreation from "./add-price-profile";
import EditPriceProfilesCreation from "./edit-price-profile";
import DeletePriceProfilesCreation from "./delete-price-profiles";
import { IoIosInformationCircleOutline } from "react-icons/io";



interface PriceProfilesCreationProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentPriceProfiles: any[];
    setCurrentPriceProfiles: (value) => void;
}

const PriceProfilesCreation: React.FC<PriceProfilesCreationProps> = ({
    thisInserat,
    currentPriceProfiles,
    setCurrentPriceProfiles
}) => {

    const [priceType, setPriceType] = useState<string>("");

    const [currentValue, setCurrentValue] = useState(null);








    const router = useRouter();










    // const onUpwards = async (priceprofileId: string, position: number) => {
    //     try {

    //         const values = {
    //             action: "Up",
    //             position: position,
    //             priceprofileId: priceprofileId
    //         }
    //         await axios.patch(`/api/priceprofile/reorder/${thisInserat?.id}`, values)
    //             .then(() => {

    //                 router.refresh();
    //                 toast.success("Preisprofil verschoben")
    //             })

    //     } catch (error: any) {
    //         console.log(error);
    //         toast.error("Fehler beim verschieben des Preisprofils")
    //     }
    // }

    // const onDownwards = async (priceprofileId: string, position: number) => {
    //     try {

    //         const values = {
    //             action: "Down",
    //             position: position,
    //             priceprofileId: priceprofileId
    //         }

    //         await axios.patch(`/api/priceprofile/reorder/${thisInserat?.id}`, values)
    //             .then(() => {
    //                 router.refresh();

    //                 toast.success("Preisprofil verschoben")
    //             })

    //     } catch (error: any) {
    //         console.log(error);
    //         toast.error("Fehler beim verschieben des Preisprofils")
    //     }
    // }

    const counts = currentPriceProfiles.reduce(
        (acc, profile) => {
            if (profile.getsDeleted) acc.deleted += 1;
            if (profile.getsAdded) acc.added += 1;
            return acc;
        },
        { deleted: 0, added: 0 }
    );

    const getsDeletedCount = counts.deleted;
    const getsAddedCount = counts.added;


    const currentLength = thisInserat?.priceprofiles.length + (getsAddedCount - getsDeletedCount);

    return (
        <div>
            <div>
                <div className="text-md font-semibold pb-2 flex items-center">
                    <AiFillProfile className="w-4 h-4 mr-2" />  Meine Preisprofile
                    <Popover>
                        <PopoverTrigger>
                            <IoIosInformationCircleOutline className="w-4 h-4 ml-2" />
                        </PopoverTrigger>
                        <PopoverContent className="border-gray-600 dark:bg-[#141414]">
                            <div className="text-xs">
                                Als Vermieter kannst du Preisprofile erstellen,
                                die klare und übersichtliche Preislisten für verschiedene Zeiträume oder Entfernungen bieten, <br />
                                z.B. {`"`}Pro Stunde 49€{`"`}. <br /> <br />
                                So kannst du deinen Kunden einfach und transparent die besten Optionen für ihre Mietbedürfnisse präsentieren.
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>
                {currentLength < 6 && (
                    <AddPriceProfileCreation thisInserat={thisInserat} setPriceProfiles={setCurrentPriceProfiles} />
                )}
                <div className="space-y-2">
                    {currentPriceProfiles
                        ?.filter((priceProfile: any) => {
                            return !priceProfile.getsDeleted;
                        })
                        .map((priceProfile: typeof priceprofile.$inferSelect, index: number) => (
                            <div className="dark:bg-[#141414] p-4 rounded-md" key={priceProfile.id}>
                                <div className="flex items-center gap-x-2">
                                    {/* <div className="w-1/4">
                        <Button
                            size="sm"
                            variant="ghost"
                            disabled={index === 0 || isLoading}
                            onClick={() => onUpwards(priceProfile.id, priceProfile.position)}
                        >
                            <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            disabled={index === currentPriceProfiles?.length - 1 || isLoading}
                            onClick={() => onDownwards(priceProfile.id, priceProfile.position)}
                        >
                            <ArrowDown className="w-4 h-4" />
                        </Button>
                    </div> */}
                                    <div className="text-sm font-semibold w-1/4 line-clamp-1 break-all">
                                        {priceProfile?.title}
                                    </div>
                                    <div className="text-sm font-medium dark:text-gray-200/60 w-1/12 line-clamp-1 break-all">
                                        {priceProfile?.price}€
                                    </div>
                                    <div className="text-sm font-medium dark:text-gray-200/60 w-1/12 line-clamp-1 break-all">
                                        {priceProfile?.freeMiles
                                            ? `${priceProfile?.freeMiles}Km`
                                            : "Keine Kilometerbegrenzung angegeben"}
                                    </div>
                                    <div className="text-sm font-medium flex justify-end w-3/12 break-all gap-x-2">
                                        <EditPriceProfilesCreation
                                            thisProfile={priceProfile}
                                            setCurrentPriceProfiles={setCurrentPriceProfiles}
                                        />
                                        <DeletePriceProfilesCreation
                                            thisProfileId={priceProfile?.id}
                                            setCurrentPriceProfiles={setCurrentPriceProfiles}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                    {currentPriceProfiles?.length === 0 && (
                        <div className="text-sm dark:text-gray-200/60">
                            Noch keine Preisprofile erstellt..
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default PriceProfilesCreation;