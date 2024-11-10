
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import axios from "axios";
import { and, eq, gte, ilike, isNull, lte, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { lkwAttribute, pkwAttribute } from '../../../db/schema';
import { cache } from "react";
import { differenceInHours, isAfter, isBefore, isEqual, isSameDay } from "date-fns";
import { dynamicSearch } from "@/actions/dynamic-search";
import { createDateWithTime } from "@/hooks/date/combine-date-with-minutes";

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const r = 6371;
    const p = Math.PI / 180;

    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
        + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
        (1 - Math.cos((lon2 - lon1) * p)) / 2;

    return 2 * r * Math.asin(Math.sqrt(a));
}

export async function PATCH(
    req: Request
) {
    try {
        const values = await req.json();

        const { location, amount, thisCategory, reqAge, freeMiles, license, minPrice, maxPrice,
            end, start, begin, startDateDynamic, endDateDynamic, reqTime, minTime,
            //LKW
            lkwBrand, application, loading, drive, weightClass, weightClassMax, seats, seatsMax,
            //PKW
            thisBrand, power, powerMax, fuel, transmission, thisType, miles, initial, initialMax, doors, doorsMax, extraCost, ahk, type,
            //TRAILER
            coupling, extraType, axis, axisMax, brake, trailerType,
            //TRANSPORT
            transportBrand,

            //DATE
            periodBegin, periodEnd, startTime, endTime,

            volume, loading_l, loading_b, loading_h, title, radius, caution,
            ...filteredValues } = values;



        const ConditionFilter = (pInserat: typeof inserat) => {
            const bAge = reqAge ? Number(reqAge) >= Number(pInserat.reqAge) : true;
            const bLicense = license ? license === pInserat.license : true;
            const bCaution = caution ? Number(caution) >= Number(pInserat.caution) : true;

            if (caution && !pInserat?.caution) {
                return false
            }

            if (reqAge && !pInserat?.reqAge) {
                return false;
            }

            return bAge && bLicense && bCaution;
        }

        const PkwFilter = (pInserat: any) => {

            const usedInitial = initial ? new Date(initial) : null;

            let isValidDate;

            if (initial instanceof Date && !isNaN(initial.getTime()) || String(initial)?.trim() === "" || !initial) {

                isValidDate = true;
            } else {

                isValidDate = false;
            }

            const searchedAhk = (typeof (ahk) !== 'undefined' && ahk !== null);

            const searchedSeats = seats || seatsMax ? true : false;
            const startingIndex = seats ? seats : 0;
            const endingIndex = seatsMax ? seatsMax : 10;


            const searchedDoors = doors || doorsMax ? true : false;
            const startingDoors = doors ? doors : 0;
            const endingDoors = doorsMax ? doorsMax : 10;

            const searchedPower = (power || powerMax) ? true : false;
            const minPower = power ? power : 0;
            const maxPower = powerMax ? powerMax : 100000;

            const searchedInitial = (initial || initialMax) ? true : false;
            const minInitial = initial ? new Date(initial) : new Date(1900, 0, 1);
            const maxInitial = initialMax ? new Date(initialMax) : new Date(2060, 0, 1);

            const bInitial = searchedInitial ? (isEqual(minInitial, pInserat?.pkwAttribute?.initial) ||
                isBefore(minInitial, pInserat?.pkwAttribute?.initial)) &&
                (isEqual(maxInitial, pInserat?.pkwAttribute?.initial) || isAfter(maxInitial, pInserat?.pkwAttribute?.initial))
                : true;

            const bDoors = searchedDoors ? startingDoors <= pInserat?.pkwAttribute?.doors
                && endingDoors >= pInserat?.pkwAttribute?.doors
                : true;

            const bSeats = searchedSeats ? Number(pInserat?.pkwAttribute?.seats) >= startingIndex &&
                Number(pInserat?.pkwAttribute?.seats) <= endingIndex : true;

            const bPower = searchedPower ? pInserat?.pkwAttribute?.power >= minPower &&
                pInserat?.pkwAttribute?.power <= maxPower
                : true;

            const bExtraType = extraType ? extraType === pInserat?.pkwAttribute?.extraType : true;
            const bLoading = loading ? loading === pInserat?.pkwAttribute?.loading : true;
            const bWeightClass = weightClass ? pInserat?.pkwAttribute?.weightClass === weightClass : true;
            const bFreeMiles = freeMiles ? pInserat?.pkwAttribute?.freeMiles >= freeMiles : true;
            const bExtraCost = extraCost ? pInserat?.pkwAttribute?.extraCost >= extraCost : true;
            const bType = type ? String(type) === pInserat.pkwAttribute?.type : true;
            const bTransmission = transmission ? transmission === pInserat?.pkwAttribute?.transmission : true;
            const bFuel = fuel ? fuel === pInserat?.pkwAttribute?.fuel : true;

            const bBrand = thisBrand ? String(thisBrand) === String(pInserat?.pkwAttribute?.brand) : true;

            const bAhk = searchedAhk ? String(ahk) === String(pInserat?.pkwAttribute?.ahk) : true;

            const bVolume = volume ? volume <= pInserat?.pkwAttribute?.loading_volume : true;
            const bLength = loading_l ? loading_l <= pInserat?.pkwAttribute?.loading_l : true;
            const bBreite = loading_b ? loading_b <= pInserat?.pkwAttribute?.loading_b : true;
            const bHeight = loading_h ? loading_h <= pInserat?.pkwAttribute?.loading_h : true;

            

            return bSeats && bPower && bDoors && bFreeMiles && bInitial && bAhk &&
                bExtraCost && bType && bTransmission && bFuel && bBrand &&
                bExtraType && bLoading && bWeightClass && bVolume && bLength && bBreite && bHeight;
        }

        const LkwFilter = (pInserat: typeof inserat) => {

            const usedInitial = initial ? new Date(initial) : null;

            let isValidDate;

            if (initial instanceof Date && !isNaN(initial.getTime()) || String(initial)?.trim() === "" || !initial) {

                isValidDate = true;
            } else {

                isValidDate = false;
            }

            const searchedWeightClass = (weightClass || weightClassMax) ? true : false;
            const startingWeightClass = weightClass ? weightClass : 0;
            const endingWeightClass = weightClassMax ? weightClassMax : 100000;


            const searchedSeats = seats || seatsMax ? true : false;
            const startingIndex = seats ? seats : 0;
            const endingIndex = seatsMax ? seatsMax : 10;

            const searchedPower = (power || powerMax) ? true : false;
            const minPower = power ? power : 0;
            const maxPower = powerMax ? powerMax : 100000;

            const searchedAxis = (axis || axisMax) ? true : false;
            const minAxis = axis ? axis : 0;
            const maxAxis = axisMax ? axisMax : 10;

            const searchedAhk = (typeof (ahk) !== 'undefined' && ahk !== null);
            const bAhk = searchedAhk ? String(ahk) === String(pInserat?.lkwAttribute?.ahk) : true;

            const searchedInitial = (initial || initialMax) ? true : false;
            const minInitial = initial ? new Date(initial) : new Date(1900, 0, 1);
            const maxInitial = initialMax ? new Date(initialMax) : new Date(2060, 0, 1);

            const bInitial = searchedInitial ? (isEqual(minInitial, pInserat?.lkwAttribute?.initial) ||
                isBefore(minInitial, pInserat?.lkwAttribute?.initial)) &&
                (isEqual(maxInitial, pInserat?.lkwAttribute?.initial) || isAfter(maxInitial, pInserat?.lkwAttribute?.initial))
                : true;


            const bSeats = searchedSeats ? pInserat?.lkwAttribute?.seats >= startingIndex &&
                pInserat?.lkwAttribute?.seats <= endingIndex : true;

            const bWeightClass = searchedWeightClass ?
                Number(pInserat?.lkwAttribute?.weightClass) <= Number(endingWeightClass) &&
                Number(pInserat?.lkwAttribute?.weightClass) >= Number(startingWeightClass)
                : true;

            const bPower = searchedPower ? pInserat?.lkwAttribute?.power >= minPower &&
                pInserat?.lkwAttribute?.power <= maxPower
                : true;

            const bAxis = searchedAxis ? minAxis <= pInserat?.lkwAttribute?.axis && maxAxis >= pInserat?.lkwAttribute?.axis : true;

            const bDrive = drive ? drive === pInserat?.lkwAttribute?.drive : true;
            const bLoading = loading ? loading === pInserat?.lkwAttribute?.loading : true;
            const bApplication = application ? application == pInserat?.lkwAttribute?.application : true;
            const bTransmission = transmission ? transmission === pInserat?.lkwAttribute?.transmission : true;
            const bLkwBrand = lkwBrand ? lkwBrand === pInserat?.lkwAttribute?.lkwBrand : true;


            const bFuel = fuel ? String(fuel) === String(pInserat?.lkwAttribute?.fuel) : true;

            const bVolume = volume ? volume <= pInserat?.lkwAttribute?.loading_volume : true;
            const bLength = loading_l ? loading_l <= pInserat?.lkwAttribute?.loading_l : true;
            const bBreite = loading_b ? loading_b <= pInserat?.lkwAttribute?.loading_b : true;
            const bHeight = loading_h ? loading_h <= pInserat?.lkwAttribute?.loading_h : true;

            return bSeats && bWeightClass && bDrive && bLoading && bApplication && bTransmission && bInitial && bFuel
                && bLkwBrand && bAxis && bVolume && bLength && bBreite && bHeight && bPower && bAhk;
        }

        const TrailerFilter = (pInserat: typeof inserat) => {

            const usedInitial = initial ? new Date(initial) : null;


            const searchedWeightClass = (weightClass || weightClassMax) ? true : false;
            const startingWeightClass = weightClass ? weightClass : 0;
            const endingWeightClass = weightClassMax ? weightClassMax : 100000;

            const searchedAxis = (axis || axisMax) ? true : false;
            const minAxis = axis ? axis : 0;
            const maxAxis = axisMax ? axisMax : 10;

            const searchedInitial = (initial || initialMax) ? true : false;
            const minInitial = initial ? new Date(initial) : new Date(1900, 0, 1);
            const maxInitial = initialMax ? new Date(initialMax) : new Date(2060, 0, 1);

            const bInitial = searchedInitial ? (isEqual(minInitial, pInserat?.trailerAttribute?.initial) ||
                isBefore(minInitial, pInserat?.trailerAttribute?.initial)) &&
                (isEqual(maxInitial, pInserat?.trailerAttribute?.initial) || isAfter(maxInitial, pInserat?.trailerAttribute?.initial))
                : true;

            const bWeightClass = searchedWeightClass ?
                Number(pInserat?.trailerAttribute?.weightClass) <= Number(endingWeightClass) &&
                Number(pInserat?.trailerAttribute?.weightClass) >= Number(startingWeightClass)
                : true;

            const bAxis = searchedAxis ? minAxis <= pInserat?.trailerAttribute?.axis && maxAxis >= pInserat?.trailerAttribute?.axis : true;

            const bType = trailerType ? trailerType === pInserat?.trailerAttribute?.type : true;
            const bExtraType = extraType ? extraType === pInserat?.trailerAttribute?.extraType : true;

            const bCoupling = coupling ? coupling === pInserat?.trailerAttribute?.coupling : true;
            const bLoading = loading ? loading === pInserat?.trailerAttribute?.loading : true;


            const bBrake = brake ? String(brake).toUpperCase().trim() == String(pInserat?.trailerAttribute?.brake).toUpperCase().trim() : true;


            const bVolume = volume ? volume <= pInserat?.trailerAttribute?.loading_volume : true;
            const bLength = loading_l ? loading_l <= pInserat?.trailerAttribute?.loading_l : true;
            const bBreite = loading_b ? loading_b <= pInserat?.trailerAttribute?.loading_b : true;
            const bHeight = loading_h ? loading_h <= pInserat?.trailerAttribute?.loading_h : true;

            return bType && bExtraType && bCoupling && bLoading && bAxis && bInitial
                && bWeightClass && bBrake && bVolume && bLength && bBreite && bHeight;
        }

        const TransportFilter = (pInserat: any) => {

            const usedInitial = initial ? new Date(initial) : null;

            let isValidDate;

            if (initial instanceof Date && !isNaN(initial.getTime()) || String(initial)?.trim() === "" || !initial) {

                isValidDate = true;
            } else {

                isValidDate = false;
            }

            const searchedSeats = seats || seatsMax ? true : false;
            const startingIndex = seats ? seats : 0;
            const endingIndex = seatsMax ? seatsMax : 10;

            const searchedDoors = doors || doorsMax ? true : false;
            const startingDoors = doors ? doors : 0;
            const endingDoors = doorsMax ? doorsMax : 10;

            const searchedWeightClass = (weightClass || weightClassMax) ? true : false;
            const startingWeightClass = weightClass ? weightClass : 0;
            const endingWeightClass = weightClassMax ? weightClassMax : 100000;

            const searchedPower = (power || powerMax) ? true : false;
            const minPower = power ? power : 0;
            const maxPower = powerMax ? powerMax : 100000;

            const searchedInitial = (initial || initialMax) ? true : false;
            const minInitial = initial ? new Date(initial) : new Date(1900, 0, 1);
            const maxInitial = initialMax ? new Date(initialMax) : new Date(2060, 0, 1);

            const searchedAhk = (typeof (ahk) !== 'undefined' && ahk !== null);
            const bAhk = searchedAhk ? String(ahk) === String(pInserat?.transportAttribute?.ahk) : true;

            const bInitial = searchedInitial ? (isEqual(minInitial, pInserat?.transportAttribute?.initial) ||
                isBefore(minInitial, pInserat?.transportAttribute?.initial)) &&
                (isEqual(maxInitial, pInserat?.transportAttribute?.initial) || isAfter(maxInitial, pInserat?.transportAttribute?.initial))
                : true;


            const bPower = searchedPower ? pInserat?.transportAttribute?.power >= minPower &&
                pInserat?.transportAttribute?.power <= maxPower
                : true;


            const bSeats = searchedSeats ? pInserat?.transportAttribute?.seats >= startingIndex &&
                pInserat?.transportAttribute?.seats <= endingIndex : true;

            const bDoors = searchedDoors ? startingDoors <= pInserat?.transportAttribute?.doors
                && endingDoors >= pInserat?.transportAttribute?.doors
                : true;

            const bWeightClass = searchedWeightClass ?
                Number(pInserat?.transportAttribute?.weightClass) <= Number(endingWeightClass) &&
                Number(pInserat?.transportAttribute?.weightClass) >= Number(startingWeightClass)
                : true;

            const bLoading = loading ? loading === pInserat?.transportAttribute?.loading : true;
            const bTransmisson = transmission ? transmission === pInserat?.transportAttribute?.transmission : true;

            const bExtraType = extraType ? extraType === pInserat?.transportAttribute?.extraType : true;



            const bFuel = fuel ? fuel === pInserat?.transportAttribute?.fuel : true;
            const bBrand = transportBrand ? transportBrand === pInserat?.transportAttribute?.transportBrand : true


            const bVolume = volume ? volume <= pInserat?.transportAttribute?.loading_volume : true;
            const bLength = loading_l ? loading_l <= pInserat?.transportAttribute?.loading_l : true;
            const bBreite = loading_b ? loading_b <= pInserat?.transportAttribute?.loading_b : true;
            const bHeight = loading_h ? loading_h <= pInserat?.transportAttribute?.loading_h : true;

            return bLoading && bTransmisson && bSeats && bDoors && bFuel && bPower && bWeightClass && bBrand && bInitial && bAhk
                && bExtraType && bVolume && bLength && bBreite && bHeight;
        }

        const checkFitsMinTime = cache((pInserat) => {
            try {
                if (!pInserat?.minTime) {
                    console.log(pInserat?.minTime)
                    return true;
                }

                const usedStartTime = startTime ? Number(startTime) : 0;
                const usedEndTime = endTime ? Number(endTime) : 1440;


                const usedStartDate = createDateWithTime(periodBegin, usedStartTime);
                const usedEndDate = createDateWithTime(periodEnd, usedEndTime);



                const diffrence = differenceInHours(new Date(usedEndDate), new Date(usedStartDate));

                if (pInserat?.minTime > diffrence) {

                    return false;
                } else {
                    return true;
                }

            } catch (e) {
                console.log(e);
                return false; // Return false if an error occurs
            }
        });


        const filterAvailability = cache((pInserat: typeof inserat) => {

            const checkMinTime = checkFitsMinTime(pInserat);

            if (!checkMinTime) {
                return false;
            }

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

                        return false;
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
        })


        //rewrite this whole shit...
        const filterAvailabilityMulti = cache((pInserat: any) => {
            try {

                const checkMinTime = checkFitsMinTime(pInserat);

                if (!checkMinTime) {
                    return false;
                }


                    if (pInserat.bookings?.length <= 0) {
                        return true;
                    }
                    //set start and date to same date if the user only provides one

                    const usedPeriodBegin = new Date(periodBegin);
                    const usedPeriodEnd = new Date(periodEnd);

                    const usedVehicles = pInserat?.vehicles;

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


                                        isAvailable = false;

                                    } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {

                                    }
                                } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {

                                }
                                else {


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

                                        isAvailable = false;
                                    }


                                }
                            }
                        }

                        startDateAppointments.clear();
                        endDateAppointments.clear();


                        if (isAvailable) {
                            return true;
                        }
                    }

                    return false;

                } catch (e) {
                    console.log(e);
                    return new NextResponse("Error", { status: 500 });
                }
            });




        const ilikeQuery = title ? title.split(' ').map((w: any) => ilike(inserat.title, `%${w}%`)) : "";

        const results = await db.query.inserat.findMany({
            where:
                and(
                    eq(inserat.isPublished, true),
                    //@ts-ignore
                    ...ilikeQuery,
                    thisCategory ? eq(inserat.category, thisCategory) : undefined,
                    start ? gte(inserat.price, start) : undefined,
                    end ? lte(inserat.price, end) : undefined,
                    minTime ? or(
                        lte(inserat.minTime, Number(minTime)),
                        isNull(inserat.minTime)
                    ) : undefined
                ),
            with: {
                address: true,
                lkwAttribute: true,
                pkwAttribute: true,
                trailerAttribute: true,
                transportAttribute: true,
                bookings: true,
                vehicles: {
                    with: {
                        bookings: true
                    }
                }
            }
        })

        const filteredArray = results.filter((pInserat: any) => {

            const conditions = ConditionFilter(pInserat);

            if (!conditions) return false;

            if (periodBegin && periodEnd) {
                let available;

                if (pInserat.multi && pInserat.vehicles.length > 0) {
                    available = filterAvailabilityMulti(pInserat);
                } else {
                    available = filterAvailability(pInserat);
                }

                if (!available) return false;
            } else if (startDateDynamic && endDateDynamic) {
                
                const dSearchResult = dynamicSearch(
                    pInserat.bookings,
                    startTime,
                    endTime,
                    startDateDynamic,
                    endDateDynamic,
                    reqTime,
                    pInserat
                )

                
                if (!dSearchResult) return false;
            }

            switch (thisCategory) {
                //@ts-ignore
                case "PKW": {
                    return PkwFilter(pInserat);
                    break;
                }
                //@ts-ignore
                case "LKW": {
                    return LkwFilter(pInserat);
                    break;
                }
                //@ts-ignore
                case "TRAILER": {
                    return TrailerFilter(pInserat);
                    break;
                }
                //@ts-ignore
                case "TRANSPORT": {
                    return TransportFilter(pInserat);
                    break;
                }
            }
            return true;
        });

        let filteredResult = [];



        if (location) {
            const usedRadius = radius ? radius : 50;
            let addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);



            if (addressObject?.data[0]?.lat && addressObject?.data[0]?.lon) {
                for (const pInserat of filteredArray) {
                    const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon,
                        Number(pInserat.address?.latitude), Number(pInserat.address?.longitude));
                    if (distance < usedRadius) {
                        filteredResult.push(pInserat);
                    }
                }
            } else {
                console.log("no address found")
                filteredResult = filteredArray;
            }

        } else {
            filteredResult = filteredArray;
        }

        return NextResponse.json(filteredResult.length);

    } catch (error: any) {
        console.log(error);
        return new NextResponse(error, { status: 500 })
    }
}