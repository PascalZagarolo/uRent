'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { inserat, inseratRelations, userTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import axios from "axios";
import { Check, Lightbulb, MailCheckIcon, Settings2Icon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuMessagesSquare } from "react-icons/lu";
import { userSubscription } from '../../../../db/schema';
import LetterRestriction from "@/components/letter-restriction";


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
                axios.post(`/api/conversation/${currentUser.id}/${thisInserat.userId}`).then((response) => {
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
        <div className="w-full h-full mt-2">

            <div className={cn("bg-[#1b1e2d]  w-full position:absolute  dark:bg-[#171821] shadow-lg",

            )}>
                <div className="flex  items-center  w-full rounded-md p-2">
                    <div className="w-[40px] mr-2">
                        <Image
                            className="rounded-full  object-cover shadow-lg  w-[32px] h-[32px]"
                            src={thisInserat.user?.image || "/placeholder-person.jpg"}
                            height={40}
                            width={40}

                            alt="User-Bild"
                        />
                    </div>
                    <Link href={`/profile/${thisInserat.userId}`} className="w-1/2 ">
                        <div className=" font-semibold text-gray-200  items-center flex ">
                            <div className="w-3/4 line-clamp-1 sm:text-base text-sm break-all">
                                {thisInserat.user?.name}
                            </div>

                        </div>

                    </Link>

                    <div className="flex ml-auto">

                        {!isOwn ? (
                            <div className="flex flex-row items-center">
                                <Dialog>
                                    <DialogTrigger className="" asChild>

                                        <Button className="flex items-center mr-4 ml-auto bg-[#1e202d] rounded-md p-2  font-semibold
                                                 dark:text-gray-100 dark:hover:bg-[#181818]/60 px-4 sm:px-8" onClick={onOpen}>
                                            <ThumbsUpIcon className="w-4 h-4 sm:mr-2" />
                                            <p className="sm:block hidden">
                                                Anfragen
                                            </p>
                                        </Button>

                                    </DialogTrigger>
                                    <DialogContent className="bg-[#171717] p-6 rounded-lg shadow-xl border-none">
                                        <DialogHeader>
                                            <h3 className="text-xl font-semibold text-white flex flex-row items-center space-x-2">
                                                <Lightbulb className="mr-2 h-4 w-4" /> Händler sofort kontaktieren
                                            </h3>
                                        </DialogHeader>
                                        <div>
                                            <Textarea
                                                className="w-full h-[400px] mt-4 bg-[#222222] shadow-lg text-gray-300 border-none rounded-lg"
                                                value={text}
                                                onChange={handleTextChange}
                                                maxLength={2000}
                                            />
                                            <div className="ml-auto w-full justify-end flex">
                                                <LetterRestriction
                                                    currentLength={text.length} limit={2000}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-200/60 mt-2">
                                                * Die Nachricht wird direkt an den Händler gesendet. Bitte achte auf eine freundliche und respektvolle Kommunikation.
                                            </p>
                                            {/* <RadioGroup className="flex mt-4 space-x-4">
                                <RadioGroupItem value="messenger" id="messenger" />
                                <Label htmlFor="messenger" className="flex items-center text-white">
                                    <Send className="mr-2 h-4 w-4" /> Direktnachricht
                                </Label>
                                <RadioGroupItem value="email" id="email" />
                                <Label htmlFor="email" className="flex items-center text-white">
                                    <Mail className="mr-2 h-4 w-4" /> E-Mail
                                </Label>
                            </RadioGroup> */}
                                            <Button
                                                className="w-full bg-indigo-800 hover:bg-blue-900 text-white  rounded-lg transition ease-in-out mt-2"
                                                onClick={onInterest} disabled={!text}>
                                                Senden
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <Button className="flex items-center mr-4  bg-[#1e202d] rounded-md p-2 px-4 sm:px-8 font-semibold
                                     dark:text-gray-100 dark:hover:bg-[#181818]/60" onClick={onConversation}>
                                    <LuMessagesSquare className="w-4 h-4 sm:mr-2" />
                                    <p className="sm:block hidden">
                                        Kontaktieren
                                    </p>
                                </Button>
                            </div>
                        ) : (
                            <Button className="flex items-center mr-4  bg-[#1D202D] text-gray-200  rounded-md p-2 px-4 sm:px-8 font-semibold
                                      hover:bg-[#242838] " onClick={onEdit}>
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