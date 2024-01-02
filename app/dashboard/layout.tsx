import { Banknote, Construction, Signpost } from "lucide-react";
import Logo from "../profile/[profileId]/_components/u-rent-logo";

const DashboardLayout = (
     {children}  : { children : React.ReactNode}
) => {
    return (
        <div className="flex h-screen bg-gray-200 border border-black">
           
            <div className="w-64 bg-blue-800/80">
                <div className="flex items-center justify-center mt-8">
                    <span className="text-white text-2xl font-semibold">
                        <h3 className="flex items-center rounded-md bg-white text-black w-[160px] h-[80px] justify-center border border-black ">
                            <p className="font-bold text-blue-800">u</p>Rent</h3>
                    </span>
                </div>
                <nav className="mt-10">
                    <a href="#" className="py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white block border border-white">
                        <Banknote className=""/> Bestellungen
                    </a>
                    <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white border border-white">
                        <Signpost/> offene Anzeigen</a>
                        <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white border border-white">
                        <Construction/> Entwürfe</a>
                    
                </nav>
            </div>

            
            <div className="flex-1 p-10">
                {children}
            </div>
        </div>

    );
}

export default DashboardLayout;