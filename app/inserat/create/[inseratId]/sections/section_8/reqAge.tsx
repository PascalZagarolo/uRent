'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat } from "@/db/schema";



import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface RequiredAgeCreationProps {
  currentValue : string;
  setCurrentValue : (value) => void;
}

const RequiredAgeCreation: React.FC<RequiredAgeCreationProps> = ({
    currentValue,
    setCurrentValue
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    

    return ( 
        <div className="w-full">
            <div className="w-full">
            <Label className="flex justify-start items-center ">
                        <p className=" font-semibold"> Mindestalter </p>
                    </Label>
                    <p className=" text-xs dark:text-gray-200/80"> Wie alt müssen deine Mieter sein? </p>
        <Select
          onValueChange={(seats) => {
            setCurrentValue(Number(seats));
          }}
          value={currentValue ? String(currentValue) : null}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading} defaultValue={currentValue} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              defaultValue={inserat.reqAge as any}
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value={null}>Beliebig</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="19">19</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="21">21</SelectItem>
            <SelectItem value="22">22</SelectItem>
            <SelectItem value="23">23</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="26">26</SelectItem>
            <SelectItem value="27">27</SelectItem>
            <SelectItem value="28">28</SelectItem>
            <SelectItem value="29">29</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default RequiredAgeCreation;