'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Inserat } from "@prisma/client";
import axios from "axios";
import { CarFront, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SelectCategoryInseratProps {
  inserat: Inserat;
}

const SelectCategoryInserat: React.FC<SelectCategoryInseratProps> = ({
  inserat
}) => {


  const formSchema = z.object({
    category: z.string({
      required_error: "Bitte wähle eine Kategorie aus"
    })
  })

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: inserat.category || "PKW"
    }
  })

  const [currentCategory, setCurrentCategory] = useState<Category>(inserat.category || "PKW");


  const onSubmit = (selectedValue: Category) => {
    try {

      setCurrentCategory(selectedValue);

      const values = {
        category: selectedValue
      }

      setIsLoading(true);
      axios.patch(`/api/inserat/${inserat.id}`, values);
      toast.success("Kategorie erfolgreich gespeichert als : " + values.category);
      setTimeout(() => {
        router.refresh();
      }, 400)
    } catch {
      toast.error("Fehler beim Speichern der Kategorie");
    } finally {
      setIsLoading(false);
    }
  }

// 

  return (
    <div className="  flex  w-full">



      <div className="w-full">
        <Label>Fahrzeugklasse</Label>
        <Select
          onValueChange={(selectedValue: Category) => {
            onSubmit(selectedValue);
          }}
          defaultValue={inserat.category || "PKW"}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md w-1/3" 
          disabled={isLoading} defaultValue={inserat.category || "PKW"} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              defaultValue={inserat.category || "PKW"}
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="PKW">PKW</SelectItem>
            <SelectItem value="TRANSPORT">Transporter</SelectItem>
            <SelectItem value="LKW">LKW</SelectItem>
            <SelectItem value="LAND">Landwirtschaft</SelectItem>
            <SelectItem value="BAU">Baumaschinen</SelectItem>
            <SelectItem value="TRAILOR">Anhänger</SelectItem>
            <SelectItem value="CARAVAN">Wohnwagen</SelectItem>
          </SelectContent>
        </Select>
      </div>





    </div>
  );
}

export default SelectCategoryInserat;