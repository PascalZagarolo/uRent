import { Button } from "@/components/ui/button";
import { ShareIcon } from "lucide-react";

const DashboardTips = () => {
    return ( 
        <div>
            <div className="text-lg font-semibold">
                Weiteres zum Dashboard (3)
            </div>
            <div className="w-full flex flex-row items-center space-x-4 mt-2">
            <div className="w-1/3 bg-[#131313] rounded-md shadow-md 
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">
                
                <div className="w-full h-[200px] bg-[#222222] ">
                <img 
                    className="w-full h-full object-cover"
                    src="https://pbs.twimg.com/media/Dg1aWWfVQAAg2uT.jpg"
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
                    <Button variant="ghost" size="sm" className="bg-[#222222] shadow-lg ">
                        Mehr erfahren
                    </Button>
                </div>
                </div>
            </div>


            <div className="w-1/3 bg-[#131313] rounded-md shadow-md
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">
                
                <div className="w-full h-[200px] bg-[#222222] ">
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

            
            <div className="w-1/3 bg-[#131313] rounded-md shadow-md 
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
            </div>
        </div>
        </div>
     );
}
 
export default DashboardTips;