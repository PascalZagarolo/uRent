import { booking, CategoryEnumRender, inserat } from "@/db/schema";
import InseratDescription from "./inserat-description";
import BookingsOverview from "./bookings-overview";
import { FaAddressCard, FaCircle } from "react-icons/fa";
import { AlignLeft, CarFront, Clock2Icon, Contact2, Globe2, MailIcon, Phone, Truck, UserCircleIcon } from "lucide-react";
import { RiCaravanLine } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { GiReceiveMoney } from "react-icons/gi";
import { PiVanFill } from "react-icons/pi";
import InseratImageCarousel from "./inserat-image";
import ReportModal from "./report/report-modal";
import { format } from "date-fns";
import PriceProfileDialog from "./price-profile-dialog";
import { GrLocation } from "react-icons/gr";
import { findLabelByValueMinTime } from "@/hooks/min-time/useMinTime";

interface InseratShowProps {
    thisInserat: typeof inserat.$inferSelect | any
    inseratBookings: typeof booking.$inferSelect[];
    isOwner: boolean;
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
    );
    
    const usedCategory: typeof CategoryEnumRender | any = thisInserat.category;

    function ripOutToLongAddresses(input: string): string {
        const lastCommaIndex = input?.lastIndexOf(',');
        if (lastCommaIndex !== -1) {
            return input?.substring(0, lastCommaIndex).trim();
        } else {
            return input;
        }
    }

    function returnMinTimeType(usedValue: number, minTime: string): string {
        if (usedValue === 1) {
            switch (minTime) {
                case "h": return "Stunde";
                case "d": return "Tag";
                case "w": return "Woche";
                case "m": return "Monat";
                default: return minTime;
            }
        } else {
            switch (minTime) {
                case "h": return "Stunden";
                case "d": return "Tage";
                case "w": return "Wochen";
                case "m": return "Monate";
                default: return minTime;
            }
        }
        return "";
    }

    const sharedEmail = thisInserat?.emailAddress
        ?? (thisInserat?.user?.sharesEmail ? thisInserat.user.email : null);

    const usedListPrices = thisInserat?.priceprofiles?.sort((a, b) => a.position - b.position) || [];
    const usedImages = thisInserat?.images?.sort((a, b) => a.position - b.position) || [];

    const categoryIcons = {
        'PKW': { icon: <CarFront className="h-6 w-6 text-blue-400" />, color: 'bg-blue-500/10' },
        'LKW': { icon: <Truck className="h-6 w-6 text-indigo-400" />, color: 'bg-indigo-500/10' },
        'TRANSPORT': { icon: <PiVanFill className="h-6 w-6 text-purple-400" />, color: 'bg-purple-500/10' },
        'TRAILER': { icon: <RiCaravanLine className="h-6 w-6 text-green-400" />, color: 'bg-green-500/10' }
    };

    return (
        <div className="bg-gradient-to-b from-[#151823] to-[#1B1F2E] rounded-xl border border-gray-800/30 shadow-lg overflow-hidden">
            {/* Status & Title */}
            <div className="p-6">
                {isOwner && (
                    <div className="mb-4">
                        {thisInserat?.isPublished ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                <FaCircle className="w-1.5 h-1.5 mr-2 text-emerald-400" />
                                Öffentlich sichtbar
                            </div>
                        ) : (
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700/20 text-gray-400">
                                <FaCircle className="w-1.5 h-1.5 mr-2 text-gray-500" />
                                Nur für dich sichtbar
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${categoryIcons[usedCategory]?.color || 'bg-gray-700/20'}`}>
                        {categoryIcons[usedCategory]?.icon || <CarFront className="h-6 w-6 text-gray-400" />}
                    </div>
                    
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-white mb-2 line-clamp-2">{thisInserat.title}</h1>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-400 text-sm">
                                <span>Erstellt am {format(new Date(thisInserat.createdAt), "dd.MM.yyyy")}</span>
                            </div>
                            <ReportModal />
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="border-t border-gray-800/50 mb-6">
                <div className="rounded-lg overflow-hidden">
                    <InseratImageCarousel imagesData={usedImages} />
                </div>
            </div>

            {/* Bookings Overview */}
            <div className="px-6 mb-6">
                <BookingsOverview
                    receivedBookings={inseratBookings}
                    thisInserat={thisInserat}
                />
            </div>

            {/* Location Section */}
            <div className="px-6 mb-6">
                <div className="rounded-xl border border-gray-800/20 bg-gradient-to-r from-[#1E2235]/70 to-[#232842]/50 p-4">
                    <div className="flex items-center gap-2 ">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500/20 to-red-500/10 flex items-center justify-center border border-rose-500/20">
                            <GrLocation className="w-4 h-4 text-rose-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-200">Standort</h3>
                            <div className="text-gray-400 text-sm">
                                {thisInserat?.address?.postalCode} • {thisInserat?.address?.locationString}
                            </div>
                        </div>
                    </div>

                    {thisInserat.license && (
                        <div className="mt-4 pl-14">
                            <div className="flex items-center px-4 py-3 bg-[#151823]/70 rounded-lg border border-gray-800/20 backdrop-blur-sm">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center mr-3 border border-blue-500/20">
                                    <FaAddressCard className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Führerscheinklasse</div>
                                    <div className="font-medium text-gray-200">{thisInserat.license}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Price Profiles */}
            {thisInserat?.priceprofiles.length > 0 && (
                <div className="px-6 mb-6">
                    <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-200">
                        <span className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Preisprofile
                    </h3>
                    <div className="space-y-2">
                        {usedListPrices.map((priceprofile: any) => (
                            <PriceProfileDialog
                                key={priceprofile.id}
                                thisPriceprofile={priceprofile}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Conditions Section */}
            {renderRahmen && (
                <div className="px-6 mb-6">
                    <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-200">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/10 flex items-center justify-center mr-2 border border-indigo-500/20">
                            <CiBookmark className="h-4 w-4 text-indigo-400" />
                        </span>
                        Rahmenbedingungen
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {thisInserat?.caution && (
                            <div className="flex items-center bg-[#1E2235]/70 p-4 rounded-lg border border-gray-800/20">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500/20 to-red-500/10 flex items-center justify-center mr-3 border border-rose-500/20">
                                    <TbPigMoney className="w-5 h-5 text-rose-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Kaution</div>
                                    <div className="font-semibold text-gray-200">{Number((thisInserat?.caution))?.toFixed(2)} €</div>
                                </div>
                            </div>
                        )}
                        
                        {thisInserat?.reqAge != 0 && thisInserat?.reqAge && (
                            <div className="flex items-center bg-[#1E2235]/70 p-4 rounded-lg border border-gray-800/20">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center mr-3 border border-blue-500/20">
                                    <UserCircleIcon className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Mindestalter</div>
                                    <div className="font-semibold text-gray-200">{thisInserat?.reqAge} Jahre</div>
                                </div>
                            </div>
                        )}
                        
                        {thisInserat?.minTime && (
                            <div className="flex items-center bg-[#1E2235]/70 p-4 rounded-lg border border-gray-800/20">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/10 flex items-center justify-center mr-3 border border-indigo-500/20">
                                    <Clock2Icon className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Mindestmietdauer</div>
                                    <div className="font-semibold text-gray-200">
                                        {findLabelByValueMinTime(Number(thisInserat?.minTime ?? 0))}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {thisInserat?.category === "PKW" && thisInserat?.pkwAttribute?.extraCost && (
                            <div className="flex items-center bg-[#1E2235]/70 p-4 rounded-lg border border-gray-800/20">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/10 flex items-center justify-center mr-3 border border-emerald-500/20">
                                    <GiReceiveMoney className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Extrapreis pro Km</div>
                                    <div className="font-semibold text-gray-200">{(thisInserat?.pkwAttribute?.extraCost).toFixed(2)} €</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Contact Section */}
            {(sharedEmail || thisInserat?.phoneNumber || thisInserat.user?.contactOptions?.websiteAddress) && (
                <div className="px-6 mb-6">
                    <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-200">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center mr-2 border border-blue-500/20">
                            <Contact2 className="h-4 w-4 text-blue-400" />
                        </span>
                        Kontaktinformationen
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sharedEmail && (
                            <div className="flex items-center bg-[#1E2235]/70 p-4 rounded-lg border border-gray-800/20">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/10 flex items-center justify-center mr-3 border border-indigo-500/20">
                                    <MailIcon className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="text-sm text-gray-400">Email</div>
                                    <div className="font-medium text-gray-200 truncate">{sharedEmail}</div>
                                </div>
                            </div>
                        )}
                        
                        {thisInserat?.phoneNumber && (
                            <div className="flex items-center bg-[#1E2235]/70 p-4 rounded-lg border border-gray-800/20">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center mr-3 border border-green-500/20">
                                    <Phone className="w-4 h-4 text-green-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Telefon</div>
                                    <div className="font-medium text-gray-200">{thisInserat?.phoneNumber}</div>
                                </div>
                            </div>
                        )}
                        
                        {thisInserat.user?.contactOptions?.websiteAddress && (
                            <div className="flex items-center bg-[#1E2235]/70 p-4 rounded-lg border border-gray-800/20 col-span-1 sm:col-span-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-sky-500/10 flex items-center justify-center mr-3 border border-blue-500/20">
                                    <Globe2 className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="text-sm text-gray-400">Website</div>
                                    <a href="/" className="font-medium text-blue-400 hover:underline truncate block">
                                        {thisInserat.user?.contactOptions?.websiteAddress}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Description Section */}
            <div className="px-6 pb-6">
                <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-200">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center mr-2 border border-purple-500/20">
                        <AlignLeft className="h-4 w-4 text-purple-400" />
                    </span>
                    Beschreibung der Anzeige
                </h3>
                <div className=" rounded-xl p-5 border border-gray-800/20 backdrop-blur-sm">
                    <div className="prose prose-invert max-w-none">
                        <InseratDescription thisInserat={thisInserat} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InseratShow;