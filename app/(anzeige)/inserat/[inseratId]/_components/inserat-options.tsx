'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share"

import axios from "axios";
import { CopyIcon, FacebookIcon, Forward, Lightbulb, Mail, Send, Share, Star,
     ThumbsUp, TwitterIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

import Bookings from "./bookings";
import ManageBookings from "./manage-bookings";
import { Pencil2Icon } from "@radix-ui/react-icons";
import BookingRequest from "./booking-request";
import { booking, contactOptions, users } from "@/db/schema";
import GoToDashboard from "./go-to-dashboard";


interface InseratOptionsProps {
    thisUser: typeof users.$inferSelect;
    bookings: typeof booking.$inferSelect[];
    ownUser: typeof users.$inferSelect;
    contactOptions: typeof contactOptions.$inferSelect;
}

const InseratOptions: React.FC<InseratOptionsProps> = ({
    thisUser,
    bookings,
    ownUser,
    contactOptions
}) => {





    const currentUrl = window ? window.location.href : "....";

    const name = contactOptions?.emailAddress


    const [text, setText] = useState(
        "Betreff: Anfrage bezüglich Mietwagen\n\n" +
        "Sehr geehrte Damen und Herren,\n\n" +
        `Nach eingehender Prüfung Ihres Mietangebots bin ich sehr interessiert an dem genannten Fahrzeug.
         Gerne würde ich weitere Details zu den Konditionen besprechen und das Fahrzeug persönlich in Augenschein nehmen.\n\n` +
        "Mit freundlichen Grüßen,\n" +
        "[Dein Name]\n\n" +
        "Meine Kontaktdaten : \n\n" +
        "E-Mail : " + (name ? name : "[Deine E-Mail Addresse]") + "\n" +
        "Telefon : " + (contactOptions?.phoneNumber ? contactOptions?.phoneNumber : "[Deine Telefonnummer]") + "\n"
    );

    const handleTextChange = (event : any) => {
        setText(event.target.value);
    };

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const params = useParams();

    const onStar = () => {
        if (ownUser) {
            try {
                setIsLoading(true);
                axios.patch(`/api/profile/${thisUser.id}/favourites`, { inseratId: params.inseratId })

                setTimeout(() => {
                    router.refresh();
                }, 500)
            } catch {
                toast.error("Fehler beim Favorisieren der Anzeige")
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push(`/login`)
        }
    }



    const onConversation = () => {

        if (ownUser) {
            try {
                setIsLoading(true);
                const conversation = axios.post(`/api/conversation/${ownUser.id}/${thisUser.id}`).then((response) => {
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

    const onInterest = () => {
        if (ownUser) {
            try {
                setIsLoading(true);
                axios.post(`/api/interest/${params.inseratId}`, { text: text });
            } catch {
                toast.error("Etwas ist schief gelaufen");
            } finally {
                setIsLoading(false);

            }
        } else {
            router.push(`/login`);
        }
    }

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        toast.success("Link in Zwischenablage kopiert")
    };

    const ownSite = ownUser?.id === thisUser.id;




    return (
        <div className="w-full">
            {ownSite ? (
                <div className="mt-4">
                    <GoToDashboard //@ts-ignore
                    userId={thisUser.id} inseratId={params.inseratId} />

                </div>

            ) : (
                <Dialog>
                    <DialogTrigger className="mt-4" asChild>
                    
                       {ownUser && (
                         <Button className="bg-emerald-700 hover:bg-emerald-600  sm:w-[240px] w-full text-gray-200">
                         <ThumbsUp className="h-4 w-4 mr-2" /> Fahrzeug anfragen
                     </Button>
                       )}

                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F0F0F] border-none">
                        <DialogHeader>
                            <div className="text-lg font-bold flex">
                                <Lightbulb className="mr-2" />  Händler sofort kontaktieren
                            </div>
                        </DialogHeader>
                        <div>
                            <Textarea className="h-[400px] border border-gray-300 bg-gray-200 dark:bg-[#171717]"
                                value={text}
                                onChange={handleTextChange}
                            />
                        </div>
                        <div>

                            <div>
                                <RadioGroup className="flex gap-x-4 items-center" defaultValue="messenger">
                                    <RadioGroupItem value="messenger" id="messenger" />

                                    <Label className="flex "> <Send className="w-4 h-4 mr-2 items-center" /> Direktnachricht </Label>

                                    <RadioGroupItem value="email" id="email" />

                                    <Label className="flex "> <Mail className="w-4 h-4 mr-2 items-center" /> E-Mail</Label>

                                </RadioGroup>

                            </div>
                        </div>
                        <div className="ml-auto">
                            <DialogTrigger>
                                <Button variant="ghost" className="bg-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                 dark:bg-[#171717] dark:hover:bg-[#1c1c1c] "
                                    onClick={onInterest} disabled={!text}>
                                    Senden
                                </Button>
                            </DialogTrigger>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {!ownSite ? (
                <>

                    <div className="mt-4">
                        {ownUser && (
                            <BookingRequest/>
                        )}
                    </div>
                    <div className="mt-4">
                        <Button className="bg-[#171923] hover:bg-[#1c1f2b] sm:w-[240px]   w-full  text-gray-200" onClick={onStar}>
                            <Star className="h-4 w-4 mr-2" /> Anzeige vormerken
                        </Button>
                    </div>



                    <div className="mt-4">
                        <Button className="bg-[#171923] hover:bg-[#1c1f2b]  sm:w-[240px]  flex w-full text-gray-200" onClick={onConversation}>
                            <Mail className="h-4 w-4 mr-2" />  Händler kontaktieren
                        </Button>
                    </div>
                </>
            ) : (

                <></>

            )}

            {ownSite && (
                <Button className="bg-[#1f2230] sm:w-[240px] border-2 border-black flex w-full mt-4
                    dark:text-gray-100 dark:bg-[#1f2230] dark:hover:bg-[#161921] border-none"
                    onClick={() => { router.push(`/inserat/create/${params.inseratId}`) }}
                >
                    <Pencil2Icon className="h-4 w-4 mr-2" />  Anzeige bearbeiten
                </Button>
            )}

            <div className="mt-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#1b1e2b] sm:w-[240px]  flex w-full
                        dark:text-gray-100  dark:hover:bg-[#161921] 
                        ">
                            <Share className="h-4 w-4 mr-2" />  Anzeige teilen
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F0F0F]">
                        <DialogHeader className="flex">
                            <div className="flex text-lg font-semibold">
                                <Forward className="mr-2 " /> Anzeige teilen
                            </div>
                        </DialogHeader>
                        <div>
                            <p className="font-semibold italic flex">
                                <Share className="mr-2" /> Soziale Netzwerke :
                            </p>
                            <div className="flex gap-x-4 items-center mt-4 justify-evenly ">
                                <FacebookShareButton
                                    className=""
                                    url={currentUrl}
                                    hashtag="#Urent"
                                >
                                    <div className="p-2 bg-white rounded-md border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]
                                    dark:bg-[#080808]
                                    ">
                                        <FacebookIcon size={32} className="w-6 h-6" />
                                    </div>


                                </FacebookShareButton>
                                <TwitterShareButton

                                    title="Dieses Produkt habe ich auf Urent gefunden, Wow!"
                                    hashtags={["Urent", "#Mietwagen", "#Autovermietung", "#Inserat"]}
                                    url={currentUrl}
                                >
                                    <div className="p-2 bg-white rounded-md border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]
                                    dark:bg-[#080808]
                                    ">
                                        <TwitterIcon size={32} className="w-6 h-6" />
                                    </div>
                                </TwitterShareButton>
                                <EmailShareButton

                                    url={currentUrl}
                                    subject="Dieses Produkt habe ich auf Urent gefunden, Wow!"
                                    body="Hallo, ich habe dieses Produkt auf Urent gefunden und wollte es dir zeigen."
                                >
                                    <div className="p-2 bg-white rounded-md border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]
                                    dark:bg-[#080808]
                                    ">
                                        <Mail size={32} className="w-6 h-6 " />
                                    </div>
                                </EmailShareButton>
                            </div>
                            <div className="mt-2 flex">
                                <Input
                                    className="rounded-none border border-gray-300 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                    hover:underline hover:cursor-pointer dark:bg-[#080808]"
                                    value={currentUrl}
                                    onClick={() => { copyToClipboard(currentUrl) }}
                                />
                                <CopyIcon className="w-4 h-4 ml-2 hover:cursor-pointer" onClick={() => { copyToClipboard(currentUrl) }} />

                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
}

export default InseratOptions;