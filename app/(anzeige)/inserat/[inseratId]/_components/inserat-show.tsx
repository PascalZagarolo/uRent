import { booking, CategoryEnumRender, inserat } from "@/db/schema";
import InseratDescription from "./inserat-description";
import BookingsOverview from "./bookings-overview";
import { FaAddressCard, FaCircle } from "react-icons/fa";
import { convertState } from "@/actions/convert-states";
import { AlignLeft, CarFront, Circle, Clock2Icon, Contact2, Globe2, HourglassIcon, MailIcon, MapPinned, Phone, Truck, UserCircleIcon } from "lucide-react";
import { Ri24HoursLine, RiCaravanLine } from "react-icons/ri";
import { TbPigMoney, TbZoomMoney } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { GiReceiveMoney } from "react-icons/gi";
import { PiSteeringWheel, PiVanFill } from "react-icons/pi";
import InseratImageCarousel from "./inserat-image";
import ReportModal from "./report/report-modal";
import { format } from "date-fns";
import { VscMilestone } from "react-icons/vsc";
import TransferCarAdvert from "./transfer-car-advert";
import { MdOutlineOpenInNew } from "react-icons/md";
import PriceProfileDialog from "./price-profile-dialog";
import { GrLocation } from "react-icons/gr";
import { AiFillMediumCircle } from "react-icons/ai";

interface InseratShowProps {
    thisInserat: typeof inserat.$inferSelect | any
    inseratBookings: typeof booking.$inferSelect[];
    isOwner : boolean;
}

