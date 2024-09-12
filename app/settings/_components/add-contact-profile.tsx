import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon, PlusSquareIcon } from "lucide-react";
import { useState } from "react";


interface AddContactProfileProps {
    contactType : string;
}

const AddContactProfile = ({ contactType } : AddContactProfileProps) => {

    const [currentTitle, setCurrentTitle] = useState('');
    const [currentContact, setCurrentContact] = useState('');

    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <PlusSquareIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-lg font-semibold flex flex-row items-center">
                            <PlusCircleIcon className="w-4 h-4 mr-2" />  
                            {contactType === 'email' ? 'Email-Adresse hinzufügen' : 'Telefonnummer hinzufügen'}
                        </h3>
                        <p className="text-xs text-gray-200/60">
                            Füge Kontaktprofile hinzu, um schneller Inserate auszufüllen.
                        </p>
                        <div className="flex flex-col justify-center mt-4">
                            <div>
                                <Label className="text-sm font-semibold">
                                    Titel
                                </Label>
                                <Input 
                                className="w-full bg-[#1C1C1C] border-none"                          
                                />
                            </div>
                            <div className="mt-4">
                            <Label className="text-sm font-semibold">
                                    {contactType === 'email' ? 'Email-Adresse' : 'Telefonnummer'}
                                </Label>
                                <Input 
                                className="w-full bg-[#1C1C1C] border-none"                          
                                />
                            </div>
                            <div className="mt-2 flex justify-end">
                                <Button className="bg-indigo-800 text-gray-200">
                                    Hinzufügen
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default AddContactProfile;