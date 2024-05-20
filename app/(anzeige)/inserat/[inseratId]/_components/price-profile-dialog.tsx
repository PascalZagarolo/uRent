import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { priceprofile } from "@/db/schema";

import { MdOutlineOpenInNew } from "react-icons/md";

interface PriceProfileDialogProps {
    thisPriceprofile: typeof priceprofile.$inferSelect
}

const PriceProfileDialog: React.FC<PriceProfileDialogProps> = ({
    thisPriceprofile
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-4 w-full bg-[#1B1D28] rounded-md hover:cursor-pointer">
                    <div className="flex items-center w-full">
                        <div className="text-sm font-medium w-3/4 break-all line-clamp-1 hover:underline hover:cursor-pointer">
                            {thisPriceprofile.title}
                        </div>
                        <div className="w-1/4 flex justify-end hover:cursor-pointer">
                            <MdOutlineOpenInNew className="w-4 h-4" />

                        </div>
                    </div>
                    <div className="mt-2 w-full flex items-center text-xs">
                        <div className="w-1/2 font-semibold">
                            {((Number(thisPriceprofile.price))).toFixed(2).replace('.', ',') + ' €'}
                        </div>
                        {thisPriceprofile.freeMiles && (
                            <div className="w-1/2">
                                Freikilometer: {thisPriceprofile.freeMiles} Km
                            </div>
                        )}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-md font-semibold">
                            {thisPriceprofile.title}
                        </h3>
                        <p className="text-xs dark:text-gray-200/60">
                            Weitere Informationen zum Preisprofil {thisPriceprofile.title}.
                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="text-sm w-full flex items-center">
                            {thisPriceprofile.price && (
                                <div className="w-1/2 text-medium">
                                    Preis
                                </div>
                            )}
                            {thisPriceprofile.freeMiles && (
                                <div className="w-1/2 text-medium">
                                    Freikilometer
                                </div>
                            )}
                        </div>
                        <div className="flex items-center w-full">

                            <div className="text-md font-semibold w-1/2">
                                {((Number(thisPriceprofile.price))).toFixed(2).replace('.', ',') + ' €'}
                            </div>
                            {thisPriceprofile.freeMiles && (
                                <div className="text-md font-semibold w-1/2">
                                    {thisPriceprofile.freeMiles} Km
                                </div>
                            )}
                        </div>

                        {thisPriceprofile?.extraCost && (
                            <div className="mt-2">
                                <Label className="text-sm font-medium">
                                    Zusatzkosten pro KM
                                </Label>
                                <div className="text-md font-semibold w-full ">
                                    {((Number(thisPriceprofile?.extraCost))).toFixed(2).replace('.', ',') + ' €'}/Km
                                </div>
                            </div>
                        )}


                        <div className="mt-2">
                            {thisPriceprofile.description && (
                                <div>
                                    <Label className="text-sm font-semibold">
                                        Weitere Informationen
                                    </Label>
                                    <div className="text-xs  whitespace-pre-wrap dark:text-gray-200/90">
                                        {thisPriceprofile.description}
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PriceProfileDialog;