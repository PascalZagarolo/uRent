


import db from "@/db/drizzle";
import {
    ApplicationEnumRender, BrandEnumRender, CategoryEnumRender, CouplingEnumRender,
    DriveEnumRender, ExtraTypeEnumRender, FuelTypeEnumRender, images, inserat, lkwAttribute, LkwBrandEnumRender,
    LoadingEnumRender, pkwAttribute, TrailerEnumRender, TransmissionEnumRender,
    transportAttribute,
    userTable
} from "@/db/schema";
import axios from "axios";
import { differenceInHours, isAfter, isBefore, isEqual, isSameDay } from "date-fns";
import { and, eq, gte, ilike, isNull, lte, or, sql } from "drizzle-orm";
import { cache } from "react";
import { dynamicSearch } from "./dynamic-search";
import { createDateWithTime } from "@/hooks/date/combine-date-with-minutes";
import { user } from "@/drizzle/schema";





type GetInserate = {
    title?: string;
    thisCategory?: typeof CategoryEnumRender;
    filter?: string;
    start?: number;
    end?: number;
    page?: number;

    periodBegin?: string;
    periodEnd?: string;
    startTime?: number;
    endTime?: number;
    startDateDynamic?: string;
    endDateDynamic?: string;
    reqTime?: string;

    location?: string;
    amount?: number;
    //conditions

    reqAge?: number;
    reqLicense?: string;
    minTime: number;

    //PKW
    thisBrand?: typeof BrandEnumRender[];
    doors?: number;
    doorsMax?: number;
    initial?: Date;
    initialMax?: Date;
    power?: number;
    powerMax?: number;
    seats?: number;
    seatsMax?: number;
    fuel?: typeof FuelTypeEnumRender;
    transmission?: typeof TransmissionEnumRender;
    thisType?: any;
    freeMiles?: number;
    extraCost?: number;

    //LKW
    weightClass?: number;
    weightClassMax?: number;
    payload?: number;
    payloadMax?: number;
    drive?: typeof DriveEnumRender;
    loading?: typeof LoadingEnumRender;
    application?: typeof ApplicationEnumRender;
    lkwBrand?: typeof LkwBrandEnumRender;

    //Trailer
    trailerType?: typeof TrailerEnumRender;
    coupling?: typeof CouplingEnumRender;
    extraType?: typeof ExtraTypeEnumRender;
    axis?: number;
    axisMax?: number;
    brake?: boolean;

    //TRANSPORT
    transportBrand?: string;

    volume?: number;

    loading_l?: number;
    loading_b?: number;
    loading_h?: number;

    radius?: number;
    caution?: number;

    userId?: string
    ahk?: string;

}

//returns km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const r = 6371;
    const p = Math.PI / 180;

    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
        + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
        (1 - Math.cos((lon2 - lon1) * p)) / 2;

    return 2 * r * Math.asin(Math.sqrt(a));
}



