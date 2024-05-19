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
import { AiFillProfile } from "react-icons/ai";
import EditPriceProfile from "./price-profiles/edit-price-profile";
import DeletePriceProfile from "./price-profiles/delete-price-profile";


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

    const { isSubmitting, isValid } = form.formState

    return (
        <div>
            <div className="pb-4">
            {thisInserat?.priceprofiles.length < 6 && (
                <AddPriceProfile thisInserat={thisInserat} />
            )}
            </div>
            <div >
                {thisInserat?.priceprofiles.length > 0 &&(
                    <div className="text-md font-semibold pb-2 flex items-center">
                       <AiFillProfile className="w-4 h-4 mr-2" />  Meine Preisprofile
                    </div>
                )}
                <div className="space-y-2">
                {thisInserat?.priceprofiles.map((priceprofile: any) => (
                    <div className="dark:bg-[#141414] p-4 rounded-md " key={priceprofile.id}>
                        <div className="flex items-center gap-x-2">
                            <div className="text-sm font-semibold w-1/4 line-clamp-1 break-all">
                                {priceprofile.title}
                            </div>
                            <div className="text-sm font-medium dark:text-gray-200/60 w-1/4 line-clamp-1 break-all">
                                {(priceprofile.price).toFixed(2)}€
                            </div>
                            <div className="text-sm font-medium dark:text-gray-200/60 w-1/4 line-clamp-1 break-all">
                                {priceprofile?.freeMiles ? `${priceprofile?.freeMiles}Km` : "Keine Kilometerbegrenzung angegeben"}
                            </div>
                            <div className="text-sm font-medium flex justify-end w-1/4  break-all gap-x-2">
                                <EditPriceProfile priceprofile={priceprofile} />
                                <DeletePriceProfile priceprofileId={priceprofile.id} />
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default PriceProfiles;