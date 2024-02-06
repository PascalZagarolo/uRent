'use client'

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Settings, TrendingUpIcon, Truck, User, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const MobileLogoDialog = () => {

    const router = useRouter();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <h3 className="flex justify-start items-center py-6 ml-4 text-3xl font-semibold text-white hover:cursor-pointer" onClick={() => {
                    router.push('/')
                }}>
                    <Truck className="ml-1 mr-2" />
                    <div className="text-[#4e5889] font-font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">u</div>
                    <p className="text-[#eaebf0] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">Rent</p>
                </h3>
            </SheetTrigger>
            <SheetContent side="left">
                <div>
                    <div>
                        <h3 className="p-4 text-xl font-semibold flex">  Profilübersicht </h3>
                    </div>
                <div className="flex-col">
                    <div className="border p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-gray-200 flex font-semibold hover:border-dashed hover:border-2">
                        <User className="mr-1"/> Mein Profil
                    </div>
                    <div className="border p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-gray-200 flex font-semibold hover:border-dashed hover:border-2">
                        <TrendingUpIcon className="mr-1"/> Dashboard
                    </div>
                    <div className="border p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-gray-200 flex font-semibold hover:border-dashed hover:border-2">
                        <Settings className="mr-1"/> Einstellungen
                    </div>
                </div>
                </div>
                
            </SheetContent>
        </Sheet>
    );
}

export default MobileLogoDialog;