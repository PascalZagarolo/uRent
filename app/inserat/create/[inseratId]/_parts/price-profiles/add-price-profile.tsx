'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Banknote, PlusSquareIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


interface AddPriceProfileProps {
    thisInserat : typeof inserat.$inferSelect;
}

const AddPriceProfile : React.FC<AddPriceProfileProps> = ({
    thisInserat
}) => {


    const params = useParams();
    const router = useRouter();


    const [isLoading, setIsLoading] = useState(false);

    const [currentValue, setCurrentValue] = useState(null);
    const [currentType, setCurrentType] = useState(null);


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
                type : currentType,
                price : currentValue
            }
            await axios.patch(`/api/inserat/${params.inseratId}/price-profiles`, values)
                .then(() => {
                    router.refresh();
                })

            toast.success("Preisprofil hinzugefügt")
        } catch {
            toast.error("Fehler beim hinzufügen des Preisprofils")
        } finally{
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
                            
                            <div className="w-full flex gap-x-4">
                                <h1 className="w-1/2 font-semibold text-sm">
                                    Zeitraum
                                </h1>

                                <h1 className="w-1/2 font-semibold text-sm">
                                    Preis
                                </h1>
                            </div>
                            <div className="w-full flex items-center space-x-4 mt-2">
                                <div className="w-1/2">
                                    <Select
                                    onValueChange={(value) => {setCurrentType(value)}}
                                    >
                                        <SelectTrigger className="w-full dark:bg-[#131313] dark:border-none"
                                        
                                        >
                                            <SelectValue placeholder="Wähle deinen Zeitraum" />
                                        </SelectTrigger>
                                        <SelectContent className="dark:bg-[#131313] dark:border-none">
                                            <SelectGroup>
                                                <SelectLabel>Zeiträume</SelectLabel>
                                                <SelectItem value="hours"
                                                disabled={thisInserat?.priceHour ? true : false}
                                                >pro Stunde</SelectItem>
                                                <SelectItem value="weekend">Wochende</SelectItem>
                                                <SelectItem value="kilometer">pro Kilometer</SelectItem>
                                                
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-1/2">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (

                                            <FormItem >
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                        name="price"
                                                        className=" dark:bg-[#131313] dark:border-none"
                                                        placeholder="Preis pro Zeitraum.."
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