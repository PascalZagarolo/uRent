


import db from "@/db/drizzle";
import {
    ApplicationEnumRender, BrandEnumRender, CategoryEnumRender, CouplingEnumRender,
    DriveEnumRender, ExtraTypeEnumRender, FuelTypeEnumRender, inserat, lkwAttribute, LkwBrandEnumRender,
    LoadingEnumRender, pkwAttribute, TrailerEnumRender, TransmissionEnumRender,
    transportAttribute
} from "@/db/schema";
import axios from "axios";
import { isSameDay } from "date-fns";
import { and, eq, gte, ilike, lte } from "drizzle-orm";
import { cache, use } from "react";
import { object } from "zod";



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

    location?: string;
    amount?: number;
    //conditions

    reqAge?: number;
    reqLicense?: string;

    //PKW
    thisBrand?: typeof BrandEnumRender[];
    doors?: number;
    initial?: Date;
    power?: number;
    seats?: number;
    seatsMax?: number;
    fuel?: typeof FuelTypeEnumRender;
    transmission?: typeof TransmissionEnumRender;
    thisType?: any;
    freeMiles?: number;
    extraCost?: number;

    //LKW
    weightClass?: number;
    drive?: typeof DriveEnumRender;
    loading?: typeof LoadingEnumRender;
    application?: typeof ApplicationEnumRender;
    lkwBrand?: typeof LkwBrandEnumRender;

    //Trailer
    trailerType?: typeof TrailerEnumRender;
    coupling?: typeof CouplingEnumRender;
    extraType?: typeof ExtraTypeEnumRender;
    axis?: number;
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


    location,
    amount,

    reqAge,
    reqLicense,

    thisBrand,
    doors,
    initial,
    power,
    seats,
    seatsMax,
    fuel,
    transmission,
    thisType,
    freeMiles,
    extraCost,

    weightClass,
    drive,
    loading,
    application,
    lkwBrand,

    trailerType,
    coupling,
    extraType,
    axis,
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





    const ConditionFilter = cache((pInserat: typeof inserat) => {
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

    const PkwFilter = cache((pInserat: typeof inserat) => {

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

        const bSeats = searchedSeats ? pInserat?.pkwAttribute?.seats >= startingIndex && 
            pInserat?.pkwAttribute?.seats <= endingIndex : true;

        const bDoors = doors ? pInserat.pkwAttribute?.doors >= doors : true;
        const bExtraType = extraType ? extraType === pInserat.pkwAttribute?.extraType : true;
        const bLoading = loading ? loading === pInserat.pkwAttribute?.loading : true;
        const bWeightClass = weightClass ? pInserat.pkwAttribute?.weightClass === weightClass : true;
        const bFreeMiles = freeMiles ? pInserat.pkwAttribute?.freeMiles >= freeMiles : true;
        const bExtraCost = extraCost ? pInserat.pkwAttribute?.extraCost >= extraCost : true;
        const bType = thisType ? String(thisType) === pInserat.pkwAttribute?.type : true;
        const bTransmission = transmission ? transmission === pInserat?.pkwAttribute?.transmission : true;
        const bFuel = fuel ? fuel === pInserat.pkwAttribute?.fuel : true;
        const bInitial = isValidDate ? usedInitial <= pInserat?.pkwAttribute?.initial?.getTime() : true
        const bBrand = thisBrand ? String(thisBrand) === String(pInserat?.pkwAttribute?.brand) : true;
        const bPower = power ? pInserat?.pkwAttribute?.power >= power : true;
        const bVolume = volume ? volume <= pInserat?.pkwAttribute?.loading_volume : true;

        const bAhk = searchedAhk ? String(ahk) === String(pInserat?.pkwAttribute?.ahk) : true;


        return bSeats && bDoors && bFreeMiles && bInitial && bAhk &&
            bExtraCost && bType && bTransmission && bFuel && bBrand &&
            bExtraType && bLoading && bWeightClass && bVolume && bPower;
    })

    const LkwFilter = cache((pInserat: typeof inserat) => {

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

        const bSeats = searchedSeats ? pInserat?.lkwAttribute?.seats >= startingIndex && 
            pInserat?.lkwAttribute?.seats <= endingIndex : true;

        const bAxis = axis ? axis === pInserat.lkwAttribute?.axis : true;
        const bWeightClass = weightClass ? pInserat.lkwAttribute?.weightClass === weightClass : true;
        const bDrive = drive ? drive === pInserat.lkwAttribute?.drive : true;
        const bLoading = loading ? loading === pInserat.lkwAttribute?.loading : true;
        const bApplication = application ? application == pInserat.lkwAttribute?.application : true;
        const bLkwBrand = lkwBrand ? lkwBrand === pInserat.lkwAttribute?.lkwBrand : true;
        const bTransmission = transmission ? transmission === pInserat?.lkwAttribute?.transmission : true;
        const bInitial = isValidDate ? usedInitial <= pInserat?.lkwAttribute?.initial?.getTime() : true

        const bVolume = volume ? volume <= pInserat.lkwAttribute?.loading_volume : true;
        const bLength = loading_l ? loading_l <= pInserat.lkwAttribute?.loading_l : true;
        const bBreite = loading_b ? loading_b <= pInserat.lkwAttribute?.loading_b : true;
        const bHeight = loading_h ? loading_h <= pInserat.lkwAttribute?.loading_h : true;

        return bSeats && bWeightClass && bDrive && bLoading && bApplication && bInitial && bTransmission &&
            bLkwBrand && bAxis && bVolume && bLength && bBreite && bHeight;
    })

    const TrailerFilter = cache((pInserat: typeof inserat) => {

        const usedInitial = initial ? new Date(initial) : null;

        let isValidDate;

        if (initial instanceof Date && !isNaN(initial.getTime()) || String(initial)?.trim() === "" || !initial) {

            isValidDate = true;
        } else {

            isValidDate = false;
        }


        const usesBrake = (brake !== undefined && typeof brake !== "object");

        const bType = trailerType ? trailerType === pInserat.trailerAttribute?.type : true;
        const bExtraType = extraType ? extraType === pInserat.trailerAttribute?.extraType : true;
        const bCoupling = coupling ? coupling === pInserat.trailerAttribute?.coupling : true;
        const bLoading = loading ? loading === pInserat.trailerAttribute?.loading : true;
        const bAxis = axis ? axis === pInserat.trailerAttribute?.axis : true;
        const bWeightClass = weightClass ? weightClass === pInserat.trailerAttribute?.weightClass : true;
        const bBrake = usesBrake ? String(brake).toUpperCase().trim() == String(pInserat?.trailerAttribute?.brake).toUpperCase().trim() : true;
        const bInitial = isValidDate ? usedInitial <= pInserat?.trailerAttribute?.initial?.getTime() : true

        const bVolume = volume ? volume <= pInserat.trailerAttribute?.loading_volume : true;
        const bLength = loading_l ? loading_l <= pInserat.trailerAttribute?.loading_l : true;
        const bBreite = loading_b ? loading_b <= pInserat.trailerAttribute?.loading_b : true;
        const bHeight = loading_h ? loading_h <= pInserat.trailerAttribute?.loading_h : true;

        return bType && bExtraType && bCoupling && bLoading && bAxis && bInitial
            && bWeightClass && bBrake && bVolume && bLength && bBreite && bHeight;
    })

    const TransportFilter = cache((pInserat: typeof inserat) => {

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

        const bSeats = searchedSeats ? pInserat?.transportAttribute?.seats >= startingIndex && 
            pInserat?.transportAttribute?.seats <= endingIndex : true;

        const bLoading = loading ? loading === pInserat.transportAttribute.loading : true;
        const bTransmission = transmission ? transmission === pInserat?.transportAttribute?.transmission : true;
        const bPower = power ? pInserat.transportAttribute.power >= power : true;
        const bExtraType = extraType ? extraType === pInserat.transportAttribute.extraType : true;
        const bDoors = doors ? doors === pInserat.transportAttribute.doors : true;
        const bFuel = fuel ? fuel === pInserat.transportAttribute.fuel : true;
        const bInitial = isValidDate ? usedInitial <= pInserat?.transportAttribute?.initial?.getTime() : true;
        const bBrand = transportBrand ? transportBrand === pInserat?.transportAttribute?.transportBrand : true

        const bVolume = volume ? volume <= pInserat?.transportAttribute?.loading_volume : true;
        const bLength = loading_l ? loading_l <= pInserat.transportAttribute?.loading_l : true;
        const bBreite = loading_b ? loading_b <= pInserat.transportAttribute?.loading_b : true;
        const bHeight = loading_h ? loading_h <= pInserat.transportAttribute?.loading_h : true;

        return bLoading && bTransmission && bSeats && bDoors && bFuel && bPower && bInitial && bBrand
            && bExtraType && bVolume && bLength && bBreite && bHeight;
    })

    const filterAvailability = cache((pInserat: typeof inserat) => {
        console.log("test")
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

    const filterAvailabilityMulti = cache((pInserat: typeof inserat) => {


        if (pInserat.bookings.length === 0) {
            return true;
        }
        //set start and date to same date if the user only provides one

        const usedPeriodBegin = new Date(periodBegin);
        const usedPeriodEnd = new Date(periodEnd);

        let index = 1;

        for (const vehicle of pInserat?.vehicles) {

            const startDateAppointments = new Set<any>()
            const endDateAppointments = new Set<any>();
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
                            console.log("this")
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
                        if (endDateAppointments.has("0") && !isSameDay(usedPeriodBegin, usedPeriodEnd)) {
                            console.log("this")
                            isAvailable = false;
                        } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {
                            console.log(booking)

                        }
                    } else if (booking.endDate > usedPeriodEnd && booking.startDate > usedPeriodEnd) {

                    }
                    else if (index === pInserat.vehicles.length) {

                        isAvailable = false;
                    }
                }

            }

            if ((startTime || endTime)) {

                if (startTime) {
                    let usedEnd;

                    if (isSameDay(usedPeriodBegin, usedPeriodEnd) && endTime) {
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
                    if (isSameDay(usedPeriodBegin, usedPeriodEnd) && startTime) {
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

            if (isAvailable) {
                return true;
            }
            index++;

        }

        return false;
    })

    try {
        const ilikeQuery = title ? title.split(' ').map((w) => ilike(inserat.title, `%${w}%`)) : "";

        const findInserate = await db.query.inserat.findMany({
            where: (
                and(
                    eq(inserat.isPublished, "true"),
                    //@ts-ignore
                    ...ilikeQuery,
                    start ? gte(inserat.price, start) : undefined,
                    end ? lte(inserat.price, end) : undefined,
                    thisCategory ? eq(inserat.category, thisCategory) : undefined,

                )
            ),
            with: {
                user: true,
                images: true,
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
            }

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
            const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);
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

        return returnedArray;

    } catch (error: any) {
        console.log(error)
        return [];
    }
});




