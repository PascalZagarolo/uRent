'use client'

import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { business } from "@/db/schema";
import axios from "axios";
import { Contact2Icon, GlobeIcon, MailIcon, Pencil, Share2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFax } from "react-icons/fa6";
import { TfiMobile } from "react-icons/tfi";


interface EditContactsDialogProps {
    thisBusiness: typeof business.$inferSelect;
}

const EditContactsDialog: React.FC<EditContactsDialogProps> = ({
    thisBusiness
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentWebsite, setCurrentWebsite] = useState(thisBusiness.website ? thisBusiness.website : "");
    const [currentEmail, setCurrentEmail] = useState(thisBusiness.email ? thisBusiness.email : "");
    const [currentNumber, setCurrentNumber] = useState(thisBusiness.telephone_number ? thisBusiness.telephone_number : "");
    const [currentFax, setCurrentFax] = useState(thisBusiness.fax ? thisBusiness.fax : "");

    const router = useRouter();

    const onSave = async () => {
        try {
            setIsLoading(true);
            const values = {
                email: currentEmail?.trim(),
                website: currentWebsite?.trim(),
                telephone_number: currentNumber?.trim(),
                fax: currentFax?.trim()
            }

            await axios.patch(`/api/business/${thisBusiness.id}`, values)
                .then((res) => {
                    toast.success("Kontaktdaten gespeichert");
                    router.refresh();
                })

        } catch(e) {
            console.log(e);
            toast.error("Fehler beim Speichern der Kontaktdaten")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-sm bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white 
                    transition-all duration-300 hover:shadow-indigo-900/20" variant="ghost" size="sm">
                    <Share2Icon className="w-4 h-4 mr-2" />  Kontaktinformationen verwalten
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#1a1a25] dark:border-indigo-900/30">
                <div>
                    <h1 className="flex items-center font-semibold text-gray-200">
                        <Contact2Icon className="w-4 h-4 mr-2 text-indigo-400" /> Kontakte verwalten
                    </h1>
                    <p className="text-xs text-gray-200/60 mt-1">
                        Verwalte deine Kontaktdaten. Angegebene Kontaktdaten werden öffentlich auf deinem
                        Profil sowie neben deinen Inseraten angezeigt.
                    </p>
                    <div className="w-full space-y-4 mt-4">

                        <div className="w-full">
                            <Label className="font-semibold flex items-center text-gray-200">
                                <GlobeIcon className="w-4 h-4 mr-2 text-indigo-400" /> Website
                            </Label>
                            <Input
                                className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40"
                                onChange={(e) => setCurrentWebsite(e.target.value)}
                                value={currentWebsite}
                                placeholder="www.urent-rental.de"
                                maxLength={100}
                            />
                            <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={100} currentLength={currentWebsite?.length} />
                            </div>
                        </div>

                        <div className="w-full">
                            <Label className="font-semibold flex items-center text-gray-200">
                                <MailIcon className="w-4 h-4 mr-2 text-indigo-400" /> Email
                            </Label>
                            <Input
                                className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40"
                                onChange={(e) => setCurrentEmail(e.target.value)}
                                value={currentEmail}
                                placeholder="test@urent-rental.de"
                                maxLength={60}
                            />
                            <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={60} currentLength={currentEmail?.length} />
                            </div>
                        </div>

                        <div className="w-full">
                            <Label className="font-semibold flex items-center text-gray-200">
                                <TfiMobile className="w-4 h-4 mr-2 text-indigo-400" /> Telefonnummer
                            </Label>
                            <Input
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40"
                                value={currentNumber}
                                onChange={(e) => setCurrentNumber(e.target.value)}
                                placeholder="+49 123456789"
                                maxLength={20}
                            />
                            <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={20} currentLength={currentNumber?.length} />
                            </div>
                        </div>

                        <div className="w-full">
                            <Label className="font-semibold flex items-center text-gray-200">
                                <FaFax className="w-4 h-4 mr-2 text-indigo-400" /> Fax
                            </Label>
                            <Input
                                className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40"
                                onChange={(e) => setCurrentFax(e.target.value)}
                                value={currentFax}
                                placeholder="040-999 8888"
                                maxLength={20}
                            />
                            <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={20} currentLength={currentFax?.length} />
                            </div>
                        </div>
                        <div>
                            <DialogTrigger asChild>
                                <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white 
                                    transition-all duration-300 hover:shadow-indigo-900/20" 
                                    size="sm" 
                                    onClick={onSave} 
                                    disabled={isLoading}
                                >
                                    Speichern
                                </Button>
                            </DialogTrigger>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditContactsDialog;