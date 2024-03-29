'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ContactIcon, Globe2, Home, Locate, MailOpenIcon, Map, MapPin, Navigation, PlugZap, Settings2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";



const AddContactOption = ({
    
}) => {
    const router = useRouter()
    const params = useParams();

    const [emailEnabled, setEmailEnabled] = useState(false);
    const [websiteEnabled, setWebsiteEnabled] = useState(false);
    const [addressEnabled, setAddressEnabled] = useState(false);

    const formSchema = z.object({
        email: emailEnabled ? z.string().email().min(1, {
            message: "Email zu kurz"
        }) : z.string().optional(),
        website: emailEnabled ? z.string().min(1, {
            message: "Email zu kurz"
        }) : z.string().optional(),
        city: z.string().optional(),
        street : z.string().optional(),
        houseNumber : z.string().optional(),
        plz : z.string().optional(),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            website: "",
            city: "",
            street : "",
            houseNumber : "",
            plz : "",
        }
    })

    const onSubmit = (pValues : z.infer<typeof formSchema>) => {

        const address = addressEnabled ?  pValues.street + " " + pValues.houseNumber + ", " + pValues.plz + " " + pValues.city : null;

        

        const values = {
            email : pValues.email,
            website : pValues.website,
            address : address
        }

        console.log(values)

        try {
            axios.patch(`/api/contact/${params.profileId}`, values).then(() => {
                router.refresh()
            })
        } catch {
            toast.error("Fehler beim Speichern")
        }
    }

    const { isValid , isSubmitting } = form.formState;

    return (
        <Dialog>
            <DialogTrigger asChild className="mt-2">

                <Button className="bg-gray-200 w-full dark:bg-[#151515]  dark:hover:bg-[#171717]" variant="ghost">
                    <Settings2 className="mr-2" /> Kontaktmöglichkeiten hinzufügen
                </Button>

            </DialogTrigger>
            <DialogContent className="dark:bg-[#151515] border-none">
                <DialogHeader>
                    <div className="flex">
                        <ContactIcon className="mr-2" /> <p className="text-xl font-semibold"> Kontaktmöglichkeiten verwalten </p>
                    </div>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <div className="flex items-center font-semibold"> <Globe2 className="mr-2" />  Website
                            <Switch className="ml-auto" defaultChecked={websiteEnabled} onCheckedChange={(selectedValue) => {setWebsiteEnabled(selectedValue)}} /> </div>
                        {websiteEnabled && (
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="mt-2 dark:bg-[#0a0a0a] border-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <div className="flex items-center font-semibold mt-4"> <MailOpenIcon className="mr-2" />  Email
                            <Switch className="ml-auto" defaultChecked={emailEnabled} onCheckedChange={(selectedValue) => {setEmailEnabled(selectedValue)}} /> </div>
                        {emailEnabled && (
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="mt-2 dark:bg-[#0a0a0a]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <div className="flex items-center font-semibold mt-4"> <MapPin className="mr-2" />  Addresse
                            <Switch className="ml-auto" defaultChecked={addressEnabled} onCheckedChange={(selectedValue) => {setAddressEnabled(selectedValue)}} /> </div>
                        {addressEnabled && (
                            <div className="mt-4">
                            <div>
                            <p className="flex items-center">
                                <Home className="mr-2 w-4 h-4"/> Stadt
                            </p>
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="mt-2 dark:bg-[#0a0a0a]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className="flex">
                            <div>
                            <p className="flex items-center mt-2">
                                <Map className="mr-2 w-4 h-4"/> Strasse
                            </p>
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="mt-2"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className="ml-auto">
                            <p className="flex items-center mt-2">
                                <Locate className="mr-2 w-4 h-4"/> Hausnr.
                            </p>
                            <FormField
                                control={form.control}
                                name="houseNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="mt-2"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                            </div>
                            <div>
                            <p className="flex items-center">
                                <Navigation className="mr-2 w-4 h-4"/> PLZ
                            </p>
                            <FormField
                                control={form.control}
                                name="plz"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="mt-2"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                        </div>
                        )}
                        <DialogTrigger asChild>
                            <Button className="mt-4 w-full bg-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  
                            dark:bg-[#171717] dark:hover:bg-[#1f1f1f]" 
                            variant="ghost" disabled={!isValid || isSubmitting} type="submit"> Speichern </Button>
                        </DialogTrigger>


                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddContactOption;