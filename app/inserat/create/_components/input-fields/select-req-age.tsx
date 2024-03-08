'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Inserat } from "@prisma/client";


import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface RequiredAgeProps {
    inserat : Inserat;
}

const RequiredAge: React.FC<RequiredAgeProps> = ({
    inserat
}) => {

    const [currentAge, setCurrentAge] = useState(inserat.reqAge);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: number) => {
        try {
    
            setCurrentAge(selectedValue);
    
          const values = {
            reqAge: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.reqAge);
          setTimeout(() => {
            router.refresh();
          }, 400)
        } catch {
          toast.error("Fehler beim Speichern der Kategorie");
        } finally {
          setIsLoading(false);
        }
      }

    return ( 
        <div className="w-full">
            <div className="w-full">
            <Label className="flex justify-start items-center ">
                        <User2Icon className="w-4 h-4" /><p className="ml-2 font-semibold"> Mindestalter </p>
                    </Label>
                    <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80  truncate"> Wie alt müssen deine Mieter sein? </p>
        <Select
          onValueChange={(seats) => {
            onSubmit(Number(seats));
          }}
          defaultValue={String(inserat.reqAge) || "18"}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading} defaultValue={inserat.reqAge} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              defaultValue={inserat.reqAge}
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="17">17</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="19">19</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="21">21</SelectItem>
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
 
export default RequiredAge;