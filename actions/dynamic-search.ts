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


        if (pInserat.bookings.length === 0) {
            return true;
        }
        //set start and date to same date if the user only provides one

        const usedPeriodBegin = new Date(startDateDynamic);
        const usedPeriodEnd = new Date(endDateDynamic);

        let startDateAppointments = new Set<any>();
        let endDateAppointments = new Set<any>();

        for (const booking of pInserat.bookings) {
            //booking starts AND ends before the searched Period
            if (!(booking.startDate <= usedPeriodBegin) || !(booking.endDate <= usedPeriodBegin)
                //booking starts or ends on the first OR last day of the searched period
                || (isSameDay(booking.startDate, usedPeriodBegin) || isSameDay(booking.endDate, usedPeriodBegin)
                    || isSameDay(booking.endDate, usedPeriodBegin) || isSameDay(booking.startDate, usedPeriodBegin))
                //booking
                && (!(booking.endDate > usedPeriodEnd) || !(booking.startDate > usedPeriodEnd))
            ) {
                if ((isSameDay(booking.startDate, usedPeriodBegin) && (isSameDay(booking.endDate, usedPeriodBegin))) || isSameDay(booking.endDate, usedPeriodBegin)) {
                    let usedStart;
                    if (isSameDay(booking.startDate, booking.endDate)) {
                        usedStart = booking.startPeriod;
                    } else {
                        usedStart = "0"
                    }

                    for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {

                        startDateAppointments.add(i);
                    }
                    if (startDateAppointments.has("1440") && !isSameDay(usedPeriodBegin, usedPeriodEnd)) {
                        return false;
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
                    if (endDateAppointments.has("0") && !isSameDay(usedPeriodBegin, usedPeriodEnd)) {
                        return false;
                    } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {
                        console.log(booking)

                    }
                } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {

                }
                else {
                    console.log(booking)
                    console.log(booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd)
                    return false;
                }
            }
        }

        if ((startTime || endTime)) {
            console.log("saunoidas")
            if (startTime) {
                let usedEnd;
                console.log(startDateAppointments)
                if (isSameDay(usedPeriodBegin, usedPeriodEnd) && endTime) {
                    usedEnd = endTime;
                } else {
                    usedEnd = "1440";
                }

                for (let i = Number(startTime); i <= Number(usedEnd); i = i + 30) {
                    if (startDateAppointments.has(Number(i))) {
                        return false;
                    }
                }
            }
            if (endTime) {
                let usedEnd;
                if (isSameDay(usedPeriodBegin, usedPeriodEnd) && startTime) {
                    usedEnd = startTime;
                } else {
                    usedEnd = "0";
                }

                console.log(endDateAppointments)
                for (let i = Number(endTime); i >= Number(usedEnd); i = i - 30) {
                    if (endDateAppointments.has(Number(i))) {
                        return false;
                    }
                }
            }
        }

        return true;
    })

    
}



