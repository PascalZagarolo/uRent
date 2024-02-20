'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { set } from "lodash";
import { Settings2Icon, SettingsIcon, UserCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

interface SettingsSheetProps {
    currentUser: User;
}


const SettingsSheet: React.FC<SettingsSheetProps> = ({
    currentUser
}) => {

    const { theme, setTheme } = useTheme()

    function isWhitespace(str: string): boolean {
        return /^\s*$/.test(str);
    }

    const [currentName, setCurrentName] = useState(currentUser.name);
    const [currentEmail, setCurrentEmail] = useState(currentUser.email);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Name ist zu kurz"
        }),
        
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = () => {

        const values = {
            name : currentName,
        }

        try {
            setIsLoading(true);
            axios.patch(`/api/profile/${currentUser.id}`, values)
            toast.success("Änderungen gespeichert");
            setTimeout(() => {
                router.refresh();
            }, 1000)

        } catch {
            toast.error("Fehler beim Speichern");
        } finally {
            setIsLoading(false);
        }
    }

    const somethingChanged = currentName !== currentUser.name || currentEmail !== currentUser.email;


    return (
        <Sheet>
            <SheetTrigger className="hidden lg:flex items-center   " asChild>
            <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] flex justify-start mt-2"
                        
                        >
                            <Settings2Icon className="mr-4" />
                            <p>
                                Einstellungen
                            </p>
                    </Button>
            </SheetTrigger>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <SheetContent className="dark:bg-[#0F0F0F]">
                       
                            <ClipLoader
                            loading={isLoading}
                            />
                       
                        <SheetHeader>
                            <div>
                                <h3 className="flex font-bold text-xl">
                                    <UserCheck className="mr-2" /> Mein Account
                                </h3>
                            </div>
                        </SheetHeader>

                        <div className="mt-16">
                            <p className="font-semibold text-lg "> Mein Profil</p>
                            <div className="mt-4 flex-col">

                                <div>
                                    <p className="text-sm mb-2">
                                        Name
                                    </p>     
                                                
                                           
                                                <Input
                                                        className="rounded-none border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                        focus:ring-0 focus:border-none dark:bg-[#040404] dark:border-none"
                                                        
                                                        onChange={(e) => { setCurrentName(e.target.value) }}
                                                    />
                                                
                                       

                                </div>
                                
                                <div>
                                    <p className="text-sm mt-4 mb-2">
                                        E-Mail
                                    </p>
                                    
                                                    <Input
                                                        className="rounded-none border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                        focus:ring-0 focus:border-none dark:bg-[#040404] dark:border-none"
                                                        value={currentUser?.email}
                                                    />
                                                

                                    <p>
                                        <span className="text-xs text-gray-400 hover:underline hover:cursor-pointer">Ich möchte meine E-Mail ändern</span>
                                    </p>
                                </div>
                            </div>


                            <div className="mt-8">
                                <p className="font-semibold text-lg "> Privatsphäre Einstellungen </p>
                                <div className="mt-4">
                                    <div className="flex">
                                        <Switch
                                            className=""
                                        /> <p className="font-semibold ml-4">E-Mail teilen</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="mt-8">
                            <p className="font-semibold text-lg "> Ansicht </p>
                            <div className="mt-4">
                                <div className="flex">
                                    <Switch
                                        className=""
                                        defaultChecked={false}
                                        checked={theme === "dark" ? true : false}
                                        onCheckedChange={(checked) => { checked ? setTheme("dark") : setTheme("light")}}
                                    /> <p className="font-semibold ml-4">Darkmode</p>
                                    
                                </div>
                            </div>
                        </div>


                        <SheetFooter className="mt-8">
                            <Button className="w-full bg-[#1f2332] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border
                             border-gray-500 dark:bg-[#040404] dark:border-none dark:text-gray-100 dark:hover:bg-[#181818]"
                             disabled={!somethingChanged || isWhitespace(currentName)}
                             onClick={onSubmit}
                             >
                                Änderungen speichern
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </form>
            </Form>
        </Sheet>
    );
}

export default SettingsSheet;