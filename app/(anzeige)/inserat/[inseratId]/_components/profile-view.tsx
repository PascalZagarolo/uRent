'use client';

import { Button } from "@/components/ui/button";
import { business, userTable } from "@/db/schema";
import { format } from "date-fns";
import { Building, Calendar, ExternalLink, Globe, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { businessAddress } from '../../../../../db/schema';
import { FaFax } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
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
    const router = useRouter();
    const isEnterprise = thisUser?.subscription?.subscriptionType === "ENTERPRISE";

    return (
        <div className="bg-gradient-to-b from-[#151823] to-[#1B1F2E] rounded-xl border border-gray-800/30 shadow-lg overflow-hidden">
            {/* Enterprise badge */}
            {isEnterprise && (
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 px-4 py-2 flex items-center justify-center">
                    <MdOutlineVerified className="w-4 h-4 mr-2 text-white" />
                    <span className="text-white font-medium text-sm">uRent Enterprise</span>
                </div>
            )}

            {/* Profile header */}
            <div className="p-5">
                <div className="flex items-start">
                    <div className="relative">
                        <Image
                            src={thisUser.image || "/placeholder-person.jpg"}
                            width={60}
                            height={60}
                            className="rounded-full object-cover border-2 border-gray-800/80 h-[60px] w-[60px]"
                            alt={`Profilbild von ${thisUser.name}`}
                        />
                        {isEnterprise && (
                            <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-1">
                                <MdOutlineVerified className="w-3.5 h-3.5 text-white" />
                            </div>
                        )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-100 text-lg line-clamp-1">{thisUser.name}</h3>
                        
                        {(thisUser?.sharesRealName && (thisUser?.vorname || thisUser?.nachname)) && (
                            <p className="text-gray-400 text-sm">
                                {thisUser.vorname} {thisUser.nachname}
                            </p>
                        )}
                        
                        {thisUser?.sharesEmail && (
                            <p className="text-gray-400 text-sm flex items-center mt-1">
                                <Mail className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                                {thisUser.email}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center mt-4 text-sm text-gray-400">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-gray-500" />
                        <span>Mitglied seit {format(new Date(thisUser.createdAt), "dd.MM.yyyy")}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-700 mx-2"></div>
                    <div>
                        <span className="font-medium text-gray-300">{inseratArray}</span> {inseratArray === 1 ? "Inserat" : "Inserate"}
                    </div>
                </div>
            </div>

            {/* Business address section */}
            {thisBusiness && thisBusiness?.businessAddresses.length > 0 && (
                <div className="border-t border-gray-800/50 px-5 pt-5">
                    <h3 className="flex items-center text-sm font-medium text-gray-300 mb-3">
                        <span className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center mr-2">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        </span>
                        Firmenstandort
                    </h3>
                    
                    {thisBusiness?.businessAddresses?.map((business: typeof businessAddress.$inferSelect) => (
                        business.isPrimary && (
                            <div key={business.id} className="bg-[#1B1F2E] rounded-lg overflow-hidden mb-3">
                                {business?.image ? (
                                    <div className="relative h-32 w-full">
                                        <Image
                                            src={business?.image}
                                            fill
                                            className="object-cover"
                                            alt="Firmenstandort"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-20 bg-[#232842] flex items-center justify-center">
                                        <Building className="h-8 w-8 text-gray-600" />
                                    </div>
                                )}
                                
                                <div className="p-3">
                                    <p className="text-sm text-gray-300 font-medium">{business?.street}</p>
                                    <p className="text-sm text-gray-400">{business?.postalCode} {business?.city}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Business contact section */}
            {thisBusiness && (
                <div className="px-5 pt-3 pb-5">
                    <h3 className="flex items-center text-sm font-medium text-gray-300 mb-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mr-2">
                            <Building className="w-3.5 h-3.5 text-blue-400" />
                        </span>
                        Kontaktdaten
                    </h3>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-[#232842] p-3 rounded-lg">
                            <div className="flex items-center text-gray-400">
                                <Globe className="w-4 h-4 mr-2 text-indigo-400" />
                                <span className="text-sm">Website</span>
                            </div>
                            <div className="text-sm text-gray-300 font-medium">
                                {thisBusiness?.website ? thisBusiness?.website : "—"}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-[#232842] p-3 rounded-lg">
                            <div className="flex items-center text-gray-400">
                                <Mail className="w-4 h-4 mr-2 text-green-400" />
                                <span className="text-sm">Email</span>
                            </div>
                            <div className="text-sm text-gray-300 font-medium">
                                {thisBusiness?.email ? thisBusiness?.email : "—"}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-[#232842] p-3 rounded-lg">
                            <div className="flex items-center text-gray-400">
                                <Phone className="w-4 h-4 mr-2 text-blue-400" />
                                <span className="text-sm">Telefon</span>
                            </div>
                            <div className="text-sm text-gray-300 font-medium">
                                {thisBusiness?.telephone_number ? thisBusiness?.telephone_number : "—"}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-[#232842] p-3 rounded-lg">
                            <div className="flex items-center text-gray-400">
                                <FaFax className="w-4 h-4 mr-2 text-purple-400" />
                                <span className="text-sm">Fax</span>
                            </div>
                            <div className="text-sm text-gray-300 font-medium">
                                {thisBusiness?.fax ? thisBusiness?.fax : "—"}
                            </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2 px-1">
                            * Kontaktdaten aus dem Profil können von den Kontakdaten des Inserats abweichen.
                        </p>
                    </div>
                </div>
            )}

            {/* Profile button */}
            <div className="px-5 pb-5">
                <Button 
                    className="w-full bg-[#222736] hover:bg-[#2B3044] text-white py-2 rounded-lg transition-colors"
                    onClick={() => router.push(`/profile/${inseratOwner.id}`)}
                >
                    <User className="w-4 h-4 mr-2" /> Zum vollständigen Profil
                </Button>
            </div>
        </div>
    );
}

export default ProfileView;