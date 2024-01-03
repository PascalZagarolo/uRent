'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import axios from "axios";
import { set } from "date-fns";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface RentPriceProps {
    inserat: Inserat;
}

const RentPrice: React.FC<RentPriceProps> = ({
    inserat
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        price: z.preprocess(
            (args) => (args === '' ? undefined : args),
            z.coerce
              .number({ invalid_type_error: 'Price must be a number' })
              .positive('Price must be positive')
              .optional()
          ),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: inserat.price || 0
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}`, values);
            toast.success("Preis erfolgreich gespeichert");
        } catch {
            toast.error("Fehler beim Speichern des Preises");
        } finally {
            setIsLoading(false);
        }
    }

    const { isSubmitting , isValid } = form.formState

    return (
        <div className="ml-8 mt-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormLabel className="flex justify-start items-center">
                                    <Banknote /><p className="ml-2 font-semibold"> Mietgebühr </p>
                                </FormLabel>
                                <p className="font-semibold text-gray-800/50 text-xs"> Alle angaben in EUR </p>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    name="price"
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div>
                        <Button className="bg-blue-800 mt-2" type="submit" disabled={!isValid || isSubmitting}>
                            Preis festlegen
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default RentPrice;