'use client'

import { Button } from "@/components/ui/button";
import { ShareIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardTips = () => {

    const router = useRouter();

    return (
        <div>
            <div className="text-lg font-semibold">
                Weiteres zum Dashboard (3)
            </div>
            <div className="w-full flex flex-row items-center space-x-4 mt-2">

            <div className="w-1/3 bg-[#131313] rounded-md shadow-md 
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">

                    <div className="w-full h-[240px] bg-[#222222] ">
                        <img
                            className="w-full h-full object-cover"
                            src="https://www.urent-rental.de/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdf1vnhnzp%2Fimage%2Fupload%2Fv1731256227%2Fjsqxprg0chz039z1kddh.jpg&w=1080&q=75"
                        />
                    </div>
                    <div className="p-4">
                        <div className="text-sm font-semibold flex flex-row items-center">
                            <div className="w-2 h-2 mr-2  bg-indigo-800 rounded-md" /> So erstellst du das perfekte Inserat
                        </div>
                        <div className="text-xs text-gray-200/60 mt-1">
                        Ein gutes Inserat auf uRent ist der Schlüssel, um schnell Kunden zu gewinnen und deine Fahrzeuge öfter zu vermieten. Finde heraus wie es geht..
                        </div>
                        <div className="mt-4">
                            <a href={`
                    /blog/70ebfad7-3903-4c06-9b36-2388cd8dc098
                    `}
                                target="_blank" rel="noopener noreferrer"
                            >
                                <Button variant="ghost" size="sm" className="bg-[#222222] shadow-lg">
                                    Mehr erfahren
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-1/3 bg-[#131313] rounded-md shadow-md 
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">

                    <div className="w-full h-[240px] bg-[#222222] ">
                        <img
                            className="w-full h-full object-cover"
                            src="https://www.urent-rental.de/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdf1vnhnzp%2Fimage%2Fupload%2Fv1731350751%2Fjfzmgdv7syobrlb91z92.jpg&w=1080&q=75"
                        />
                    </div>
                    <div className="p-4">
                        <div className="text-sm font-semibold flex flex-row items-center">
                            <div className="w-2 h-2 mr-2  bg-indigo-800 rounded-md" /> So benutzt du das Dashboard optimal
                        </div>
                        <div className="text-xs text-gray-200/60 mt-1">
                            Finde heraus wie du Buchungen & Verfügbarkieten verwalten kannst, Termine & Aufgaben im Blick behältst und vieles mehr.
                        </div>
                        <div className="mt-4">
                            <a href={`
                    https://www.urent-rental.de/blog/4f27b351-1d61-4966-938d-d3f9888eac2e
                    `}
                                target="_blank" rel="noopener noreferrer"
                            >
                                <Button variant="ghost" size="sm" className="bg-[#222222] shadow-lg">
                                    Mehr erfahren
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>


                <div className="w-1/3 bg-[#131313] rounded-md shadow-md
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">

                    <div className="w-full h-[240px] bg-[#222222] ">
                        <img
                            className="w-full h-full object-cover"
                            src=
                            {`/uRentxRms.webp`}
                        />
                    </div>
                    <div className="p-4">
                        <div className="text-sm font-semibold flex flex-row items-center">
                            <div className="w-2 h-2 mr-2  bg-yellow-600 rounded-md" /> uRent RMS & weitere Zukunftspläne
                        </div>
                        <div className="text-xs text-gray-200/60 mt-1">
                            Erfahre mehr über geplante Funktionen und Verbesserungen, die in den nächsten Monaten auf dich zukommen.
                        </div>
                        <div className="mt-4">
                            <Button variant="ghost" size="sm" className="bg-[#222222] shadow-lg ">
                                Mehr erfahren
                            </Button>
                        </div>
                    </div>
                </div>


                {/* <div className="w-1/3 bg-[#131313] rounded-md shadow-md 
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">

                    <div className="w-full h-[200px] bg-[#222222]">
                        <img
                            className="w-full h-full object-cover"
                            src="https://media.kasperskydaily.com/wp-content/uploads/sites/96/2016/06/06135603/Umfrage_KL.jpg"
                        />
                    </div>
                    <div className="p-4">
                        <div className="text-sm font-semibold flex flex-row items-center ">
                            <div className="w-2 h-2 mr-2  bg-emerald-600 rounded-md" /> Nehme an einer kurzen Umfrage teil
                        </div>
                        <div className="text-xs text-gray-200/60 mt-1">
                            Helfe uns dabei, die Zukunft des Dashboards zu gestalten und teile deine Meinung zu neuen Funktionen und Verbesserungen.
                        </div>
                        <div className="mt-4">
                            <Button variant="ghost" size="sm" className="bg-[#222222] shadow-lg ">
                                Jetzt teilnehmen
                            </Button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default DashboardTips;