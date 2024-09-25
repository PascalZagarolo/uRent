import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { PlusCircleIcon, PlusSquareIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


interface AddContactProfileProps {
    contactType: string;
    onAddContact: (addedContact) => void;
}

const AddContactProfile = ({ contactType, onAddContact }: AddContactProfileProps) => {

    const [currentTitle, setCurrentTitle] = useState('');
    const [currentContact, setCurrentContact] = useState('');

    const onPost = async () => {
        try {
            if (currentTitle === '' || currentContact === '' || contactType === '') {
                return toast.error('Bitte fülle alle Felder aus.');
            }

            const values = {
                profileType: contactType,
                title: currentTitle,
                content: currentContact
            }

            const res = await axios.post("/api/contactProfile", values);
            toast.success('Kontaktprofil erfolgreich hinzugefügt.');
            setCurrentTitle('');
            setCurrentContact('');
            onAddContact(res.data);


        } catch (e: any) {
            console.log(e);
            toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="hover:cursor-pointer">
                    <PlusSquareIcon className="w-4 h-4" />
                </div>
            </DialogTrigger>
            <DialogContent className="border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-lg font-semibold flex flex-row items-center">
                            <PlusCircleIcon className="w-4 h-4 mr-2" />
                            {contactType === 'EMAIL' ? 'Email-Adresse hinzufügen' : 'Telefonnummer hinzufügen'}
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
                                    value={currentTitle}
                                    onChange={(e) => setCurrentTitle(e.target.value)}
                                    className="w-full bg-[#202020] border-none"
                                    maxLength={50}
                                />
                                <div>
                                    <LetterRestriction limit={50} currentLength={currentTitle.length} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <Label className="text-sm font-semibold">
                                    {contactType === 'EMAIL' ? 'Email-Adresse' : 'Telefonnummer'}
                                </Label>
                                <Input
                                    value={currentContact}
                                    onChange={(e) => setCurrentContact(e.target.value)}
                                    className="w-full bg-[#202020] border-none"
                                    maxLength={50}
                                />
                                <div>
                                    <LetterRestriction limit={50} currentLength={currentContact.length} />
                                </div>
                            </div>
                            <div className="mt-2 flex justify-end">
                                <DialogTrigger>
                                    <Button className="bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300"
                                        onClick={onPost}
                                        disabled={currentTitle === '' || currentContact === ''}>

                                        Hinzufügen
                                    </Button>
                                </DialogTrigger>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddContactProfile;