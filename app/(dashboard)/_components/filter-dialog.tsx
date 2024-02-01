import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";

import { AlignLeft, DollarSignIcon, Settings, Settings2Icon } from "lucide-react";
import PriceFormFilter from "./_smart-filter/_components/price";
import PriceDetailForm from "./_smart-filter/_components/price-detail-filter";

const FilterDialog = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger className="mr-4" asChild>
                    <Button className="p-2 bg-white rounded-md text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border border-gray-100 hover:bg-gray-200">
                        <Settings2Icon />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogHeader className="italic font-semibold text-xl mb-4">
                            Anzeigen filtern
                        </DialogHeader>
                    </DialogHeader>
                    <div>
                        <div>
                        <p className="text-medium flex font-semibold mb-2 items-center"> 
                            <DollarSignIcon className="mr-1"/> Preis 
                            <Separator className="w-2/3 ml-4 bg-gray-400 h-[0.5px]"/> 
                            </p>
                            <PriceDetailForm/>
                        </div>
                        <div className="mt-4">
                            <p className="text-medium flex font-semibold mb-2 items-center"> 
                            <AlignLeft className="mr-1"/> Kategorie 
                            <Separator className="w-2/3 ml-4 bg-gray-400 h-[0.5px]"/> 
                            </p>

                            <RadioGroup className="flex flex-wrap text-sm">
                                
                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="all" />
                                    <Label className="ml-1 font-semibold">Alle</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="PKW" />
                                    <Label className="ml-1 font-semibold">PKW</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="LKW" />
                                    <Label className="ml-1 font-semibold">LKW</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="LAND" />
                                    <Label className="ml-1 font-semibold">Land</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="BAU" />
                                    <Label className="ml-1 font-semibold">Bau</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="CARAVAN" />
                                    <Label className="ml-1 font-semibold">Wohnmobile</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="TRAILOR" />
                                    <Label className="ml-1 font-semibold">Anhänger</Label>
                                </div>
                            </RadioGroup>

                        </div>
                        <div className="mt-4">
                        <p className="text-medium flex font-semibold mb-2 items-center"> 
                            <Settings className="mr-1"/> Spezifikationen 
                            <Separator className="w-2/3 ml-4 bg-gray-400 h-[0.5px]"/> 
                            </p>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default FilterDialog;