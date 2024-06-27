import { isSameDay } from "date-fns";

export const checkAvailability = (
    pInserat : any,
    periodBegin : Date,
    periodEnd : Date,
    startTime : string,
    endTime : string,
) => {

    let interferringBooking = false;

    const filterAvailability = (pInserat: any) => {

        if (pInserat.bookings.length === 0) {
            return true;
        }
        //set start and date to same date if the user only provides one

        const usedPeriodBegin = new Date(periodBegin);
        const usedPeriodEnd = new Date(periodEnd);

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
                        return booking;
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

                    return booking;
                }
            }
        }

        if (startDateAppointments.size !== 0 || endDateAppointments.size !== 0 && (startTime || endTime)) {
            if (startTime) {
                let usedEnd;

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
    }

    return filterAvailability(pInserat);
}