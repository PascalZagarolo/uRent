'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { inserat } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Banknote, PencilIcon, PlusSquareIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { priceprofile } from '../../../../../../db/schema';


interface EditPriceProfileProps {
    priceprofile : typeof priceprofile.$inferSelect;
}

const EditPriceProfile: React.FC<EditPriceProfileProps> = ({
    priceprofile
}) => {



    const params = useParams();
    const router = useRouter();

    function isNumberKey(evt: any) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }


    const [isLoading, setIsLoading] = useState(false);

    const [currentValue, setCurrentValue] = useState(priceprofile?.price);
    const [currentType, setCurrentType] = useState(priceprofile?.title);
    const [currentKilometer, setCurrentKilometer] = useState(priceprofile?.freeMiles);
    const [currentExtratype, setCurrentExtratype] = useState(priceprofile?.extraCost);
    const [currentInfo, setCurrentInfo] = useState(priceprofile?.description);


    function isValidNumber(input: any) {
        const regex = /^\d+(\.\d{2})?$/;
        return regex.test(input);
    }

    const [correctPrice, setCorrectPrice] = useState(false);
    const [correctKilometer, setCorrectKilometer] = useState(true);

    useEffect(() => {
        isValidNumber(currentValue) ? setCorrectPrice(true) : setCorrectPrice(false);
    }, [currentValue])

    useEffect(() => {
        if(currentExtratype) {
            isValidNumber(currentExtratype) ? setCorrectKilometer(true) : setCorrectKilometer(false);
        } else {
            setCorrectKilometer(true);
        }
    },[currentExtratype])

    const formSchema = z.object({
        price: z.preprocess(
            (args) => (args === '' ? undefined : args),
            z.coerce
                .number({ invalid_type_error: 'Preis muss eine Nummer sein' })
                .positive('Price must be positive')
                .optional()
        ),
    })

    const hasChanged =
        currentValue != priceprofile?.price ||
        currentType != priceprofile?.title ||
        currentKilometer != priceprofile?.freeMiles ||
        currentExtratype != priceprofile?.extraCost ||
        currentInfo != priceprofile?.description;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: Number(priceprofile?.price)
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const values = {
                title: currentType,
                price: currentValue,
                description: currentInfo,
                kilometer: currentKilometer,
                extraCost : currentExtratype
            }
            console.log(values)
            await axios.patch(`/api/priceprofile/${priceprofile.id}/edit`, values)
                .then(() => {
                    router.refresh();
                    setCurrentValue(undefined);
                    form.reset();
                })

            toast.success("Preisprofil bearbeitet")
        } catch {
            toast.error("Fehler beim hinzufügen des Preisprofils")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#191919]">
                    <PencilIcon className="w-4 h-4 dark:text-gray-200 dark:hover:text-gray-" />
                </Button>

            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] dark:border-none">
                <div className=" space-y-4">
                    <h1 className="font-semibold">
                        Preisprofil bearbeiten
                    </h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <div className="w-full  gap-x-4">
                                <h1 className="w-full font-semibold text-sm">
                                    Zeitraum*
                                </h1>


                            </div>
                            <div className="w-full  mt-2">
                                <div className="w-full">
                                    <Input
                                        className="dark:border-none dark:bg-[#141414]"
                                        onChange={(e) => { setCurrentType(e.target.value) }}
                                        value={currentType}
                                        placeholder="z.B pro Stunde, pro Tag, pro Woche.."
                                    />
                                </div>
                                <div className="w-full mt-2">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (

                                            <FormItem >
                                                <FormLabel>
                                                    Preis*
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        value={currentValue}
                                                        name="price"
                                                        className=" dark:bg-[#131313] dark:border-none"
                                                        placeholder="Preis pro Zeitraum.."
                                                        onChange={(e) => {
                                                            let value = e.target.value;
                                                            value = value.replace(/,/g, '.'); // Convert commas to periods
                                                            
                                                           
                                                            field.onChange(value);
                                                            setCurrentValue(value);
                                                        }}

                                                    />
                                                </FormControl>


                                            </FormItem>


                                        )}
                                    />
                                </div>
                                <div className="mt-2">
                                    <Label>
                                        Inkludierte Kilometer
                                    </Label>
                                    <div className="mt-2">
                                        <Input
                                            value={currentKilometer}
                                            className="dark:border-none dark:bg-[#141414]"
                                            placeholder="z.B 100km"
                                            type="text" // Use text type to prevent default browser behavior for number input
                                            onChange={(e) => {
                                                const newValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                setCurrentKilometer(Number(newValue));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-2">
                                                <Label>
                                                    Zusatzpreis Kilometer
                                                </Label>
                                                
                                                    <Input
                                                        type="text"
                                                        
                                                        value={currentExtratype}
                                                        className=" dark:bg-[#131313] dark:border-none mt-2"
                                                        placeholder="Preis pro zusätzlichen Kilometer.., z.B 0.50"
                                                        onChange={(e) => {
                                                            let value = e.target.value;
                                                            value = value.replace(/,/g, '.'); // Convert commas to periods
                                                            
                                                            setCurrentExtratype(value);
                                                        }}

                                                    />
                                </div>
                                <div className="mt-2">
                                    <Label>
                                        Weitere Informationen
                                    </Label>
                                    <div className="mt-2">
                                        <Textarea
                                            className="dark:border-none dark:bg-[#141414]"
                                            onChange={(e) => { setCurrentInfo(e.target.value) }}
                                            value={currentInfo}
                                            placeholder="Erwähne falls nötig noch weitere Informationen zum Preisprofil.."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full ml-auto justify-end flex items-center">
                                <DialogTrigger asChild>
                                    <Button
                                        className="bg-white hover:bg-gray-200 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  mt-2
                             dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                                        type="submit" disabled={isSubmitting ||
                                            Number(currentValue) > 1_000_000 ||
                                            !correctPrice || !correctKilometer || !hasChanged
                                            || !currentType}
                                    >
                                        Änderungen speichern
                                    </Button>
                                </DialogTrigger>


                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditPriceProfile;