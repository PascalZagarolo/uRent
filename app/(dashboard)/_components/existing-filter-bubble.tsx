'use client'

import { useSavedSearchParams } from "@/store";
import { X } from "lucide-react";

import { useState } from "react";
import qs from 'query-string';
import { useRouter } from "next/navigation";
import { format } from "date-fns";


interface ExistingFilterBubbleProps {
    pKey: string;
    value: string;
}

const ExistingFilterBubble: React.FC<ExistingFilterBubbleProps> = ({
    value,
    pKey
}) => {



    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    console.log(searchParams)

    const displayKey = (usedKey: string, usedValue: string): string => {

        let formattedDate;

        switch (usedKey) {
            case 'category': {
                switch (usedValue) {
                    case 'PKW':
                        return "Pkw"
                    case 'LKW':
                        return "Lkw"
                    case 'TRAILER':
                        return "Anhänger"
                    case 'TRANSPORT':
                        return "Transporter"
                }
            }
            case 'periodBegin':
                formattedDate = format(new Date(usedValue), 'dd.MM.yyyy');
                return `Von ${formattedDate}`;
            case 'periodEnd':
                formattedDate = format(new Date(usedValue), 'dd.MM.yyyy');
                return `Bis ${formattedDate}`;
            case 'start':
                return `Ab ${usedValue} €`;
            case 'end':
                return `Bis ${usedValue} €`;
            case 'doors':
                return `Ab ${usedValue} Türen`;
            case 'doorsMax':
                return `Bis ${usedValue} Türen`;
            case 'initial':
                return 'Baujahr ab ' + format(new Date(usedValue), 'dd.MM.yyyy');
            case 'initialMax':
                return 'Baujahr bis ' + format(new Date(usedValue), 'dd.MM.yyyy');
            case 'power':
                return 'ab ' + usedValue + 'PS';
            case 'powerMax':
                return 'bis ' + usedValue + 'PS';
            case 'seats':
                return 'ab ' + usedValue + ' Sitze';
            case 'seatsMax':
                return 'bis ' + usedValue + ' Sitze';
            case 'volume':
                return 'ab ' + usedValue + ' Liter';
            case 'transmission':
                switch (usedValue) {
                    case 'automatic':
                        return 'Automatik';
                    case 'MANUAL':
                        return 'Schaltgetriebe';
                    default:
                        return usedValue;
                }
            case 'fuel':
                switch (usedValue) {
                    case 'BENZIN':
                        return 'Benzin';
                    case 'DIESEL':
                        return 'Diesel';
                }
            case 'type':
                switch (usedValue) {
                    case 'KOMBI':
                        return 'Kombi';
                    case 'COUPE':
                        return 'Coupe';
                    case 'PICKUP':
                        return 'Pickup';
                    case 'SUV':
                        return 'Suv';
                    case 'LIMOUSINE':
                        return 'Limousinen';
                    case 'VAN':
                        return 'Van';
                    case 'KASTENWAGEN':
                        return 'Kastenwagen';
                    case 'KLEINBUS':
                        return 'Kleinbus';
                    case 'CABRIO':
                        return 'Cabrio';
                    case 'KLEIN':
                        return 'Kleinwagen';
                    case 'SPORT':
                        return 'Sportwagen';
                    case 'SUPERSPORT':
                        return 'Supersportwagen';
                    default:
                        return usedValue;
                }
            case 'ahk': {
                switch (usedValue) {
                    case 'true':
                        return 'Mit Anhängerkupplung';
                    case 'false':
                        return 'Ohne Anhängerkupplung';
                    default:
                        return usedValue;

                }
            }
            case 'drive':
                return usedValue.slice(1)
            case 'weightClass': {
                switch (usedValue) {
                    case '550':
                        return 'Ab 5,5t'
                    case '750':
                        return 'Ab 7,5t'
                    case '1200':
                        return 'Ab 12t'
                    case '1800':
                        return 'Ab 18t'
                    case '2600':
                        return 'Ab 26t'
                    case '3200':
                        return 'Ab 32t'
                    case '3400':
                        return 'Ab 34t'
                    case '5000':
                        return 'über 39t'
                }
            }
            case 'weightClassMax': {
                switch (usedValue) {
                    case '550':
                        return 'bis 5,5t'
                    case '750':
                        return 'bis 7,5t'
                    case '1200':
                        return 'bis 12t'
                    case '1800':
                        return 'bis 18t'
                    case '2600':
                        return 'bis 26t'
                    case '3200':
                        return 'bis 32t'
                    case '3400':
                        return 'bis 34t'
                    case '5000':
                        return 'bis über 34t'
                }
            }
            case "axis":
                return 'ab ' + usedValue + ' Achsen'
            case "axisMax":
                return 'bis ' + usedValue + ' Achsen'
            case "brake":
                {
                    switch (usedValue) {
                        case 'true':
                            return "mit Bremsvorrichtung"
                        case 'false':
                            return "ohne Bremsvorrichtung"
                    }
                }
            case 'coupling': {
                switch (usedValue) {
                    case 'KUGELKOPFKUPPLUNNG':
                        return 'Kugelkopfkupplung'
                    case 'MAULKUPPLUNG':
                        return 'Maulkupplung'
                }
            }
            case 'extraType' : {
                switch (usedValue) {
                    case "FAHRZEUGTRANSPORT":
                        return "Fahrzeugtransport";
                    case "CONTAINERTRANSPORT":
                        return "Containertransport";
                    case "FLUESSIGKEITSTRANSPORT":
                        return "Flüssigkeitstransport";
                    case "KASTENWAGEN":
                        return "Kastenwagen";
                    case "KIPPER":
                        return "Kipper";
                    case "KIPPERAUFBAU":
                        return "Kipperaufbau";
                    case "KOFFERAUFBAU":
                        return "Kofferaufbau";
                    case "KUEHLAUFBAU":
                        return "Kühlaufbau";
                    case "MOEBELTRANSPORT":
                        return "Möbeltransport";
                    case "MULDENKIPPER":
                        return "Muldenkipper";
                    case "PERSONENTRANSPORT":
                        return "Personentransport";
                    case "PLANE":
                        return "Plane";
                    case "PRITSCHE":
                        return "Pritsche";
                    case "VERANSTALTUNG":
                        return "Veranstaltung";
                }
                
            }
            default:
                return usedValue;
        }
    }

    const router = useRouter();

    const onClickDelete = () => {
        try {
            setIsLoading(true);

            deleteSearchParams(pKey);

            onRedirect();
        } catch (e: any) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    const onRedirect = () => {

        let pFilteredValues = searchParams;
        delete pFilteredValues[pKey.toString().trim()];

        const {
            //@ts-ignore            
            thisCategory, ...filteredValues } = pFilteredValues;

        console.log(filteredValues)
        //@ts-ignore
        const usedStart = filteredValues.periodBegin;
        let usedEnd = null;

        //@ts-ignore
        if (filteredValues.periodEnd) {
            //@ts-ignore
            usedEnd = filteredValues.periodEnd;
        } else {
            //@ts-ignore
            if (filteredValues.periodBegin) {
                //@ts-ignore
                usedEnd = filteredValues.periodBegin;
            }
        }
        const url = qs.stringifyUrl({
            url: process.env.NEXT_PUBLIC_BASE_URL,
            //@ts-ignore
            query: {
                //@ts-ignore
                category: thisCategory,
                //@ts-ignore
                periodBegin: filteredValues.periodBegin,
                //@ts-ignore
                periodEnd: filteredValues.periodEnd,
                //@ts-ignore
                type: filteredValues.thisType,
                ...filteredValues
            },

        }, { skipEmptyString: true, skipNull: true })

        console.log(url)
        router.push(url);
    }

    return (
        <div className="p-1.5 font-semibold text-xs rounded-md bg-[#272b42] w-content flex items-center gap-x-0.5 group">
            <div className=" group-hover:text-gray-200/60">
                {displayKey(pKey, value)}
            </div>
            <div className="hover:cursor-pointer" onClick={onClickDelete}>
                <X className="w-4 h-4" />
            </div>
        </div>
    );
}
export default ExistingFilterBubble;