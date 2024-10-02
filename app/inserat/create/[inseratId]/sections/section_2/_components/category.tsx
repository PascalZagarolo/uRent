'use client';


import { Label } from "@/components/ui/label";
import { Select, SelectContent,  SelectItem,  SelectTrigger, SelectValue } from "@/components/ui/select";
import { categoryEnum, CategoryEnumRender, inserat } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


interface CategoryInseratCreationProps {
  thisInserat: typeof inserat.$inferSelect;
  currentCategory: typeof CategoryEnumRender;
  setCurrentCategory: (value) => void;
}

const CategoryInseratCreation: React.FC<CategoryInseratCreationProps> = ({
  thisInserat,
  currentCategory,
  setCurrentCategory
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
      category: thisInserat.category || "PKW"
    }
  })




  

// 

  return (
    <div className="  flex  w-full">



      <div className="w-full">
        <Label>Fahrzeugklasse *</Label>
        <Select
        //@ts-ignore
          onValueChange={(selectedValue : typeof CategoryEnumRender) => {
            setCurrentCategory(selectedValue);
          }}
          defaultValue={thisInserat.category || "PKW"}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading} defaultValue={thisInserat.category || "PKW"} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              defaultValue={thisInserat.category || "PKW"}
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="PKW">PKW</SelectItem>
            <SelectItem value="TRANSPORT">Transporter</SelectItem>
            <SelectItem value="LKW">LKW</SelectItem>
            <SelectItem value="TRAILER">Anhänger</SelectItem>
          </SelectContent>
        </Select>
      </div>





    </div>
  );
}

export default CategoryInseratCreation;