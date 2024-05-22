'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, ArrowUp, Hourglass, PencilIcon, PlusSquareIcon, Trash2Icon, X } from "lucide-react";
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
import { AiFillProfile } from "react-icons/ai";
import EditPriceProfile from "./price-profiles/edit-price-profile";
import DeletePriceProfile from "./price-profiles/delete-price-profile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IoIosInformationCircleOutline } from "react-icons/io";



interface PriceProfilesProps {
    thisInserat: typeof inserat.$inferSelect
}

const PriceProfiles: React.FC<PriceProfilesProps> = ({
    thisInserat
}) => {

    const [priceType, setPriceType] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(null);

    const usedList = thisInserat?.priceprofiles?.sort((a, b) => a.position - b.position) || [];
    
    const [renderedInserate, setRenderedInserate] = useState(usedList);

   


    const router = useRouter();

    const onDelete = async () => {
        try {
            setIsLoading(true);
            const values = {
                type: priceType,
                //@ts-ignore
                price: null
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
                type: priceType,
                price: currentValue
            }
            await axios.patch(`/api/inserat/${thisInserat.id}/price-profiles`, values)
                .then(() => {
                    router.refresh();
                })

            toast.success("Preisprofil geändert")
        } catch {
            toast.error("Fehler beim hinzufügen des Preisprofils")
        } finally {
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

    const onUpwards = async (priceprofileId: string, position : number) => {
        try {

            const values = {
                action : "Up",
                position : position,
                priceprofileId : priceprofileId
            }
            await axios.patch(`/api/priceprofile/reorder/${thisInserat?.id}`, values)
                .then(() => {
                    
                    router.refresh();
                    toast.success("Preisprofil verschoben")
                })

        } catch(error : any) {
            console.log(error);
            toast.error("Fehler beim verschieben des Preisprofils")
        }
    }

    const onDownwards = async (priceprofileId : string, position : number) => {
        try {

            const values = {
                action : "Down",
                position : position,
                priceprofileId : priceprofileId
            }

            await axios.patch(`/api/priceprofile/reorder/${thisInserat?.id}`, values)
                .then(() => {
                    router.refresh();
                    
                    toast.success("Preisprofil verschoben")
                })

        } catch(error : any) {
            console.log(error);
            toast.error("Fehler beim verschieben des Preisprofils")
        }
    }

    const { isSubmitting, isValid } = form.formState

    return (
        <div>
            <div className="pb-4">
            {thisInserat?.priceprofiles.length < 6 && (
                <AddPriceProfile thisInserat={thisInserat} />
            )}
            </div>
            <div >
                
                    <div className="text-md font-semibold pb-2 flex items-center">
                       <AiFillProfile className="w-4 h-4 mr-2" />  Meine Preisprofile
                        <Popover>
                            <PopoverTrigger>
                            <IoIosInformationCircleOutline className="w-4 h-4 ml-2" /> 
                            </PopoverTrigger>
                            <PopoverContent className="border-gray-600 dark:bg-[#141414]">
                                <div className="text-xs">
                                Als Vermieter kannst du Preisprofile erstellen, 
                                die klare und übersichtliche Preislisten für verschiedene Zeiträume oder Entfernungen bieten, <br/>
                                 z.B. {`"`}Pro Stunde 49€{`"`}. <br/> <br/>
                                So kannst du deinen Kunden einfach und transparent die besten Optionen für ihre Mietbedürfnisse präsentieren.
                                </div>
                            </PopoverContent>
                        </Popover>

                    </div>
               
                <div className="space-y-2">
                {usedList.map((priceprofile: any, index) => (
                    <div className="dark:bg-[#141414] p-4 rounded-md" key={priceprofile.id}>
                    <div className="flex items-center gap-x-2">
                        <div className="w-1/4">
                            <Button size="sm" variant="ghost" 
                            disabled={index == 0 || isLoading}
                            onClick={() => onUpwards(priceprofile.id, priceprofile.position)}
                            >
                            <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" 
                            
                            disabled={index == thisInserat?.priceprofiles.length - 1 || isLoading}
                            onClick={() => onDownwards(priceprofile.id, priceprofile.position)}
                            >
                            <ArrowDown className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="text-sm font-semibold w-1/4 line-clamp-1 break-all">
                          {priceprofile.title}
                        </div>
                        <div className="text-sm font-medium dark:text-gray-200/60 w-1/12  line-clamp-1 break-all">
                            {(priceprofile.price).toFixed(2)}€ 
                        </div>
                        <div className="text-sm font-medium dark:text-gray-200/60 w-1/12 line-clamp-1 break-all">
                            {priceprofile.freeMiles ? `${priceprofile.freeMiles}Km` : "Keine Kilometerbegrenzung angegeben"}
                        </div>
                        <div className="text-sm font-medium flex justify-end w-3/12 break-all gap-x-2">
                            <EditPriceProfile priceprofile={priceprofile} />
                            <DeletePriceProfile priceprofileId={priceprofile.id} />
                        </div>
                    </div>
                </div>
                ))}
                {usedList.length == 0 && (
                    <div className="text-sm dark:text-gray-200/60">
                        Noch keine Preisprofile erstellt..
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default PriceProfiles;