import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSavedSearchParams } from "@/store";

const DynamicSearchConfirm = () => {

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const onConfirm = () => {
        changeSearchParams("dynamicSearch", "true");
        deleteSearchParams("periodBegin");
        deleteSearchParams("periodEnd");
        deleteSearchParams("endTime");
        deleteSearchParams("startTime");
    }

    const onNonConfirm = () => {
        deleteSearchParams("dynamicSearch");
        deleteSearchParams("startDateDynamic");
        deleteSearchParams("endDateDynamic");
        deleteSearchParams("reqTime");
        deleteSearchParams("startTime");
        deleteSearchParams("endTime");
    }

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
                        onConfirm();
                        
                    } else {
                        onNonConfirm();
                    }
                }}
                />
            </div>
        </div>
    );
}
 
export default DynamicSearchConfirm;