'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";

import { AlignLeft, DollarSignIcon, GlassesIcon, HeartHandshakeIcon, ScanSearch, Settings, Settings2Icon } from "lucide-react";
import PriceFormFilter from "./_smart-filter/_components/price";
import PriceDetailForm from "./_smart-filter/_components/price-detail-filter";
import PkwFilter from "./_filter-types/pkw-filter";
import { useSearchParams } from "next/navigation";
import SelectCategoryDetailForm from "./_smart-filter/_components/select-category";

const FilterDialog = () => {

    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category");

    return (
        <div>
            <Dialog>
                <DialogTrigger className="mr-4" asChild>
                    <Button className="p-2 bg-white rounded-md text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border border-gray-100 hover:bg-gray-200">
                        <Settings2Icon />
                    </Button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogHeader className="italic font-semibold text-xl mb-4">
                            Anzeigen filtern
                        </DialogHeader>
                    </DialogHeader>
                    <div>
                        <div>
                        <p className="text-medium flex font-semibold mb-2 items-center"> 
                            <HeartHandshakeIcon className="mr-1"/> Preis 
                            <Separator className="w-2/3 ml-4 bg-gray-400 h-[0.5px]"/> 
                            </p>
                            <PriceDetailForm/>
                        </div>
                        <div className="mt-4">
                            <p className="text-medium flex font-semibold mb-2 items-center"> 
                            <AlignLeft className="mr-1"/> Kategorie 
                            <Separator className="w-2/3 ml-4 bg-gray-400 h-[0.5px]"/> 
                            </p>

                            <SelectCategoryDetailForm/>

                        </div>
                        <div className="mt-4">
                        <p className="text-medium flex font-semibold mb-2 items-center"> 
                            <Settings className="mr-1"/> Spezifikationen 
                            <Separator className="w-2/3 ml-4 bg-gray-400 h-[0.5px]"/> 
                            </p>
                        </div>
                        <div>
                             {!currentCategory && <p> noch nichts.. </p>}
                            { currentCategory === "PKW" && <PkwFilter/> }
                        </div>
                        <DialogTrigger asChild>
                            <Button className="mt-8 bg-[#282c45] text-white rounded-md p-2 w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"> 
                            <ScanSearch className="mr-2"/> Filtern
                            </Button>
                        </DialogTrigger>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default FilterDialog;