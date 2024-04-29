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




const AmountBar = () => {
    const amount = useSearchParams().get("amount");
    const router = useRouter();


    const [currentValue, setCurrentValue] = useState(Number(amount));
    const pathname = usePathname();
    const params = getSearchParamsFunction("amount");
    const freeMilesRef = useRef();

    const formSchema = z.object({
        freeMiles: z.preprocess(
            (args) => (args === '' ? undefined : args),
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
          changeSearchParams("amount", amount);
          setCurrentValue(Number(amount));
        }
      }, [])

      useEffect(() => {
        if(currentValue) {
          changeSearchParams("amount", currentValue);
        }
      },[currentValue])
  
      
      const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      const setStart = (reqAge : string) => {
        
         if(!reqAge) {
          deleteSearchParams("amount");
          setCurrentValue(null);
         } else {
           //@ts-ignore
           changeSearchParams("amount", amount);
           setCurrentValue(Number(amount));
         }
          
      }

    const onSubmit = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                amount: currentValue,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }

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
                        <div className="ml-2 font-semibold flex items-center w-full text-gray-200"> <FaLayerGroup  className="mr-2" /> Stückzahl
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
                                                placeholder="Stückzahl eingeben"
                                                className="p-2.5 rounded-md input: text-sm border mt-2  
                                                border-none dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0 w-full"
                                                onChange={(e) => {
                                                    setCurrentValue(Number(e.target.value));       
                                                }}
                                                
                                                value={currentValue || ''}
                                                
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    />
                    <Button className="w-full mt-2 bg-[#1B1F2C] hover:bg-[#202534] text-gray-100" type="submit"
                        disabled={!currentValue || Number(amount) === currentValue}>
                        Anzahl angeben
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default AmountBar;