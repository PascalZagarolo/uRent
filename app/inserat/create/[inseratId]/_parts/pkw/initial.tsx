'use client'

import { useDebounce } from "@/hooks/use-debounce";
import { AlertCircle, MapIcon, MapPin, PinIcon } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Address, Inserat } from "@prisma/client";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";


interface InitialFormProps {
    inital: Date;
}

const InitialForm: React.FC<InitialFormProps> = ({
    inital
}) => {


    const router = useRouter();
  
    const params = useParams();

    

    const [currentInitial, setcurrentInitial] = useState<Date | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [validValue, setValidValue] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    
    function formatDateToMMYYYY(date) {
        
        const month = date?.getMonth() + 1; 
        const year = date?.getFullYear();
    
        
        const dateString = `${month.toString().padStart(2, '0')}/${year}`;

        if(!date) {
            return "";
        }
    
        return dateString;
    }



    const onSubmit = () => {

        const values = {
            initial : currentInitial
        }

        try {
            setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/pkw`, values);
          toast.success("Anzahl der PS gespeichert : " + values.initial.toDateString());
          setTimeout(() => {
            router.refresh();
          }, 400)

        } catch {
            toast.error("Etwas ist schief gelaufen...");
        }

    }

    //! fix cant copy values in handleInputChange
    const handleInputChange = (event) => {
        const { value } = event.target;
    
        setInputValue(value);
    
        if (value.trim() === '') { 
            setValidValue(false);
            setcurrentInitial(null);
            return;
        }
    
        const regex = /^(0[1-9]|1[0-2])\/(19\d{2}|[2-9]\d{3})$/;
        const isValidDate = regex.test(value);
        const isYearValid = parseInt(value.split('/')[1]) >= 1900;
        setValidValue(!isValidDate || !isYearValid);
    
        if (isValidDate && isYearValid) {
            const [month, year] = value.split('/').map(Number);
            const newInitial = new Date(year, month - 1, 1);
            setcurrentInitial(newInitial);
        }
    };
    


    return (
        <div className="items-center w-full">
        <div className="flex mt-4 w-full">
            <div className="items-center">
                <Label className="flex justify-start items-center">
                    <PinIcon className="w-4 h-4" /> <p className="ml-2 font-semibold"> Baujahr </p>
                </Label>
                <Input
                    placeholder="MM/YYYY"
                    className="p-2.5 2xl:pr-16 xl:pr-4 rounded-md input:text-sm border mt-2 border-black dark:bg-[#151515] input:justify-start dark:focus-visible:ring-0"
                    value={inputValue ||  formatDateToMMYYYY(currentInitial) }
                    onChange={handleInputChange}
                />
            </div>
        </div>
        <Button onClick={onSubmit} className="mt-8 dark:bg-[#000000] dark:hover:bg-[#0c0c0c] dark:text-gray-100" 
        disabled={validValue || currentInitial?.toDateString() === inital.toDateString() || !currentInitial}>
            <span className="">Baujahr angeben</span>
        </Button>
        
    </div>
    );
};
export default InitialForm;