const InseratShow: React.FC<InseratShowProps> = ({
    thisInserat,
    inseratBookings,
    isOwner
}) => {

    const renderRahmen = (thisInserat?.caution != undefined
        || (thisInserat?.reqAge != 0 && thisInserat?.reqAge != undefined)
        || thisInserat?.pkwAttribute?.extraCost != undefined
        || thisInserat?.minTime != undefined
    )
    const usedCategory: typeof CategoryEnumRender | any = thisInserat.category

    function ripOutToLongAddresses(input: string): string {
        const lastCommaIndex = input?.lastIndexOf(',');
        if (lastCommaIndex !== -1) { // Check if comma exists
            return input?.substring(0, lastCommaIndex).trim();
        } else {
            return input; // No comma found, return the original input
        }
    }

    function returnMinTimeType(usedValue: number, minTime: string): string {

        if (usedValue === 1) {
            switch (minTime) {
                case "h":
                    return "Stunde";
                case "d":
                    return "Tag";
                case "w":
                    return "Woche";
                case "m":
                    return "Monat";
                default:
                    return minTime;
            }
        } else {
            switch (minTime) {
                case "h":
                    return "Stunden";
                case "d":
                    return "Tage";
                case "w":
                    return "Wochen";
                case "m":
                    return "Monate";
                default:
                    return minTime;
            }
        }

        return "";
    }

    const usedListPrices = thisInserat?.priceprofiles?.sort((a, b) => a.position - b.position) || [];

    const usedImages = thisInserat?.images?.sort((a, b) => a.position - b.position) || [];



    return (
        <div className="sm:mt-4 bg-[#161923]  text-gray-200 sm:p-8 p-4 
                        sm:rounded-md  
                     w-full">
                        {isOwner && (
                            <span className="mb-2">
                                {!thisInserat?.isPublished ? (
                                    <div className="text-xs  flex flex-row mb-2 text-emerald-600 font-semibold items-center">
                                        <FaCircle className="w-4 h-4 mr-2 text-emerald-500" />
                                        Das Inserat ist öffentlich und für alle sichtbar
                                    </div>
                                ) : (
                                    <div className="text-xs text-gray-200/60 flex flex-row items-center mb-2">
                                        <FaCircle  className="w-4 h-4 mr-2 text-gray-600" />
                                        Das Inserat ist privat und nur für dich sichtbar
                                    </div>
                                )}
                            </span>
                        )}
            <div className="flex  justify-between  w-full">
                <div className="bg-[#1d1f2b] w-1/8 rounded-lg p-4">
                    {
                        {
                            'PKW': <CarFront className=" text-gray-100 h-6 w-6 " />,
                            'LKW': <Truck className=" text-gray-100 h-6 w-6 " />,
                            'TRANSPORT': <PiVanFill className=" text-gray-100 h-6 w-6 " />,
                            'TRAILER': <RiCaravanLine className=" text-gray-100 h-6 w-6 " />
                            //@ts-ignore
                        }[usedCategory]
                    }
                </div>



                <div className=" text-md sm:text-base ml-2 font-bold text-gray-100  
                            bg-[#1d1f2b] sm:px-4 rounded-lg p-4 flex-grow  overflow-hidden flex justify-center">
                    <div className="w-full line-clamp-1 break-all overflow-hidden text-center">
                        {thisInserat.title}
                    </div>
                </div>


            </div>
            <div className="flex items-center gap-x-1 mt-1 sm:text-sm text-xs">
                <p className="text-xs text-gray-200  ">erstellt am :</p>
                <p className="font-semibold text-xs">{format(new Date(thisInserat.createdAt), "dd.MM")}</p>
                <div className="ml-auto">
                    <ReportModal />
                </div>
            </div>

            <div className="mt-4 rounded-md w-full text-gray-100  flex justify-center ">
                <InseratImageCarousel
                    imagesData={usedImages} />
            </div>
            <div>
                <div className="  bg-indigo-800 w-full mt-8   rounded-lg ">
                    <BookingsOverview
                        receivedBookings={inseratBookings}
                        thisInserat={thisInserat}
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-end items-center rounded-md sm:mt-2 p-4 w-full border-gray-800  bg-[#1B1D28]  text-gray-100 mt-2">
                    <div className="flex mr-auto items-center w-full">
                        <div className="flex font-bold  text-sm items-center  sm:w-full ">

                            <div className="w-full flex gap-x-2">
                                <div className="flex items-center justify-center  rounded-md">
                                    <GrLocation className="w-4 h-4  text-rose-800" />
                                </div>

                                {/* Address Section */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex items-center gap-x-2 text-sm w-full">

                                        <span className="text-gray-200 flex-shrink-0">{thisInserat?.address?.postalCode}</span>


                                        <span className="text-gray-200/80"> | </span>


                                        <span className="text-gray-200 font-medium line-clamp-1 flex-grow break-all">
                                            {thisInserat?.address?.locationString}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex w-full items-center">
                    {thisInserat.license && (
                        <div className=" font-semibold flex w-3/4 items-center">
                            <FaAddressCard className="w-4 h-4 mr-2" /><p className="font-normal px-2 sm:block hidden">
                                Führerscheinklasse : </p> {thisInserat.license}
                        </div>
                    )}
                    <div className="ml-auto justify-end w-1/2 flex mt-2 text-md sm:text-xl font-semibold ">
                        {thisInserat.price} € {thisInserat.dailyPrice && <p className="text-xs px-1">/Tag </p>}
                    </div>
                </div>
            </div>
            {/*
            <div className="mt-2">
                <TransferCarAdvert />
            </div>
            */}
            {thisInserat?.priceprofiles.length > 0 && (
                <div className="">
                    <div className="text-md font-semibold">
                        Weitere Preisprofile
                    </div>
                    <div className="space-y-2 mt-2">
                        {//@ts-ignore
                            usedListPrices.map((priceprofile: any) => (
                                <PriceProfileDialog
                                    key={priceprofile.id}
                                    thisPriceprofile={priceprofile}
                                />
                            ))}
                    </div>
                </div>
            )}

            {renderRahmen && (
                <>
                    <div className="mt-4">
                        <p className="flex text-lg sm:text-lg  items-center"><CiBookmark className="mr-2 h-4 w-4" />
                            Rahmenbedingungen</p>
                    </div>
                    <div className="w-full flex mt-2">
                        {thisInserat?.caution && (
                            <div className="w-1/2 truncate font-semibold text-sm flex">
                                <TbPigMoney className="w-4 h-4 mr-2 text-rose-300" />
                                Kaution : {Number((thisInserat?.caution))?.toFixed(2) + " €"}
                            </div>
                        )}
                        {thisInserat?.reqAge != 0 && thisInserat?.reqAge && (
                            <div className="w-1/2 truncate flex font-semibold text-sm ">
                                <>
                                    <UserCircleIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Mindestalter : {thisInserat?.reqAge + " Jahre"}
                                </>
                            </div>
                        )}
                    </div>
                    {thisInserat?.category === "PKW" && (
                        <div className="w-full flex mt-1">
                            {/* 
                    {thisInserat?.pkwAttribute?.freeMiles && (
                        <div className="w-1/2 truncate font-semibold text-sm flex">
                            <PiSteeringWheel className="w-4 h-4 mr-2 text-gray-400" />
                            Freikilometer :
                            {thisInserat?.pkwAttribute?.freeMiles ? " " + thisInserat?.pkwAttribute?.freeMiles + " Km" : "Keine KM-Anzahl angegeben"}
                        </div>
                    )}
                    */}
                            {thisInserat?.minTime && (
                                <div className="w-1/2 mt-1 truncate font-semibold text-sm flex">
                                    <Clock2Icon className="w-4 h-4 mr-2 text-indigo-800" />
                                    Mindestmietdauer : {thisInserat?.minTime.slice(0, 1)} {returnMinTimeType(Number(thisInserat.minTime.slice(0, 1)), thisInserat?.minTime.slice(1))}
                                </div>
                            )}
                            {thisInserat?.pkwAttribute?.extraCost && (
                                <div className="w-1/2 truncate flex font-semibold text-sm ">
                                    <GiReceiveMoney className="w-4 h-4 mr-2 text-emerald-600" />
                                    Extrapreis /Km : {thisInserat?.pkwAttribute?.extraCost ?
                                        (thisInserat?.pkwAttribute?.extraCost).toFixed(2) + " €"
                                        : "Keine Kosten angegeben"}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}


            <div className="mt-4">
                <div className="flex sm:text-lg font-semibold items-center"><Contact2 className="mr-2 h-4 w-4" />
                    Kontaktinformationen
                </div>
            </div>

            <div className="mt-2">
                <div className=" ">

                    <div className="w-full sm:flex mt-2">
                        <div className="sm:w-1/2 items-center">
                            <div className="flex items-center">


                                <MailIcon className="w-4 h-4 mr-2" /><p className="text-sm">
                                    {thisInserat?.emailAddress ? thisInserat?.emailAddress : thisInserat.user.email}</p>


                            </div>
                        </div>
                        <div className="sm:w-1/2 items-center">
                            <div className="flex items-center sm:mt-0 mt-2">
                                {thisInserat?.phoneNumber && (
                                    <>    <Phone className="w-4 h-4 mr-2" />  <p className=" text-sm">
                                        {thisInserat?.phoneNumber}</p> </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:flex mt-2">
                        <div className="sm:w-1/2 items-center">
                            <div className="flex items-center">


                                {thisInserat.user?.contactOptions?.websiteAddress && (
                                    <a href="/"
                                        className="flex hover:underline">
                                        <Globe2 className="w-4 h-4 mr-2" /><p className="text-sm">
                                            {thisInserat.user?.contactOptions?.websiteAddress ?
                                                thisInserat.user.contactOptions?.websiteAddress : ""}</p>
                                    </a>
                                )}


                            </div>
                        </div>

                    </div>


                </div>
                <p className="flex text-lg sm:text-lg font-semibold items-center mt-8">
                    <AlignLeft className="mr-2 h-4 w-4" /> Beschreibung der Anzeige</p>
                <InseratDescription
                    thisInserat={thisInserat}
                />

            </div>

        </div>
    );
}

export default InseratShow;