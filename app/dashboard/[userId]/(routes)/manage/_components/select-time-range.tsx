import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SelectTimeRangeProps {
  isSameDay: boolean;
  setStartTimeParent: (time: string) => void;
  setEndTimeParent: (time: string) => void;
  prefilledStartTime?: string;
  prefilledEndTime?: string;
}

const SelectTimeRange: React.FC<SelectTimeRangeProps> = ({
  setStartTimeParent,
  setEndTimeParent,
  isSameDay,
  prefilledStartTime = "",
  prefilledEndTime = "",
}) => {
  const [startTime, setStartTime] = useState<string | null>(prefilledStartTime || null);
  const [endTime, setEndTime] = useState<string | null>(prefilledEndTime || null);

  useEffect(() => {
    if (isSameDay && startTime && endTime) {
      const startTimeNum = Number(startTime);
      const endTimeNum = Number(endTime);

      if (startTimeNum >= endTimeNum && startTimeNum !== 1410 && endTimeNum !== 0) {
        const adjustedStart = String(endTimeNum - 30);
        setStartTime(adjustedStart);
        setStartTimeParent(adjustedStart);
      } else if (startTimeNum === 1410) {
        setEndTime(undefined);
        setEndTimeParent("");
      } else if(endTimeNum === 0) {
        setStartTime(undefined);
        setStartTimeParent("");
      }
    }
  }, [isSameDay]);

  useEffect(() => {

    
    
    if (isSameDay && startTime && endTime && Number(startTime) >= Number(endTime) && Number(startTime) !== 1410) {
      const adjustedEnd = String(Number(startTime) + 30);
      setEndTime(adjustedEnd);
      setEndTimeParent(adjustedEnd);
    }

    if (isSameDay && Number(startTime) === 1410) {
      setEndTime(null);
      setEndTimeParent("");
    }
  }, [startTime]);

  useEffect(() => {

   

    if (isSameDay && startTime && endTime && Number(startTime) >= Number(endTime) && Number(endTime) !== 0) {
      const adjustedStart = String(Number(endTime) - 30);
      setStartTime(adjustedStart);
      setStartTimeParent(adjustedStart);
    }

    if (isSameDay && Number(endTime) === 0) {
      setStartTime(null);
      setStartTimeParent("");
    }
  }, [endTime]);

  function convertMinutesToHourString(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${mins === 0 ? '00' : mins} Uhr`;
    return formattedTime;
  }

  const generateTimeOptions = (startIndex: number, endIndex: number, isStart : boolean) =>
    Array.from({ length: endIndex - startIndex + 1 }, (_, index) => {
      const adjustedIndex = index + startIndex;
      const hour = Math.floor(adjustedIndex / 2);
      const minute = adjustedIndex % 2 === 0 ? "00" : "30";
      const formattedTime = `${hour < 10 ? "0" + hour : hour}:${minute} Uhr`;
      return (
        <SelectGroup key={adjustedIndex}>
          {{
            "0": <SelectLabel>Frühmorgen</SelectLabel>,
            "480": <SelectLabel>Morgens</SelectLabel>,
            "990": <SelectLabel>Nachmittags</SelectLabel>,
          }[String(adjustedIndex * 30)]}
          <Button className={cn(
            "w-full",
            isStart && startTime === String(adjustedIndex * 30) && "bg-[#222222] font-semibold",
            !isStart && endTime === String(adjustedIndex * 30) && "bg-[#222222] font-semibold",
          )} variant="ghost"
          onClick={() => 
            isStart ? (
              (setStartTime(String(adjustedIndex * 30)),
              setStartTimeParent(String(adjustedIndex * 30)))
            ) : (
              (setEndTime(String(adjustedIndex * 30)),
              setEndTimeParent(String(adjustedIndex * 30)))
            )
          }
          >{formattedTime}</Button>
        </SelectGroup>
      );
    });

  return (
    <div className="flex w-full items-center gap-8">
      <div className="w-1/2">
        <Label>Startzeit*</Label>
        <Select
          onValueChange={(value) => {
            setStartTime(value);
            setStartTimeParent(value);
          }}
          value={startTime || undefined}
        >
          <SelectTrigger className="w-full dark:bg-[#222222] shadow-lg dark:border-none">
            {startTime ? convertMinutesToHourString(startTime) : "Wähle eine Startzeit"}
          </SelectTrigger>
          <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
            {generateTimeOptions(16, 47, true)}
            {generateTimeOptions(0, 15, true)}
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/2">
        <Label>Endzeit* </Label>
        <Select
          onValueChange={(value) => {
            setEndTime(value);
            setEndTimeParent(value);
          }}
          value={endTime || undefined}
        >
          <SelectTrigger className="w-full dark:bg-[#222222] shadow-lg dark:border-none">
           {endTime ? convertMinutesToHourString(endTime) : "Wähle eine Endzeit"}
          </SelectTrigger>
          <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
            {generateTimeOptions(16, 47, false)}
            {generateTimeOptions(0, 15, false)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectTimeRange;
