import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSavedSearchParams } from "@/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const UseUdsConfirm = () => {

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    

    const linkSearchparams = useSearchParams();

    const initialDynamic = linkSearchparams.get("dynamicSearch");
    const initialReqTime = linkSearchparams.get("reqTime");
    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    useEffect(() => {
        if(initialDynamic === "true") {
            changeSearchParams("dynamicSearch", "true");
        }

        if(initialReqTime) {
            changeSearchParams("reqTime", initialReqTime);
        }
    },[initialDynamic, initialReqTime])

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
                checked={currentObject["dynamicSearch"] === "true" ? true : false}
                />
            </div>
      
    );
}
 
export default UseUdsConfirm;