export const getInserate = cache(async ({
    title,
    thisCategory,
    filter,
    start,
    end,
    page,

    periodBegin,
    periodEnd,
    startTime,
    endTime,
    startDateDynamic,
    endDateDynamic,
    reqTime,
    minTime,


    location,
    amount,

    reqAge,
    reqLicense,

    thisBrand,
    doors,
    doorsMax,
    initial,
    initialMax,
    power,
    powerMax,
    seats,
    seatsMax,
    fuel,
    transmission,
    thisType,
    freeMiles,
    extraCost,

    weightClass,
    weightClassMax,
    payload,
    payloadMax,
    drive,
    loading,
    application,
    lkwBrand,

    trailerType,
    coupling,
    extraType,
    axis,
    axisMax,
    brake,

    volume,

    loading_l,
    loading_b,
    loading_h,

    radius,
    userId,
    caution,

    transportBrand,
    ahk

}: GetInserate): Promise<typeof inserat.$inferSelect[]> => {





    const ConditionFilter = cache((pInserat: any) => {
        const bAge = reqAge ? Number(reqAge) >= Number(pInserat.reqAge) : true;
        const bLicense = reqLicense ? reqLicense === pInserat.license : true;
        const bCaution = caution ? Number(caution) >= Number(pInserat.caution) : true;

        if (caution && !pInserat?.caution) {
            return false
        }

        if (reqAge && !pInserat?.reqAge) {
            return false;
        }

        return bAge && bLicense && bCaution;
    })

    const PkwFilter = cache((pInserat: any) => {

        const searchedAhk = (typeof (ahk) !== 'undefined' && ahk !== null);

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

        const searchedPower = (power || powerMax) ? true : false;
        const minPower = power ? power : 0;
        const maxPower = powerMax ? powerMax : 100000;

        const searchedMaxInitial = (initialMax instanceof Date && !isNaN(initialMax.getTime())
            || String(initialMax)?.trim() === "" || !initialMax) ? true : false;
        const searchedMinInitial = (initial instanceof Date && !isNaN(initial.getTime())
            || String(initial)?.trim() === "" || !initial) ? true : false;
        const searchedInitial = (searchedMinInitial || searchedMaxInitial) ? true : false;

        const minInitial = searchedMinInitial ? new Date(initial) : new Date(1900, 0, 1)

        const maxInitial = searchedMaxInitial ? new Date(initialMax) : new Date(2060, 0, 1);

        const bInitial = searchedInitial ? ((isEqual(minInitial, pInserat?.pkwAttribute?.initial) ||
            isBefore(minInitial, pInserat?.pkwAttribute?.initial)) &&
            (isEqual(maxInitial, pInserat?.pkwAttribute?.initial) || isAfter(maxInitial, pInserat?.pkwAttribute?.initial)))
            : true;


        const bPower = searchedPower ? pInserat?.pkwAttribute?.power >= minPower &&
            pInserat?.pkwAttribute?.power <= maxPower
            : true;

        const bSeats = searchedSeats ? pInserat?.pkwAttribute?.seats >= startingIndex &&
            pInserat?.pkwAttribute?.seats <= endingIndex : true;

        const bDoors = searchedDoors ? startingDoors <= pInserat?.pkwAttribute?.doors
            && endingDoors >= pInserat?.pkwAttribute?.doors
            : true;


        const bExtraType = extraType ? extraType === pInserat.pkwAttribute?.extraType : true;
        const bLoading = loading ? loading === pInserat.pkwAttribute?.loading : true;
        const bWeightClass = weightClass ? pInserat.pkwAttribute?.weightClass === weightClass : true;
        const bFreeMiles = freeMiles ? pInserat.pkwAttribute?.freeMiles >= freeMiles : true;
        const bExtraCost = extraCost ? pInserat.pkwAttribute?.extraCost >= extraCost : true;
        const bType = thisType ? String(thisType) === pInserat.pkwAttribute?.type : true;
        const bTransmission = transmission ? transmission === pInserat?.pkwAttribute?.transmission : true;
        const bFuel = fuel ? fuel === pInserat.pkwAttribute?.fuel : true;

        const bBrand = thisBrand ? String(thisBrand) === String(pInserat?.pkwAttribute?.brand) : true;

        const bVolume = volume ? volume <= pInserat?.pkwAttribute?.loading_volume : true;

        const bAhk = searchedAhk ? String(ahk) === String(pInserat?.pkwAttribute?.ahk) : true;


        return bSeats && bDoors && bFreeMiles && bInitial && bAhk &&
            bExtraCost && bType && bTransmission && bFuel && bBrand &&
            bExtraType && bLoading && bWeightClass && bVolume && bPower;
    })

    const LkwFilter = cache((pInserat: any) => {

        const usedInitial = initial ? new Date(initial) : null;

        let isValidDate;

        if (initial instanceof Date && !isNaN(initial.getTime()) || String(initial)?.trim() === "" || !initial) {

            isValidDate = true;
        } else {

            isValidDate = false;
        }

        const searchedPayload = (payload || payloadMax) ? true : false;
        const startingPayload = payload ? payload : 0;
        const endingPayload = payloadMax ? payloadMax : 100000;



        const bPayload = searchedPayload ?
            Number(pInserat?.lkwAttribute?.payload ?? 1000000000) <= Number(endingPayload) &&
            Number(pInserat?.lkwAttribute?.payload ?? 0) >= Number(startingPayload)
            : true;

        const searchedSeats = seats || seatsMax ? true : false;
        const startingIndex = seats ? seats : 0;
        const endingIndex = seatsMax ? seatsMax : 10;

        const searchedWeightClass = (weightClass || weightClassMax) ? true : false;
        const startingWeightClass = weightClass ? weightClass : 0;
        const endingWeightClass = weightClassMax ? weightClassMax : 100000;

        const searchedPower = (power || powerMax) ? true : false;
        const minPower = power ? power : 0;
        const maxPower = powerMax ? powerMax : 100000;

        const searchedMaxInitial = (initialMax instanceof Date && !isNaN(initialMax.getTime())
            || String(initialMax)?.trim() === "" || !initialMax) ? true : false;
        const searchedMinInitial = (initial instanceof Date && !isNaN(initial.getTime())
            || String(initial)?.trim() === "" || !initial) ? true : false;
        const searchedInitial = (searchedMinInitial || searchedMaxInitial) ? true : false;

        const minInitial = searchedMinInitial ? new Date(initial) : new Date(1900, 0, 1)

        const maxInitial = searchedMaxInitial ? new Date(initialMax) : new Date(2060, 0, 1);

        const bInitial = searchedInitial ? ((isEqual(minInitial, pInserat?.lkwAttribute?.initial) ||
            isBefore(minInitial, pInserat?.lkwAttribute?.initial)) &&
            (isEqual(maxInitial, pInserat?.lkwAttribute?.initial) || isAfter(maxInitial, pInserat?.lkwAttribute?.initial)))
            : true;


        const bPower = searchedPower ? pInserat?.lkwAttribute?.power >= minPower &&
            pInserat?.lkwAttribute?.power <= maxPower
            : true;

        const bSeats = searchedSeats ? pInserat?.lkwAttribute?.seats >= startingIndex &&
            pInserat?.lkwAttribute?.seats <= endingIndex : true;

        const bWeightClass = searchedWeightClass ?
            Number(pInserat?.lkwAttribute?.weightClass ?? 1000000000) <= Number(endingWeightClass) &&
            Number(pInserat?.lkwAttribute?.weightClass ?? 0) >= Number(startingWeightClass)
            : true;

        const searchedAxis = (axis || axisMax) ? true : false;

        const minAxis = axis ? axis : 0;
        const maxAxis = axisMax ? axisMax : 10;

        const bAxis = searchedAxis ? minAxis <= pInserat?.lkwAttribute?.axis && maxAxis >= pInserat?.lkwAttribute?.axis : true;

        const searchedAhk = (typeof (ahk) !== 'undefined' && ahk !== null);
        const bAhk = searchedAhk ? String(ahk) === String(pInserat?.lkwAttribute?.ahk) : true;

        const bDrive = drive ? drive === pInserat.lkwAttribute?.drive : true;
        const bLoading = loading ? loading === pInserat.lkwAttribute?.loading : true;
        const bApplication = application ? application == pInserat.lkwAttribute?.application : true;
        const bLkwBrand = lkwBrand ? lkwBrand === pInserat.lkwAttribute?.lkwBrand : true;
        const bTransmission = transmission ? transmission === pInserat?.lkwAttribute?.transmission : true;
        const bFuel = fuel ? String(fuel) == String(pInserat.lkwAttribute?.fuel) : true;
        const bVolume = volume ? volume <= pInserat.lkwAttribute?.loading_volume : true;
        const bLength = loading_l ? loading_l <= pInserat.lkwAttribute?.loading_l : true;
        const bBreite = loading_b ? loading_b <= pInserat.lkwAttribute?.loading_b : true;
        const bHeight = loading_h ? loading_h <= pInserat.lkwAttribute?.loading_h : true;

        return bSeats && bWeightClass && bDrive && bLoading && bApplication && bInitial && bTransmission && bPower && bFuel && bAhk && bPayload &&
            bLkwBrand && bAxis && bVolume && bLength && bBreite && bHeight;
    })

    const TrailerFilter = cache((pInserat: any) => {


        //
        const searchedPayload = (payload || payloadMax) ? true : false;
        const startingPayload = payload ? payload : 0;
        const endingPayload = payloadMax ? payloadMax : 100000;

        const bPayload = searchedPayload ?
            Number(pInserat?.trailerAttribute?.payload ?? 1000000000) <= Number(endingPayload) &&
            Number(pInserat?.trailerAttribute?.payload ?? 0) >= Number(startingPayload)
            : true;
        //

        const searchedWeightClass = (weightClass || weightClassMax) ? true : false;
        const startingWeightClass = weightClass ? weightClass : 0;
        const endingWeightClass = weightClassMax ? weightClassMax : 100000;

        const searchedAxis = (axis || axisMax) ? true : false;
        const minAxis = axis ? axis : 0;
        const maxAxis = axisMax ? axisMax : 10;

        const searchedMaxInitial = (initialMax instanceof Date && !isNaN(initialMax.getTime())
            || String(initialMax)?.trim() === "" || !initialMax) ? true : false;
        const searchedMinInitial = (initial instanceof Date && !isNaN(initial.getTime())
            || String(initial)?.trim() === "" || !initial) ? true : false;
        const searchedInitial = (searchedMinInitial || searchedMaxInitial) ? true : false;

        const minInitial = searchedMinInitial ? new Date(initial) : new Date(1900, 0, 1)

        const maxInitial = searchedMaxInitial ? new Date(initialMax) : new Date(2060, 0, 1);

        const bInitial = searchedInitial ? ((isEqual(minInitial, pInserat?.trailerAttribute?.initial) ||
            isBefore(minInitial, pInserat?.trailerAttribute?.initial)) &&
            (isEqual(maxInitial, pInserat?.trailerAttribute?.initial) || isAfter(maxInitial, pInserat?.trailerAttribute?.initial)))
            : true;

        const bAxis = searchedAxis ? minAxis <= pInserat?.trailerAttribute?.axis && maxAxis >= pInserat?.trailerAttribute?.axis : true;

        const bWeightClass = searchedWeightClass ?
            Number(pInserat?.trailerAttribute?.weightClass ?? 1000000000) <= Number(endingWeightClass) &&
            Number(pInserat?.trailerAttribute?.weightClass ?? 0) >= Number(startingWeightClass)
            : true;


        const usesBrake = (brake !== undefined && typeof brake !== "object");

        const bType = trailerType ? trailerType === pInserat.trailerAttribute?.type : true;
        const bExtraType = extraType ? extraType === pInserat.trailerAttribute?.extraType : true;
        const bCoupling = coupling ? coupling === pInserat.trailerAttribute?.coupling : true;
        const bLoading = loading ? loading === pInserat.trailerAttribute?.loading : true;


        const bBrake = usesBrake ? String(brake).toUpperCase().trim() == String(pInserat?.trailerAttribute?.brake).toUpperCase().trim() : true;


        const bVolume = volume ? volume <= pInserat.trailerAttribute?.loading_volume : true;
        const bLength = loading_l ? loading_l <= pInserat.trailerAttribute?.loading_l : true;
        const bBreite = loading_b ? loading_b <= pInserat.trailerAttribute?.loading_b : true;
        const bHeight = loading_h ? loading_h <= pInserat.trailerAttribute?.loading_h : true;

        return bType && bExtraType && bCoupling && bLoading && bAxis && bInitial && bPayload
            && bWeightClass && bBrake && bVolume && bLength && bBreite && bHeight;
    })

    const TransportFilter = cache((pInserat: any) => {

        const usedInitial = initial ? new Date(initial) : null;

        let isValidDate;

        if (initial instanceof Date && !isNaN(initial.getTime()) || String(initial)?.trim() === "" || !initial) {

            isValidDate = true;
        } else {

            isValidDate = false;
        }

        //
        const searchedPayload = (payload || payloadMax) ? true : false;
        const startingPayload = payload ? payload : 0;
        const endingPayload = payloadMax ? payloadMax : 100000;

        const bPayload = searchedPayload ?
            Number(pInserat?.transportAttribute?.payload ?? 1000000000) <= Number(endingPayload) &&
            Number(pInserat?.transportAttribute?.payload ?? 0) >= Number(startingPayload)
            : true;
        //


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

        const searchedMaxInitial = (initialMax instanceof Date && !isNaN(initialMax.getTime())
            || String(initialMax)?.trim() === "" || !initialMax) ? true : false;
        const searchedMinInitial = (initial instanceof Date && !isNaN(initial.getTime())
            || String(initial)?.trim() === "" || !initial) ? true : false;
        const searchedInitial = (searchedMinInitial || searchedMaxInitial) ? true : false;

        const minInitial = searchedMinInitial ? new Date(initial) : new Date(1900, 0, 1)

        const maxInitial = searchedMaxInitial ? new Date(initialMax) : new Date(2060, 0, 1);

        const bInitial = searchedInitial ? ((isEqual(minInitial, pInserat?.transportAttribute?.initial) ||
            isBefore(minInitial, pInserat?.transportAttribute?.initial)) &&
            (isEqual(maxInitial, pInserat?.transportAttribute?.initial) || isAfter(maxInitial, pInserat?.transportAttribute?.initial)))
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
            Number(pInserat?.transportAttribute?.weightClass ?? 1000000000) <= Number(endingWeightClass) &&
            Number(pInserat?.transportAttribute?.weightClass ?? 0) >= Number(startingWeightClass)
            : true;

        const bLoading = loading ? loading === pInserat.transportAttribute.loading : true;
        const bTransmission = transmission ? transmission === pInserat?.transportAttribute?.transmission : true;

        const searchedAhk = (typeof (ahk) !== 'undefined' && ahk !== null);
        const bAhk = searchedAhk ? String(ahk) === String(pInserat?.transportAttribute?.ahk) : true;

        const bExtraType = extraType ? extraType === pInserat.transportAttribute.extraType : true;

        const bFuel = fuel ? fuel === pInserat.transportAttribute.fuel : true;

        const bBrand = transportBrand ? transportBrand === pInserat?.transportAttribute?.transportBrand : true

        const bVolume = volume ? volume <= pInserat?.transportAttribute?.loading_volume : true;
        const bLength = loading_l ? loading_l <= pInserat.transportAttribute?.loading_l : true;
        const bBreite = loading_b ? loading_b <= pInserat.transportAttribute?.loading_b : true;
        const bHeight = loading_h ? loading_h <= pInserat.transportAttribute?.loading_h : true;

        return bLoading && bTransmission && bSeats && bDoors && bFuel && bPower && bInitial && bBrand && bWeightClass && bAhk && bPayload
            && bExtraType && bVolume && bLength && bBreite && bHeight;
    })

    const filterAvailability = cache((pInserat: any) => {

        const fitsMinTime = checkFitsMinTime(pInserat);

        if (!fitsMinTime) {
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

    const filterAvailabilityMulti = cache((pInserat: any) => {
        try {

            const fitsMinTime = checkFitsMinTime(pInserat);

            if (!fitsMinTime) {
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
        }
    });


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


    try {
        const ilikeQuery = title
            ? title.split(' ').map((w) =>
                or(
                    ilike(inserat.title, `%${w}%`),
                )
            )
            : "";

        const findInserate = await db.query.inserat.findMany({
            where: (
                and(
                    eq(inserat.isPublished, true),
                    //@ts-ignore
                    ...ilikeQuery,
                    start ? gte(inserat.price as any, start) : undefined,
                    end ? lte(inserat.price as any, end) : undefined,
                    thisCategory ? eq(inserat.category, thisCategory as any) : undefined,
                    minTime ? or(
                        lte(inserat.minTime, Number(minTime)),
                        isNull(inserat.minTime)
                    ) : undefined
                )
            ),
            with: {
                user: {
                    with: {
                        subscription: {
                            select: {
                                subscriptionType: true,
                                stripe_current_period_end: true,
                            }
                        }
                    }
                },
                images: {
                    orderBy: (created_at, { asc }) => [asc(images.position)],

                },
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

            },
            ...(filter === "relevance") && {
                orderBy: (views, { desc }) => [desc(inserat.views)]
            },
            ...(filter === "asc") && {
                orderBy: (price, { asc }) => [asc(inserat.price)]
            },
            ...(filter === "desc") && {
                orderBy: (price, { desc }) => [desc(inserat.price)]
            },

         }).prepare("findInserate");


        

        const foundInserate = await findInserate.execute();


        








        const filteredArray = foundInserate.filter((pInserat) => {

            const validateUser = userId ? pInserat.userId === userId : true;

            if (!validateUser) return false;

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


                const usedStartTime = String(startTime);
                const usedEndTime = String(endTime);
                const usedStartDate = new Date(startDateDynamic);
                const usedEndDate = new Date(endDateDynamic);

                const dSearchResult = dynamicSearch(
                    pInserat.bookings,
                    usedStartTime,
                    usedEndTime,
                    usedStartDate,
                    usedEndDate,
                    reqTime,
                    pInserat
                )

                console.log(dSearchResult)
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
                } default: {
                    return true;
                }


            }


        });



        let returnedArray = [];

        if (location) {

            const usedRadius = radius ? radius : 50;
            let addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);
            console.log(addressObject?.data[0]?.lat);
            console.log(addressObject?.data[0]?.lon);
            console.log("test")
            /*
            if(!addressObject?.data[0]?.lat || !addressObject?.data[0]?.lon) {
                const words = location.split(' ');
                console.log(words)
                for (let word of words) {
                    addressObject = await axios.get(`https://geocode.maps.co/search?q=${word}&api_key=${process.env.GEOCODING_API}`);
                    console.log(word)
                    if(addressObject?.data[0]?.lat && addressObject?.data[0]?.lon) {
                        console.log(addressObject?.data[0]?.lat);
                        console.log(addressObject?.data[0]?.lon);
                        console.log("test2")
                        break;
                    }
                }
            }
            */
            if (addressObject?.data[0]?.lat && addressObject?.data[0]?.lon) {
                for (const pInserat of filteredArray) {
                    const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon,
                        Number(pInserat.address?.latitude), Number(pInserat.address?.longitude));
                    if (distance < usedRadius) {
                        returnedArray.push(pInserat);
                    }
                }
            } else {

                returnedArray = filteredArray;
            }
        } else {
            returnedArray = filteredArray;
        }

        if (filter === "date_newest") {
            returnedArray.sort((a, b) => {
                return new Date(b.firstRelease).getTime() - new Date(a.firstRelease).getTime();
            })
        }

        if (filter === "date_oldest") {
            returnedArray.sort((a, b) => {
                return new Date(a.firstRelease).getTime() - new Date(b.firstRelease).getTime();
            })
        }



        if (!filter || filter === "relevance") {



            returnedArray.sort((a, b) => {

                const aIsPremium = a.user?.subscription?.subscriptionType === "PREMIUM" || a.user?.subscription?.subscriptionType === "ENTERPRISE";
                const bIsPremium = b.user?.subscription?.subscriptionType === "PREMIUM" || b.user?.subscription?.subscriptionType === "ENTERPRISE";

                if (aIsPremium && !bIsPremium) {
                    return -1; // a should come before b
                } else if (!aIsPremium && bIsPremium) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }

        return returnedArray;

    } catch (error: any) {
        console.log(error)
        return [];
    }
});




