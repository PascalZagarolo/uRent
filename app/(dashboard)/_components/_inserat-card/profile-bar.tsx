'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { inserat, inseratRelations, userTable } from "@/db/schema";

import axios from "axios";
import { Check, Lightbulb, MailCheckIcon, Settings2Icon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuMessagesSquare } from "react-icons/lu";


interface ProfileBarProps {
    thisInserat : typeof inserat.$inferSelect.users,
    currentUser : typeof userTable.$inferSelect
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
                const conversation = axios.post(`/api/conversation/${currentUser.id}/${thisInserat.userId}`).then((response) => {
                    router.push(`/conversation/${response.data.id}`)
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
                            router.push(`/conversation/${response.data.id}`)
                        } else {
                            toast.error("Fehler beim abrufen")
                        }
                    })
                })
            } catch {
                toast.error("Etwas ist schief gelaufen");
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push(`/login`);
        }
    }

    const onOpen = () => {
        if(!currentUser) {
            router.push(`/login`);
        }
    }

    const onEdit = () => {
        router.push(`/inserat/create/${thisInserat.id}`);
    }

    const handleTextChange = (event : any) => {
        setText(event.target.value);
    };

    return ( 
        <div className="w-full h-full mt-2">

                        <div className=" bg-[#1b1e2d]  w-full position:absolute  dark:bg-[#13141c] dark:border-none">
                            <div className="flex  items-center  w-full rounded-md p-2">
                            <div className="w-[60px]">
                            <Image
                                    className="rounded-full  object-cover  w-[40px] h-[40px]"
                                    src={thisInserat.user?.image || "/placeholder-person.jpg"}
                                    height={40}
                                    width={40}
                                    
                                    alt="User-Bild"
                                />
                            </div>
                            <Link href={`/profile/${thisInserat.userId}`} className="w-1/2 truncate">
                            <div className=" font-semibold text-gray-200  items-center flex truncate">
                                        <div className="w-3/4 truncate">
                                        {thisInserat.user?.name}
                                        </div>   
                                        
                                    </div>

                                </Link>

                                <div className="flex ml-auto">

                                    {!isOwn ? (
                                        <>
                                            <Dialog>
                                                <DialogTrigger className="" asChild>

                                                    <Button className="flex items-center mr-4 ml-auto bg-[#171923] rounded-md p-2  font-semibold
                                                 dark:text-gray-100 dark:hover:bg-[#181818]/60 px-4 sm:px-8" onClick={onOpen}>
                                                        <ThumbsUpIcon className="w-4 h-4 sm:mr-2" />
                                                        <p className="sm:block hidden">
                                                            Anfragen
                                                        </p>
                                                    </Button>

                                                </DialogTrigger>
                                                <DialogContent className="dark:bg-[#171717] dark:border-none">
                                                    <DialogHeader>
                                                        <div className="text-lg font-bold flex">
                                                            <Lightbulb className="mr-2" />  Händler sofort kontaktieren
                                                        </div>
                                                    </DialogHeader>
                                                    <div>
                                                        <Textarea className="h-[400px] border dark:border-none bg-gray-200 dark:bg-[#191919]"
                                                            value={text}
                                                            onChange={handleTextChange}
                                                        />
                                                    </div>
                                                    <div>

                                                        
                                                    </div>
                                                    <div className="ml-auto">
                                                        <DialogTrigger>
                                                            <Button variant="ghost" className="bg-gray-200 
                                                          dark:bg-indigo-800 dark:hover:bg-indigo-900 "
                                                                onClick={onInterest} disabled={!text}>
                                                                Senden
                                                            </Button>
                                                        </DialogTrigger>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Button className="flex items-center mr-4  bg-[#171923] rounded-md p-2 px-4 sm:px-8 font-semibold
                                     dark:text-gray-100 dark:hover:bg-[#181818]/60" onClick={onConversation}>
                                                <LuMessagesSquare  className="w-4 h-4 sm:mr-2" />
                                                <p className="sm:block hidden">
                                                    Kontaktieren
                                                </p>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button className="flex items-center mr-4  bg-slate-200  rounded-md p-2 px-4 sm:px-8 font-semibold
                                     dark:text-gray-900/80 dark:hover:bg-slate-300 hover:bg-gray-200 text-gray-900" onClick={onEdit}>
                                            <Settings2Icon className="w-4 h-4 mr-2" />
                                            <p className=" hidden sm:block">Inserat bearbeiten</p> 
                                            <p className="sm:hidden block">Bearbeiten</p>
                                        </Button>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
     );
}
 
export default ProfileBar;