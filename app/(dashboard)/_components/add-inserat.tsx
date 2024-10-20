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

import axios from "axios";


import { CopyIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaExchangeAlt } from "react-icons/fa";
import { MdAddToPhotos, MdChangeCircle } from "react-icons/md";

import { z } from "zod";

interface InseratProps {
    currentUser: typeof userTable.$inferSelect;
    isntLoggedIn?: boolean
}

const Inserat: React.FC<InseratProps> = ({
    currentUser,
    isntLoggedIn
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
                {isntLoggedIn ? (
                    <Button className="mt-2 bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300" variant="ghost" size="sm"
                        onClick={() => { !currentUser && router.push("/login") }}
                    >
                        <CopyIcon className="w-4 h-4 xl:mr-2" />  <span className="hidden 3xl:block">Inserat erstellen</span>
                    </Button>
                ) : (
                    currentUser.isBusiness ? (
                        <DialogTrigger className="" onClick={() => { !currentUser && router.push("/login") }} asChild>

                            <Button className="mt-2 bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300" variant="ghost" size="sm">
                                <CopyIcon className="w-4 h-4 3xl:mr-2" /> <span className="hidden 3xl:block"> Inserat erstellen </span>
                            </Button>


                        </DialogTrigger>
                    ) : (
                        <Dialog>
                            <DialogTrigger>
                                <div className="bg-[#12141f] ml-4  mt-2 flex justify-center text-gray-300 p-2 rounded-md text-sm items-center 
                font-semibold  dark:bg-[#161723] w-full hover:cursor-pointer" >
                                    <PlusIcon className="w-4 h-4 3xl:mr-2 flex justify-center" /> <p className="hidden 2xl:flex mr-1 text-sm">Inserat erstellen</p>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="bg-[#191919] rounded-md border-none">
                                <div className="">
                                    <h3 className="text-lg font-semibold flex flex-row items-center">
                                       <FaExchangeAlt  className="w-4 h-4 mr-2" /> Profil umwandeln?
                                    </h3>
                                    <div className="">
                                        <p className="text-xs text-gray-200/80">
                                            Um Inserate zu schalten, musst du dein Profil in ein Vermieter-Konto umwandeln. <br/>
                                            Dies kannst du unter {`"`} Mein Profil {`"`} völlig kostenlos & schnell machen.
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <DialogTrigger asChild>
                                            <Button className="bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300">
                                                Zum Vermieter werden
                                            </Button>
                                        </DialogTrigger>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="border-none">
                                                Abbrechen
                                            </Button>
                                        </DialogTrigger>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )
                )}
                <DialogContent className="dark:bg-[#0F0F0F] dark:border-none">
                    <div>
                        <div>
                            <h3 className="font-semibold text-md flex items-center">
                                <MdAddToPhotos className="w-4 h-4 mr-2" />Anzeige erstellen
                            </h3>
                            <p className="text-xs dark:text-gray-200/60">
                                Die angegebenen Informationen können jederzeit geändert werden.
                            </p>
                        </div>
                        <div>
                            <div className="mt-8">
                                <Label className="font-medium text-sm">
                                    Titel
                                </Label>
                                <div>
                                    <Input
                                        className="w-full dark:border-none dark:bg-[#191919] dark:text-gray-200/80"
                                        maxLength={160}
                                        onChange={(e) => setCurrentTitle(e.target.value)}
                                    />
                                    <div className="ml-auto flex justify-end">
                                        <LetterRestriction limit={160} currentLength={currentTitle.length} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Label>
                                    Fahrzeugkategorie
                                </Label>
                                <Select
                                    onValueChange={(value) => setCurrentCategory(value)}
                                >
                                    <SelectTrigger className="dark:border-none dark:bg-[#191919] w-full">
                                        <SelectValue placeholder="Wähle eine Kategorie" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#191919] dark:border-none">
                                        <SelectGroup>
                                            <SelectLabel>Fahrzeugkategorie</SelectLabel>
                                            <SelectItem value="PKW">PKW</SelectItem>
                                            <SelectItem value="LKW">LKW</SelectItem>
                                            <SelectItem value="TRAILER">Anhänger</SelectItem>
                                            <SelectItem value="TRANSPORT">Transporter</SelectItem>

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-4 w-full flex justify-end">
                                <Button className="bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300"
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