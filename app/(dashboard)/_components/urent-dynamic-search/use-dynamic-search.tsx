import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const DynamicSearchConfirm = () => {
    return ( 
        <div className="flex items-center gap-x-2 justify-center bg-indigo-800 p-2 rounded-md">
            <Label className="font-semibold">
                Dynamische Suche nutzen
            </Label>
            <div>
                <Switch
                className="mt-1" 
                onCheckedChange={(checked) => {
                    if(checked) {
                        console.log("ja");
                        
                    } else {
                        console.log("nein");
                    }
                }}
                />
            </div>
        </div>
    );
}
 
export default DynamicSearchConfirm;