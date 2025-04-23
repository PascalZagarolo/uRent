import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";

import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineReportProblem } from "react-icons/md";

interface ReportUserProps {
    onClose : () => void;
}


const ReportUser = ({ onClose } : ReportUserProps) => {

    const [reportCause, setReportCause] = useState<string>(null);
    const [moreContent, setMoreContent] = useState<string>("");
    const [open, setIsOpen] = useState(false);

    const userId = useParams().profileId;

    const onReport = async () => {
        try {
            const values = {
                reportType: reportCause,
                content: moreContent,
                reportedUser : userId
            }

            await axios.post(`/api/report/${userId}/user`, values)
                .then(() => {
                    setMoreContent("");
                    setReportCause(null);
                    toast.success("Vielen Dank für deine Meldung.")
                })
        } catch {
            toast.error("Fehler beim melden des Nutzers.")
        }

    }


    const renderCause = (title, description, value) => {
        return (
            <div>
                <div className="flex flex-row items-center w-full space-x-4">
                    <div className="w-10/12 flex flex-col">
                        <div className="text-base text-gray-200 font-semibold">
                            {title}
                        </div>
                        <div className="text-sm text-gray-200/60">
                            {description}
                        </div>
                    </div>
                    <div className="w-2/12">
                        <Checkbox
                            checked={reportCause === value}
                            onCheckedChange={() => setReportCause(value)}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const handleTextChange = (event) => {
        const newText = event.target.value;
        const lines = newText.split('\n');

        // Only update text if line count is within limit
        if (lines.length <= 30) {
            setMoreContent(newText);
        }
    };

    const possibleCauses = [
        {
            title: "Beleidigendes oder diskriminierendes Verhalten",
            description: "Beleidigungen, Diskriminierung oder Hassrede",
            value: "discrimination"
        },
        {
            title: "Belästigung oder Stalking",
            description: "Unerwünschte Kontaktaufnahme, persönliche Angriffe, oder aufdringliches Verhalten",
            value: "harassment"
        },
        {
            title: "Fake-Profile",
            description: "Das Profil scheint gefälscht oder unnatürlich zu sein und könnte ein Bot oder Spam-Konto sein",
            value: "fake_profile"
        },
        {
            title: "Falschangaben oder Betrug",
            description: "Falsche Informationen im Profil oder Inseraten, Ausgabe als jemand anderes, Betrügerisches Verhalten, Keine Rechte an Inhalten",
            key: "fraud"
        },
        {
            title: "Gefährliche oder irreführende Inhalte",
            description: "Inhalte, die gefährliche Aktionen fördern oder irreführende Informationen verbreiten",
            value: "misleading_content"
        },
        {
            title: "Privatsphäre-Verletzung",
            description: "Veröffentlichung privater Informationen oder Daten anderer Personen ohne Erlaubnis",
            value: "privacy_violation"
        },
        {
            title: "Spam",
            description: "Unsinnige Inhalte, Mehrfach Inhalte, oder Nachrichtenspam",
            key: "spam"
        },
        {
            title: "Unangebrachte Inhalte",
            description: "Nacktheit, sexuelle Inhalte, Gewalt oder Verfassungsfeindliche Symbole",
            value: "profile_picture"
        },
        {
            title: "Unangemessene Werbung",
            description: "Unangebrachte Werbung, oder Werbung für illegale Produkte oder Dienstleistungen",
            value: "unauthorized_ads"
        },
        {
            title: "Verstößt gegen deutsches Recht",
            description: "Verstößt gegen deutsches Recht.",
            value: "german_law"
        }
    ];
    

    return (
        <Dialog
        open={open}
        onOpenChange={(e) => {
            setIsOpen(e)
            if(!e) {
                onClose()
            }
        }}
        >
            <DialogTrigger className="bg-[#191919] border-none">
                <Button className="w-full  bg-[#222222] text-gray-200  hover:text-gray-300 shadow-lg" variant="ghost">
                    Nutzer melden
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#0F0F0F] w-full">
                <div className="w-full">
                    <h3 className="text-lg font-semibold flex items-center">
                        <MdOutlineReportProblem className="w-4 h-4 mr-2" />    Nutzer melden
                    </h3>
                    <p className="text-xs dark:text-gray-200/70">
                        Melde Nutzer wenn du denkst, dass sie gegen unsere Richtlinien verstoßen.
                    </p>
                    <div className="mt-4 w-full">

                        <div className="flex-col space-y-8 mt-2 w-full h-[320px] overflow-y-scroll">

                            {possibleCauses.map((cause) => (
                                renderCause(cause.title, cause.description, cause.value)
                            ))}

                        </div>
                        <div className="mt-8">
                            <Label>
                                Weitere Informationen
                            </Label>
                            <Textarea
                                className="w-full  dark:bg-[#171717] dark:border-none h-60"
                                onChange={handleTextChange}
                                value={moreContent}
                                maxLength={5000}
                            />
                            <div className="flex justify-end">
                                <LetterRestriction 
                                limit={5000}
                                currentLength={moreContent.length ?? 0}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-200/60 mt-2">
                        * Deine Daten werden vertraulich behandelt und niemals an Dritte weitergegeben. <br/>
                        uRent wird deine Meldung so schnell wie möglich prüfen und adäquate Maßnahmen ergreifen.
                    </div>
                    <div className=" mt-4 w-full">
                        <DialogTrigger disabled={!reportCause} asChild>
                            <Button className="dark:bg-[#222222] dark:text-gray-200
                             dark:hover:bg-[#171717] shadow-lg ml-auto flex justify-end"
                                disabled={!reportCause}
                                onClick={onReport}
                            >
                                Nutzer melden
                            </Button>
                        </DialogTrigger>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ReportUser;