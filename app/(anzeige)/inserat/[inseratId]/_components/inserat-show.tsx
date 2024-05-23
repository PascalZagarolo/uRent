import { booking, CategoryEnumRender, inserat } from "@/db/schema";
import InseratDescription from "./inserat-description";
import BookingsOverview from "./bookings-overview";
import { FaAddressCard } from "react-icons/fa";
import { convertState } from "@/actions/convert-states";
import { AlignLeft, CarFront, Contact2, Globe2, HourglassIcon, MailIcon, MapPinned, Phone, Truck, UserCircleIcon } from "lucide-react";
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

interface InseratShowProps {
    thisInserat: typeof inserat.$inferSelect
    inseratBookings: typeof booking.$inferSelect[]
}

const InseratShow: React.FC<InseratShowProps> = ({
    thisInserat,
    inseratBookings
}) => {

    const usedCategory: typeof CategoryEnumRender = thisInserat.category

    function ripOutToLongAddresses(input: string): string {
        const lastCommaIndex = input?.lastIndexOf(',');
        if (lastCommaIndex !== -1) { // Check if comma exists
            return input?.substring(0, lastCommaIndex).trim();
        } else {
            return input; // No comma found, return the original input
        }
    }

    const usedListPrices = thisInserat?.priceprofiles?.sort((a, b) => a.position - b.position) || [];

    const usedImages = thisInserat?.images?.sort((a, b) => a.position - b.position) || [];

    console.log(usedImages)

    return (
        <div className="sm:mt-4 bg-[#161923]  text-gray-200 sm:p-8 p-4 
                        sm:rounded-md  
                     w-full">

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



                <div className=" text-md sm:text-base ml-2 font-bold text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] 
                            bg-[#1d1f2b] sm:px-8 rounded-lg p-4 w-3/4 truncate overflow-hidden">
                    <div className="w-full ">
                        <div className="text-left truncate">
                            {thisInserat.title}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end ml-2 sm:ml-2 bg-[#1d1f2b] w-1/8  p-4 rounded-lg sm:p-4">
                    <BookingsOverview
                        receivedBookings={inseratBookings}
                        thisInserat={thisInserat}
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-1 mt-1 sm:text-sm text-xs">
                <p className="text-xs text-gray-200  ">erstellt am :</p>
                <p className="font-semibold text-xs">{format(new Date(thisInserat.createdAt), "dd.MM")}</p>
                <div className="ml-auto">
                    <ReportModal />
                </div>
            </div>

            <div className="mt-4 rounded-md  text-gray-100   flex justify-center ">
                <InseratImageCarousel 
                imagesData={usedImages} />
            </div>

            <div>
                <div className="flex justify-end items-center rounded-md sm:mt-8 p-4 w-full border-gray-800 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] bg-[#13151c]  text-gray-100 mt-2">
                    <div className="flex mr-auto items-center w-full">
                        <div className="flex font-bold  text-sm items-center  sm:w-full ">

                            <div className="w-full flex gap-x-2">
                                <div>
                                    <MapPinned className="text-rose-600 mr-2 h-4 w-4" />
                                </div>
                                <div className="sm:w-2/4 truncate flex items-center">
                                    {thisInserat.address?.locationString ? (
                                        <span className="max-w-full hidden sm:block">
                                            {ripOutToLongAddresses(thisInserat.address?.locationString)}
                                        </span>
                                    ) : (
                                        "Keine Adresse hinterlegt"
                                    )}
                                </div>
                                <div className="w-2/4 sm:truncate  whitespace-nowrap">
                                    {thisInserat.address?.postalCode && `${thisInserat.address?.postalCode} `}
                                    {thisInserat.address?.state ? convertState(thisInserat.address?.state) + ", " : ""}DE
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
            <div className="mt-2">
                <TransferCarAdvert />
            </div>
            {thisInserat?.priceprofiles.length > 0 && (
                <div className="mt-4">
                    <div className="text-md font-semibold">
                        Weitere Preisprofile
                    </div>
                    <div className="space-y-2 mt-2">
                        {//@ts-ignore
                        usedListPrices.map((priceprofile : any) => (
                            <PriceProfileDialog
                            key={priceprofile.id}
                            thisPriceprofile={priceprofile}
                            />
                        ))}
                    </div>
                </div>
            )}

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
                <div className="w-full flex mt-2">
                    {thisInserat?.pkwAttribute?.freeMiles && (
                        <div className="w-1/2 truncate font-semibold text-sm flex">
                            <PiSteeringWheel className="w-4 h-4 mr-2 text-gray-400" />
                            Freikilometer :
                            {thisInserat?.pkwAttribute?.freeMiles ? " " + thisInserat?.pkwAttribute?.freeMiles + " Km" : "Keine KM-Anzahl angegeben"}
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