'use client'

import { ArrowRight, CopyIcon } from "lucide-react";
import Countdown from "./countdown";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const WhyURent = () => {
  const targetDate = new Date("2024-12-30T00:00:00");

  const router = useRouter();

  return (
    <div className="w-full h-full mx-auto bg-gradient-to-br bg-[#1B1E2C] flex flex-row items-center justify-center rounded-lg shadow-lg p-8 text-center text-white">
      <div className="max-w-lg ">
        {/* <div className="mb-4 flex flex-row items-center space-x-4 mt-4">
        <div className="text-lg font-semibold">NUR NOCH</div>
        <Countdown targetDate={targetDate} />
      </div> */}
      
      <h3 className="text-6xl font-bold mb-4">Warum uRent?</h3>
      

      <div className="bg-[#161822] p-4 rounded-md flex shadow-lg justify-center items-center gap-2">
       
        <Button className="bg-[#272A3C] hover:bg-[#2e3146] text-gray-200 px-4 py-1 rounded-md font-bold text-lg" onClick={() => { router.push("/why-urent")}}>Mehr Erfahren <ArrowRight className="w-6 h-6 ml-2" /></Button>
        
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Erfahre was uRent von anderen Lösungen & Plattformen abhebt und warum du & dein Geschäft von uRent profitieren.
      </p>
    </div>
    </div>
  );
};

export default WhyURent;
