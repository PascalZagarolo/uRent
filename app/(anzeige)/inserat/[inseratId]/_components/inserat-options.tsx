'use client'

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from "axios";
import { Banknote, Mail, Share, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratOptionsProps {
    user : User;
}

const InseratOptions: React.FC<InseratOptionsProps> = ({
    user
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const params = useParams();

    const onStar = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/profile/${user.id}/favourites`, {inseratId : params.inseratId})
            
            setTimeout(() => {
                router.refresh();
            },500)
        } catch {
            toast.error("Fehler beim Favorisieren der Anzeige")
        } finally{
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

    

    return (
        <div>

            

            <div className="mt-4">
                <Button className="bg-emerald-600 border-2 border-black w-[240px]" onClick={onPurchase}>
                    <Banknote className="h-4 w-4 mr-2"/> Buchen
                </Button>
            </div>

            <div className="mt-4">
                <Button className="bg-[#464c69] w-[240px] border-2 border-black" onClick={onStar}>
                    <Star className="h-4 w-4 mr-2"/>Anzeige vormerken
                </Button>
            </div>

            <div className="mt-4">
                <Button className="bg-[#33374d] w-[240px] border-2 border-black flex">
                  <Mail className="h-4 w-4 mr-2"/>  Händler kontaktieren
                </Button>
            </div>

            <div className="mt-4">
                <Button className="bg-[#1f2230] w-[240px] border-2 border-black flex">
                  <Share className="h-4 w-4 mr-2"/>  Anzeige teilen
                </Button>
            </div>
        </div>
    );
}

export default InseratOptions;