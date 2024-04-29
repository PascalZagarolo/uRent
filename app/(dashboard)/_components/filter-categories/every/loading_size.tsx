'use client'


import { PinIcon } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaBoxOpen } from "react-icons/fa";
import { GiResize } from "react-icons/gi";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import qs from "query-string"
import { MdCancel } from "react-icons/md";
import { useSavedSearchParams } from "@/store";




const LoadingSizeBar = () => {


    const router = useRouter();

    const {loading_l, loading_h, loading_b, ...params} = getSearchParamsFunction();
    

    

    const [currentLength, setCurrentLength] = useState<number | string>(loading_l);
    const [currentWidth, setCurrentWidth] = useState<number | string>(loading_b);
    const [currentHeight, setCurrentHeight] = useState<number | string>(loading_h);
    
    const pathname = usePathname();

    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if(loading_l){
            setCurrentLength(loading_l)
            changeSearchParams("loading_l", loading_l);
        }
        if(loading_h){
            setCurrentHeight(loading_h)
            changeSearchParams("loading_h", loading_h);
        }
        if(loading_b){
            setCurrentWidth(loading_b)
            changeSearchParams("loading_b", loading_b);
        }
      }, [])

      
  
      
      const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      useEffect(() => {
        changeSearchParams("loading_l", currentLength);
        if(!currentLength || Number(currentLength) === 0){
            setCurrentLength(null);
            deleteSearchParams("loading_l")
        }
      },[currentLength])

      useEffect(() => {
        changeSearchParams("loading_b", currentWidth);
        if(!currentWidth || Number(currentWidth) === 0){
            setCurrentWidth(null);
            deleteSearchParams("loading_b")
        }
      },[currentWidth])

      useEffect(() => {
        changeSearchParams("loading_h", currentHeight);
        if(!currentHeight || Number(currentHeight) === 0){
            setCurrentHeight(null);
            deleteSearchParams("loading_h")
        }
      },[currentHeight])
    
    const onClear = () => {
        
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                loading_l : null,
                loading_b : null,
                loading_h : null,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })
        setCurrentHeight(undefined)
        setCurrentLength(undefined)
        setCurrentWidth(undefined)
        router.push(url) 
    }





    return (
        <div className="items-center w-full">
           

            <div className="flex mt-4 w-full items-center">
                
                <div className="  items-center  ">
                    <Label className="flex justify-start items-center">
                        <p className="ml-2  font-semibold"> Länge </p>
                    </Label>

                    <Input
                        placeholder="in Metern"
                        className="p-2.5 rounded-md input: text-sm border mt-2.5
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0 w-full"
                         onChange={(e) => {
                            const rawValue = e.currentTarget.value;

                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentLength(cleanedValue)
                            
                        }}
                        
                        value={currentLength ? currentLength : ''}
                    />
                </div>
                
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                         <p className="ml-2  font-semibold"> Breite </p>
                    </Label>

                    <Input
                        placeholder="in Metern"
                        className="p-2.5 rounded-md input: text-sm border mt-2.5
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        type="decimal"
                        onChange={(e) => {
                            const rawValue = e.currentTarget.value;


                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentWidth(cleanedValue)
                            
                        }}
                        
                        value={currentWidth ?  currentWidth : ''}
                    />
                </div>
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                         <p className="ml-2  font-semibold"> Höhe
                         </p><MdCancel className="w-4 h-4 text-rose-600 ml-auto cursor-pointer" onClick={onClear} />
                    </Label>

                    <Input
                        placeholder="in Metern"
                        className="p-2.5 rounded-md input: text-sm border mt-2 
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        type="decimal"
                        onChange={(e) => {
                            const rawValue = e.currentTarget.value;


                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentHeight(cleanedValue)
                            
                        }}
                        
                        value={currentHeight ? currentHeight : ''}
                    />
                </div>
            </div>
            <RadioGroup className="mt-2" defaultValue="PS">
                
            </RadioGroup>
            
            <Button onClick={() => {}} className="w-full bg-[#1B1F2C] hover:bg-[#222738] dark:text-gray-100"

                disabled={
                    //@ts-ignore 
                      !!isNaN(Number(Math.round(currentLength))) || !!isNaN(Number(Math.round(currentWidth))) || !!isNaN(Number(Math.round(currentHeight))) 
                    || (currentLength == loading_l) && (currentWidth == loading_b) && (currentHeight == loading_h) ||
                    (currentLength == 0) && (currentWidth == 0) && (currentHeight == 0)
                    }
            >
                <span className="">Laderaumangeben</span>
                
            </Button>
                
        </div>
    );
};
export default LoadingSizeBar;