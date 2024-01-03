'use client'
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RentPrice = () => {

    const formSchema = z.object({
        price : z.number({
            required_error : "Ein Preis ist erforderlich"
        })
    }) 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            price : 0
        }
    })
    return ( 
        <div className="ml-8 mt-8">
            <Form {...form}>
                <form>
                    <FormField
                        control = {form.control}
                        name = "price"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel className="flex justify-start items-center">
                                    <Banknote/><p className="ml-2 font-semibold"> Mietgebühr </p> 
                                </FormLabel>
                                <p className="font-semibold text-gray-800/50 text-xs"> Alle angaben in EUR </p>
                                <Input 
                                {...field}
                                placeholder="Preis"
                                type="number"
                                className="w-1/2"
                                />
                            </FormItem>
                        )}
                    />
                    <div>
                        <Button className="bg-blue-800 mt-2">
                            Preis festlegen
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
     );
}
 
export default RentPrice;