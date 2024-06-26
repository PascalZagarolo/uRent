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

import { values } from "lodash"
import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import SearchRent from "./search-rent";
import toast from "react-hot-toast";
import { usesearchUserByBookingStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { userTable } from "@/db/schema";

interface BookingsProps {
  user: typeof userTable.$inferSelect;
}


const Bookings = () => {

  const [currentStart, setCurrentStart] = useState(new Date());
  const [currentEnd, setCurrentEnd] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false)
  const selectedUser = usesearchUserByBookingStore((user) => user.user)

  const params = useParams();
  const router = useRouter();

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


  const onSubmit = (value: z.infer<typeof formSchema>) => {
    try {
      console.log("getriggered")
      setIsLoading(true);
      const values = {
        content : value.content ? value.content : "",
        start: currentStart,
        end: currentEnd,
        userId : selectedUser.id
      }
      axios.post(`/api/booking/${params.inseratId}`, values);
      toast.success("Buchung hinzugefügt");
      
    } catch(err) {
      toast.error("Fehler beim hinzufügen der Buchung", err)
    } finally {
      setTimeout(() => {
        router.refresh();
      }, 1000)
      setIsLoading(false);
    }
  }

  

  return (
    <Dialog>
      <DialogTrigger className=" w-full xl:w-[240px]">
        <Button className="w-full bg-white text-gray-900 border border-gray-900 hover:bg-gray-200">
          <PlusSquare className="mr-2 h-4 w-4" /> Buchungen hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#0F0F0F] dark:border-gray-100 dark:border-none">
        <div>
          <div>
            <h3 className="font-bold flex mb-8">
              <CalendarClockIcon className="mr-2" /> Buchungen verwalten
            </h3>
          </div>
          <div>
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
                            <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c] dark:border-gray-100">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[200px] pl-3 text-left font-normal dark:border-none",
                                  !field.value && "text-muted-foreground  "
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP") 
                                ) : (
                                  <span>Wähle ein Datum</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              className="dark:bg-[#0a0a0a] dark:border-gray-100 dark:border"
                              onSelect={(date) => {
                                field.onChange(date); 
                                setCurrentStart(date);
                              }}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
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
                            <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c] dark:border-gray-100">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[200px] pl-3 text-left font-normal dark:border-none",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Wähle ein Datum</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              className="dark:bg-[#0a0a0a] dark:border-gray-100 dark:border"
                              onSelect={(date) => {
                                const nextDay = new Date(date);
                                nextDay.setDate(nextDay.getDate() + 1);
                                field.onChange(nextDay);
                                setCurrentEnd(nextDay);
                              }}
                              disabled={(date) =>
                                date < currentStart || date < new Date("1900-01-01")
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
                  <SearchRent />
                </div>
                <div>
                  <span className="font-semibold text-base flex">
                    <BookOpenCheck className="mr-2" />  Anmerkungen:
                  </span>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="mt-2 ">
                        <Textarea
                          className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                            dark:bg-[#0a0a0a]"
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogTrigger asChild>
                <Button 
                  className="bg-white border border-gray-300 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                   hover:bg-gray-200
                   dark:bg-[#0a0a0a] dark:text-gray-100 dark:hover:bg-[#171717] dark:border-none"
                  disabled={!selectedUser || isLoading }
                  type="submit"
                  >
                  Buchung hinzufügen</Button>
                </DialogTrigger>
              </form>
            </Form>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Bookings;