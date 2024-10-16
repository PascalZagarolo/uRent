'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share"

import axios from "axios";
import {
    CopyIcon, FacebookIcon, Forward, Lightbulb, Mail, Send, Share, Star,
    StarIcon,
    ThumbsUp, TwitterIcon
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

import Bookings from "./bookings";
import ManageBookings from "./manage-bookings";
import { Pencil2Icon } from "@radix-ui/react-icons";
import BookingRequest from "./booking-request";
import { booking, contactOptions, inserat, userTable } from "@/db/schema";
import GoToDashboard from "./go-to-dashboard";
import ManageAvailability from "@/app/dashboard/[userId]/(routes)/inserate/_components/manage-availability";
import { BsHandIndexThumb } from "react-icons/bs";


interface InseratOptionsProps {
    thisUser: typeof userTable.$inferSelect;
    bookings: typeof booking.$inferSelect[];
    ownUser: typeof userTable.$inferSelect;
    contactOptions: typeof contactOptions.$inferSelect;
    thisInserat: typeof inserat.$inferSelect;
}

const InseratOptions: React.FC<InseratOptionsProps> = ({
    thisUser,
    bookings,
    ownUser,
    contactOptions,
    thisInserat
}) => {





    let currentUrl = process.env.NEXT_PUBLIC_BASE_URL + usePathname();





    const name = contactOptions?.emailAddress


    const [text, setText] = useState(
        "Betreff: Anfrage bezüglich Mietwagen\n\n" +
        "Sehr geehrte Damen und Herren,\n\n" +
        `Nach eingehender Prüfung Ihres Mietangebots bin ich sehr interessiert an dem genannten Fahrzeug.\n` +
        `Gerne würde ich weitere Details zu den Konditionen besprechen und das Fahrzeug persönlich in Augenschein nehmen.\n\n` +
        "Mit freundlichen Grüßen,\n" +
        "[Dein Name]\n\n" +
        "Meine Kontaktdaten : \n\n" +
        "E-Mail : " + (name ? name : "[Deine E-Mail Addresse]") + "\n" +
        "Telefon : " + (contactOptions?.phoneNumber ? contactOptions?.phoneNumber : "[Deine Telefonnummer]") + "\n"
    );

    const handleTextChange = (event: any) => {
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

    const usedPrice = Number(thisInserat?.price).toFixed(2);


    return (
        <div className="w-full rounded-lg bg-[#161923] p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-white">{usedPrice.slice(0, -3)}</span>
                    <span className="text-lg font-medium text-gray-400">€ / Tag</span>
                </div>
                
            </div>
            {ownSite && (
                    <Button
                        className="flex items-center bg-indigo-800 hover:bg-indigo-900 text-white w-full mt-8  transition ease-in-out">
                        <Pencil2Icon className="mr-2 h-4 w-4" /> Anzeige bearbeiten
                    </Button>
                )}
            {ownSite ? (
                <div className="mt-4 flex flex-col w-full">
                    <div>
                        <ManageAvailability thisInserat={thisInserat} inseratPage={true} />
                    </div>
                    <div className="mt-4">
                        <GoToDashboard userId={thisUser.id} inseratId={params.inseratId as any} />
                    </div>
                </div>
            ) : (
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="w-full bg-gradient-to-l from-emerald-700 to-emerald-800 text-gray-200 py-3  hover:text-gray-300 hover:bg-gradient-to-r duration-800 mt-4 rounded-lg transition ease-in">
                                <BsHandIndexThumb className="mr-2 h-4 w-4" /> Fahrzeug anfragen
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 p-6 rounded-lg shadow-xl">
                            <DialogHeader>
                                <h3 className="text-xl font-semibold text-white flex flex-row items-center space-x-2">
                                    <Lightbulb className="mr-2 h-4 w-4" /> Händler sofort kontaktieren
                                </h3>
                            </DialogHeader>
                            <Textarea
                                className="w-full h-[400px] mt-4 bg-gray-800 text-gray-300 border-none rounded-lg"
                                value={text}
                                onChange={handleTextChange}
                            />
                            <p className="text-xs text-gray-200/60">
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
                                className="w-full bg-indigo-800 hover:bg-blue-900 text-white py-3 rounded-lg transition ease-in-out"
                                onClick={onInterest} disabled={!text}>
                                Senden
                            </Button>
                        </DialogContent>
                    </Dialog>
                    <div className="mt-4">
                        <BookingRequest />
                    </div>
                    <Button
                        className="w-full bg-[#20232e] hover:bg-[#2b2f3e] shadow-lg text-white py-3 mt-4 rounded-lg transition ease-in-out"
                        onClick={onConversation}>
                        <Mail className="mr-2 h-4 w-4" /> Händler kontaktieren
                    </Button>
                    <Button
                        className="w-full bg-[#20232e] hover:bg-[#2b2f3e] shadow-lg text-white py-3 mt-4 rounded-lg transition ease-in-out"
                        onClick={onStar}>
                        <Star className="mr-2 h-4 w-4" /> Anzeige vormerken
                    </Button>

                </div>
            )}

            <div className="flex space-x-4 mt-6">
                <Button
                    className="flex items-center justify-center w-full py-3 bg-indigo-800 hover:bg-indigo-900 text-gray-200  shadow-lg  rounded-lg transition ease-in-out"
                    variant="secondary"
                    onClick={() => copyToClipboard(currentUrl)}>
                    <CopyIcon className="mr-2 h-4 w-4" /> Link kopieren
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="secondary"
                            className="flex items-center justify-center w-full py-3  shadow-lg text-white rounded-lg transition ease-in-out">
                            <Share className="mr-2 h-4 w-4" /> Teilen
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 p-6 rounded-lg shadow-xl">
                        <div className="text-lg font-semibold text-white flex items-center">
                            <Forward className="mr-2 h-5 w-5" /> Anzeige teilen
                        </div>
                        <div className="mt-4 space-y-4">
                            <p className="text-gray-300 font-medium">Soziale Netzwerke :</p>
                            <div className="flex justify-evenly space-x-4">
                                <FacebookShareButton url={currentUrl} hashtag="#Urent">
                                    <FacebookIcon size={32} className="text-white" />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    title="Dieses Produkt habe ich auf Urent gefunden, Wow!"
                                    hashtags={["Urent", "Mietwagen", "Autovermietung", "Inserat"]}
                                    url={currentUrl}>
                                    <TwitterIcon size={32} className="text-white" />
                                </TwitterShareButton>
                                <EmailShareButton
                                    url={currentUrl}
                                    subject="Dieses Produkt habe ich auf Urent gefunden, Wow!"
                                    body="Hallo, ich habe dieses Produkt auf Urent gefunden und wollte es dir zeigen.">
                                    <Mail size={32} className="text-white" />
                                </EmailShareButton>
                            </div>
                            <div className="flex items-center mt-4">
                                <Input
                                    className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-2"
                                    value={currentUrl}
                                    readOnly
                                    onClick={() => copyToClipboard(currentUrl)}
                                />
                                <CopyIcon className="ml-2 text-white hover:cursor-pointer" onClick={() => copyToClipboard(currentUrl)} />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );

}

export default InseratOptions;