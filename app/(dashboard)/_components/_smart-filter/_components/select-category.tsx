'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SelectCategoryDetailForm = () => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentCategory = searchParams.get("category");
    const currentTitle = searchParams.get("title");

    const onClick = (category: string) => {

        const newCategory = currentCategory === category ? null : category;

        if(newCategory === null) {
            const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    title: currentTitle,
                    category: null
                }
            }, { skipNull: true, skipEmptyString: true });
            router.push(url);
        } else {
            const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    title: currentTitle,
                    category: newCategory
                }
            }, { skipNull: true, skipEmptyString: true });
            router.push(url);
        }

        
        router.refresh();
    }

    const onReset = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                currentCategory : null
            }
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);

    }

    return ( 
        <RadioGroup className="flex flex-wrap text-sm" defaultValue={currentCategory || "all"}>
                                
                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="all" onClick={onReset}/>
                                    <Label className="ml-1 font-semibold">Alle</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="PKW" onClick={() => {onClick("PKW")}}/>
                                    <Label className="ml-1 font-semibold">PKW</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="LKW" onClick={() => {onClick("LKW")}}/>
                                    <Label className="ml-1 font-semibold">LKW</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="LAND" onClick={() => {onClick("LAND")}} />
                                    <Label className="ml-1 font-semibold">Land</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="BAU" onClick={() => {onClick("BAU")}} />
                                    <Label className="ml-1 font-semibold">Bau</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="CARAVAN" onClick={() => {onClick("CARAVAN")}} />
                                    <Label className="ml-1 font-semibold">Wohnmobile</Label>
                                </div>

                                <div className="flex items-center mr-4 mb-2">
                                    <RadioGroupItem value="TRAILOR" onClick={() => {onClick("TRAILOR")}} />
                                    <Label className="ml-1 font-semibold">Anhänger</Label>
                                </div>
                            </RadioGroup>
     );
}
 
export default SelectCategoryDetailForm;