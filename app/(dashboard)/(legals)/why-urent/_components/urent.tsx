import { CheckIcon, XCircle } from "lucide-react";

const URentSolution = () => {
    return ( 
        <div className="p-4 bg-[#222222] shadow-lg rounded-md text-white">
  <div className="flex flex-row items-center">
    <div className="flex flex-col w-2/3 h-full items-start justify-center space-y-2">
      <span className="line-through text-gray-200/80 flex flex-row items-center">
      <XCircle className="w-4 h-4 mr-2 text-rose-600" /> Teuere Onlinepräsenz
      </span>
      <span className="line-through text-gray-200/80 flex flex-row items-center">
      <XCircle className="w-4 h-4 mr-2 text-rose-600" />  nervenaufreibende Buchungsprozesse
      </span>
      <span className="line-through text-gray-200/80 flex flex-row items-center">
      <XCircle className="w-4 h-4 mr-2 text-rose-600" /> fehlender Kundenkontakt
      </span>
      <span className="line-through text-gray-200/80 flex flex-row items-center">
      <XCircle className="w-4 h-4 mr-2 text-rose-600" /> unübersichtliche Fahrzeug- & Buchungsverwaltung
      </span>
      <span className="line-through text-gray-200/80 flex flex-row items-center">
        <XCircle className="w-4 h-4 mr-2 text-rose-600" /> restrikive Vermietungsbörsen
      </span>
    </div>
    <div className="w-1/3 h-full flex flex-row items-center justify-center text-4xl font-bold">
    <CheckIcon className="w-8 h-8 text-emerald-600 mr-4" /> <span className="">uRent.</span> 
    </div>
  </div>
</div>

     );
}
 
export default URentSolution;