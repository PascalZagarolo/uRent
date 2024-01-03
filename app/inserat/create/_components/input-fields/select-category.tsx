'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarFront, Link } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

const SelectCategoryInserat = () => {


    const formSchema = z.object({
      category : z.string({
        required_error: "Bitte wähle eine Kategorie aus"
      })
    })

    const [isLoading, setIsLoading] = useState(false);

   
      const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema)
      })
   

    const onSubmit = (values : z.infer<typeof formSchema>) => {
      console.log(values);
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle die Art deines Fahrzeuges aus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PKW">PKW</SelectItem>
                  <SelectItem value="LKW">LKW</SelectItem>
                  <SelectItem value="LAND">Landwirtschaft</SelectItem>
                  <SelectItem value="BAU">Baumaschinen</SelectItem>
                  <SelectItem value="TRAILOR">Anhänger</SelectItem>
                  <SelectItem value="CARAVAN">Wohnwagen</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
               
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-800">Kategorie auswählen</Button>
      </form>
    </Form>
        </div>
    );
}

export default SelectCategoryInserat;