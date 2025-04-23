'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { inserat, inseratRelations, userTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check, Lightbulb, MailCheckIcon, MessageSquare, Settings2Icon, ThumbsUpIcon, UserCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuMessagesSquare } from "react-icons/lu";
import { userSubscription } from '../../../../db/schema';
import LetterRestriction from "@/components/letter-restriction";
import { ClipLoader } from "react-spinners";
import { motion } from "@/components/motion";

interface ProfileBarProps {
    thisInserat: typeof inserat.$inferSelect | any,
    currentUser: typeof userTable.$inferSelect
}

const ProfileBar: React.FC<ProfileBarProps> = ({
    thisInserat,
    currentUser
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isOwn = currentUser?.id === thisInserat.userId;

    const [text, setText] = useState(
        "Betreff: Anfrage bezüglich ihres Inserates\n\n" +
        "Sehr geehrte Damen und Herren,\n\n" +
        `Nach eingehender Prüfung Ihres Mietangebots bin ich sehr interessiert an dem genannten Fahrzeug.\n` +
        `Gerne würde ich weitere Details zu den Konditionen besprechen und das Fahrzeug persönlich in Augenschein nehmen.\n\n` +
        "Mit freundlichen Grüßen,\n" +
        (currentUser?.name ? currentUser?.name + " " + "\n\n" : "[Dein Name] ") +
        "Meine Kontaktdaten : \n" +
        "E-Mail : " + (currentUser?.email ? currentUser?.email : "[Deine E-Mail Addresse]") + "\n"
    );

    const onConversation = () => {
        if (currentUser) {
            try {
                setIsLoading(true);
                const values = {
                    inseratId : thisInserat.id,
                }
                axios.post(`/api/conversation/${currentUser.id}/${thisInserat.userId}`, values)
                .then((response) => {
                    router.push(`/conversation?conversationId=${response.data.id}`)
                })
            } catch {
                toast.error("Fehler beim Erstellen der Konversation")
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push(`/login`)
        }
    }

    const onInterest = async () => {
        if (currentUser) {
            try {
                setIsLoading(true);
                axios.post(`/api/interest/${thisInserat.id}`, { text: text }).then(() => {
                    axios.get(`/api/conversation/${currentUser.id}/${thisInserat.userId}`).then((response) => {
                        if (response) {
                            console.log(response)
                            router.push(`/conversation?conversationId=${response.data.id}`)
                        } else {
                            toast.error("Fehler beim abrufen")
                        }
                    })
                })
            } catch(e) {
                console.log(e);
                toast.error("Etwas ist schief gelaufen");
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push(`/login`);
        }
    }

    const onOpen = () => {
        if (!currentUser) {
            router.push(`/login`);
        }
    }

    const onEdit = () => {
        router.push(`/inserat/create/${thisInserat.id}`);
    }

    const handleTextChange = (event) => {
        const newText = event.target.value;
        const lines = newText.split('\n');

        // Only update text if line count is within limit
        if (lines.length <= 30) {
            setText(newText);
        }
    };

    return (
        <div className="py-2.5 px-4 mt-4 border-t border-[#252838]/50">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
                {/* User Profile Section */}
                <Link 
                    href={`/profile/${thisInserat.userId}`} 
                    className="flex items-center group"
                >
                    <div className="relative">
                        <Image
                            src={thisInserat.user?.image || "/placeholder-person.jpg"}
                            height={32}
                            width={32}
                            className="rounded-full object-cover h-10 w-10 ring-2 ring-indigo-500/30 group-hover:ring-indigo-500/70 transition-all duration-200"
                            alt={`${thisInserat.user?.name || 'Benutzer'} Profilbild`}
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#1A1D28]"></div>
                    </div>
                    <div className="ml-4 group-hover:text-indigo-400 transition-colors">
                        <div className="font-medium text-base text-white truncate max-w-[240px]">
                            {thisInserat.user?.name || 'Benutzer'}
                        </div>
                        <div className="text-gray-400 text-xs">
                            Anbieter
                        </div>
                    </div>
                </Link>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                    {!isOwn ? (
                        <>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onOpen}
                                        className="flex items-center text-white bg-[#262a3b] hover:bg-[#2e3348] py-2 px-3 rounded-lg transition-colors text-xs"
                                    >
                                        <ThumbsUpIcon className="w-3.5 h-3.5 sm:mr-1.5" />
                                        <span className="sm:inline hidden">Anfragen</span>
                                    </motion.button>
                                </DialogTrigger>
                                <DialogContent className="bg-[#1e2130] p-6 rounded-lg shadow-xl border border-[#252838] max-w-md">
                                    <DialogHeader>
                                        <h3 className="text-xl font-semibold text-white flex items-center">
                                            <Lightbulb className="mr-2 h-4 w-4 text-indigo-400" /> 
                                            Händler kontaktieren
                                        </h3>
                                    </DialogHeader>
                                    <div className="mt-4">
                                        <Textarea
                                            className="w-full bg-[#262a3b] shadow-md text-gray-200 border-[#252838] rounded-lg resize-none"
                                            value={text}
                                            onChange={handleTextChange}
                                            maxLength={2000}
                                            rows={10}
                                        />
                                        <div className="ml-auto w-full justify-end flex mt-1">
                                            <LetterRestriction
                                                currentLength={text.length} limit={2000}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Die Nachricht wird direkt an den Anbieter gesendet
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 py-2 mt-4 flex items-center justify-center"
                                            onClick={onInterest} 
                                            disabled={!text || isLoading}
                                        >
                                            {isLoading ? (
                                                <ClipLoader color="#fff" loading={true} size={16} />
                                            ) : (
                                                <>
                                                    <MailCheckIcon className="w-4 h-4 mr-2" />
                                                    Nachricht senden
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onConversation}
                                className="flex items-center text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 py-2 px-4 rounded-lg transition-colors text-sm"
                            >
                                <MessageSquare className="w-4 h-4s sm:mr-1.5" />
                                <span className="sm:inline hidden">Kontaktieren</span>
                            </motion.button>
                        </>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onEdit}
                            className="flex items-center text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            <Settings2Icon className="w-4 h-4 sm:mr-1.5" />
                            <span className="sm:inline hidden">Bearbeiten</span>
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileBar;