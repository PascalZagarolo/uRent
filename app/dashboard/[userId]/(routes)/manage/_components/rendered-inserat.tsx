import { CategoryEnumRender, inserat } from "@/db/schema";
import { format } from "date-fns";
import { CalendarCheck2Icon, CarFront, MapPinIcon, Truck } from "lucide-react";
import Image from "next/image";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import { convertState } from '../../../../../../actions/convert-states';
import { MdAddToPhotos } from "react-icons/md";
import { Button } from "@/components/ui/button";
import VehicleDialog from "./vehicle-dialog";


interface RenderedInseratProps {
    thisInserat: typeof inserat.$inferSelect | any;
}

const RenderedInserat: React.FC<RenderedInseratProps> = ({
    thisInserat
}) => {

    const usedCategory : typeof CategoryEnumRender = thisInserat.category;

    return (
        <div className="w-full">
            <div className="p-4">
                <div className="flex items-center space-x-2">
                    <div className="rounded-md bg-[#1C1C1C]">
                        <Button className="" variant="ghost">
                            {
                                {
                                    'PKW': <CarFront className=" text-gray-100 h-4 w-4 " />,
                                    'LKW': <Truck className=" text-gray-100 h-4 w-4 " />,
                                    'TRANSPORT': <PiVanFill className=" text-gray-100 h-4 w-4 " />,
                                    'TRAILER': <RiCaravanLine className="text-gray-100 w-4 h-4" />
                                    //@ts-ignore
                                }[usedCategory]
                            }
                        </Button>
                    </div>
                    <h3 className="text-sm font-semibold flex w-full items-center">
                        {thisInserat?.title}
                        <div className="ml-auto flex items-center space-x-2">
                            <p className="ml-auto text-xs">
                                {format(new Date(thisInserat?.createdAt), 'dd.MM.yyyy')}
                            </p>
                            {thisInserat?.multi && (
                                <div className="ml-auto">
                                    <VehicleDialog 
                                    thisInserat={thisInserat}
                                    />
                                </div>
                            )}
                        </div>
                    </h3>
                </div>
                <div className="mt-2">
                    <div className="w-full flex justify-center">
                        {thisInserat?.images?.length > 0 ? (
                            <Image
                            alt="preview image"
                            width={1000}
                            height={1000}
                            src={thisInserat?.images[0]?.url}
                            className="w-full h-[200px] object-cover"
                        />
                        ) : (
                            <div className="w-full h-[200px] object-cover">
                                <span className="flex justify-center items-center h-full">
                                    <MdAddToPhotos className="w-8 h-8 text-gray-400" />
                                </span>
                            </div>
                            
                        )}
                    </div>
                    <div className="w-full mt-2 flex justify-start">
                        <MapPinIcon
                            className="w-4 h-4 mr-2 text-rose-600"
                        />

                        <div className="w-1/2 text-xs truncate">
                            {thisInserat?.address?.locationString ? thisInserat?.address?.locationString : "Keine Adresse hinterlegt"}
                        </div>
                        <div className="w-1/2 flex justify-end truncate text-xs font-semibold">
                            {thisInserat?.address?.postalCode ? thisInserat?.address?.postalCode  + ", " : "Nicht angegeben"}
                            {convertState(thisInserat?.address?.state)}
                        </div>

                    </div>
                    <div className="w-full mt-2 mb-4 flex justify-start">
                        <CalendarCheck2Icon
                            className="w-4 h-4 mr-2 "
                        />
                        {thisInserat?.createdAt && (
                            <p className="text-xs">
                                erstellt am: {format(new Date(thisInserat?.createdAt), 'dd.MM.yyyy')}
                            </p>
                        )}
                        <div className="ml-auto text-sm flex font-semibold ">
                            {thisInserat?.price ? thisInserat?.price : "nicht Angegeben"} € <p className="text-xs">/Tag</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenderedInserat;