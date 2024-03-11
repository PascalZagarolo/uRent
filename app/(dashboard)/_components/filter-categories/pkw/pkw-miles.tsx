'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbSteeringWheel } from "react-icons/tb";
import { z } from "zod";
import qs from "query-string"
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { MdCancel } from "react-icons/md";




const FreeMilesBar = () => {
    const freeMiles = useSearchParams().get("freeMiles");
    const router = useRouter();


    const [currentValue, setCurrentValue] = useState(Number(freeMiles));
    const pathname = usePathname();
    const params = getSearchParamsFunction("freeMiles");
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
            freeMiles: Number(freeMiles) || null
        }
    })

    const onSubmit = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                freeMiles: currentValue,
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
                freeMiles: null,
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
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormLabel className="flex justify-start items-center">
                        <div className="ml-2 font-semibold flex items-center w-full"> <TbSteeringWheel className="mr-2" /> Freikilometer
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
                                                placeholder="in Kilometer"
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
                        disabled={!currentValue || Number(freeMiles) === currentValue}>
                        Freikilometer angeben
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default FreeMilesBar;