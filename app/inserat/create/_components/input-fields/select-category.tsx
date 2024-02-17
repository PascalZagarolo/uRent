'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  inserat : Inserat;
}

const SelectCategoryInserat: React.FC<SelectCategoryInseratProps> = ({
  inserat
}) => {


    const formSchema = z.object({
      category : z.string({
        required_error: "Bitte wähle eine Kategorie aus"
      })
    })

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

   
      const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
          category : inserat.category || "PKW"
        }
      })

      const [currentCategory, setCurrentCategory] = useState<Category>(inserat.category || "PKW");
   

    const onSubmit = () => {

      const values = {
        category : currentCategory
      }

      try {
        setIsLoading(true);
        axios.patch(`/api/inserat/${inserat.id}`, values);
        toast.success("Kategorie erfolgreich gespeichert");
        setTimeout(() => {
          router.refresh();
        }, 1000)
      } catch {
        toast.error("Fehler beim Speichern der Kategorie");
      } finally {
        setIsLoading(false);
      }
    }

    
    
    return (
        <div className=" mt-4 flex items-center">
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[50%]">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fahrzeugklasse</FormLabel>
              <Select onValueChange={(selectedValue : Category) => {setCurrentCategory(selectedValue)}} defaultValue={inserat.category || "PKW"}>
                <FormControl>
                  <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200">
                    <SelectValue placeholder="Wähle die Art deines Fahrzeuges aus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark:bg-[#000000] border-white">
                  <SelectItem value="PKW">PKW</SelectItem>
                  <SelectItem value="TRANSPORT">Transporter</SelectItem>
                  <SelectItem value="LKW">LKW</SelectItem>
                  <SelectItem value="LAND">Landwirtschaft</SelectItem>
                  <SelectItem value="BAU">Baumaschinen</SelectItem>
                  <SelectItem value="TRAILOR">Anhänger</SelectItem>
                  <SelectItem value="CARAVAN">Wohnwagen</SelectItem>
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-white dark:bg-[#000000] dark:hover:bg-gray-900 dark:text-gray-100 mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-gray-900 hover:bg-gray-200" 
        disabled={currentCategory == inserat.category}>
          Kategorie auswählen
          </Button>
      </form>
    </Form>
        </div>
    );
}

export default SelectCategoryInserat;