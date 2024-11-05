
import { createDateWithTime } from '@/hooks/date/combine-date-with-minutes';
import { addDays, differenceInHours, format, isBefore, isSameDay, toDate } from 'date-fns';
import { cache } from 'react';




export function dynamicSearch (
    bookings : any[],
    startTime : string,
    endTime : string,
    startDateDynamic : Date,
    endDateDynamic : Date,
    reqTime : string,
    pInserat : any

){

   
    const filterAvailability = ((pInserat: any) => {

        const checkMinTime = checkFitsMinTime(pInserat, startTime, endTime, startDateDynamic, endDateDynamic);

        if(!checkMinTime) {
            return false;
        }

        //save found availabilities in array => can be type of Hours, days, weeks, months => e.g 3d => then check length of array, array.length >= reqTime.number -1
        //return true if length is >= reqTime.number -1 then break, else false
        //Sliding Window approach
        const foundAvailability : string[] = [];

        const regAmount = Number(reqTime.slice(0, -1));
        const regTime = reqTime.slice(-1);

        if (pInserat.bookings.length === 0) {
            console.log("No Bookings")
            return true;
        }
        
        //set start and date to same date if the user only provides one
        const usedPeriodBegin = new Date(startDateDynamic);
        const usedPeriodEnd = new Date(endDateDynamic);

        let startDateAppointments = new Set<any>();
        let endDateAppointments = new Set<any>();

        let startingPoint = addDays(usedPeriodBegin, regAmount);
        
        console.log(startingPoint)
        

        for(let windowEnd = startingPoint; (isBefore(windowEnd, usedPeriodEnd) || isSameDay(windowEnd, usedPeriodEnd)) ; 
        windowEnd.setDate(windowEnd.getDate() + 1)) {
            
            console.log(windowEnd);
            console.log(usedPeriodEnd)
            console.log(isBefore(windowEnd, usedPeriodEnd) || isSameDay(windowEnd, usedPeriodEnd))
            console.log(isBefore(windowEnd, usedPeriodEnd))

            let windowStart = new Date(windowEnd.getDay() - regAmount);
            let isAvailable = true;
            
            for (const booking of pInserat.bookings) {
                //booking starts AND ends before the searched Period
                if (!(booking.startDate <= windowStart) || !(booking.endDate <= windowStart)
                    //booking starts or ends on the first OR last day of the searched period
                    || (isSameDay(booking.startDate, windowStart) || isSameDay(booking.endDate, windowStart)
                        || isSameDay(booking.endDate, windowStart) || isSameDay(booking.startDate, windowStart))
                    //booking
                    && (!(booking.endDate > windowEnd) || !(booking.startDate > windowEnd))
                ) {
                    if ((isSameDay(booking.startDate, windowStart) && (isSameDay(booking.endDate, windowStart))) || isSameDay(booking.endDate, windowStart)) {
                        let usedStart;
                        if (isSameDay(booking.startDate, booking.endDate)) {
                            usedStart = booking.startPeriod;
                        } else {
                            usedStart = "0"
                        }
    
                        for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {
    
                            startDateAppointments.add(i);
                        }
                        if (startDateAppointments.has("1440") && !isSameDay(windowStart, windowEnd)) {
                            isAvailable = false;
                        }
                    } else if ((isSameDay(booking.endDate, usedPeriodEnd) && isSameDay(booking.startDate, usedPeriodEnd))
                        || isSameDay(booking.startDate, usedPeriodEnd)) {
    
                        let usedEnd;
    
                        if (isSameDay(booking.startDate, booking.endDate)) {
                            usedEnd = booking.endPeriod;
                        } else {
    
                            usedEnd = "1440";
                        }
    
                        for (let i = Number(booking.startPeriod); i <= Number(usedEnd); i = i + 30) {
    
                            endDateAppointments.add(i);
                        }
                        if (endDateAppointments.has("0") && !isSameDay(windowStart, windowEnd)) {
                            return false;
                        } else if (booking.endDate > windowEnd && booking.startDate > windowEnd) {
                            console.log(booking)
                        }
                    } else if (booking.endDate > windowEnd && booking.startDate > windowEnd) {
    
                    }
                    else {
                        console.log(booking)
                        console.log(booking.endDate > windowEnd && booking.startDate > windowEnd)
                        isAvailable = false;
                    }
                }  
            }
        

            if ((startTime || endTime)) {
                if (startTime) {
                    let usedEnd;
                    console.log(startDateAppointments)
                    if (isSameDay(windowStart, windowEnd) && endTime) {
                        usedEnd = endTime;
                    } else {
                        usedEnd = "1440";
                    }
    
                    for (let i = Number(startTime); i <= Number(usedEnd); i = i + 30) {
                        if (startDateAppointments.has(Number(i))) {
                            isAvailable = false;
                        }
                    }
                }
                if (endTime) {
                    let usedEnd;
                    if (isSameDay(windowStart, windowEnd) && startTime) {
                        usedEnd = startTime;
                    } else {
                        usedEnd = "0";
                    }
    
                    
                    for (let i = Number(endTime); i >= Number(usedEnd); i = i - 30) {
                        if (endDateAppointments.has(Number(i))) {
                            isAvailable = false;
                        }
                    }
                }
            }
            if(isAvailable) {
                console.log("Available")
                return true;
            }
            
        }

        return false;
    })

    
    const isAvailable = filterAvailability(pInserat);
    console.log(isAvailable)
    return isAvailable;
    
    
}


export const checkFitsMinTime = cache((pInserat, startTime, endTime, periodBegin, periodEnd) => {
    try {
        if(!pInserat?.minTime) {
            console.log(pInserat?.minTime)
            return true;
        }
        
        const usedStartTime = startTime ? Number(startTime) : 0;
        const usedEndTime = endTime ? Number(endTime) : 1440;
       

        const usedStartDate = createDateWithTime(periodBegin, usedStartTime);
        const usedEndDate = createDateWithTime(periodEnd, usedEndTime);

       

        const diffrence = differenceInHours(new Date(usedEndDate), new Date(usedStartDate));

        if(pInserat?.minTime > diffrence) {
            
            return false;
        } else {
            return true;
        }

    } catch (e) {
        console.log(e);
        return false; // Return false if an error occurs
    }
});



