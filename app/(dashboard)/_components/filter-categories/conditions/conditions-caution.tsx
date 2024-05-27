'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import qs from "query-string"
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { MdCancel } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { useSavedSearchParams } from "@/store";
import { GrMoney } from "react-icons/gr";




const CautionBar = () => {
    const amount = useSearchParams().get("caution");
    const router = useRouter();


    const [currentValue, setCurrentValue] = useState<string | number>(Number(amount));
    const pathname = usePathname();
    const params = getSearchParamsFunction("caution");
    const freeMilesRef = useRef();

    const formSchema = z.object({
        freeMiles: z.preprocess(
            (args) => (args === '' ? null : args),
            z.coerce
                .number({ invalid_type_error: 'Preis muss eine Nummer sein' })
                .optional()
        ),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            freeMiles: Number(amount) || null
        }
    })

    useEffect(() => {
        if(amount) {
          changeSearchParams("caution", amount);
          setCurrentValue(Number(amount));
        }
      }, [])

      useEffect(() => {
        if(currentValue) {
          changeSearchParams("caution", currentValue);
        }

        if(!currentValue) {
            deleteSearchParams("caution");
          setCurrentValue(null);
        }
      },[currentValue])
  
      
      const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      

    

    const onClear = () => {
        setCurrentValue(null);

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                amount: null,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })
        freeMilesRef.current = null;
        router.push(url)
    }

    const { isSubmitting, isValid } = form.formState

    return (
        <div className=" ">
            <Form {...form}>
                <form onSubmit={() => {}}>
                    <FormLabel className="flex justify-start items-center">
                        <div className="ml-2 font-semibold flex items-center w-full text-gray-200"> <GrMoney   className="mr-2" /> 
                        Kaution
                            <MdCancel className="w-4 h-4 text-rose-600 ml-auto cursor-pointer" onClick={onClear} />
                        </div>
                    </FormLabel>

                    <FormField
                        control={form.control}
                        name="freeMiles"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="freeMiles"
                                render={({ field }) => (
                                    <FormItem className="mt-2 ">
                                        <FormControl>
                                            <Input
                                            
                                                placeholder="Kautionsbetrag.."
                                                className="p-2.5 rounded-md input: text-sm border mt-2  
                                                border-none dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0 w-full"
                                                onChange={(e) => {
                                                    const newValue = e.target.value.replace(/[^0-9]/g, '');
                                                    setCurrentValue(newValue);  
                                                }}
                                                
                                                value={currentValue ? currentValue : ""}
                                                
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    />
                    
                </form>
            </Form>
        </div>
    );
}

export default CautionBar;