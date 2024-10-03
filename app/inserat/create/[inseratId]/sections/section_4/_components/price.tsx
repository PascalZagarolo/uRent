'use client'
import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";
import { useUnsavedChanges } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { set } from "date-fns";
import { Banknote, EuroIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SelectPriceCreationProps {
    thisInserat: typeof inserat.$inferSelect;
}

const SelectPriceCreation: React.FC<SelectPriceCreationProps> = ({
    thisInserat
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState<string | number>(Number(thisInserat?.price)?.toFixed(2));
    const [isDailyPrice, setDailyPrice] = useState(thisInserat.dailyPrice || false);

    const { currentChanges, changeCurrent, deleteCurrent } = useUnsavedChanges()

    useEffect(() => {
        const setAmount = async () => {
            if (currentValue) {
                await changeCurrent("price", Number(currentValue)?.toFixed(2));
            } else {
                console.log("delete")
                deleteCurrent("price");
            }
        }
        setAmount();
    }, [currentValue])

    useEffect(() => {
        isValidNumber(currentValue) ? setCorrectPrice(true) : setCorrectPrice(false);
    }, [currentValue])

    const [correctPrice, setCorrectPrice] = useState(false);



    function isValidNumber(input: any) {
        if (input?.startsWith("0")) {
            return false;
        }
        const regex = /^\d+(\.\d{2})?$/;
        return regex.test(input);
    }

    

    useEffect(() => {
        const values = {
            dailyPrice: isDailyPrice
        }
        axios.patch(`/api/inserat/${thisInserat.id}`, values);
    }, [isDailyPrice])

    useEffect(() => {
        if (thisInserat.annual) {
            setDailyPrice(true)
        }
    }, [thisInserat.annual])



    return (
        <div className=" ">

            <Label className="flex justify-start items-center">
                <Banknote className="w-4 h-4" /><p className="ml-2 font-semibold"> Mietpreis *</p>
            </Label>
            <p className="font-medium text-gray-800/50 text-xs dark:text-gray-200/60"> Der Preis wird pro Tag und in Euro angegeben. Weitere Preisangaben kannst du in den Preisprofilen machen.</p>

            <Input
                type="text"
                value={currentValue}
                name="price"
                maxLength={10}
                max={1_000_000}
                className=" dark:bg-[#151515] dark:border-none mt-2"
                placeholder="Mietpreis hinzufügen"
                onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/,/g, '.');

                    setCurrentValue(value);
                }}

            />
            <div className="ml-auto flex justify-end">
                <LetterRestriction limit={10} currentLength={currentValue ? String(currentValue).length : 0} />
            </div>




            <div className="w-full flex items-center">
               

                <div className="ml-auto space-x-2 mt-2">
                    <Label>
                        Preis pro Tag
                    </Label>
                    <Checkbox
                        onCheckedChange={(checked) => { setDailyPrice(!isDailyPrice) }}
                        checked={isDailyPrice}
                        disabled
                    />

                </div>
            </div>


        </div>
    );
}

export default SelectPriceCreation;