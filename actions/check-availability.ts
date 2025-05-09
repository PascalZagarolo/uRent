
import { isSameDay } from "date-fns";
import { NextResponse } from "next/server";


export const checkAvailability = (
    pInserat: any,
    periodBegin: Date,
    periodEnd: Date,
    startTime: string,
    endTime: string,
    bookingId?: string,
    vehicleId?: string
): Object => {

    try {
        const filterAvailability = (pInserat: any) => {


            const usedBookings = pInserat?.bookings?.filter((booking) => booking.id !== bookingId);

            try {
                if (usedBookings === 0 || !usedBookings) {
                    console.log("...")
                    return true;
                }
                //set start and date to same date if the user only provides one

                const usedPeriodBegin = new Date(periodBegin);
                const usedPeriodEnd = new Date(periodEnd);

                let startDateAppointments = new Set<any>();
                let endDateAppointments = new Set<any>();

                for (const booking of usedBookings) {
                    //booking starts AND ends before the searched Period
                    if (!(booking.startDate <= usedPeriodBegin) || !(booking.endDate <= usedPeriodBegin)
                        //booking starts or ends on the first OR last day of the searched period
                        || (isSameDay(booking.startDate, usedPeriodBegin) || isSameDay(booking.endDate, usedPeriodBegin)
                            || isSameDay(booking.endDate, usedPeriodBegin) || isSameDay(booking.startDate, usedPeriodBegin))
                        //booking
                        && (!(booking.endDate > usedPeriodEnd) || !(booking.startDate > usedPeriodEnd))
                    ) {
                        if ((isSameDay(booking.startDate, usedPeriodBegin) &&
                            (isSameDay(booking.endDate, usedPeriodBegin))) ||
                            isSameDay(booking.endDate, usedPeriodBegin)) {

                            let usedStart;

                            if (isSameDay(booking.startDate, booking.endDate)) {
                                usedStart = booking.startPeriod;
                            } else {
                                usedStart = "0"
                            }

                            for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {
                                startDateAppointments.add({ number: i, bookingId: booking.id });
                            }
                            if ([...startDateAppointments].some(appointment => appointment.number === "1440") && !isSameDay(usedPeriodBegin, usedPeriodEnd)) {
                                return {
                                    isConflict: true,
                                    booking: booking
                                };
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

                                endDateAppointments.add({ number: i, bookingId: booking.id });
                            }
                            if ([...endDateAppointments].some(appointment => appointment.number === "0") && !isSameDay(usedPeriodBegin, usedPeriodEnd)) {
                                console.log("this")
                                return {
                                    isConflict: true,
                                    booking: booking
                                };

                            } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {

                            }
                        } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {

                        }
                        else {

                            return {
                                isConflict: true,
                                booking
                            };
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
                            if ([...startDateAppointments].some(appointment => appointment.number === Number(i))) {


                                const findBooking = usedBookings.find(booking => booking.id ===
                                    [...startDateAppointments].find(appointment => appointment.number == Number(i))?.bookingId);
                                return {
                                    isConflict: true,
                                    booking: findBooking
                                };
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



                        for (let i = Number(endTime); i >= Number(usedEnd); i = i - 30) {
                            if ([...endDateAppointments].some(appointment => appointment.number === Number(i))) {

                                return {
                                    isConflict: true,
                                    booking: [...endDateAppointments].find(appointment => appointment.number === Number(i))
                                };
                            }
                        }
                    }
                }

                return true;
            } catch (e) {
                console.log(e);
                return new NextResponse("Error", { status: 500 });
            }
        }

        const filterAvailabilityMulti = (pInserat: any) => {
            const usedBookings = pInserat?.bookings?.filter((booking) => booking.id !== bookingId);

            try {
                if (usedBookings === 0 || !usedBookings) {

                    return true;
                }
                //set start and date to same date if the user only provides one

                const usedPeriodBegin = new Date(periodBegin);
                const usedPeriodEnd = new Date(periodEnd);

                const usedVehicles = vehicleId ? pInserat?.vehicles?.filter((vehicle) => vehicle.id === vehicleId) : pInserat?.vehicles;

                for (const vehicle of usedVehicles) {

                    let startDateAppointments = new Set<any>();
                    let endDateAppointments = new Set<any>();

                    let isAvailable = true;

                    for (const booking of vehicle?.bookings) {
                        //booking starts AND ends before the searched Period
                        if (!(booking.startDate <= usedPeriodBegin) || !(booking.endDate <= usedPeriodBegin)
                            //booking starts or ends on the first OR last day of the searched period
                            || (isSameDay(booking.startDate, usedPeriodBegin) || isSameDay(booking.endDate, usedPeriodBegin)
                                || isSameDay(booking.endDate, usedPeriodBegin) || isSameDay(booking.startDate, usedPeriodBegin))
                            //booking
                            && (!(booking.endDate > usedPeriodEnd) || !(booking.startDate > usedPeriodEnd))
                        ) {
                            if ((isSameDay(booking.startDate, usedPeriodBegin) &&
                                (isSameDay(booking.endDate, usedPeriodBegin))) ||
                                isSameDay(booking.endDate, usedPeriodBegin)) {

                                let usedStart;

                                if (isSameDay(booking.startDate, booking.endDate)) {
                                    usedStart = booking.startPeriod;
                                } else {
                                    usedStart = "0"
                                }

                                for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {
                                    startDateAppointments.add({ number: i, bookingId: booking.id });
                                }
                                if ([...startDateAppointments].some(appointment => appointment.number === "1440") && !isSameDay(usedPeriodBegin, usedPeriodEnd)) {
                                    if (booking?.vehicleId === vehicleId) {
                                        return {
                                            isConflict: true,
                                            booking: booking
                                        };
                                    }
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

                                    endDateAppointments.add({ number: i, bookingId: booking.id });
                                }
                                if ([...endDateAppointments].some(appointment => appointment.number === "0") && !isSameDay(usedPeriodBegin, usedPeriodEnd)) {

                                    if (booking?.vehicleId === vehicleId) {
                                        return {
                                            isConflict: true,
                                            booking: booking
                                        };
                                    }
                                    isAvailable = false;

                                } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {

                                }
                            } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {

                            }
                            else {

                                if (booking.vehicleId === vehicleId) {
                                    return {
                                        isConflict: true,
                                        booking
                                    };
                                }
                                isAvailable = false;
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
                                if ([...startDateAppointments].some(appointment => appointment.number === Number(i))) {


                                    const findBooking = usedBookings.find(booking => booking.id ===
                                        [...startDateAppointments].find(appointment => appointment.number == Number(i))?.bookingId);
                                    if (findBooking?.vehicleId === vehicleId) {
                                        return {
                                            isConflict: true,
                                            booking: findBooking
                                        };
                                    }
                                    isAvailable = false;
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



                            for (let i = Number(endTime); i >= Number(usedEnd); i = i - 30) {
                                if ([...endDateAppointments].some(appointment => appointment.number === Number(i))) {
                                    const usedBooking = [...endDateAppointments].find(appointment => appointment.number === Number(i))
                                    if (usedBooking?.vehicleId === vehicleId) {
                                        return {
                                            isConflict: true,
                                            booking: usedBooking
                                        };

                                    }
                                    isAvailable = false;
                                }


                            }
                        }
                    }

                    startDateAppointments.clear();
                    endDateAppointments.clear();

                   
                    if(isAvailable){
                        return true;
                    }
                }
                
                return false;
            } catch (e) {
                console.log(e);
                return new NextResponse("Error", { status: 500 });
            }
        }



        let result;

        if (pInserat?.multi) {
            
            result = filterAvailabilityMulti(pInserat);
            
        } else {
            result = filterAvailability(pInserat);
        }



        return result
    } catch (e: any) {
        console.log(e);
        return { error: e.message };

    }
}