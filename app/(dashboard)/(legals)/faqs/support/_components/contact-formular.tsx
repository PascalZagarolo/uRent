import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


const SupportContactFormular = () => {
    return ( 
        <div className="flex flex-col space-y-8">
            <div>
                <Label className="text-sm">
                    Deine Email-Adresse*
                </Label>
                <Input 
                className="w-full bg-[#191919] rounded-md dark:border-none"
                maxLength={100}
                />
            </div>
            <div>
                <Label className="text-sm">
                    Thema*
                </Label>
                <Input 
                className="w-full bg-[#191919] rounded-md dark:border-none"
                maxLength={100}
                />
            </div>
            <div>
                <Label>
                    Nachricht*
                </Label>
                <Textarea className="bg-[#191919] rounded-md dark:border-none h-[400px]"
                maxLength={2000} />
            </div>
            <div className="mt-4 ml-auto">
                <Button className="bg-indigo-800 hover:bg-indigo-900 hover:text-gray-300 text-gray-200">
                    Supportanfrage schicken
                </Button>
            </div>
            <div className="text-xs text-gray-200/60 whitespace-nowrap">
                * Alle Angaben werden vertraulich behandelt und nicht an dritte weitergegeben.
                Nach Prüfung deiner Anfrage werden, wir uns so schnell wie möglich bei dir melden.
            </div>
        </div>
     );
}
 
export default SupportContactFormular;