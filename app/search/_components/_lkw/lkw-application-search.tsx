'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";



import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const LkwApplicationSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentAge, setCurrentAge] = useState(currentObject["application"] ? currentObject["application"] : null);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("application", selectedValue);
        setCurrentAge(selectedValue)
        console.log(selectedValue)
    }

    const deleteApplication = () => {

        deleteSearchParams("application");
        setCurrentAge("beliebig")
        setCurrentAge(null)
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Erw. Fahrzeugkategorie </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        !brand ? deleteApplication() : onSubmit(brand)
                    }}
                    value={currentAge}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Wähle die Anwendung"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>


                        <SelectItem value="BAUMATERIALTRANSPORT">Baumaterialtransport</SelectItem>
                        <SelectItem value="CONTAINERTRANSPORT">Containertransport</SelectItem>
                        <SelectItem value="FAHRZEUGTRANSPORT">Fahrzeugtransport</SelectItem>

                        <SelectItem value="FLUESSIGKEITSTRANSPORT">Flüssigkeitstransport</SelectItem>

                        <SelectItem value="KIPPER">Kipper</SelectItem>
                        <SelectItem value="KOFFERAUFBAU">Kofferaufbau</SelectItem>
                        <SelectItem value="KUEHLWAGEN">Kühlwagen</SelectItem>
                        <SelectItem value="KRANWAGEN">Kranwagen</SelectItem>

                        <SelectItem value="MOEBELTRANSPORT">Moebeltransport</SelectItem>

                        <SelectItem value="PERSONENTRANSPORT">Personentransport</SelectItem>
                        <SelectItem value="PLANWAGEN">Planwagen</SelectItem>
                        <SelectItem value="PRITSCHENWAGEN">Pritschenwagen</SelectItem>

                        <SelectItem value="SATTELSCHLEPPER">Sattelschlepper</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default LkwApplicationSearch;