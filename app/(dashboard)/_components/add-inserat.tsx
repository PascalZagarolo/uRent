'use client'

import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { userTable } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";


import { RxCardStackPlus } from "react-icons/rx";
import axios from "axios";


import { CopyIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaExchangeAlt } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";

import { z } from "zod";

interface InseratProps {
    currentUser: typeof userTable.$inferSelect;
    isntLoggedIn?: boolean;
    isEvent?: boolean;
}

const Inserat: React.FC<InseratProps> = ({
    currentUser,
    isntLoggedIn,
    isEvent
}) => {
    const router = useRouter();

    const formSchema = z.object({
        title: z.string().min(3, {
            message: "Titel ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const onSubmit = () => {
        try {

            const values = {
                title: currentTitle,
                category: currentCategory,
                userId: currentUser.id
            }

            const res = axios.post("/api/inserat", values).
                then((res) => {
                    toast.success("Anzeige erfolgreich erstellt");
                    router.push(`/inserat/create/${res.data.id}?sectionId=1`);

                })

        } catch {
            toast.error("Fehler beim Erstellen der Anzeige")
        }
    }

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");


    return (
        <div>

            <Dialog >
                {isEvent ? (
                    <DialogTrigger asChild>
                        <div>
                            <button className="px-4 h-10 border border-indigo-500/30 
                            rounded-md text-white bg-indigo-600/20 hover:bg-indigo-600/30 text-sm font-medium transition-colors flex items-center gap-2">
                                <RxCardStackPlus className="h-4 w-4" />
                                Jetzt Vermieten
                            </button>
                        </div>
                    </DialogTrigger>
                ) : (
                    isntLoggedIn ? (
                        <Button 
                            className="flex items-center gap-1.5 px-2.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-gray-200 rounded-md shadow-md transition-colors"
                            onClick={() => { !currentUser && router.push("/login") }}
                        >
                            <RxCardStackPlus  className="w-4 h-4" />
                            <span className="text-sm font-medium hidden xl:block">Inserat erstellen</span>
                        </Button>
                    ) : (
                        isntLoggedIn ? (
                            <Button 
                                className="flex items-center gap-1.5  px-2.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-gray-200 rounded-md shadow-md transition-colors"
                                onClick={() => { !currentUser && router.push("/login") }}
                            >
                                <RxCardStackPlus  className="w-4 h-4" />
                                <span className="text-sm font-medium hidden xl:block">Inserat erstellen</span>
                            </Button>
                        ) : (
                            currentUser.isBusiness ? (
                                <DialogTrigger className="" onClick={() => { !currentUser && router.push("/login") }} asChild>
                                    <Button className="flex gap-2  mt-2 px-2.5 py-0 bg-indigo-600 hover:bg-indigo-700 text-gray-200 items-center flex-row rounded-md shadow-md transition-colors">
                                    <RxCardStackPlus  className="w-4 h-4" />
                                        <span className="text-xs font-medium hidden xl:block">Inserat erstellen</span>
                                    </Button>
                                </DialogTrigger>
                            ) : (
                                <Dialog>
                                    <DialogTrigger>
                                        <div className="flex items-center gap-1.5 px-2.5 py-0 bg-indigo-600 hover:bg-indigo-700 text-gray-200 rounded-md shadow-md cursor-pointer transition-colors">
                                        <RxCardStackPlus  className="w-4 h-4" />
                                            <span className="text-sm font-medium hidden xl:block">Inserat erstellen</span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-[#141721] rounded-md border-none shadow-lg">
                                        <div className="">
                                            <h3 className="text-lg font-semibold flex flex-row items-center">
                                                <FaExchangeAlt className="w-4 h-4 mr-2 text-indigo-400" /> Profil umwandeln?
                                            </h3>
                                            <div className="">
                                                <p className="text-sm text-gray-200/80 mt-2">
                                                    Um Inserate zu schalten, musst du dein Profil in ein Vermieter-Konto umwandeln. <br />
                                                    Dies kannst du unter {`"`} Mein Profil {`"`} völlig kostenlos & schnell machen.
                                                </p>
                                            </div>
                                            <div className="mt-6 flex justify-end gap-2">
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" className="text-gray-300 hover:text-gray-200 hover:bg-[#1a1f2c] transition-colors">
                                                        Abbrechen
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-gray-200 transition-colors" onClick={() => { router.push(`/profile/${currentUser?.id}`) }}>
                                                        Zum Vermieter werden
                                                    </Button>
                                                </DialogTrigger>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )
                        )
                    ))}
                <DialogContent className="dark:bg-[#141721] border-none shadow-lg">
                    <div>
                        <div>
                            <h3 className="font-semibold text-md flex items-center">
                                <PlusIcon className="w-4 h-4 mr-2 text-indigo-400" />Anzeige erstellen
                            </h3>
                            <p className="text-sm text-gray-200/80 mt-1">
                                Die angegebenen Informationen können jederzeit geändert werden.
                            </p>
                        </div>
                        <div>
                            <div className="mt-6">
                                <Label className="font-medium text-sm text-gray-200">
                                    Titel
                                </Label>
                                <div>
                                    <Input
                                        className="w-full mt-1 border-none bg-[#1B1F2C] text-gray-200 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        maxLength={160}
                                        placeholder="z.B. Bmw mieten in München"
                                        onChange={(e) => setCurrentTitle(e.target.value)}
                                    />
                                    <div className="ml-auto flex justify-end mt-1">
                                        <LetterRestriction limit={160} currentLength={currentTitle.length} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Label className="font-medium text-sm text-gray-200">
                                    Fahrzeugkategorie
                                </Label>
                                <Select
                                    onValueChange={(value) => setCurrentCategory(value)}
                                >
                                    <SelectTrigger className="w-full mt-1 border-none bg-[#1B1F2C] text-gray-200 focus:ring-1 focus:ring-indigo-500 transition-colors">
                                        <SelectValue placeholder="Wähle eine Kategorie" />
                                    </SelectTrigger>
                                    <SelectContent className="border-none bg-[#141721] border-indigo-200/20 shadow-lg">
                                        <SelectGroup>
                                            <SelectLabel className="text-indigo-400">Fahrzeugkategorie</SelectLabel>
                                            <SelectItem value="PKW" className="hover:bg-indigo-500/10">PKW</SelectItem>
                                            <SelectItem value="LKW" className="hover:bg-indigo-500/10">LKW</SelectItem>
                                            <SelectItem value="TRAILER" className="hover:bg-indigo-500/10">Anhänger</SelectItem>
                                            <SelectItem value="TRANSPORT" className="hover:bg-indigo-500/10">Transporter</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-6 w-full flex justify-end">
                                <Button 
                                    className="bg-indigo-600 hover:bg-indigo-700 text-gray-200 transition-colors"
                                    onClick={onSubmit}
                                    disabled={!currentCategory || !currentTitle || currentTitle.trim() === ""}
                                >
                                    Anzeige erstellen
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default Inserat;