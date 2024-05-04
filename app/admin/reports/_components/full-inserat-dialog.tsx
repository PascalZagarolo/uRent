'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { report } from "@/db/schema";


interface FullIsneratDialogProps {
    thisReport: typeof report.$inferSelect
}

const FullInseratDialog: React.FC<FullIsneratDialogProps> = ({
    thisReport
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="dark:bg-[#1C1C1C] text-xs dark:text-gray-200
                 dark:hover:bg-[#1D1D1D] hover:text-gray-300"
                 size="sm">
                    Weitere Informationen
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] dark:border-none dark:text-gray-200">
                <div className="">
                    <div>
                        <h3 className="text-md font-medium">
                            Informationen zum Report
                        </h3>
                        <p className="text-xs dark:text-gray-200/60">
                            {thisReport.id}
                        </p>
                    </div>
                    <div className="mt-4 flex items-center">
                        <div className="w-1/2">
                            <Label className="text-sm font-medium">
                                Meldeursache
                            </Label>
                            <div className="text-sm font-semibold text-rose-600">
                                {thisReport.reportType}
                            </div>
                        </div>
                        <div className="w-1/2">
                            <Label className="text-sm font-medium">
                                Gemeldet von
                            </Label>

                            <div>
                                {thisReport.user ? (
                                    <a className="text-sm font-semibold hover:underline" href={`/profile/${thisReport.userId}`} target="_blank">
                                        {thisReport.user.name}
                                    </a>
                                ) : (
                                    <div className="text-sm font-semibold">
                                        {'"'}Nicht verfügbar{'"'}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="mt-4">
                        <Label className="text-sm font-medium">
                            Anmerkungen
                        </Label>
                        <div>
                            {!thisReport.content ? (
                                <div className="mt-2 dark:text-gray-200/60 text-sm">
                                    keine Amerkungen vorhanden.
                                </div>
                            ) : (
                                <div className="mt-2 dark:text-gray-200/90 text-sm">
                                    {thisReport.content}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FullInseratDialog;