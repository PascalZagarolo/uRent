"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"

import { format, set } from 'date-fns';
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { values } from "lodash"
import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import SearchRent from "./search-rent";
import { User } from "@prisma/client";

interface BookingsProps {
  user : User[];
}


const Bookings = () => {

    const [currentStart, setCurrentStart] = useState(new Date());
    const [currentEnd, setCurrentEnd] = useState(new Date());

    const formSchema = z.object({
        start: z.date({
          required_error: "A date of birth is required.",
        }), end: z.date({
            required_error: "A date of birth is required.",
        }), content: z.string().optional()
      })
       
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            start: new Date(),
            end: new Date(),
            content: ""

        }
    })
      
       
        const onSubmit = (valus : z.infer<typeof formSchema>) => {
            console.log(values)
        }

    return ( 
        <Dialog>
            <DialogTrigger className="w-[240px]">
                <Button className="w-full bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-200">
                    <CalendarCheck2 className="mr-2 h-4 w-4"/> Buchungen verwalten
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div>
                  <div>
                    <h3 className="font-bold flex mb-8">
                     <CalendarClockIcon className="mr-2"/> Buchungen verwalten
                    </h3>
                  </div>
                    <div className="flex">
                    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-x-8">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Anfangsdatum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Enddatum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div>
            <SearchRent/>
          </div>
            <div>
              <span className="font-semibold text-base flex">
               <BookOpenCheck className="mr-2"/>  Anmerkungen:
              </span>
                      <FormField 
                      control={form.control}
                      name="content"
                      render={({field}) => (
                        <FormItem className="mt-2 ">
                          <Textarea
                          className="focus:ring-0 focus:outline-none focus:border-0 bg-gray-200 border border-gray-400"
                        />
                        </FormItem>
                      )}
                      />
            </div>
          <Button type="submit" 
          className="bg-white border border-gray-300 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:bg-gray-200">
            Buchung hinzufügen</Button>
        </form>
      </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default Bookings;