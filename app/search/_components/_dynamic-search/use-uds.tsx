import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSavedSearchParams } from "@/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { LuCalendarSearch } from "react-icons/lu";

const UseUdsConfirm = () => {
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const linkSearchparams = useSearchParams();
    const initialDynamic = linkSearchparams.get("dynamicSearch");
    const initialReqTime = linkSearchparams.get("reqTime");
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);

    useEffect(() => {
        if(initialDynamic === "true") {
            changeSearchParams("dynamicSearch", "true");
        }

        if(initialReqTime) {
            changeSearchParams("reqTime", initialReqTime);
        }
    },[initialDynamic, initialReqTime]);

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

    const isDynamicActive = currentObject["dynamicSearch"] === "true";

    return (
        <div className="flex items-center gap-2">
            <Switch
                id="dynamic-search-toggle"
                className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-800"
                onCheckedChange={(checked) => {
                    if(checked) {
                        onConfirm();
                    } else {
                        onNonConfirm();
                    }
                }}
                checked={isDynamicActive}
            />
            <Label 
                htmlFor="dynamic-search-toggle" 
                className={`text-xs font-medium cursor-pointer transition-colors ${
                    isDynamicActive ? 'text-indigo-400' : 'text-gray-400'
                }`}
            >
                {isDynamicActive ? 'Aktiviert' : 'Deaktiviert'}
            </Label>
            {isDynamicActive && 
                <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></div>
            }
        </div>
    );
}
 
export default UseUdsConfirm;