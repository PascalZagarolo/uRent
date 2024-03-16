import { db } from "@/utils/db";

import { AlignLeft, BookAIcon, Calendar, CarFront, CaravanIcon, ConstructionIcon, Contact2, Globe2, MailIcon, MailMinus, MapPin, MapPinned, Phone, TractorIcon, TramFront, Truck, UserCircleIcon } from "lucide-react";

import ProfileView from "./_components/profile-view";
import InseratOptions from "./_components/inserat-options";
import getCurrentUser from "@/actions/getCurrentUser";
import InseratDescription from "./_components/inserat-description";
import BookingsOverview from "./_components/bookings-overview";
import { format } from "date-fns";
import { lazy } from "react";
import InseratAttributes from "./_components/inserat-attributes";
import { TbPigMoney } from "react-icons/tb";
import { PiSteeringWheel, PiVanFill } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { FaAddressCard } from "react-icons/fa";
import OtherInserate from "./_components/other-inserate";




const InseratAnzeige = async ({
    params
}: { params: { inseratId: string } }) => {



    const currentUser = await getCurrentUser();



    const inserat = await db.inserat.findUnique({
        where: {
            id: params.inseratId
        }, include: {
            address: true,
            images: true,
            user: {
                include: {
                    contactOptions: true
                }
            },
            pkwAttribute: true,
            lkwAttribute: true,
            transportAttribute: true,
            trailerAttribute: true
        }
    })



    const inseratArray = await db.inserat.findMany({
        where: {
            userId: inserat.user?.id
        }, include: {
            images: true

        }
    })





    const rezensionen = await db.rezension.findMany({
        where: {
            receiverId: inserat.user?.id
        }
    })



    const inseratBookings = await db.booking.findMany({
        where: {
            inseratId: inserat?.id,

        }, orderBy: {
            startDate: "asc"
        },
        include: {
            user: true,
        }
    })

    const LazyInseratImageCarousel = lazy(() => import("./_components/inserat-image"));

    function ripOutToLongAddresses(input: string): string {
        const lastCommaIndex = input.lastIndexOf(',');
        if (lastCommaIndex !== -1) { // Check if comma exists
            return input.substring(0, lastCommaIndex).trim();
        } else {
            return input; // No comma found, return the original input
        }
    }






    return (
        <div className="xl:grid xl:grid-cols-2 w-full  justify-center sm:space-x-8 xl:mt-12 h-max ">
            <div className="h-full p-4 w-full1">
                <div className="flex xl:justify-end justify-center w-full">
                    <div className="mt-4 bg-[#161923]  text-gray-200 p-8 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  
                    sm:w-8/12 ">
                        <div className="flex items-center justify-between truncate ">

                            <div className="bg-[#1d1f2b] w-1/8 rounded-lg p-4">
                                {
                                    {
                                        'PKW': <CarFront className=" text-gray-100 h-6 w-6 " />,
                                        'LKW': <Truck className=" text-gray-100 h-6 w-6 " />,
                                        'TRANSPORT': <PiVanFill className=" text-gray-100 h-6 w-6 " />,
                                        'TRAILOR': <CaravanIcon className=" text-gray-100 h-6 w-6 " />
                                    }[inserat.category]
                                }
                            </div>


                            <p className=" text-md sm:text-xl ml-2 font-bold text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] 
                            bg-[#1d1f2b] px-8 rounded-lg p-4 w-3/4 truncate flex justify-center "> {inserat.title} </p>
                            <div className="flex justify-end ml-2 sm:ml-2 bg-[#1d1f2b] w-1/8  p-4 rounded-lg sm:p-4">
                                <BookingsOverview
                                    bookings={inseratBookings}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-1 sm:text-sm text-xs">
                            <p className="text-xs text-gray-200  ">erstellt am :</p>
                            <p className="font-semibold sm:text-sm text-xs">{format(new Date(inserat.createdAt), "dd.MM")}</p>
                        </div>

                        <div className="mt-4 rounded-md  text-gray-100   flex justify-center ">
                            <LazyInseratImageCarousel images={inserat.images} />
                        </div>

                        <div>
                        <div className="flex justify-end items-center rounded-md sm:mt-8 p-4 w-full border-gray-800 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] bg-[#13151c]  text-gray-100 mt-2">
                                <div className="flex mr-auto items-center w-full">
                                    <div className="flex font-bold  text-sm items-center  sm:w-full ">

                                        <div className="sm:w-full flex gap-x-2">
                                            <div>
                                                <MapPinned className="text-rose-600 mr-2 h-4 w-4" />
                                            </div>
                                            <div className="w-2/4 truncate flex items-center">
                                                {inserat.address?.locationString ? (
                                                    <span className="truncate max-w-full">  {ripOutToLongAddresses(inserat.address?.locationString)}
                                                    </span>
                                                ) : (
                                                    "Keine Adresse hinterlegt"
                                                )}
                                            </div>
                                            <div className="w-2/4 truncate">
                                                {inserat.address?.postalCode && `${inserat.address?.postalCode} `}
                                                {inserat.address?.state ? inserat.address?.state + ", " : ""}DE
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="flex w-full items-center">
                                {inserat.license && (
                                    <div className=" font-semibold flex w-3/4 items-center">
                                        <FaAddressCard className="w-4 h-4 mr-2" /><p className="font-normal px-2"> Führerscheinklasse : </p> {inserat.license}
                                    </div>
                                )}
                                <div className="ml-auto flex mt-2 text-xl font-semibold ">
                                    {inserat.price} <p className="text-sm mr-1">00 €</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="flex text-lg sm:text-lg  items-center"><CiBookmark className="mr-2 h-4 w-4" />
                                Rahmenbedingungen</p>
                        </div>
                        <div className="w-full flex mt-2">
                            <div className="w-1/2 truncate font-semibold text-sm flex">
                                <TbPigMoney className="w-4 h-4 mr-2 text-rose-300" />  Kaution : {inserat?.caution ? inserat?.caution + " €" : "Keine Kaution angegeben"}
                            </div>
                            <div className="w-1/2 truncate flex font-semibold text-sm ">
                                <UserCircleIcon className="w-4 h-4 mr-2 text-blue-600" /> Mindestalter : {inserat?.reqAge ? inserat?.reqAge + " Jahre" : "Kein Mindestalter angegeben"}
                            </div>
                        </div>
                        {inserat?.category === "PKW" && (
                            <div className="w-full flex mt-2">
                                <div className="w-1/2 truncate font-semibold text-sm flex">
                                    <PiSteeringWheel className="w-4 h-4 mr-2 text-gray-400" />  Freikilometer :
                                    {inserat?.pkwAttribute?.freeMiles ? " " + inserat?.pkwAttribute?.freeMiles + " Km" : "Keine KM-Anzahl angegeben"}
                                </div>
                                <div className="w-1/2 truncate flex font-semibold text-sm ">
                                    <GiReceiveMoney className="w-4 h-4 mr-2 text-emerald-600" />
                                    Extrapreis /Km : {inserat?.pkwAttribute?.extraCost ? inserat?.pkwAttribute?.extraCost + " €" : "Keine Kosten angegeben"}
                                </div>
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


                                            <MailIcon className="w-4 h-4 mr-2" /><p className="text-sm"> {inserat?.emailAddress ? inserat?.emailAddress : inserat.user.email}</p>


                                        </div>
                                    </div>
                                    <div className="sm:w-1/2 items-center">
                                        <div className="flex items-center sm:mt-0 mt-2">
                                            {inserat?.phoneNumber && (
                                                <>    <Phone className="w-4 h-4 mr-2" />  <p className=" text-sm"> {inserat?.phoneNumber}</p> </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:flex mt-2">
                                    <div className="sm:w-1/2 items-center">
                                        <div className="flex items-center">


                                            {inserat.user.contactOptions[0]?.websiteAddress && (
                                                <a href={inserat?.user?.contactOptions[0]?.websiteAddress} className="flex hover:underline">
                                                    <Globe2 className="w-4 h-4 mr-2" /><p className="text-sm"> {inserat.user?.contactOptions[0]?.websiteAddress ?
                                                        inserat.user.contactOptions[0]?.websiteAddress : ""}</p>
                                                </a>
                                            )}


                                        </div>
                                    </div>

                                </div>


                            </div>
                            <p className="flex text-lg sm:text-lg font-semibold items-center mt-8">
                                <AlignLeft className="mr-2 h-4 w-4" /> Beschreibung der Anzeige</p>
                            <InseratDescription
                                inserat={inserat}
                            />
                        </div>

                    </div>


                </div>
                <div className="flex sm:justify-center xl:justify-end">
                    <div className="flex justify-end xl:ml-auto sm:w-8/12 mt-8">
                        <InseratAttributes
                            inserat={inserat}
                        />
                    </div>
                </div>
            </div>



            <div>

                <div className=" p-2 xl:mt-24 sm:flex justify-center xl:block">

                    <div className="xl:hidden flex sm:block justify-center">
                        <ProfileView
                            user={inserat.user}
                            inseratArray={inseratArray.length}
                            inseratOwner={inserat.user}
                            averageRating={rezensionen.reduce((a, b) => a + b.rating, 0) / rezensionen.length}
                        />
                    </div>
                    <div className="sm:ml-16 xl:ml-0 flex sm:block justify-center">
                        <InseratOptions
                            user={inserat.user}
                            //@ts-ignore
                            bookings={inseratBookings}
                            ownUser={currentUser}
                            contactOptions={inserat.user.contactOptions[0]}
                        />
                    </div>
                    <div className="hidden xl:mt-16 xl:block">
                        <ProfileView
                            user={inserat.user}
                            inseratArray={inseratArray.length}
                            inseratOwner={inserat.user}
                            averageRating={rezensionen.reduce((a, b) => a + b.rating, 0) / rezensionen.length}
                        />
                    </div>
                    <div className="py-8">
                        <OtherInserate
                            user={inserat.user}
                            inserate={inseratArray.filter((inserat) => inserat.id !== params.inseratId)}
                        />
                    </div>
                </div>

            </div>

        </div>

    );
}

export default InseratAnzeige;


