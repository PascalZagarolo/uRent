'use client'

import { Label } from "@/components/ui/label";
import { GiGrowth, GiTeamIdea } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";

const WorkWithUs = () => {
    return ( 
        <div>
            <div>
                <h3 className="font-semibold text-md">
                    Wieso wir?
                </h3>
            </div>
            <div className="mt-2 sm:flex  sm:justify-between space-y-4 sm:space-y-0 sm:gap-8">

                <div className="dark:bg-[#141414] p-8 rounded-md">
                    <div className="flex justify-center pb-8">
                       <GiTeamIdea className="w-8 h-8" />
                    </div>
                    <Label className="font-semibold">
                    Innovative Atmosphäre
                    </Label>
                    <div className="mt-4  text-sm">
                    Bei uns werden Kreativität und Innovation großgeschrieben. 
                    Wir ermutigen unsere Mitarbeiterinnen und Mitarbeiter, 
                    neue Ideen einzubringen und Lösungen zu entwickeln, die das Mieten revolutionieren.
                    </div>
                </div>

                <div className="dark:bg-[#141414] p-8 rounded-md ">
                    
                    <div className="flex justify-center pb-8">
                    <GiGrowth className="w-8 h-8" />
                    </div>
                    <Label className="font-semibold">
                    Wachstumschancen
                    </Label>
                    <div className="mt-4 text-sm">
                    Wir bieten herausfordernde und spannende Karrieremöglichkeiten in einem schnell wachsenden Markt. 
                    Bei uns haben Sie die Möglichkeit, 
                    sich persönlich und beruflich weiterzuentwickeln und Ihre Fähigkeiten kontinuierlich auszubauen.
                    </div>
                </div>

                <div className="dark:bg-[#141414] p-8 rounded-md ">
                <div className="flex justify-center pb-8">
                    <RiTeamFill  className="w-8 h-8" />
                    </div>
                    <Label className="font-semibold">
                    Teamorientierte Kultur
                    </Label>
                    <div className="mt-4  text-sm">
                    Wir glauben an die Kraft des Teamworks und fördern eine Kultur der Zusammenarbeit, 
                    in der jeder Einzelne geschätzt wird und dazu beiträgt, unsere gemeinsamen Ziele zu erreichen.
                    </div>
                </div>

            </div>
        </div>
     );
}
 
export default WorkWithUs;