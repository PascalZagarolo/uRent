'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactIcon, Globe2, Home, Locate, LocateFixed, MailCheck, MailOpenIcon, Map, MapPin, Navigation, PlugZap, Settings2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const AddContactOption = () => {

    const [emailEnabled, setEmailEnabled] = useState(false);
    const [websiteEnabled, setWebsiteEnabled] = useState(false);
    const [addressEnabled, setAddressEnabled] = useState(false);

    const formSchema = z.object({
        email: emailEnabled ? z.string().email().min(1, {
            message: "Email zu kurz"
        }) : z.string().optional(),
        website: emailEnabled ? z.string().email().min(1, {
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

    const { isValid , isSubmitting } = form.formState;

    return (
        <Dialog>
            <DialogTrigger asChild className="mt-2">

                <Button className="bg-gray-200 w-full" variant="ghost">
                    <Settings2 className="mr-2" /> Kontaktmöglichkeiten hinzufügen
                </Button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex">
                        <ContactIcon className="mr-2" /> <p className="text-lg font-semibold"> Kontaktmöglichkeiten verwalten </p>
                    </div>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <div className="flex items-center font-semibold"> <Globe2 className="mr-2" />  Website
                            <Switch className="ml-auto" onClick={() => setWebsiteEnabled(!websiteEnabled)} /> </div>
                        {websiteEnabled && (
                            <FormField
                                control={form.control}
                                name="website"
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
                        )}

                        <div className="flex items-center font-semibold mt-4"> <MailOpenIcon className="mr-2" />  Email
                            <Switch className="ml-auto" onClick={() => setEmailEnabled(!emailEnabled)} /> </div>
                        {emailEnabled && (
                            <FormField
                                control={form.control}
                                name="email"
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
                        )}

                        <div className="flex items-center font-semibold mt-4"> <MapPin className="mr-2" />  Addresse
                            <Switch className="ml-auto" onClick={() => setAddressEnabled(!addressEnabled)} /> </div>
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
                                            <Input className="mt-2"
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
                        
                            <Button className="mt-4 w-full" variant="ghost" disabled={!isValid || isSubmitting}> Speichern </Button>
                        


                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddContactOption;