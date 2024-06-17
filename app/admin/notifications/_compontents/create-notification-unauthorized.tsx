'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MdOutlinePublic } from "react-icons/md";

const CreateNotificationUnauthorized = () => {

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentContent, setCurrentContent] = useState("");
    const [currentLink, setCurrentLink] = useState("");
    const [showLoggedInUsers, setShowLoggedInUsers] = useState(false);

    return (
        <div>
            <div>
                <h3 className="font-semibold text-lg flex items-center">
                    <MdOutlinePublic className="w-4 h-4 mr-2" />   Globale Notifikation erstellen (nicht eingeloggt)
                </h3>
                <p className="text-xs text-gray-200/60">
                    Erstelle eine Notifikation für alle Nutzer die nicht eingeloggt sind.
                </p>
            </div>
            <div className="mt-4 w-full gap-x-4 flex items-center">
                <div className="w-1/2 ">
                    <Label>
                        Notifikationstyp
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full dark:border-none mt-2 bg-[#191919] ">
                            <SelectValue placeholder="Wähle dein Notifikationstyp" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#191919] dark:border-none">
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-1/2">
                    <Label>
                        Titel
                    </Label>
                    <Input
                        placeholder="Neuigkeiten zu XY.."
                        className="mt-2 bg-[#191919] dark:border-none"
                    />
                </div>
            </div>

            <div className="mt-4">
                <Label className="font-semibold">
                    Inhalt der Notifikation
                </Label>
                <Textarea 
                className="dark:bg-[#191919] dark:border-none mt-2"
                placeholder="Jetzt neu..."
                />
            </div>
            <div className="mt-4">
                <Label className="font-semibold">
                    Referenzierter Link (optional)
                </Label>
                <Input 
                 className="dark:bg-[#191919] dark:border-none mt-2"
                 placeholder="https://www.urent-rental.de/pricing"
                />
            </div>
            <div className="mt-4 flex items-center gap-x-2">
                <Checkbox
                checked={showLoggedInUsers}
                onCheckedChange={(checked) => {setShowLoggedInUsers(Boolean(checked))}}
                />
                <Label className="hover:underline hover:cursor-pointer" 
                onClick={() => setShowLoggedInUsers(!showLoggedInUsers)}
                >
                    Benachrichtigung auch für eingeloggte Nutzer
                </Label>
            </div>
            <div className="w-full flex justify-end">
                <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300">
                    Benachrichtigung erstellen
                </Button>
            </div>
        </div>
    );
}

export default CreateNotificationUnauthorized;