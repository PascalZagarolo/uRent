'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingEnumRender } from "@/db/schema";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
    thisLoading: typeof LoadingEnumRender;
}

const TransportLoading: React.FC<CarTypeProps> = ({
    thisLoading
}) => {

    const [currentLoading, setCurrentLoading] = useState<typeof LoadingEnumRender | null>(thisLoading || null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: typeof LoadingEnumRender) => {
        try {

            setCurrentLoading(selectedValue);

            const values = {
                loading: selectedValue
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${params.inseratId}/transport`, values);
            toast.success("Anzahl Türen erfolgreich gespeichert : " + values);
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
                <Label>Ladevorrichtung</Label>
                <Select
                //@ts-ignore
                    onValueChange={(loading: typeof LoadingEnumRender) => {
                        onSubmit(loading);
                    }}
                    disabled={isLoading}
                    //@ts-ignore
                    value={currentLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                    <SelectItem value={null}>Beliebig</SelectItem>
                        {Object.values(LoadingEnumRender).map((load, index) => (
                            <SelectItem key={index} value={load}>
                                {load.substring(0,1)}{load.substring(1).toLowerCase()}
                            </SelectItem>
                        ))}
                        
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}


export default TransportLoading;