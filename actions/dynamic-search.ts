import { inserat } from '@/db/schema';
import { isSameDay } from 'date-fns';
import { cache } from 'react';




export async function dynamicSearch (
    bookings : any[],
    startTime : string,
    endTime : string,
    startDateDynamic : Date,
    endDateDynamic : Date,
    reqTime : string,
    pInserat : any

) : Promise<any> {

   

    const filterAvailability = cache((pInserat: any) => {
        //save found availabilities in array => can be type of Hours, days, weeks, months => e.g 3d => then check length of array, array.length >= reqTime.number -1
        //return true if length is >= reqTime.number -1 then break, else false
        //Sliding Window approach
        const foundAvailability : string[] = [];

        const regAmount = Number(reqTime.slice(0, -1));
        const regTime = reqTime.slice(-1);

        if (pInserat.bookings.length === 0) {
            return true;
        }
        //set start and date to same date if the user only provides one
        const usedPeriodBegin = new Date(startDateDynamic);
        const usedPeriodEnd = new Date(endDateDynamic);

        let startDateAppointments = new Set<any>();
        let endDateAppointments = new Set<any>();


        for(let windowEnd = new Date(usedPeriodBegin.getDay() + regAmount); windowEnd <= usedPeriodEnd; windowEnd.setDate(windowEnd.getDate() + 1)) {
            let windowStart = new Date(windowEnd.getDay() - regAmount);

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
                            break;
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
                        break;
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
                            break;
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
    
                    console.log(endDateAppointments)
                    for (let i = Number(endTime); i >= Number(usedEnd); i = i - 30) {
                        if (endDateAppointments.has(Number(i))) {
                            break;
                        }
                    }
                }
            }
            return true;
        }

        return false;
    })

    let isAvailable = false;

    if(filterAvailability(pInserat)){
        isAvailable = true;
    }
    
}



