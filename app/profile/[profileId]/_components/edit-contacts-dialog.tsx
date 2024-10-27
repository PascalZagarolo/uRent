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
                <Button className="text-sm hover:underline flex sm:justify-end justify-center ml-auto bg-indigo-800 hover:bg-indigo-900" variant="ghost" size="sm">
                    <Share2Icon className="w-4 h-4 mr-2" />  Kontaktinformationen verwalten
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] dark:text-gray-200 text-gray-700 dark:border-none">
                <div>
                    <h1 className="flex items-center font-semibold">
                        <Contact2Icon className="w-4 h-4 mr-2" /> Kontakte verwalten
                    </h1>
                    <p className="text-xs dark:text-gray-200/70">
                        Verwalte deine Kontaktdaten. Angegebene Kontaktdaten werden öffentlich auf deinem
                        Profil sowie neben deinen Inseraten angezeigt.
                    </p>
                    <div className="w-full space-y-4 ">

                        <div className="w-full mt-4">
                            <Label className="font-semibold flex items-center">
                                <GlobeIcon className="w-4 h-4 mr-2" /> Website
                            </Label>
                            <Input
                                className="dark:bg-[#1C1C1C] border-none"
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
                            <Label className="font-semibold flex items-center">
                                <MailIcon className="w-4 h-4 mr-2" /> Email
                            </Label>
                            <Input
                                className="dark:bg-[#1C1C1C] border-none"
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
                            <Label className="font-semibold flex items-center">
                                <TfiMobile className="w-4 h-4 mr-2" /> Telefonnummer
                            </Label>
                            <Input
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                className="dark:bg-[#1C1C1C] border-none"
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
                            <Label className="font-semibold flex items-center">
                                <FaFax className="w-4 h-4 mr-2" /> Fax
                            </Label>
                            <Input
                                className="dark:bg-[#1C1C1C] border-none"
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
                                <Button className="w-full dark:bg-[#1C1C1C]" variant="ghost" size="sm" onClick={onSave} disabled={isLoading}>
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