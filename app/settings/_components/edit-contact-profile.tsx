import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userContactprofiles } from "@/db/schema";
import { PencilIcon, PlusCircleIcon } from "lucide-react";
import { set } from 'date-fns';
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface EditContactProfileProps {
    thisProfile: typeof userContactprofiles.$inferSelect;
    onChangeProfile: (profile: typeof userContactprofiles) => void;
}

const EditContactProfile = ({ thisProfile, onChangeProfile }: EditContactProfileProps) => {

    const [currentTitle, setCurrentTitle] = useState(thisProfile?.title);
    const [currentContact, setCurrentContact] = useState(thisProfile?.content);
    const [isLoading, setIsLoading] = useState(false);

    const onEdit = async () => {
        try {
            setIsLoading(true);
            const values = {
                title: currentTitle,
                content: currentContact
            }
            const res = await axios.patch(`/api/contactProfile/${thisProfile.id}/edit`, values);
            toast.success('Kontaktprofil erfolgreich bearbeitet.');
            console.log(res.data)
            onChangeProfile(res.data);
        } catch(e : any) {
            console.log(e);
            toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-4">
                    <PencilIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-lg font-semibold flex flex-row items-center">
                            <PlusCircleIcon className="w-4 h-4 mr-2" />
                            {thisProfile?.profileType === 'EMAIL' ? 'Email-Adresse hinzufügen' : 'Telefonnummer hinzufügen'}
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
                                    {thisProfile?.profileType === 'EMAIL' ? 'Email-Adresse' : 'Telefonnummer'}
                                </Label>
                                <Input
                                    value={currentContact}
                                    onChange={(e) => setCurrentContact(e.target.value)}
                                    className="w-full bg-[#202020] border-none"
                                    maxLength={50}
                                />
                                <div>
                                    <LetterRestriction limit={50} currentLength={currentContact?.length} />
                                </div>
                            </div>
                            <div className="mt-2 flex justify-end">
                                <DialogTrigger>
                                    <Button className="bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300"
                                        onClick={onEdit}
                                        disabled={
                                        currentTitle === '' || 
                                        currentContact === '' ||
                                        (currentTitle === thisProfile?.title && currentContact === thisProfile?.content)
                                        }>

                                        Änderungen speichern
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

export default EditContactProfile;