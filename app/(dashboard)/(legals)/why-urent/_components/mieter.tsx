'use client'

import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ArrowRight, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";


interface MieterProps {
    loggedIn : boolean;
}

const Mieter = ({ loggedIn } : MieterProps) => {

    const router = useRouter();

    const onFirst = () => {
        try {
            
        } catch(e : any) {
            console.log(e);
        }
    }



    return (
        <div>
            <div>
                <h3 className="text-xl font-semibold">
                    Du willst Fahrzeuge aus einer breiten Auswahl mieten? <br />
                </h3>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 mt-8 lg:gap-16 gap-4 pb-8">
                <div className="bg-[#222222] shadow-lg rounded-md p-4">
                    <div className="flex flex-row items-center   p-4 justify-center ">
                        <div className=" bg-[#191919] rounded-full w-12 h-12 justify-center items-center flex flex-row text-base">
                            1
                        </div>
                    </div>
                    <div className="text-lg font-semibold h-16">
                        Kostenlos auf uRent <br /> registrieren
                    </div>
                    <div className="mt-2 text-sm text-gray-200/60 lg:h-24 h-40">
                        Melde dich kostenlos auf uRent an und erhalte Zugriff auf eine breite Auswahl an Fahrzeugen von einer Vielzahl von Anbietern.
                    </div>
                    <div className="mt-4">
                        {!loggedIn ? (
                            <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 shadow-lg" onClick={() => { router.push("/register")}}>
                            Jetzt registrieren <ArrowRight size={16} className="ml-2" />
                        </Button>
                        ) : (
                            <Button className="bg-[#292929] hover:bg-[#303030] text-gray-200 hover:text-gray-300" disabled>
                            Du bist eingeloggt <CheckIcon className="w-4 h-4 ml-2 text-emerald-600" />
                        </Button>
                        )}
                    </div>
                </div>

                <div className="bg-[#222222] shadow-lg rounded-md p-4">
                    <div className="flex flex-row items-center   p-4 justify-center ">
                        <div className=" bg-[#191919] rounded-full w-12 h-12 justify-center items-center flex flex-row text-base">
                            2
                        </div>
                    </div>
                    <div className="text-lg font-semibold h-16">
                        Passendes Fahrzeug suchen
                    </div>
                    <div className="mt-2 text-sm text-gray-200/60 lg:h-24 h-40">
                        Finde mittels unserer Suchfunktion ohne Probleme das passende Fahrzeug für deine Bedürfnisse und wähle aus einer vielzahl von Anbietern deine passende Lösung
                    </div>
                    <div className="mt-4">
                        <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 shadow-lg" onClick={() => { router.push("/search")}}>
                            Fahrzeuge finden <MagnifyingGlassIcon  className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div>
                    <div className="bg-[#222222] shadow-lg rounded-md p-4">
                        <div className="flex flex-row items-center   p-4 justify-center ">
                            <div className=" bg-[#191919] rounded-full w-12 h-12 justify-center items-center flex flex-row text-base">
                                3
                            </div>
                        </div>
                        <div className="text-lg font-semibold h-16">
                            Vermieter kontaktieren
                        </div>
                        <div className="mt-2 text-sm text-gray-200/60 lg:h-24 h-40">
                            Finde mittels unserer Suchfunktion ohne Probleme das passende Fahrzeug für deine Bedürfnisse und wähle aus einer vielzahl von Anbietern deine passende Lösung
                        </div>
                        <div className="mt-4">
                            <Button className="bg-[#191919] shadow-lg  hover:bg-indigo-900 text-gray-200 hover:text-gray-300" onClick={() => { router.push("/search")}}>
                                Vermieter finden <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mieter;