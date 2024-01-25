'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import axios from "axios";
import { CarFront, Link } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";



const Sitze = ({
  
}) => {

    const params = useParams();


    const formSchema = z.object({
      amount : z.number({
        required_error: "Bitte wähle die Anzahl der Sitzplätze aus"
      })
    })

    const [isLoading, setIsLoading] = useState(false);

   
      const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
          amount : 2
        }
      })
   

    const onSubmit = (values : z.infer<typeof formSchema>) => {
      try {
        setIsLoading(true);
        axios.patch(`/api/inserat/${params.inseratId}`, values);
        toast.success("Kategorie erfolgreich gespeichert");
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sitzplätze</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={"2"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle die Menge der Sitzplätze aus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
        <Button type="submit" className="bg-blue-800">Anzahl auswählen</Button>
      </form>
    </Form>
        </div>
    );
}

export default Sitze;