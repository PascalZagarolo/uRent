'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { User, ContactOptions } from "@prisma/client";
import { EmailShareButton, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterShareButton } from "react-share"

import axios from "axios";
import { set } from "date-fns";
import { ArrowRight, Banknote, Check, CopyIcon, Facebook, FacebookIcon, Forward, Lightbulb, Mail, PlaneIcon, Send, Share, Star, ThumbsUp, TwitterIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/ui/toast";

interface InseratOptionsProps {
    user: User;
    isPurchased: boolean;
    ownUser: User;
    contactOptions: ContactOptions;
}

const InseratOptions: React.FC<InseratOptionsProps> = ({
    user,
    isPurchased,
    ownUser,
    contactOptions
}) => {

    const currentUrl = window.location.href;

    const name = contactOptions.emailAddress


    const [text, setText] = useState(
        "Betreff: Anfrage bezüglich Mietwagen\n\n" +
        "Sehr geehrte Damen und Herren,\n\n" +
        "Nach eingehender Prüfung Ihres Mietangebots bin ich sehr interessiert an dem genannten Fahrzeug. Gerne würde ich weitere Details zu den Konditionen besprechen und das Fahrzeug persönlich in Augenschein nehmen.\n\n" +
        "Mit freundlichen Grüßen,\n" +
        "[Dein Name]\n\n" +
        "Meine Kontaktdaten : \n\n" +
        "E-Mail : " + name + "\n" +
        "Telefon : " + (contactOptions.phoneNumber !== null ? contactOptions.phoneNumber : "[Deine Telefonnummer]") + "\n"




    );

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const params = useParams();

    const onStar = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/profile/${user.id}/favourites`, { inseratId: params.inseratId })

            setTimeout(() => {
                router.refresh();
            }, 500)
        } catch {
            toast.error("Fehler beim Favorisieren der Anzeige")
        } finally {
            setIsLoading(false);
        }
    }

    const onPurchase = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/inserat/${params.inseratId}/user/${user.id}/checkout`);

            window.location.assign(response.data.url)
        } catch {
            toast.error("Fehler beim Buchen der Anzeige")
        } finally {
            setIsLoading(false);
        }
    }

    const onConversation = () => {
        try {
            setIsLoading(true);
            const conversation = axios.post(`/api/conversation/${ownUser.id}/${user.id}`).then((response) => {
                toast.success("Konversation erfolgreich erstellt")
                router.push(`/conversation/${response.data.id}`)
            })
        } catch {
            toast.error("Fehler beim Erstellen der Konversation")
        } finally {
            setIsLoading(false);
        }
    }

    const onInterest = () => {
        try {
            setIsLoading(true);
            axios.post(`/api/interest/${params.inseratId}`, { text: text });
        } catch {
            toast.error("Etwas ist schief gelaufen");
        } finally {
            setIsLoading(false);

        }
    }

    const copyToClipboard = async (text: string) => {
       await navigator.clipboard.writeText(text);
       toast.success("Link in Zwischenablage kopiert")
    };






    return (
        <div>



            {isPurchased ? (
                <div className="mt-4">
                    <Button className="bg-emerald-600 border-2 border-black w-[240px]" disabled>
                        <Check className="h-4 w-4 mr-2" /> Bereits gebucht
                    </Button>
                </div>
            ) : (
                /*
                <div className="mt-4">
                <Button className="bg-emerald-600 border-2 border-black w-[240px]" onClick={onPurchase}>
                    <Banknote className="h-4 w-4 mr-2"/> Buchen
                </Button>
            </div>
            */

                <Dialog>
                    <DialogTrigger className="mt-4" asChild>

                        <Button className="bg-emerald-600 border-2 border-black w-[240px]">
                            <ThumbsUp className="h-4 w-4 mr-2" /> Interesse äußern
                        </Button>

                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <div className="text-lg font-bold flex">
                                <Lightbulb className="mr-2" />  Händler sofort kontaktieren
                            </div>
                        </DialogHeader>
                        <div>
                            <Textarea className="h-[400px] border border-gray-300 bg-gray-200"
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
                                <Button variant="ghost" className="bg-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" onClick={onInterest} disabled={!text}>
                                    Senden
                                </Button>
                            </DialogTrigger>
                        </div>
                    </DialogContent>
                </Dialog>


            )}


            <div className="mt-4">
                <Button className="bg-[#464c69] w-[240px] border-2 border-black" onClick={onStar}>
                    <Star className="h-4 w-4 mr-2" />Anzeige vormerken
                </Button>
            </div>

            <div className="mt-4">
                <Button className="bg-[#33374d] w-[240px] border-2 border-black flex" onClick={onConversation}>
                    <Mail className="h-4 w-4 mr-2" />  Händler kontaktieren
                </Button>
            </div>

            <div className="mt-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#1f2230] w-[240px] border-2 border-black flex">
                            <Share className="h-4 w-4 mr-2" />  Anzeige teilen
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className="flex">
                            <div className="flex text-lg font-semibold">
                                <Forward className="mr-2 " /> Anzeige teilen
                            </div>
                        </DialogHeader>
                        <div>
                            <p>
                                Soziale Netzwerke :
                            </p>
                            <div className="flex gap-x-4 items-center mt-4 justify-evenly ">
                                <FacebookShareButton
                                    className=""
                                    url={currentUrl}
                                    hashtag="#Urent"
                                >
                                    <div className="p-2 bg-white rounded-md border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                                        <FacebookIcon size={32} className="w-6 h-6" />
                                    </div>


                                </FacebookShareButton>
                                <TwitterShareButton

                                    title="Dieses Produkt habe ich auf Urent gefunden, Wow!"
                                    hashtags={["Urent", "#Mietwagen", "#Autovermietung", "#Inserat"]}
                                    url={currentUrl}
                                >
                                    <div className="p-2 bg-white rounded-md border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                                        <TwitterIcon size={32} className="w-6 h-6" />
                                    </div>
                                </TwitterShareButton>
                                <EmailShareButton

                                    url={currentUrl}
                                    subject="Dieses Produkt habe ich auf Urent gefunden, Wow!"
                                    body="Hallo, ich habe dieses Produkt auf Urent gefunden und wollte es dir zeigen."
                                >
                                    <div className="p-2 bg-white rounded-md border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                                        <Mail size={32} className="w-6 h-6 " />
                                    </div>
                                </EmailShareButton>
                            </div>
                            <div className="mt-2 flex">
                                <Input
                                    className="rounded-none border border-gray-300 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                                    value={currentUrl}
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