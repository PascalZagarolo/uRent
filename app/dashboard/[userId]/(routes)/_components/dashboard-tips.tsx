import { ShareIcon } from "lucide-react";

const DashboardTips = () => {
    return ( 
        <div>
            <div className="tex-lg font-semibold">
                Weiteres zum Dashboard
            </div>
            <div className="w-full flex flex-row items-center space-x-4 mt-2">
            <div className="w-1/3 bg-[#131313] rounded-md shadow-md p-4 
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">
                <div className="text-sm font-semibold flex flex-row items-center">
                    <div className="w-2 h-2 mr-2  bg-indigo-800 rounded-md" /> So benutzt du das Dashboard optimal
                </div>
                <div className="w-full h-[200px] bg-[#222222] shadow-lg mt-2">
                <img 
                    className="w-full h-full object-cover rounded-md shadow-lg"
                    src="https://pbs.twimg.com/media/Dg1aWWfVQAAg2uT.jpg"
                    />
                </div>
                <div className="text-xs text-gray-200/60 mt-1">
                    Finde heraus wie du Buchungen & Verfügbarkieten verwalten kannst, Termine & Aufgaben im Blick behältst und vieles mehr.
                </div>
            </div>


            <div className="w-1/3 bg-[#131313] rounded-md shadow-md p-4
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">
                <div className="text-sm font-semibold flex flex-row items-center">
                    <div className="w-2 h-2 mr-2  bg-yellow-600 rounded-md" /> uRent RMS & weitere Zukunftspläne
                </div>
                <div className="w-full h-[200px] bg-[#222222] shadow-lg mt-2">
                <img 
                    className="w-full h-full object-cover rounded-md shadow-lg"
                    src=
                    {`https://files.oaiusercontent.com/file-LIlkormrNvEwYRQRyEK6vhOB?se=2024-10-20T22%3A42%3A29Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd316dd99-24d5-4f62-862b-cd54675546e5.webp&sig=ViX2icL%2BE6HH1l5um9EOmSQ0Lu69zKjU7/Kr7zrOByw%3D`}
                    />
                </div>
                <div className="text-xs text-gray-200/60 mt-1">
                    Erfahre mehr über geplante Funktionen und Verbesserungen, die in den nächsten Monaten auf dich zukommen.
                </div>
            </div>

            
            <div className="w-1/3 bg-[#131313] rounded-md shadow-md p-4
            hover:scale-105 transform transition-transform duration-300 ease-in-out
            ">
                <div className="text-sm font-semibold flex flex-row items-center">
                    <div className="w-2 h-2 mr-2  bg-emerald-600 rounded-md" /> Nehme an einer kurzen Umfrage teil 
                </div>
                <div className="w-full h-[200px] bg-[#222222] shadow-lg mt-2">
                    <img 
                    className="w-full h-full object-cover rounded-md shadow-lg"
                    src="https://media.kasperskydaily.com/wp-content/uploads/sites/96/2016/06/06135603/Umfrage_KL.jpg"
                    />
                </div>
                <div className="text-xs text-gray-200/60 mt-1">
                    Helfe uns dabei, die Zukunft des Dashboards zu gestalten und teile deine Meinung zu neuen Funktionen und Verbesserungen.
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default DashboardTips;