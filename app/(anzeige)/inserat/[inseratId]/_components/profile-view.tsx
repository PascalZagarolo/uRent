'use client';

import { Button } from "@/components/ui/button";
import { business, userTable } from "@/db/schema";
import { format } from "date-fns";
import { Building, Calendar, Globe, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { businessAddress } from '../../../../../db/schema';
import { FaFax } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import { cn } from "@/lib/utils";

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
    const router = useRouter();
    const isEnterprise = thisUser?.subscription?.subscriptionType === "ENTERPRISE";

    return (
        <div className="bg-gradient-to-br from-[#191b29]/80 to-[#1d2032]/90 rounded-xl shadow-sm overflow-hidden">
            {/* Enterprise badge */}
            {isEnterprise && (
                <div className="bg-gradient-to-r from-indigo-500/90 to-indigo-600/90 px-4 py-1.5 flex items-center justify-center">
                    <MdOutlineVerified className="w-3.5 h-3.5 mr-1.5 text-white/90" />
                    <span className="text-white/90 font-medium text-xs">uRent Enterprise</span>
                </div>
            )}

            {/* Profile header */}
            <div className="p-4">
                <div className="flex items-start">
                    <div className="relative">
                        <Image
                            src={thisUser.image || "/placeholder-person.jpg"}
                            width={56}
                            height={56}
                            className="rounded-full object-cover h-[56px] w-[56px] ring-2 ring-gray-800/50"
                            alt={`Profilbild von ${thisUser.name}`}
                        />
                        {isEnterprise && (
                            <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-0.5">
                                <MdOutlineVerified className="w-3 h-3 text-white" />
                            </div>
                        )}
                    </div>
                    
                    <div className="ml-3 flex-1">
                        <h3 className="font-semibold text-gray-100 text-base line-clamp-1">{thisUser.name}</h3>
                        
                        {(thisUser?.sharesRealName && (thisUser?.vorname || thisUser?.nachname)) && (
                            <p className="text-gray-400 text-xs mt-0.5">
                                {thisUser.vorname} {thisUser.nachname}
                            </p>
                        )}
                        
                        {thisUser?.sharesEmail && (
                            <p className="text-gray-400 text-xs flex items-center mt-1.5">
                                <Mail className="w-3 h-3 mr-1 text-indigo-400" />
                                {thisUser.email}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center mt-3 text-xs text-gray-400">
                    <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-gray-500" />
                        <span>Seit {format(new Date(thisUser.createdAt), "MM.yyyy")}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-700 mx-2"></div>
                    <div>
                        <span className="font-medium text-gray-300">{inseratArray}</span> {inseratArray === 1 ? "Inserat" : "Inserate"}
                    </div>
                </div>
            </div>

            {/* Business address section */}
            {thisBusiness && thisBusiness?.businessAddresses.length > 0 && (
                <div className="px-4 pt-2">
                    <h3 className="flex items-center text-xs font-medium text-gray-300 mb-2">
                        <span className="w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center mr-1.5">
                            <MapPin className="w-3 h-3 text-rose-400" />
                        </span>
                        Firmenstandort
                    </h3>
                    
                    {thisBusiness?.businessAddresses?.map((business: typeof businessAddress.$inferSelect) => (
                        business.isPrimary && (
                            <div key={business.id} className="bg-[#1f2235]/30 rounded-lg overflow-hidden mb-3 border border-gray-800/10">
                                {business?.image ? (
                                    <div className="relative h-28 w-full">
                                        <Image
                                            src={business?.image}
                                            fill
                                            className="object-cover"
                                            alt="Firmenstandort"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-16 bg-[#21253a]/40 flex items-center justify-center">
                                        <Building className="h-6 w-6 text-gray-600" />
                                    </div>
                                )}
                                
                                <div className="p-2.5">
                                    <p className="text-xs text-gray-300 font-medium">{business?.street}</p>
                                    <p className="text-xs text-gray-400">{business?.postalCode} {business?.city}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Business contact section */}
            {thisBusiness && (
                <div className="px-4 pt-1 pb-4">
                    <h3 className="flex items-center text-xs font-medium text-gray-300 mb-2">
                        <span className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center mr-1.5">
                            <Building className="w-3 h-3 text-blue-400" />
                        </span>
                        Kontaktdaten
                    </h3>
                    
                    <div className="space-y-2">
                        <div className="flex flex-col items-start justify-between bg-[#1f2235]/30 p-2.5 rounded-lg border border-gray-800/10">
                            <div className="flex items-center text-gray-400">
                                <Globe className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                                <span className="text-xs">Website</span>
                            </div>
                            <div className="text-xs text-gray-300 font-medium mt-1">
                                {thisBusiness?.website ? thisBusiness?.website : "—"}
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-start justify-between bg-[#1f2235]/30 p-2.5 rounded-lg border border-gray-800/10">
                            <div className="flex items-center text-gray-400">
                                <Mail className="w-3.5 h-3.5 mr-1.5 text-green-400" />
                                <span className="text-xs">Email</span>
                            </div>
                            <div className="text-xs text-gray-300 font-medium mt-1">
                                {thisBusiness?.email ? thisBusiness?.email : "—"}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-[#1f2235]/30 p-2.5 rounded-lg border border-gray-800/10">
                            <div className="flex items-center text-gray-400">
                                <Phone className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                                <span className="text-xs">Telefon</span>
                            </div>
                            <div className="text-xs text-gray-300 font-medium">
                                {thisBusiness?.telephone_number ? thisBusiness?.telephone_number : "—"}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-[#1f2235]/30 p-2.5 rounded-lg border border-gray-800/10">
                            <div className="flex items-center text-gray-400">
                                <FaFax className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                                <span className="text-xs">Fax</span>
                            </div>
                            <div className="text-xs text-gray-300 font-medium">
                                {thisBusiness?.fax ? thisBusiness?.fax : "—"}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile button */}
            <div className="px-4 pb-4">
                <Button 
                    className="w-full bg-gradient-to-r from-indigo-500/90 to-indigo-600/90 hover:from-indigo-600/90 hover:to-indigo-700/90 text-white text-xs py-2 rounded-lg transition-all"
                    onClick={() => router.push(`/profile/${inseratOwner.id}`)}
                >
                    <User className="w-3.5 h-3.5 mr-1.5" /> Zum Profil
                </Button>
            </div>
        </div>
    );
}

export default ProfileView;