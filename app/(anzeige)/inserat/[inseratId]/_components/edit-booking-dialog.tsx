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
import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon, PlusSquare, Settings2Icon } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import SearchRent from "./search-rent";
import { Booking, User } from "@prisma/client";
import toast from "react-hot-toast";
import { usesearchUserByBookingStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface EditBookingDialogProps {
    booking : Booking & { user : User};
}


const EditBookingDialog: React.FC<EditBookingDialogProps> = ({
    booking
}) => {

  const [currentStart, setCurrentStart] = useState(booking.startDate || new Date());
  const [currentEnd, setCurrentEnd] = useState(booking.endDate || new Date());
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
        startDate: currentStart,
        endDate: currentEnd,
        userId : selectedUser.id
      }
      console.log(values)
      axios.patch(`/api/booking/edit/${booking.id}`, values);
      toast.success("Änderungen gespeichert");
      
    } catch(err) {
      toast.error("Fehler beim ändern der Buchung", err)
      console.log(err);
    } finally {
      setTimeout(() => {
        router.refresh();
      }, 1000)
      setIsLoading(false);
    }
  }

  const changeUser = usesearchUserByBookingStore((user) => user.changeUser);

  

  return (
    <Dialog>
      <DialogTrigger className="" onClick={() => {changeUser(booking.user)}}>
        
        <Settings2Icon className="w-6 h-6 hover:cursor-pointer"/>
        
      </DialogTrigger>
      <DialogContent>
        <div>
          <div>
            <h3 className="font-bold flex mb-8">
              <CalendarClockIcon className="mr-2" /> Buchungen verwalten
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
                                {currentStart ? (
                                  format(currentStart, "PPP")
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
                              selected={currentStart}
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
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[200px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {currentEnd ? (
                                  format(currentEnd, "PPP")
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
                              selected={currentEnd}
                              onSelect={(date) => {
                                field.onChange(date);
                                setCurrentEnd(date);
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
                  <SearchRent 
                  booking={booking}
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
                          className="focus:ring-0 focus:outline-none focus:border-0 bg-gray-200 border border-gray-400"
                          defaultValue={booking.content}
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogTrigger asChild>
                <Button 
                  className="bg-white border border-gray-300 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:bg-gray-200"
                  disabled={!selectedUser || isLoading }
                  type="submit"
                  >
                  Änderungen speichern</Button>
                </DialogTrigger>
              </form>
            </Form>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditBookingDialog;