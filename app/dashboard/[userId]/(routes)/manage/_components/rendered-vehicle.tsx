'use client'

import { inserat, vehicle } from "@/db/schema";
import { format } from "date-fns";
import { CalendarCheck2Icon, CarFront, MapPinIcon, Truck } from "lucide-react";
import Image from "next/image";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import { convertState } from '../../../../../../actions/convert-states';
import { MdAddToPhotos } from "react-icons/md";
import { Button } from "@/components/ui/button";
import VehicleDialog from "./vehicle-dialog";
import { BsTextareaResize } from "react-icons/bs";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



interface RenderedVehicleProps {
    thisVehicle: typeof vehicle.$inferSelect
}

const RenderedVehicle: React.FC<RenderedVehicleProps> = ({
    thisVehicle
}) => {

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const searchParams = useSearchParams();
    const inseratId = searchParams.get('inseratId');
    const vehicleId = searchParams.get('vehicleId');

    const handleImageUpload = (result : any) => {
        try {

            const values = {
                image : result?.info?.secure_url
            }

            setIsLoading(true)
            axios.patch(`/api/inserat/${inseratId}/vehicle/${vehicleId}`, values).then(() => {
                router.refresh();
            })
            toast.success("Bild erfolgreich hochgeladen")
        } catch {
            toast.error("Fehler beim Upload")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full">
            <div className="p-4">
                <div className="flex items-center space-x-2">
                    <div className="rounded-md bg-[#1C1C1C]">

                    </div>
                    <h3 className="text-sm font-semibold flex w-full items-center space-x-2">
                        <div className="w-2/5 truncate font-semibold">
                            {thisVehicle?.title}
                        </div>
                        <div className="w-2/5 truncate text-xs">
                            {//@ts-ignore
                                thisVehicle?.inserat?.title}
                        </div>


                        <div className="ml-auto flex items-center w-1/5">
                            <p className="ml-auto text-xs">
                                {//@ts-ignore
                                    format(new Date(thisVehicle.inserat?.createdAt), 'dd.MM.yyyy')}
                            </p>
                        </div>
                    </h3>
                </div>
                <div className="mt-2">
                    <div className="w-full flex justify-center">
                    <CldUploadButton
                                onUpload={handleImageUpload}
                                uploadPreset="oblbw2xl"
                                options={{ maxFiles: 1 }}
                                className="w-full"
                            >
                        {thisVehicle?.image ? (
                            <Image
                                alt="preview image"
                                width={1000}
                                height={1000}
                                src={thisVehicle?.image}
                                className="w-full h-[200px] object-cover"
                            />
                        ) : (
                            
                                <div className="w-full h-[200px] flex items-center justify-center border-dashed border text-xs border-gray-400">
                                    Foto hinzufügen...
                                </div>
                            
                        )}
                        </CldUploadButton>
                    </div>
                    <div className="w-full mt-2 flex justify-start">
                        <MapPinIcon
                            className="w-4 h-4 mr-2 text-rose-600"
                        />

                        <div className="w-1/2 text-xs truncate">
                            {//@ts-ignore
                                thisVehicle.inserat?.address?.locationString}
                        </div>
                        <div className="w-1/2 flex justify-end truncate text-xs font-semibold">
                            {//@ts-ignore
                                thisVehicle.inserat?.address?.postalCode + ", "}
                            {//@ts-ignore
                                convertState(thisVehicle.inserat?.address?.state)}
                        </div>

                    </div>
                    <div className="w-full mt-2 mb-4 flex justify-start">
                        <CalendarCheck2Icon
                            className="w-4 h-4 mr-2 "
                        />
                        {//@ts-ignore
                            thisVehicle.inserat?.annual ? (
                                <p className="text-sm">
                                    Dauerhaftes Inserat
                                </p>
                            ) : (
                                <p className="text-sm" >
                                    {//@ts-ignore
                                        format(new Date(thisVehicle.inserat?.begin), 'dd.MM.yyyy')} - {format(new Date(thisVehicle.inserat?.end), 'dd.MM.yyyy')}
                                </p>
                            )}
                        <div className="ml-auto text-sm flex font-semibold w-1/2 truncate justify-end">
                            <BsTextareaResize className="w-4 h-4 mr-2" /> {thisVehicle?.registration}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenderedVehicle;