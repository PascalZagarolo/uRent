import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { set } from "lodash";
import { SettingsIcon, UserCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SettingsSheetProps {
    currentUser: User;
}


const SettingsSheet: React.FC<SettingsSheetProps> = ({
    currentUser
}) => {

    const [currentName, setCurrentName] = useState(currentUser.name);
    const [currentEmail, setCurrentEmail] = useState(currentUser.email);

    const formSchema = z.object({
        name: z.string().min(3, {
            message: "Titel ist zu kurz"
        }),
        email: z.string().email()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    const somethingChanged = currentName !== currentUser.name || currentEmail !== currentUser.email;


    return (
        <Sheet>
            <SheetTrigger className="items-center flex ml-4 2xl:ml-8">
                <SettingsIcon
                    className="text-white h-6 w-6"
                />
            </SheetTrigger>
            <Form {...form}>
                <form>
                    <SheetContent>
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
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className="rounded-none border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] focus:ring-0 focus:border-none "
                                                        defaultValue={currentUser?.name}

                                                        onChange={(e) => { setCurrentName(e.target.value) }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                {currentName}
                                <div>
                                    <p className="text-sm mt-4 mb-2">
                                        E-Mail
                                    </p>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className="rounded-none border border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] focus:ring-0 focus:border-none "
                                                        value={currentUser?.email}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
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
                                    /> <p className="font-semibold ml-4">Darkmode</p>
                                </div>
                            </div>
                        </div>


                        <SheetFooter className="mt-8">
                            <Button className="w-full bg-[#1f2332] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border border-gray-500" disabled={!somethingChanged}>
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