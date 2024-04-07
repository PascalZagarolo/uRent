'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineReportProblem } from "react-icons/md";

const ReportModal = () => {

    const [reportCause, setReportCause] = useState<"BELEIDIGUNG" | "DISKRIMINIERUNG" | "BETRUG" | "SPAM" | "SONSTIGES" >(null);
    const [moreContent, setMoreContent] = useState<string>("");

    const onReport = () => {
        toast.success("Inserat wurde gemeldet");
        //Todo set Api Route
    }


    return ( 
        <Dialog>
            <DialogTrigger className="text-xs hover:underline">
                Anzeige melden
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#0F0F0F] w-full">
                <div className="w-full">
                    <h3 className="text-lg font-semibold flex items-center">
                    <MdOutlineReportProblem className="w-4 h-4 mr-2"/>    Anzeige melden
                    </h3>
                    <p className="text-xs dark:text-gray-200/70">
                        Melde anzeige wenn du denkst, dass sie gegen unsere Richtlinien verstößt.
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
                            onChange={(e) => {setMoreContent(e.target.value)}}
                            />
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