'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarFront, Link } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";

const SelectCategoryInserat = () => {

    

    

    const formSchema = z.object({
      category : z.string({
        required_error: "Bitte wähle eine Kategorie aus"
      })
    })

   
      const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema)
      })
   

    const onSubmit = (values : z.infer<typeof formSchema>) => {
      console.log(values)
    }
    
    return (
        <div className="ml-4 mt-8 flex items-center">
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                  <SelectItem value="pkw">PKW</SelectItem>
                  <SelectItem value="lkw">LKW</SelectItem>
                  <SelectItem value="land">Landwirtschaft</SelectItem>
                  <SelectItem value="bau">Baumaschinen</SelectItem>
                  <SelectItem value="trailor">Anhänger</SelectItem>
                  <SelectItem value="caravan">Wohnwagen</SelectItem>
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