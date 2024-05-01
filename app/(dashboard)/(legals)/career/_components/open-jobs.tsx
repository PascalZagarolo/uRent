import { Separator } from "@/components/ui/separator";
import { GrUserWorker } from "react-icons/gr";

const OpenJobs = () => {
    return ( 
        <div>
            <div>
                <h3 className="flex justify-center text-xl font-bold gap-x-2  items-center">
                <Separator className="w-1/4 bg-[#353535] mr-8 h-[0.5px]" />  
                <GrUserWorker className="w-4 h-4" />  Offene Stellen
                <Separator className="w-1/4 bg-[#353535] ml-8 h-[0.5px]" />
                </h3>
            </div>
            <div className="text-sm bg-indigo-900 p-8 rounded-md">
                Aktuell haben wir keine offenen Stellen,
                aber wir sind immer offen für Bewerbungen,
                von motivierten Personen, die unsere Mission teilen. <br/><br/>
                <div className="flex justify-center font-semibold">
                Senden Sie ihre Bewerbung gerne an karriere@urent-rental.de
                </div>
            </div>
        </div>
     );
}
 
export default OpenJobs;