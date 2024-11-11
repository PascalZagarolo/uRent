'use client';

import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { set } from "lodash";
import { CheckIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";
import { GoReport } from "react-icons/go";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineReportProblem } from "react-icons/md";

interface ReportModalProps {
    isBlocked: boolean;
}

const ReportModal = ({
    isBlocked
} : ReportModalProps) => {

    console.log(isBlocked)

    const conversationId = useSearchParams().get("conversationId");

    const [reportCause, setReportCause] = useState<"BELEIDIGUNG" | "DISKRIMINIERUNG" | "BETRUG" | "SPAM" | "SONSTIGES">(null);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [moreContent, setMoreContent] = useState<string>("");

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onReport = async () => {
        try {
            const values = {
                reportType: reportCause,
                content: moreContent,
            }

            await axios.post(`/api/report/${conversationId}/conversation`, values)
                .then(() => {
                    setShowBlockModal(true);
                    toast.success("Anzeige wurde erfolgreich gemeldet.")
                })
        } catch (e: any) {
            toast.error("Fehler beim melden der Anzeige.")
            console.log(e);
        }

    }

    
        const onBlock = async () => {
            try {
                setIsLoading(true);
                await axios.patch(`/api/block/${conversationId}`)
                    .then(() => {
                        toast.success("Nutzer erfolgreich blockiert");
                        setShowBlockModal(false);
                        router.refresh();
                    })
            } catch {
                toast.error("Nutzer konnte nicht blockiert werden")
            } finally {
                setIsLoading(false);
            }
        }
    
        
 

    const handleTextChange = (event) => {
        const newText = event.target.value;
        const lines = newText.split('\n');

        // Only update text if line count is within limit
        if (lines.length <= 30) {
            setMoreContent(newText);
        }
    };

    if (showBlockModal && !isBlocked) {
        return (
            <Dialog open={showBlockModal} onOpenChange={(e) => {
                if (!e) {
                    setShowBlockModal(false);
                }
            }}>
                <DialogContent className="dark:border-none dark:bg-[#0F0F0F] w-full">

                    <div className="w-full">

                        <div className="flex flex-col items-center">
                            <div>
                                <IoCheckmarkCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="mt-4 text-gray-200">
                                Konversation erfolgreich gemeldet.
                            </h3>
                        </div>
                        <div>
                            <div className="text-sm text-gray-200/60 text-center mt-2">
                                Vielen Dank für deine Hilfe! <br />
                                Wir werden uns so schnell wie möglich dein Anliegen ansehen und etwaige Maßnahmen ergreifen.
                            </div>
                        </div>
                        <div className=" flex-row items-center ml-auto flex justify-end mt-4">
                            <Button className="dark:bg-rose-800 dark:text-gray-200
                    dark:hover:bg-rose-900  flex justify-end"
                                onClick={() => onBlock()}
                            >
                                Nutzer blockieren
                            </Button>
                            <Button className="dark:bg-[#222222] dark:text-gray-200
                    dark:hover:bg-[#222222]  flex justify-end "
                                onClick={() => setShowBlockModal(false)}
                            >
                                Schließen
                            </Button>
                        </div>
                    </div>

                </DialogContent>

            </Dialog>
        )
    }


    return (
        <Dialog>
            <DialogTrigger className="text-xs font-semibold hover:underline flex items-center">
                <GoReport className="w-4 h-4 mr-2" /> Konversation melden
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#0F0F0F] w-full">

                <div className="w-full">
                    <h3 className="text-lg font-semibold flex items-center">
                        <GoReport className="w-4 h-4 mr-2" />    Konversation melden
                    </h3>
                    <p className="text-xs dark:text-gray-200/70">
                        Melde die Konversation wenn du denkst, dass sie gegen unsere Richtlinie verstößt.
                    </p>
                    <div className="mt-4 w-full">
                        <h1>
                            Ursache
                        </h1>
                        <div className="flex-col space-y-2 mt-2 w-full">
                            <div className="items-center flex gap-x-2" onClick={() => setReportCause("BELEIDIGUNG")}>
                                <Checkbox
                                    checked={reportCause === "BELEIDIGUNG"}
                                    onCheckedChange={() => setReportCause("BELEIDIGUNG")}
                                />
                                <Label>
                                    Beleidigung
                                </Label>
                            </div>
                            <div className="items-center flex gap-x-2" onClick={() => setReportCause("BETRUG")}>
                                <Checkbox
                                    checked={reportCause === "BETRUG"}
                                    onCheckedChange={() => setReportCause("BETRUG")}
                                />
                                <Label>
                                    Betrug
                                </Label>
                            </div>
                            <div className="items-center flex gap-x-2" onClick={() => setReportCause("DISKRIMINIERUNG")}>
                                <Checkbox
                                    checked={reportCause === "DISKRIMINIERUNG"}
                                    onCheckedChange={() => setReportCause("DISKRIMINIERUNG")}
                                />
                                <Label>
                                    Diskriminierung
                                </Label>
                            </div>
                            <div className="items-center flex gap-x-2" onClick={() => setReportCause("SPAM")}>
                                <Checkbox
                                    checked={reportCause === "SPAM"}
                                    onCheckedChange={() => setReportCause("SPAM")}
                                />
                                <Label>
                                    Spam
                                </Label>
                            </div>
                            <div className="items-center flex gap-x-2" onClick={() => setReportCause("SONSTIGES")}>
                                <Checkbox
                                    checked={reportCause === "SONSTIGES"}
                                    onCheckedChange={() => setReportCause("SONSTIGES")}
                                />
                                <Label>
                                    Sonstiges
                                </Label>
                            </div>
                            <div className="mt-4">
                                <Label>
                                    Weitere Informationen
                                </Label>
                                <Textarea
                                    className="w-full  dark:bg-[#171717] dark:border-none"
                                    onChange={handleTextChange}
                                    value={moreContent}
                                    maxLength={5000}
                                />
                                <div>
                                    <LetterRestriction
                                        limit={5000}
                                        currentLength={moreContent.length}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className=" mt-2 w-full">
                        <DialogTrigger disabled={!reportCause} asChild>
                            <Button className="dark:bg-[#171717] dark:text-gray-200
                             dark:hover:bg-[#131313] ml-auto flex justify-end"
                                disabled={!reportCause}
                                onClick={onReport}
                            >
                                Inserat melden
                            </Button>
                        </DialogTrigger>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}

export default ReportModal;