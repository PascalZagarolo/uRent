'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaBrush } from "react-icons/fa";
import { GiCrystalShine } from "react-icons/gi";
import { RiToolsFill } from "react-icons/ri";
import { TbClick } from "react-icons/tb";

const LandingPageHeader = () => {
    
    const router = useRouter();

    const onRedirect = () => {
        try {
            router.push('/register')
        } catch(e : any) {
            console.log(e)
        }
    }
    
    return (
        <div className="p-6">
        <div className="mt-8 bg-gradient-to-r from-[#222222] via-indigo-800/40 to-[#202020] p-8 shadow-2xl rounded-xl">
       
            <h1 className="text-gray-200 text-4xl font-extrabold text-center ">
                Warum uRent?
            </h1>
            <p className="text-gray-200/60 text-center mb-8 text-lg">
                Weil mieten & vermieten noch nie einfacher war.
            </p>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       
                <div className="bg-[#191919] shadow-lg rounded-lg p-4 border border-indigo-800">
                    <div className="flex items-center mb-4 h-24">
                        <div className="">
                          
                           <GiCrystalShine className="w-8 h-8 mr-4" /> 
                        </div>
                        <h3 className="text-gray-200 text-xl font-semibold ml-4">
                            Präsenz wo es zählt
                        </h3>
                    </div>
                    <p className="text-gray-200/60">
                        uRent ist extra für Vermieter und Mieter entwickelt und die zentrale Anlaufstelle für alle, die Fahrzeuge mieten und vermieten wollen. Profitiere von einer gesonderten Mietgesellschaft, welche nur darauf wartet deine Fahrzeuge mieten zu können.
                    </p>
                </div>
    
               
                <div className="bg-[#191919] shadow-lg rounded-lg p-4 border-indigo-800 border">
                    <div className="flex items-center mb-4 h-24">
                    <div className="">
                          
                          <FaBrush className="w-8 h-8" /> 
                       </div>
                        <h3 className="text-gray-200 text-xl font-semibold ml-4">
                            Gestalte uRent wie du willst
                        </h3>
                    </div>
                    <p className="text-gray-200/60">
                        uRent setzt dir keine Vorgaben oder Grenzen wie du deine Fahrzeuge zu vermieten hast, sondern gibt dir die Freiheit es so zu machen wie du es willst. Behalte deine Unabhängigkeit und entscheide selbst wie du vermieten möchtest.
                    </p>
                </div>
    
                
                <div className="bg-[#191919] shadow-lg rounded-lg p-4 border-indigo-800 border">
                    <div className="flex items-center mb-4 h-24">
                        <div>
                        <RiToolsFill className="w-8 h-8" />
                        </div>
                        <h3 className="text-gray-200 text-xl font-semibold ml-4">
                            Tools die dein Geschäft vereinfachen
                        </h3>
                    </div>
                    <p className="text-gray-200/60">
                        Ob Buchungen eintragen, Fahrzeuge verwalten oder schnellen Kundenkontakt aufzubauen, uRent bietet dir die Tools die du brauchst um dein Geschäft zu vereinfachen & maximiert deine Effizienz. Damit du dich auf das Wesentliche konzentrieren kannst.
                    </p>
                </div>
            </div>
    
            <div className="mt-8 text-center">
                <Button className="bg-indigo-700 hover:bg-indigo-800  text-gray-200 font-bold py-8 text-base px-8 rounded-md shadow-lg"
                onClick={onRedirect}
                >
                   <TbClick className="w-4 h-4 mr-2" />  Kostenlos Account erstellen & loslegen
                </Button>
            </div>
            
        </div>
    </div>
    


    );
}

export default LandingPageHeader;