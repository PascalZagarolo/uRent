'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { priceprofile } from "@/db/schema";
import { Tag, Banknote } from "lucide-react";
import { MdOutlineOpenInNew } from "react-icons/md";
import { FaRoad } from "react-icons/fa";

interface PriceProfileDialogProps {
    thisPriceprofile: typeof priceprofile.$inferSelect
}

const PriceProfileDialog: React.FC<PriceProfileDialogProps> = ({
    thisPriceprofile
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="bg-[#1E2235]/70 p-3 rounded-lg border border-gray-800/20 transition-all hover:border-gray-700/40 cursor-pointer group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/10 flex items-center justify-center mr-2.5 border border-yellow-500/20">
                                <Banknote className="w-3.5 h-3.5 text-yellow-400" />
                            </div>
                            <div className="font-medium text-gray-200 line-clamp-1 group-hover:text-white transition-colors">
                                {thisPriceprofile.title}
                            </div>
                        </div>
                        <div className="text-gray-400 group-hover:text-gray-200 transition-colors">
                            <MdOutlineOpenInNew className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="bg-[#151823]/40 rounded-md p-2 border border-gray-800/10">
                            <div className="text-xs text-gray-400">Preis</div>
                            <div className="font-semibold text-gray-100">
                                {((Number(thisPriceprofile.price))).toFixed(2).replace('.', ',') + ' €'}
                            </div>
                        </div>
                        {thisPriceprofile.freeMiles ? (
                            <div className="bg-[#151823]/40 rounded-md p-2 border border-gray-800/10">
                                <div className="text-xs text-gray-400">Freikilometer</div>
                                <div className="font-semibold text-gray-100">
                                    {thisPriceprofile.freeMiles} km
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#151823]/40 rounded-md p-2 border border-gray-800/10 opacity-60">
                                <div className="text-xs text-gray-400">Freikilometer</div>
                                <div className="text-sm text-gray-500">Nicht verfügbar</div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-[#151823] to-[#1B1F2E] border border-gray-800/30 shadow-xl rounded-xl max-w-md w-full">
                <div className="p-4">
                    <div className="flex items-center mb-5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/10 flex items-center justify-center mr-3 border border-yellow-500/20">
                            <Banknote className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {thisPriceprofile.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                                Detaillierte Preisinformationen
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-[#1E2235]/70 p-3 rounded-lg border border-gray-800/20">
                            <div className="flex items-center mb-1.5">
                                <Tag className="w-4 h-4 text-indigo-400 mr-2" />
                                <span className="text-sm text-gray-300">Grundpreis</span>
                            </div>
                            <div className="text-xl font-semibold text-white">
                                {((Number(thisPriceprofile.price))).toFixed(2).replace('.', ',') + ' €'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">pro Tag</div>
                        </div>
                        
                        {thisPriceprofile.freeMiles ? (
                            <div className="bg-[#1E2235]/70 p-3 rounded-lg border border-gray-800/20">
                                <div className="flex items-center mb-1.5">
                                    <FaRoad className="w-4 h-4 text-blue-400 mr-2" />
                                    <span className="text-sm text-gray-300">Freikilometer</span>
                                </div>
                                <div className="text-xl font-semibold text-white">
                                    {thisPriceprofile.freeMiles} km
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#1E2235]/70 p-3 rounded-lg border border-gray-800/20 opacity-70">
                                <div className="flex items-center mb-1.5">
                                    <FaRoad className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-400">Freikilometer</span>
                                </div>
                                <div className="text-md font-medium text-gray-500">
                                    Nicht verfügbar
                                </div>
                            </div>
                        )}
                    </div>

                    {thisPriceprofile?.extraCost && (
                        <div className="bg-[#1E2235]/70 p-3 rounded-lg border border-gray-800/20 mb-4">
                            <Label className="text-sm text-gray-300 mb-1.5 flex items-center">
                                <FaRoad className="w-4 h-4 text-emerald-400 mr-2" />
                                Zusatzkosten pro km
                            </Label>
                            <div className="text-lg font-semibold text-white">
                                {((Number(thisPriceprofile?.extraCost))).toFixed(2).replace('.', ',') + ' €'}
                                <span className="text-xs text-gray-500 ml-1">pro km</span>
                            </div>
                        </div>
                    )}

                    {thisPriceprofile.description && (
                        <div className="bg-[#1E2235]/70 p-3 rounded-lg border border-gray-800/20">
                            <Label className="text-sm text-gray-300 mb-1.5 block">
                                Weitere Informationen
                            </Label>
                            <div className="text-sm whitespace-pre-wrap text-gray-200 bg-[#151823]/60 p-3 rounded-md border border-gray-800/10">
                                {thisPriceprofile.description}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PriceProfileDialog;