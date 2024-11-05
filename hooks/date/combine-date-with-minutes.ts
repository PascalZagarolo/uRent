import { format } from "date-fns";

export function createDateWithTime(dateString, startTime) {
    
    const usedDateString = format(new Date(dateString), "dd.MM.yyyy");

    const [day, month, year] = usedDateString.split(".").map(Number);
    
    // Initialize the Date object with year, month (0-indexed), and day
    const date = new Date(year, month - 1, day);
    
    // Calculate hours and minutes from startTime
    const hours = Math.floor(startTime / 60);
    const minutes = startTime % 60;
    
    // Set hours and minutes to the Date object
    date.setHours(hours, minutes);
    console.log(date)
    return date;
}