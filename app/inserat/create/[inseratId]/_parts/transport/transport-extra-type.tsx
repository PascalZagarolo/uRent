'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExtraTypeEnumRender } from "@/db/schema";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
    thisExtraType: typeof ExtraTypeEnumRender;
}

const TransportExtraType: React.FC<CarTypeProps> = ({
    thisExtraType
}) => {

    const [currentCoupling, setCurrentCoupling] = useState<typeof ExtraTypeEnumRender | null>(thisExtraType || null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: typeof ExtraTypeEnumRender) => {
        try {

            setCurrentCoupling(selectedValue);

            const values = {
                extraType: selectedValue
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${params.inseratId}/transport`, values);
            toast.success("Erw. Fahrzeugklasse gespeichert");
            setTimeout(() => {
                router.refresh();
            }, 400)
        } catch {
            toast.error("Fehler beim Speichern der Kategorie");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label>Erw. Fahrzeugklasse</Label>
                <Select
                //@ts-ignore
                    onValueChange={(extraType: typeof ExtraTypeEnumRender) => {
                        onSubmit(extraType);
                    }}
                    disabled={isLoading}
                    //@ts-ignore
                    value={currentCoupling}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Wähle die Kategorie aus"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem value={null}>Beliebig</SelectItem>
                        <SelectItem value="CONTAINERTRANSPORT">Containertransport</SelectItem>
                        <SelectItem value="FAHRZEUGTRANSPORT">Fahrzeugtransport</SelectItem>
                        <SelectItem value="FLUESSIGKEITSTRANSPORT">Fluessigkeitstransport</SelectItem>
                        <SelectItem value="KASTENWAGEN">Kastenwagen</SelectItem>
                        <SelectItem value="KOFFERAUFBAU">Kofferaufbau</SelectItem>
                        <SelectItem value="KUEHLAUFBAU">Kuehlaufbau</SelectItem>
                        <SelectItem value="MOEBELTRANSPORT">Moebeltransport</SelectItem>
                        <SelectItem value="MULDENKIPPER">Muldenkipper</SelectItem>
                        <SelectItem value="PERSONENTRANSPORT">Personentransport</SelectItem>
                        <SelectItem value="PLANE">Plane</SelectItem>
                        <SelectItem value="PRITSCHE">Pritsche</SelectItem>
                        
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}























export default TransportExtraType;