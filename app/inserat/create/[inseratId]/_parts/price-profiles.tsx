'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Hourglass, PencilIcon, PlusSquareIcon, Trash2Icon, X } from "lucide-react";
import AddPriceProfile from "./price-profiles/add-price-profile";
import { inserat } from "@/db/schema";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Ri24HoursFill } from "react-icons/ri";


interface PriceProfilesProps {
    thisInserat: typeof inserat.$inferSelect
}

const PriceProfiles: React.FC<PriceProfilesProps> = ({
    thisInserat
}) => {

    const [priceType, setPriceType] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(null);

    


    const router = useRouter();

    const onDelete = async () => {
        try {
            setIsLoading(true);
            const values = {
                type : priceType,
                //@ts-ignore
                price : null
            }
            console.log(values)
            await axios.patch(`/api/inserat/${thisInserat.id}/price-profiles`, values)
                .then(() => {
                    router.refresh();
                })
                
        } catch {
            toast.error("Fehler beim löschen des Preisprofils")
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const values = {
                type : priceType,
                price : currentValue
            }
            await axios.patch(`/api/inserat/${thisInserat.id}/price-profiles`, values)
                .then(() => {
                    router.refresh();
                })

            toast.success("Preisprofil geändert")
        } catch {
            toast.error("Fehler beim hinzufügen des Preisprofils")
        } finally{
            setIsLoading(false);
        }
    }

    const formSchema = z.object({
        price: z.preprocess(
            (args) => (args === '' ? undefined : args),
            z.coerce
                .number({ invalid_type_error: 'Preis muss eine Nummer sein' })
                .positive('Price must be positive')
                .optional()
        ),
    })

    useEffect(() => {
        if (priceType === "hours") {
            setCurrentValue(thisInserat.priceHour);
        } else if (priceType === "weekend") {
            setCurrentValue(thisInserat.priceWeekend);
            
        }

        router.refresh()
    }, [priceType])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 2000
        }
    })

    const { isSubmitting, isValid } = form.formState

    return (
        <div>
            <div className="flex justify-evenly items-center">
                <Separator
                    className="sm:w-1/3 hidden sm:block h-[0.5px] dark:bg-gray-100/20"
                />
                <h1 className="flex justify-center text-lg font-semibold">
                    Weitere Preisprofile
                </h1>
                <Separator
                    className="sm:w-1/3 hidden sm:block h-[0.5px] dark:bg-gray-100/20"
                />
            </div>
            <div className="sm:flex sm:flex-row mt-4 sm:gap-x-4 sm:space-y-0 space-y-4">
            <Dialog>
                <AlertDialog>

            {thisInserat.priceHour && (
                <div className="sm:w-1/2 w-full dark:bg-[#191919] rounded-md p-2">
                <div className="p-2">
                    <div className=" text-sm font-semibold w-full flex items-center">
                    <Ri24HoursFill className="w-4 h-4 mr-2" /> <div className="mr-1 font-medium">Stundenpreis</div> 
                    {(Number(thisInserat.priceHour)).toFixed(2)} €
                        <div className="flex ml-auto">
                        <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" onClick={() => {setPriceType("hours")}}>
                                <PencilIcon className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                            <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" onClick={() => {setPriceType("hours")}}>
                                <Trash2Icon className="w-4 h-4" />
                            </Button>
                            </AlertDialogTrigger>
                        </div>
                    </div>
                </div>
            </div>
            )}

{thisInserat.priceWeekend && (
                <div className="sm:w-1/2 w-full dark:bg-[#191919] rounded-md p-2">
                <div className="p-2">
                    <div className=" text-sm font-semibold w-full flex items-center">
                    <Hourglass className="w-4 h-4 mr-2" /> <div className="mr-1 font-medium">Wochenendpreis</div> 
                    {(Number(thisInserat.priceWeekend)).toFixed(2)} €
                        <div className="flex ml-auto">
                        <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" onClick={() => {setPriceType("weekend")}}>
                                <PencilIcon className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                            <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" onClick={() => {setPriceType("weekend")}}>
                                <Trash2Icon className="w-4 h-4" />
                            </Button>
                            </AlertDialogTrigger>
                        </div>
                    </div>
                </div>
            </div>
            )}

                <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                    <div className="">
                        <h1 className="font-semibold flex items-center">
                       <X className="w-4 h-4 mr-2 text-rose-600"/> Preisprofil löschen?
                        </h1>
                        <p className="flex dark:text-gray-200/70 text-xs">
                            Möchtest du das Preisprofil wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                        </p>
                        <div className="mt-2 w-full ml-auto flex justify-end">
                            <AlertDialogCancel className="dark:border-none">
                                Abbrechen
                            </AlertDialogCancel>
                            <AlertDialogAction className="dark:bg-[#131313] dark:text-gray-200 hover:bg-[#181818]" onClick={onDelete}>
                                Löschen
                            </AlertDialogAction>
                        </div>
                    </div>
                </AlertDialogContent>

                <DialogContent className="dark:bg-[#191919] dark:border-none">
                    <div className="w-full">
                        <h1 className="font-semibold">
                            Preis bearbeiten
                        </h1>
                        <div>
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            
                            <div className="w-full flex gap-x-4 mt-4">
                                <h1 className="w-1/2 font-semibold text-sm">
                                    Neuer Preis
                                </h1>

                                
                            </div>
                            <div className="w-full flex items-center space-x-4 mt-2">
                                
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (

                                            <FormItem >
                                                <FormControl>
                                                    <Input
                                                    defaultValue={currentValue}
                                                        type="text"
                                                        
                                                        name="price"
                                                        className=" dark:bg-[#131313] dark:border-none"
                                                        placeholder="Neuer Preis"
                                                        onBlur={(e) => {
                                                            const rawValue = e.currentTarget.value;


                                                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                            cleanedValue = rawValue.replace(/,/g, '.');

                                                            let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                            if (isNaN(Number(formattedValue))) {
                                                                formattedValue = null;
                                                            }

                                                            if (Number(formattedValue) >= 1_000_000) {
                                                                formattedValue = "999999";
                                                            }
                                                            e.currentTarget.value = formattedValue;

                                                            setCurrentValue(Number(formattedValue));

                                                            field.onChange(formattedValue);
                                                        }}

                                                    />
                                                </FormControl>


                                            </FormItem>


                                        )}
                                    />
                                </div>
                            </div>
                            <div className="w-full ml-auto justify-end flex items-center">
                                <DialogTrigger asChild>
                                <Button
                                    className="bg-white hover:bg-gray-200 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  mt-2
                             dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                                    type="submit" disabled={!isValid || isSubmitting || currentValue > 1_000_000
                                    || !priceType}
                                >
                                    Profil hinzufügen
                                </Button>
                                </DialogTrigger>


                            </div>
                        </form>
                    </Form>
                        </div>
                    </div>
                </DialogContent>
                </AlertDialog>
            </Dialog>
                
            </div>
            {(!thisInserat.priceWeekend || !thisInserat.priceWeekend) && (
                <div>
                <AddPriceProfile
                    thisInserat={thisInserat}
                />
            </div>
            )}
        </div>
    );
}

export default PriceProfiles;