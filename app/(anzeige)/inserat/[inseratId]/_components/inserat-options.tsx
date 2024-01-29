'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@prisma/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { set } from "date-fns";
import { Banknote, Check, Mail, Share, Star, ThumbsUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratOptionsProps {
    user: User;
    isPurchased: boolean;
    ownUser: User;
}

const InseratOptions: React.FC<InseratOptionsProps> = ({
    user,
    isPurchased,
    ownUser
}) => {

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
                    <DialogTrigger>
                        <div className="mt-4">
                            <Button className="bg-emerald-600 border-2 border-black w-[240px]">
                                <ThumbsUp className="h-4 w-4 mr-2" /> Interesse äußern
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <div>

                            </div>
                        </DialogHeader>
                        <div>
                            <Textarea className="h-[400px] border border-gray-300 bg-gray-200"
                                placeholder="
                            Betreff: Anfrage bezüglich Mietwagen

                            Sehr geehrte Damen und Herren,

                            nach eingehender Prüfung Ihres Mietangebots bin ich sehr interessiert an dem genannten Fahrzeug. Gerne würde ich weitere Details zu den Konditionen besprechen und das Fahrzeug persönlich in Augenschein nehmen.

                            Mit freundlichen Grüßen,

                            [Dein Name]
                            [Deine Kontaktdaten]"
                            />
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
                <Button className="bg-[#1f2230] w-[240px] border-2 border-black flex">
                    <Share className="h-4 w-4 mr-2" />  Anzeige teilen
                </Button>
            </div>
        </div>
    );
}

export default InseratOptions;