import { CopyIcon } from "lucide-react";
import Countdown from "./countdown";

const FreeRentCard = () => {
  const targetDate = new Date("2024-12-30T00:00:00");

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText("uRent24");
    alert("Code uRent24 copied to clipboard!");
  };

  return (
    <div className="w-full h-full mx-auto bg-gradient-to-br bg-[#1B1E2C] flex flex-row items-center justify-center rounded-lg shadow-lg p-8 text-center text-white">
      <div className="max-w-lg ">
        {/* <div className="mb-4 flex flex-row items-center space-x-4 mt-4">
        <div className="text-lg font-semibold">NUR NOCH</div>
        <Countdown targetDate={targetDate} />
      </div> */}
      
      <h3 className="text-4xl font-bold mb-4">3 Monate Gratis</h3>
      <p className="text-lg mb-4 text-gray-300">
        Vermiete 3 Monate kostenlos deine Fahrzeuge auf <span className="font-bold text-gray-200 ">uRent</span> und profitiere von unserem exklusiven Angebot.
      </p>

      <div className="bg-[#161822] p-4 rounded-md flex shadow-lg justify-center items-center gap-2">
       
        <span className="bg-[#272A3C] text-gray-200 px-4 py-1 rounded-md font-bold text-lg">uRent24</span>
        <button
          onClick={copyCodeToClipboard}
          className="ml-2 px-4 py-2.5 bg-[#272A3C] hover:bg-[#292d3f] text-indigo-600 rounded "
        >
         <CopyIcon className="w-4 h-4 text-gray-200" />
        </button> 
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Nutze den Code <span className="font-semibold">uRent24</span> und profitiere von 3 Monaten kostenloser Vermietung. Gültig bis 01.07.2025.
      </p>
    </div>
    </div>
  );
};

export default FreeRentCard;
