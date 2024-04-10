import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FaDatabase } from "react-icons/fa6";

const DataUsage = () => {
    return (
        <div>
            <h1 className="font-semibold flex">
                <FaDatabase className="w-4 h-4 mr-2" /> Datennutzung
            </h1>
            <div className="mt-4 space-y-4">
                <div className="flex items-center gap-x-2">

                    <div>
                        <div>
                            Newsletter und Werbe-Emails
                        </div>
                        <div className="flex gap-4 mt-2">
                            <Checkbox className="w-4 h-4" />
                            <Label className="sm:w-1/2 font-normal text-sm">
                                Ich möchte gerne per E-Mail von uRent Angebote erhalten, an Umfragen teilnehmen
                                und Informationen über Produkte und Dienstleistungen von uRent erhalten.</Label>
                        </div>
                    </div>


                </div>

                <div className="flex items-center gap-x-2">

                    <div>
                        <div>
                            Marktforschung
                        </div>
                        <div className="flex gap-4 mt-2">
                            <Checkbox className="w-4 h-4" />
                            <Label className="sm:w-1/2 font-normal text-sm">
                                Ich möchte an der uRent-Marktforschung teilnehmen, um die Seite zu verbessern
                                und meine Erfahrungen zu teilen.</Label>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
}

export default DataUsage;