'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ContactIcon, Globe2, Home, Locate, MailIcon, MailOpenIcon, Map, MapPin, MapPinIcon, Navigation, PlugZap, Settings2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { contactOptions } from '../../../../db/schema';
import LetterRestriction from "@/components/letter-restriction";


interface AddContactOptionProps {
    thisContactOptions: typeof contactOptions.$inferSelect;
}

const AddContactOption = ({
    //@ts-ignore
    thisContactOptions
}) => {
    const router = useRouter()
    const params = useParams();

    const [currentWebsite, setCurrentWebsite] = useState(thisContactOptions?.websiteAddress ? thisContactOptions?.websiteAddress : "");
    const [currentEmail, setCurrentEmail] = useState(thisContactOptions?.emailAddress ? thisContactOptions?.emailAddress : "");
    const [currentStreet, setCurrentStreet] = useState(thisContactOptions?.userAddress?.street ? thisContactOptions?.userAddress?.street : "");
    const [currentHouseNumber, setCurrentHouseNumber] = useState(thisContactOptions?.userAddress?.houseNumber ? thisContactOptions?.userAddress?.houseNumber : "");
    const [currentPlz, setCurrentPlz] = useState(thisContactOptions?.userAddress?.postalCode ? thisContactOptions?.userAddress?.postalCode : "");
    const [currentCity, setCurrentCity] = useState(thisContactOptions?.userAddress?.city ? thisContactOptions?.userAddress?.city : "");


    const formSchema = z.object({
        email: z.string().optional(),
        website: z.string().optional(),
        city: z.string().optional(),
        street: z.string().optional(),
        houseNumber: z.string().optional(),
        plz: z.string().optional(),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            website: "",
            city: "",
            street: "",
            houseNumber: "",
            plz: "",
        }
    })

    const onSubmit = () => {
        try {

            const values = {
                email: currentEmail,
                website: currentWebsite,
                city: currentCity,
                street: currentStreet,
                houseNumber: currentHouseNumber,
                postalCode: currentPlz,

            }

            axios.patch(`/api/contact/${params.profileId}`, values).then(() => {
                router.refresh()
            })
        } catch(e : any) {
            console.log(e);
            toast.error("Fehler beim Speichern")
        }
    }

    const onDelete = () => {
        try {
            axios.delete(`/api/contact/${params.profileId}`).then((res) => {
                router.refresh();
            })
        } catch {
            console.log("Fehler beim Löschen")
        }
    }

    const { isValid, isSubmitting } = form.formState;

    return (
        <Dialog>
            <DialogTrigger asChild className="mt-2">

                <Button className="w-full bg-indigo-800 hover:bg-indigo-900" variant="ghost">
                    <Settings2 className="mr-2 w-4 h-4" /> Kontaktmöglichkeiten hinzufügen
                </Button>

            </DialogTrigger>
            <DialogContent className="dark:bg-[#151515] border-none">

                <div className="flex">
                    <p className="text-lg font-semibold"> Kontaktmöglichkeiten verwalten </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <div className="flex items-center font-semibold"> <Globe2 className="mr-2 w-4 h-4" />
                            <div>
                                Website
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="mt-2 dark:bg-[#0a0a0a] border-none"
                                            onChange={(e) => setCurrentWebsite(e.target.value)}
                                            value={currentWebsite}
                                            maxLength={100}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <div className="ml-auto flex justify-end">
                                        <LetterRestriction limit={100} currentLength={currentWebsite?.length ? currentWebsite?.length : 0} />
                                    </div>
                                </FormItem>
                            )}
                        />


                        <div className="flex items-center font-semibold mt-4"> <MailIcon className="mr-2 w-4 h-4" />  Email
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="mt-2 dark:border-none dark:bg-[#0a0a0a]"
                                            onChange={(e) => setCurrentEmail(e.target.value)}
                                            value={currentEmail}
                                            maxLength={40}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <div className="ml-auto flex justify-end">
                                        <LetterRestriction limit={40} currentLength={currentEmail?.length ? currentEmail?.length : 0} />
                                    </div>
                                </FormItem>
                            )}
                        />


                        <div className="flex items-center font-semibold mt-4"> <MapPinIcon className="w-4 h-4 mr-2" />   Addresse
                        </div>

                        <div className="mt-4">
                            <div>
                                <p className="flex items-center">
                                     Stadt
                                </p>
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="mt-2 dark:border-none dark:bg-[#0a0a0a]"
                                                    onChange={(e) => setCurrentCity(e.target.value)}
                                                    value={currentCity}
                                                    maxLength={100}
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
                                         Strasse
                                    </p>
                                    <FormField
                                        control={form.control}
                                        name="street"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input className="mt-2 dark:border-none dark:bg-[#0a0a0a]"
                                                        onChange={(e) => setCurrentStreet(e.target.value)}
                                                        value={currentStreet}
                                                        maxLength={100}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="ml-auto">
                                    <p className="flex items-center mt-2">
                                        Hausnummer
                                    </p>
                                    <FormField
                                        control={form.control}
                                        name="houseNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input className="mt-2 dark:border-none dark:bg-[#0a0a0a]"
                                                        onChange={(e) => setCurrentHouseNumber(e.target.value)}
                                                        value={currentHouseNumber}
                                                        maxLength={10}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="flex items-center">
                                     PLZ
                                </p>
                                <FormField
                                    control={form.control}
                                    name="plz"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="mt-2 dark:border-none dark:bg-[#0a0a0a]"
                                                    onChange={(e) => setCurrentPlz(e.target.value)}
                                                    value={currentPlz}
                                                    maxLength={5}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogTrigger asChild>
                            <Button className="mt-4 w-full bg-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  
                            dark:bg-[#171717] dark:hover:bg-[#1f1f1f]"
                                variant="ghost" type="submit"> Speichern </Button>
                        </DialogTrigger>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}

export default AddContactOption;