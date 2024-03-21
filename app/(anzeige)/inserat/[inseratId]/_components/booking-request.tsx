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
import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon, CalendarSearchIcon, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { usesearchUserByBookingStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { users } from "@/db/schema";

interface BookingsProps {
  user: typeof users.$inferSelect[];
}


const Bookings = () => {

  const [currentStart, setCurrentStart] = useState(new Date());
  const [currentEnd, setCurrentEnd] = useState(new Date());
  const [currentContent, setCurrentContent] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false)
  const [currentNotice, setCurrentNotice] = useState("");
  const selectedUser = usesearchUserByBookingStore((user) => user.user)

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if(currentStart > currentEnd) {
        setCurrentEnd(currentStart);
    }
},[currentStart])

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


  const onSubmit = () => {
    try {
      console.log("getriggered")
      setIsLoading(true);
      const values = {
        content : currentContent,
        startDate: currentStart,
        endDate: currentEnd,
      }
      axios.post(`/api/bookingrequest/${params.inseratId}`, values);
      toast.success("Buchunsanfrage wurde erfolgreich gesendet!");
      setCurrentEnd(new Date());
      setCurrentStart(new Date());
      setCurrentNotice("");
      
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
      <DialogTrigger className="sm:w-[240px] w-full">
        <Button className="w-full bg-blue-900 hover:bg-blue-800 text-gray-100  ">
          <CalendarSearchIcon className="mr-2 h-4 w-4" /> Buchung vorschlagen
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#0F0F0F] border-none">
        <div>
          <div>
            <h3 className="font-bold flex mb-8">
              <CalendarSearchIcon className="mr-2" /> Buchungsvorschlag senden
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
                            <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c] dark:border-gray-100">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[200px] pl-3 text-left font-normal border-none",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {currentStart ? (
                                  format(currentStart, "PPP") 
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 border-none" align="start">
                            <Calendar
                              mode="single"
                              
                              className="dark:bg-[#0a0a0a] border-none"
                              selected={currentStart}
                              onSelect={(e) => {setCurrentStart(e); console.log(currentStart)}}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              
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
                                  "w-[200px] pl-3 text-left font-normal border-none",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {currentEnd ? (
                                  format(currentEnd, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 border-none" align="start">
                            <Calendar
                              mode="single"
                              
                              className="dark:bg-[#0a0a0a] border-none"
                              selected={currentEnd}
                              onSelect={(e) => {setCurrentEnd(e)}}
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
                  <span className="font-semibold text-base flex">
                    <BookOpenCheck className="mr-2" />  Anmerkungen:
                  </span>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="mt-2 ">
                        <Textarea
                        onChange={(e) => setCurrentContent(e.target.value)}
                          className="focus:ring-0 focus:outline-none focus:border-0 bg-gray-200  dark:bg-[#0a0a0a] border-none"
                        />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogTrigger asChild>
                <Button 
                  className="bg-white border border-gray-300 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:bg-gray-200
                   dark:bg-[#0a0a0a] dark:text-gray-100 dark:hover:bg-[#171717] border-none"
                  disabled={isLoading || !currentEnd || !currentStart}
                  onClick={onSubmit}
                  >
                  Vorschlag senden</Button>
                
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