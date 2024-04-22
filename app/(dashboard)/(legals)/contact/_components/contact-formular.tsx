'use client'


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { sendSupportConfirm } from "@/lib/mail";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrContact } from "react-icons/gr";


const ContactFormular = () => {

    const [currentName, setCurrentName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentCategory, setcurrentCategory] = useState("");
    const [currentContent, setCurrentContent] = useState("");

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [isLoading , setIsLoading] = useState(false);

    const router = useRouter()

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const values = {
                name: currentName,
                email: currentEmail,
                category: currentCategory,
                content: currentContent
            }

            await sendSupportConfirm(values.email);
            toast.success("Ihre Anfrage wurde erfolgreich versendet.");
            setCurrentContent("");
            setCurrentEmail("");
            setCurrentName("");
            setcurrentCategory("");
            setAcceptedTerms(false);
            
            router.refresh();

        } catch(error : any) {
            console.log("Fehler beim Kontaktformular: ", error);
            toast.error("Fehler beim Absenden des Kontaktformulars")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div>
                <h3 className="font-semibold text-md flex items-center">
                    <GrContact className="w-4 h-4 mr-2" /> Kontaktformular
                </h3>
                <p className="text-xs dark:text-gray-200/70">
                    Falls sie Fragen oder Anregungen haben, können sie uns gerne über das Kontaktformular kontaktieren. <br/>
                    Wir werden uns so schnell wie möglich bei ihnen melden.
                </p>
            </div>
            <div className="mt-2 space-y-2 ">

                <div className="space-y-1 mr-4">
                    <Label>
                        Name*
                    </Label>
                    <Input
                        className="dark:border-none dark:bg-[#141414] w-1/2"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                    />
                </div>

                <div className="w-full flex gap-x-4">
                <div className="space-y-1 w-1/2">
                    <Label>
                        Email*
                    </Label>
                    <Input
                        className="dark:border-none dark:bg-[#141414] w-full"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                    />
                </div>

                <div className="space-y-1 w-1/2">
                    <Label>
                        Anfragetyp *
                    </Label>
                    <Select
                    onValueChange={(value) => setcurrentCategory(value)}
                    value={currentCategory}
                    >
                        <SelectTrigger className="w-full dark:border-none dark:bg-[#141414]">
                            <SelectValue placeholder="Thema" />
                        </SelectTrigger>
                        <SelectContent className="dark:border-none dark:bg-[#141414]">
                            <SelectItem value="beschwerde">Beschwerde</SelectItem>
                            <SelectItem value="datenschutz">Datenschutz</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="schaden">Verlorene Gegenstände oder Schadensmeldungen</SelectItem>
                            <SelectItem value="sonstiges">Sonstiges</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                </div>

                <div className="space-y-1">
                    <Label>
                        Inhalt
                    </Label>
                    <Textarea
                        className="dark:border-none dark:bg-[#141414] w-full h-[240px]"
                        value={currentContent}
                        onChange={(e) => setCurrentContent(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-x-2 mt-2">
                    <Checkbox 
                    
                    onCheckedChange={//@ts-ignore
                        (checked) => setAcceptedTerms(checked)}
                    /> <Label className="text-xs font-medium">
                        Ich habe die <a href="/data-privacy" className="underline font-semibold">Datenschutzbestimmungen</a> gelesen und akzeptiere sie.
                    </Label>
                </div>

                <div className="w-full flex justify-end">
                    <Button className="bg-[#1F2332] hover:text-gray-300 hover:bg-[#1b1f2c] text-gray-200 text-sm"
                    onClick={onSubmit}
                    disabled={
                           !acceptedTerms 
                        || !currentName || currentName.trim() === ""
                        || !currentEmail  || currentEmail.trim() === ""
                        || !currentCategory 
                        || !currentContent || currentContent.trim() === ""
                        || isLoading
                    }
                    >Absenden</Button>
                </div>

            </div>
        </div>
    );
}

export default ContactFormular;