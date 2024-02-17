'use client';


import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat, PkwAttribute } from "@prisma/client";

import axios from "axios";

import { useParams } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


interface SitzeProps {
  inserat : Inserat & { pkwAttribute : PkwAttribute }
}

const Sitze: React.FC<SitzeProps> = ({
  inserat
}) => {

    const params = useParams();

    

    const formSchema = z.object({
      sitze : z.number({
        required_error: "Bitte wähle die Anzahl der Sitzplätze aus"
      })
    })

    const [isLoading, setIsLoading] = useState(false);

   
      const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
          sitze : inserat.pkwAttribute?.sitze
        }
      })
   

    const onSubmit = (sitze : number) => {

      const values = {
        sitze : sitze
      }

      try {
        setIsLoading(true);
        axios.patch(`/api/inserat/${params.inseratId}/pkw`, values);
        toast.success("Sitzplätze erfolgreich gespeichert");
      } catch {
        toast.error("Fehler beim Speichern der Sitzplätze");
        
      } finally {
        setIsLoading(false);
      }

    }
    
    return (
        <div className=" mt-4 flex items-center ">
            <Form {...form}>
      <form onSubmit={() => {}} className="w-[50%] ">
        <FormField
          control={form.control}
          name="sitze"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sitzplätze</FormLabel>
              <Select onValueChange={(selectedValue) => {onSubmit(Number(selectedValue))}} defaultValue={inserat.pkwAttribute?.sitze.toString()}>
                <FormControl>
                  <SelectTrigger className="min-w-[200px] "  >
                    <SelectValue placeholder="Wähle die Menge der Sitzplätze aus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent >
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
               
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
      </form>
    </Form>
    
        </div>
    );
}

export default Sitze;