'use client'

import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { inserat } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Banknote, PlusSquareIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { z } from "zod";


interface AddPriceProfileProps {
    thisInserat: typeof inserat.$inferSelect;
}

const AddPriceProfile: React.FC<AddPriceProfileProps> = ({
    thisInserat
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

    const [currentValue, setCurrentValue] = useState(null);
    const [currentType, setCurrentType] = useState(null);
    const [currentKilometer, setCurrentKilometer] = useState(null);
    const [currentExtratype, setCurrentExtratype] = useState(null);
    const [currentInfo, setCurrentInfo] = useState(null);



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
        if (currentExtratype) {
            isValidNumber(currentExtratype) ? setCorrectKilometer(true) : setCorrectKilometer(false);
        } else {
            setCorrectKilometer(true);
        }
    }, [currentExtratype])

    const formSchema = z.object({
        price: z.preprocess(
            (args) => (args === '' ? undefined : args),
            z.coerce
                .number({ invalid_type_error: 'Preis muss eine Nummer sein' })
                .positive('Price must be positive')
                .optional()
        ),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: null
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
                extraCost: currentExtratype
            }
            console.log(values)
            await axios.patch(`/api/inserat/${params.inseratId}/price-profiles`, values)
                .then(() => {
                    router.refresh();
                    setCurrentValue(undefined);
                    setCurrentExtratype(undefined);
                    setCurrentKilometer(undefined);
                    setCurrentInfo(undefined);
                    setCurrentType(undefined);
                    form.reset();
                })

            toast.success("Preisprofil hinzugefügt")
        } catch {
            toast.error("Fehler beim hinzufügen des Preisprofils")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost"
                    className="w-full dark:bg-[#191919] rounded-md p-8 items-center dark:text-gray-200/70 text-sm mt-4 border border-dashed flex">
                    <PlusSquareIcon className="w-4 h-4 mr-2" />  Preisprofil hinzufügen
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] dark:border-none">
                <div className=" space-y-4">
                    <h1 className="font-semibold">
                        Preisprofil hinzufügen
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
                                    <div className="ml-auto flex justify-end">
                                        <LetterRestriction limit={160} currentLength={currentType?.length || 0} />
                                    </div>
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
                                                        maxLength={16}
                                                        onChange={(e) => {
                                                            let value = e.target.value;
                                                            value = value.replace(/,/g, '.'); // Convert commas to periods
                                                            field.onChange(value);
                                                            setCurrentValue(value);
                                                        }}

                                                    />
                                                    
                                                </FormControl>
                                                <div className="ml-auto flex justify-end">
                                                        <LetterRestriction limit={16} currentLength={currentValue?.length || 0} />
                                                    </div>

                                            </FormItem>


                                        )}
                                    />
                                </div>
                                <div className="mt-2">
                                    <Label className="flex items-center">
                                        Freikilometer
                                        <Popover>
                                            <PopoverTrigger>
                                                <IoIosInformationCircleOutline className="w-4 h-4 ml-2" />
                                            </PopoverTrigger>
                                            <PopoverContent side="right" className=" dark:bg-[#141414] border border-gray-200 text-xs">
                                                Falls dein angegebener Mietzeitraum gratis Kilometer beinhaltet, die der Mieter fahren kann,
                                                kannst du diese hier angeben.<br /><br />
                                                Sollte die Kilometergrenze unbegrenzt sein, lasse dieses Feld leer.<br /><br />
                                                Sind keine Kilometer inkludiert, trage eine 0 ein.<br />
                                            </PopoverContent>
                                        </Popover>
                                    </Label>
                                    <div className="mt-2">
                                        <Input
                                            value={currentKilometer}
                                            className="dark:border-none dark:bg-[#141414]"
                                            placeholder="z.B 100km"
                                            type="text" // Use text type to prevent default browser behavior for number input
                                            maxLength={16}
                                            onChange={(e) => {
                                                const newValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                setCurrentKilometer(newValue);
                                            }}
                                        />
                                        <div className="ml-auto flex justify-end">
                                            <LetterRestriction limit={16} currentLength={currentKilometer?.length || 0} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-2">
                                    <Label>
                                        Preis pro zusätzlich gefahrenden Kilometer
                                    </Label>

                                    <Input
                                        type="text"

                                        value={currentExtratype}
                                        className=" dark:bg-[#131313] dark:border-none mt-2"
                                        placeholder="Preis pro zusätzlichen Kilometer.., z.B 0.50"
                                        maxLength={16}
                                        onChange={(e) => {
                                            let value = e.target.value;
                                            value = value.replace(/,/g, '.'); // Convert commas to periods

                                            setCurrentExtratype(value);
                                        }}

                                    />
                                    <div className="ml-auto flex justify-end">
                                        <LetterRestriction limit={16} currentLength={currentExtratype?.length || 0} />
                                    </div>
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
                                            maxLength={500}
                                        />
                                        <div className="ml-auto flex justify-end">
                                        <LetterRestriction limit={500} currentLength={currentInfo?.length || 0} />
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full ml-auto justify-end flex items-center">
                                <DialogTrigger asChild>
                                    <Button
                                        className="bg-white hover:bg-gray-200 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  mt-2
                             dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                                        type="submit" disabled={isSubmitting ||
                                            currentValue > 1_000_000 ||
                                            !correctPrice || !correctKilometer || !currentValue
                                            || !currentType}
                                    >
                                        Profil hinzufügen
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

export default AddPriceProfile;