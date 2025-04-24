'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share"

import axios from "axios";
import {
    CopyIcon, FacebookIcon, Lightbulb, Mail, Send, Share, Share2Icon, Star,
    StarIcon, Twitter as TwitterIcon
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

import { Pencil2Icon, StarFilledIcon } from "@radix-ui/react-icons";
import BookingRequest from "./booking-request";
import { booking, contactOptions, inserat, userTable } from "@/db/schema";
import GoToDashboard from "./go-to-dashboard";

import { BsHandIndexThumb } from "react-icons/bs";
import LetterRestriction from "@/components/letter-restriction";
import ManageAvailability from "./manage-availability";
import { cn } from "@/lib/utils";

interface InseratOptionsProps {
    thisUser: typeof userTable.$inferSelect;
    bookings: typeof booking.$inferSelect[];
    ownUser: typeof userTable.$inferSelect & { favourites: { inseratId: string }[] };
    contactOptions: typeof contactOptions.$inferSelect;
    thisInserat: typeof inserat.$inferSelect;
    inseratArray: typeof inserat.$inferSelect[];
}

const InseratOptions: React.FC<InseratOptionsProps> = ({
    thisUser,
    bookings,
    ownUser,
    contactOptions,
    thisInserat,
    inseratArray
}) => {
    let currentUrl = process.env.NEXT_PUBLIC_BASE_URL + usePathname();
    const name = contactOptions?.emailAddress;

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

    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState<boolean>(ownUser?.favourites?.some((favourite) => favourite?.inseratId == params.inseratId) || false);

    const onStar = async () => {
        if (ownUser) {
            const currentlyLiked = ownUser?.favourites?.some((favourite) => favourite?.inseratId == params.inseratId) || false
            try {
                setIsLoading(true);
                setIsLiked(currentlyLiked ? false : true);
                await axios.patch(`/api/profile/${ownUser.id}/favourites`, { inseratId: params.inseratId });
                toast.success(currentlyLiked ? "Anzeige aus Favouriten entfernt" : "Anzeige zu Favouriten hinzugefügt");
            } catch (error) {
                toast.error("Fehler beim Favorisieren der Anzeige");
                setIsLiked(currentlyLiked);
            } finally {
                setIsLoading(false);
                router.refresh();
            }
        } else {
            router.push(`/login`);
        }
    };

    const onConversation = () => {
        if (ownUser) {
            try {
                setIsLoading(true);
                const values = {
                    inseratId: thisInserat?.id
                }
                axios.post(`/api/conversation/${ownUser.id}/${thisUser.id}`, values).then((response) => {
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
                const values = {
                    inseratId: thisInserat?.id
                }
                setIsLoading(true);
                axios.post(`/api/interest/${params.inseratId}`, { text: text, inseratId: thisInserat?.id })
                    .then((res) => {
                        router.refresh();
                        router.push(`/conversation?conversationId=${res?.data}`)
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

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        toast.success("Link in Zwischenablage kopiert")
    };

    const ownSite = ownUser?.id === thisUser.id;
    const usedPrice = Number(thisInserat?.price).toFixed(2);

    const handleTextChange = (event) => {
        const newText = event.target.value;
        const lines = newText.split('\n');
        if (lines.length <= 30) {
            setText(newText);
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#151823] to-[#1B1F2E] rounded-xl border border-gray-800/30 shadow-lg overflow-hidden">
            {/* Price section */}
            <div className="p-6 border-b border-gray-800/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{usedPrice.slice(0, -3)}</span>
                        <span className="text-xl font-semibold text-white ml-0.5">,{usedPrice.slice(-2)}€</span>
                        <span className="text-sm font-medium text-gray-400 ml-2">pro Tag</span>
                    </div>
                    {!ownSite && (
                        <button 
                            onClick={onStar}
                            disabled={isLoading}
                            className={cn(
                                "p-2 rounded-full transition-colors",
                                isLiked ? "text-yellow-400 bg-yellow-400/10" : "text-gray-400 hover:text-gray-200"
                            )}
                        >
                            {isLiked ? (
                                <StarFilledIcon className="h-5 w-5" />
                            ) : (
                                <Star className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Actions section */}
            <div className="p-6">
                {ownSite ? (
                    <div className="space-y-4">
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-lg transition-colors"
                            onClick={() => router.push(`/inserat/create/${params.inseratId}`)}
                        >
                            <Pencil2Icon className="mr-2 h-4 w-4" /> Inserat bearbeiten
                        </Button>
                        <ManageAvailability foundInserate={[thisInserat]} />
                        <GoToDashboard userId={thisUser.id} inseratId={params.inseratId as any} />
                    </div>
                ) : (
                    <div className="space-y-3">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-5 rounded-lg font-medium transition-colors"
                                >
                                    <BsHandIndexThumb className="mr-2 h-4 w-4" /> Fahrzeug anfragen
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#171921] p-6 rounded-xl shadow-xl border border-gray-800/40">
                                <DialogHeader>
                                    <h3 className="text-xl font-semibold text-white flex items-center">
                                        <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" /> Händler kontaktieren
                                    </h3>
                                </DialogHeader>
                                <div className="mt-4">
                                    <Textarea
                                        className="w-full h-[320px] bg-[#1E212D] text-gray-200 border-gray-700/50 rounded-lg focus:ring-indigo-500"
                                        value={text}
                                        onChange={handleTextChange}
                                        maxLength={2000}
                                    />
                                    <div className="flex justify-end mt-1">
                                        <LetterRestriction
                                            currentLength={text.length} limit={2000}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Die Nachricht wird direkt an den Händler gesendet. Bitte achte auf eine freundliche Kommunikation.
                                    </p>
                                    <Button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-lg font-medium mt-4 transition-colors"
                                        onClick={onInterest} 
                                        disabled={!text || isLoading}
                                    >
                                        <Send className="mr-2 h-4 w-4" /> Nachricht senden
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <BookingRequest />

                        <Button
                            className="w-full bg-[#222736] hover:bg-[#2B3044] text-white py-5 rounded-lg transition-colors"
                            onClick={onConversation}
                            disabled={isLoading}
                        >
                            <Mail className="mr-2 h-4 w-4" /> Händler kontaktieren
                        </Button>

                        <Button
                            className={cn(
                                "w-full py-5 rounded-lg transition-colors",
                                isLiked 
                                    ? "bg-[#272A38] text-yellow-400 hover:bg-[#2D3148]" 
                                    : "bg-[#222736] text-white hover:bg-[#2B3044]"
                            )}
                            disabled={isLoading}
                            onClick={onStar}
                        >
                            {isLiked ? (
                                <StarFilledIcon className="mr-2 h-4 w-4" />
                            ) : (
                                <Star className="mr-2 h-4 w-4" />
                            )} 
                            {isLiked ? "Aus Favoriten entfernen" : "Anzeige vormerken"}
                        </Button>
                    </div>
                )}

                {/* Share section */}
                <div className="mt-6 pt-5 border-t border-gray-800/20">
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            className="bg-[#222736] hover:bg-[#2B3044] text-white rounded-lg transition-colors"
                            onClick={() => copyToClipboard(currentUrl)}
                        >
                            <CopyIcon className="mr-2 h-4 w-4" /> Link kopieren
                        </Button>
                        
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-[#222736] hover:bg-[#2B3044] text-white rounded-lg transition-colors"
                                >
                                    <Share className="mr-2 h-4 w-4" /> Teilen
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#171921] border border-gray-800/40 rounded-xl shadow-xl">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <Share2Icon className="w-5 h-5 mr-2 text-indigo-400" /> Anzeige teilen
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <p className="text-gray-300 font-medium">Teilen auf</p>
                                    <div className="flex justify-center gap-4">
                                        <FacebookShareButton url={currentUrl} hashtag="#Urent">
                                            <div className="p-3 bg-[#1E212D] rounded-lg hover:bg-[#252A3A] transition-colors">
                                                <FacebookIcon size={24} className="text-blue-400" />
                                            </div>
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            title="Dieses Fahrzeug habe ich auf Urent gefunden!"
                                            hashtags={["Urent", "Mietwagen"]}
                                            url={currentUrl}
                                        >
                                            <div className="p-3 bg-[#1E212D] rounded-lg hover:bg-[#252A3A] transition-colors">
                                                <TwitterIcon size={24} className="text-blue-400" />
                                            </div>
                                        </TwitterShareButton>
                                        <EmailShareButton
                                            url={currentUrl}
                                            subject="Dieses Fahrzeug habe ich auf uRent gefunden"
                                            body="Hallo, ich habe dieses Fahrzeug auf Urent gefunden und wollte es dir zeigen."
                                        >
                                            <div className="p-3 bg-[#1E212D] rounded-lg hover:bg-[#252A3A] transition-colors">
                                                <Mail size={24} className="text-indigo-400" />
                                            </div>
                                        </EmailShareButton>
                                    </div>
                                    <div className="flex items-center mt-4 rounded-lg overflow-hidden">
                                        <Input
                                            className="flex-grow text-white border-0 bg-[#1E212D] focus:ring-0"
                                            value={currentUrl}
                                            readOnly
                                        />
                                        <button 
                                            className="bg-[#222736] hover:bg-[#2B3044] p-3 text-white transition-colors"
                                            onClick={() => copyToClipboard(currentUrl)}
                                        >
                                            <CopyIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InseratOptions;