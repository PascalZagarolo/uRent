import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";


const AddContactProfiles = () => {


    const [isLoading, setIsLoading] = useState(false);

    const [currentContacttype, setCurrentContactType] = useState<string | null>("EMAIL");
    const [currentTitle, setCurrentTitle] = useState<string | null>(null);
    const [currentContent, setCurrentContent] = useState<string | null>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>

                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] rounded-md">
                <div>
                    <div className="text-lg font-semibold">
                        Kontaktprofil hinzufügen
                    </div>
                    <div className="flex flex-col mt-4 space-y-4">
                        <div>
                            <Label className="text-sm font-semibold">
                                Kontaktart
                            </Label>
                            <Select
                                onValueChange={(value) => {
                                    setCurrentContactType(value);
                                }}
                                value={currentContacttype ? String(currentContacttype) : null}
                                disabled={isLoading}
                            >

                                <SelectTrigger className={
                                    cn(`dark:bg-[#151515] dark:border-gray-200 
                                    dark:border-none focus-visible:ring-0 mt-2 rounded-md`)
                                }
                                    disabled={isLoading}>
                                    <SelectValue
                                        placeholder="Wähle die Kategorie aus"
                                    />
                                </SelectTrigger>

                                <SelectContent className={
                                    cn("dark:bg-[#000000] border-white dark:border-none w-full")
                                }>
                                    <SelectItem value="EMAIL">Email-Addresse</SelectItem>
                                    <SelectItem value="TELEPHONE">Telefonnummer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="text-sm font-semibold">
                                Titel
                            </Label>
                            <Input
                            className="dark:bg-[#1C1C1C] border-none"
                                value={currentTitle}
                                onChange={(e) => {
                                    setCurrentTitle(e.target.value);
                                }}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <Label>
                                {currentContacttype === "EMAIL" ? "Email-Addresse" : "Telefonnummer"}
                            </Label>
                            <Input
                            className="dark:bg-[#1C1C1C] border-none"
                                value={currentTitle}
                                onChange={(e) => {
                                    setCurrentTitle(e.target.value);
                                }}
                                placeholder={currentContacttype === "EMAIL" ? "max@mustermann.de" : "+00 000 000 00"}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddContactProfiles;