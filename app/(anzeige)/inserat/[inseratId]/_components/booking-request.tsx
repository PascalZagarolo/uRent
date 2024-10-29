"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { format, isSameDay, set } from 'date-fns';
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
import { userTable } from "@/db/schema";
import { de } from "date-fns/locale";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LuCalendarPlus } from "react-icons/lu";
import LetterRestriction from "@/components/letter-restriction";

interface BookingsProps {
  user: typeof userTable.$inferSelect[];
}


const Bookings = () => {

  const [currentStart, setCurrentStart] = useState(new Date());
  const [currentEnd, setCurrentEnd] = useState(new Date());
  const [currentContent, setCurrentContent] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false)
  const [currentNotice, setCurrentNotice] = useState("");
  const selectedUser = usesearchUserByBookingStore((user) => user.user)

  const [startTime, setStartTime] = useState<string | null>("");
  const [endTime, setEndTime] = useState<string | null>("");


  useEffect(() => {
    if ((!!startTime && !!endTime && Number(startTime) >= Number(endTime) && isSameDay)) {
      setStartTime(String(Number(endTime) - 30));
    }
  }, [endTime])

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (currentStart > currentEnd) {
      setCurrentEnd(currentStart);
    }
  }, [currentStart])

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
        content: currentContent,
        startDate: currentStart,
        startPeriod: startTime,
        endPeriod: endTime,
        endDate: currentEnd,
      }
      axios.post(`/api/bookingrequest/${params.inseratId}`, values);
      toast.success("Buchunsanfrage wurde erfolgreich gesendet!");
      setCurrentEnd(new Date());
      setCurrentStart(new Date());
      setCurrentStart(new Date());
      setCurrentStart(new Date());
      setCurrentNotice("");

    } catch (err) {
      toast.error("Fehler beim hinzufügen der Buchung", err)
    } finally {
      setTimeout(() => {
        router.refresh();
      }, 1000)
      setIsLoading(false);
    }
  }

  const handleTextChange = (event) => {
    const newText = event.target.value;
    const lines = newText.split('\n');

    // Only update text if line count is within limit
    if (lines.length <= 30) {
      setCurrentNotice(newText);
    }
};

  return (
    <Dialog>
      <DialogTrigger className=" w-full">
        <Button className="w-full bg-indigo-800 hover:bg-indigo-900 hover:text-gray-300 text-gray-200 shadow-lg">
          <LuCalendarPlus className="mr-2 h-4 w-4" /> Buchung vorschlagen
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#0F0F0F] border-none">
        <div>
          <div>
            <h3 className="font-bold flex mb-4">
              <CalendarSearchIcon className="mr-2" /> Buchungsvorschlag senden
            </h3>
          </div>
          <div className="flex">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                  format(currentStart, "PPP", { locale: de })
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
                              locale={de}
                              className="dark:bg-[#0a0a0a] border-none"
                              selected={currentStart}
                              onSelect={(e) => { setCurrentStart(e); console.log(currentStart) }}
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
                                  format(currentEnd, "PPP", { locale: de })
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
                              locale={de}
                              className="dark:bg-[#0a0a0a] border-none"
                              selected={currentEnd}
                              onSelect={(e) => { setCurrentEnd(e) }}
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

                <div className="flex w-full items-center gap-x-8">
                  <div className="w-1/2">
                    <Label>
                      Startzeit
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        setStartTime(value);

                      }}
                      value={startTime ? startTime : undefined}
                    >
                      <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none">
                        <SelectValue placeholder="Wähle eine Startzeit" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                        {[...Array(32).keys()].map(index => { // From 6:00 (index 12) to 23:30 (index 47)
                          const actualIndex = index + 16; // Adjust index to start from 6:00
                          const hour = Math.floor(actualIndex / 2);
                          const minute = actualIndex % 2 === 0 ? '00' : '30';
                          const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                          return (
                            <SelectGroup key={actualIndex}>
                              {
                                {
                                  "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                  "480": <SelectLabel>Morgens</SelectLabel>,
                                  "990": <SelectLabel>Nachmittags</SelectLabel>,
                                }[String(actualIndex * 30)]
                              }
                              <SelectItem key={actualIndex} value={String(actualIndex * 30)}>{formattedTime}</SelectItem>
                            </SelectGroup>
                          );
                        })}

                        {/* Generate time slots from 0:00 to 5:30 and append them */}
                        {[...Array(16).keys()].map(index => { // From 0:00 (index 0) to 5:30 (index 11)
                          const hour = Math.floor(index / 2);
                          const minute = index % 2 === 0 ? '00' : '30';
                          const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                          return (
                            <SelectGroup key={index}>
                              {
                                {
                                  "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                  "480": <SelectLabel>Morgens</SelectLabel>,
                                  "990": <SelectLabel>Nachmittags</SelectLabel>,
                                }[String(index * 30)]
                              }
                              <SelectItem key={index} value={String(index * 30)}>{formattedTime}</SelectItem>
                            </SelectGroup>
                          );
                        })}

                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-1/2">
                    <Label>
                      Endzeit
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        setEndTime(value);

                      }}
                      value={endTime ? endTime : undefined}
                    >
                      <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none">
                        <SelectValue placeholder="Wähle eine Endzeit" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                      {[...Array(32).keys()].map(index => { // From 6:00 (index 12) to 23:30 (index 47)
                          const actualIndex = index + 16; // Adjust index to start from 6:00
                          const hour = Math.floor(actualIndex / 2);
                          const minute = actualIndex % 2 === 0 ? '00' : '30';
                          const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                          return (
                            <SelectGroup key={actualIndex}>
                              {
                                {
                                  "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                  "480": <SelectLabel>Morgens</SelectLabel>,
                                  "990": <SelectLabel>Nachmittags</SelectLabel>,
                                }[String(actualIndex * 30)]
                              }
                              <SelectItem key={actualIndex} value={String(actualIndex * 30)}>{formattedTime}</SelectItem>
                            </SelectGroup>
                          );
                        })}

                        {/* Generate time slots from 0:00 to 5:30 and append them */}
                        {[...Array(16).keys()].map(index => { // From 0:00 (index 0) to 5:30 (index 11)
                          const hour = Math.floor(index / 2);
                          const minute = index % 2 === 0 ? '00' : '30';
                          const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                          return (
                            <SelectGroup key={index}>
                              {
                                {
                                  "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                  "480": <SelectLabel>Morgens</SelectLabel>,
                                  "990": <SelectLabel>Nachmittags</SelectLabel>,
                                }[String(index * 30)]
                              }
                              <SelectItem key={index} value={String(index * 30)}>{formattedTime}</SelectItem>
                            </SelectGroup>
                          );
                        })}

                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-base flex">
                    <BookOpenCheck className="mr-2" />  Anmerkungen:
                  </span>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="mt-2 space-y-0">
                        <Textarea
                          onChange={handleTextChange}
                          maxLength={2000}
                          className="focus:ring-0 focus:outline-none focus:border-0 bg-gray-200  dark:bg-[#0a0a0a] border-none"
                        />
                        <div className="ml-auto w-full flex justify-end">
                          <LetterRestriction
                           limit={2000}
                           currentLength={currentNotice.length}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <DialogTrigger asChild>
                  <Button
                    className="bg-white border border-gray-300 text-gray-900  hover:bg-indigo-900
                   dark:bg-indigo-800 dark:text-gray-100 dark:hover:bg-[#171717] border-none"
                    disabled={isLoading || !currentEnd || !currentStart || !currentStart || !currentEnd}
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