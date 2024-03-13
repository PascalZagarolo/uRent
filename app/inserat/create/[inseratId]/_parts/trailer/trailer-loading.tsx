'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarType, CouplingType, ExtraType, FuelType, LoadingType } from "@prisma/client";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
    loading: LoadingType;
}

const TrailerLoading: React.FC<CarTypeProps> = ({
    loading
}) => {

    const [currentCoupling, setCurrentCoupling] = useState<LoadingType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: LoadingType) => {
        try {

            setCurrentCoupling(selectedValue);

            const values = {
                loading: selectedValue
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${params.inseratId}/trailer`, values);
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
                <Label>Ladetyp</Label>
                <Select
                    onValueChange={(loading: LoadingType) => {
                        onSubmit(loading);
                    }}


                    disabled={isLoading}
                    value={loading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Wähle die Kategorie aus"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        {Object.values(LoadingType).map((load, index) => (
                            <SelectItem key={index} value={load}>
                                {load.substring(0,1)}{load.substring(1).toLowerCase()}
                            </SelectItem>
                        ))}
                        <SelectItem value={null}>Beliebig</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}























export default TrailerLoading;