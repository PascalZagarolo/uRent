'use client'

import { Button } from "@/components/ui/button";
import { Banknote, Mail, Share } from "lucide-react";

const InseratOptions = () => {
    return (
        <div>

            

            <div className="mt-4">
                <Button className="bg-emerald-600 border-2 border-black w-[240px]">
                    <Banknote className="h-4 w-4 mr-2"/> Buchen
                </Button>
            </div>

            <div className="mt-4">
                <Button className="bg-[#464c69] w-[240px] border-2 border-black">
                    Anzeige vormerken
                </Button>
            </div>

            <div className="mt-4">
                <Button className="bg-[#33374d] w-[240px] border-2 border-black flex">
                  <Mail className="h-4 w-4 mr-2"/>  Händler kontaktieren
                </Button>
            </div>

            <div className="mt-4">
                <Button className="bg-[#1f2230] w-[240px] border-2 border-black flex">
                  <Share className="h-4 w-4 mr-2"/>  Anzeige teilen
                </Button>
            </div>
        </div>
    );
}

export default InseratOptions;