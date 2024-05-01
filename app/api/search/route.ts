
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import axios from "axios";
import { and, eq, gte, ilike, lte, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { lkwAttribute } from '../../../db/schema';
import { cache } from "react";
import { isSameDay } from "date-fns";

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

        const { location, amount, thisCategory, reqAge, freeMiles, license, minPrice, maxPrice, end, begin,
            //LKW
            lkwBrand, application, loading, drive, weightClass, seats,
            //PKW
            thisBrand, power, fuel, transmission, thisType, miles, initial, doors, extraCost,
            //TRAILER
            coupling, extraType, axis, brake, trailerType,
            //DATE
            periodBegin, periodEnd,

            volume, loading_l, loading_b, loading_h, title, radius, caution,
            ...filteredValues } = values;



        const ConditionFilter = (pInserat: typeof inserat) => {
            const bAge = reqAge ? reqAge >= pInserat.reqAge : true;
            const bLicense = license ? license === pInserat.license : true;
            const bCaution = caution ? caution <= pInserat.caution : true;

            return bAge && bLicense && bCaution;
        }

        const PkwFilter = (pInserat: typeof inserat) => {

            const bSeats = seats ? pInserat?.pkwAttribute?.seats >= seats : true;
            const bPower = power ? pInserat?.pkwAttribute?.power >= power : true;
            const bDoors = doors ? pInserat?.pkwAttribute?.doors >= doors : true;
            const bExtraType = extraType ? extraType === pInserat?.pkwAttribute?.extraType : true;
            const bLoading = loading ? loading === pInserat?.pkwAttribute?.loading : true;
            const bWeightClass = weightClass ? pInserat?.pkwAttribute?.weightClass === weightClass : true;
            const bFreeMiles = freeMiles ? pInserat?.pkwAttribute?.freeMiles >= freeMiles : true;
            const bExtraCost = extraCost ? pInserat?.pkwAttribute?.extraCost >= extraCost : true;
            const bType = thisType ? thisType === pInserat?.pkwAttribute?.type : true;
            const bTransmission = transmission ? transmission === pInserat?.pkwAttribute?.transmission : true;
            const bFuel = fuel ? fuel === pInserat?.pkwAttribute?.fuel : true;
            const bInitial = initial ? initial.getTime() >= pInserat?.pkwAttribute?.initial.getTime() : true;
            const bBrand = thisBrand ? thisBrand.includes(pInserat?.pkwAttribute?.brand) : true;

            const bVolume = volume ? volume <= pInserat?.pkwAttribute?.loading_volume : true
            const bLength = loading_l ? loading_l <= pInserat?.pkwAttribute?.loading_l : true;
            const bBreite = loading_b ? loading_b <= pInserat?.pkwAttribute?.loading_b : true;
            const bHeight = loading_h ? loading_h <= pInserat?.pkwAttribute?.loading_h : true;



            return bSeats && bPower && bDoors && bFreeMiles &&
                bExtraCost && bType && bTransmission && bFuel && bBrand &&
                bExtraType && bLoading && bWeightClass && bVolume && bLength && bBreite && bHeight;
        }

        const LkwFilter = (pInserat: typeof inserat) => {

            const bSeats = seats ? pInserat?.lkwAttribute?.seats >= seats : true;
            const bAxis = axis ? axis === pInserat?.lkwAttribute?.axis : true;
            const bWeightClass = weightClass ? pInserat?.lkwAttribute?.weightClass === weightClass : true;
            const bDrive = drive ? drive === pInserat?.lkwAttribute?.drive : true;
            const bLoading = loading ? loading === pInserat?.lkwAttribute?.loading : true;
            const bApplication = application ? application == pInserat?.lkwAttribute?.application : true;
            const bLkwBrand = lkwBrand ? lkwBrand === pInserat?.lkwAttribute?.lkwBrand : true;
            const bPower = power ? pInserat?.lkwAttribute?.power >= power : true;

            const bVolume = volume ? volume <= pInserat?.lkwAttribute?.loading_volume : true;
            const bLength = loading_l ? loading_l <= pInserat?.lkwAttribute?.loading_l : true;
            const bBreite = loading_b ? loading_b <= pInserat?.lkwAttribute?.loading_b : true;
            const bHeight = loading_h ? loading_h <= pInserat?.lkwAttribute?.loading_h : true;

            return bSeats && bWeightClass && bDrive && bLoading && bApplication
                && bLkwBrand && bAxis && bVolume && bLength && bBreite && bHeight && bPower;
        }

        const TrailerFilter = (pInserat: typeof inserat) => {
            const bType = trailerType ? trailerType === pInserat?.trailerAttribute?.type : true;
            const bExtraType = extraType ? extraType === pInserat?.trailerAttribute?.extraType : true;

            const bCoupling = coupling ? coupling === pInserat?.trailerAttribute?.coupling : true;
            const bLoading = loading ? loading === pInserat?.trailerAttribute?.loading : true;
            const bAxis = axis ? axis === pInserat?.trailerAttribute?.axis : true;
            const bWeightClass = weightClass ? weightClass === pInserat?.trailerAttribute?.weightClass : true;
            const bBrake = brake ? brake === pInserat?.trailerAttribute?.brake : true;

            const bVolume = volume ? volume <= pInserat?.trailerAttribute?.loading_volume : true;
            const bLength = loading_l ? loading_l <= pInserat?.trailerAttribute?.loading_l : true;
            const bBreite = loading_b ? loading_b <= pInserat?.trailerAttribute?.loading_b : true;
            const bHeight = loading_h ? loading_h <= pInserat?.trailerAttribute?.loading_h : true;

            return bType && bExtraType && bCoupling && bLoading && bAxis
                && bWeightClass && bBrake && bVolume && bLength && bBreite && bHeight;
        }

        const TransportFilter = (pInserat: typeof inserat) => {
            const bLoading = loading ? loading === pInserat?.transportAttribute?.loading : true;
            const bTransmisson = transmission ? transmission === pInserat?.transportAttribute?.transmission : true;
            const bPower = power ? pInserat?.transportAttribute?.power >= power : true;
            const bExtraType = extraType ? extraType === pInserat?.transportAttribute?.extraType : true;
            const bWeightClass = weightClass ? pInserat?.transportAttribute?.weightClass === weightClass : true;
            const bSeats = seats ? seats <= pInserat?.transportAttribute?.seats : true;
            const bDoors = doors ? doors === pInserat?.transportAttribute?.doors : true;
            const bFuel = fuel ? fuel === pInserat?.transportAttribute?.fuel : true;

            const bVolume = volume ? volume <= pInserat?.transportAttribute?.loading_volume : true;
            const bLength = loading_l ? loading_l <= pInserat?.transportAttribute?.loading_l : true;
            const bBreite = loading_b ? loading_b <= pInserat?.transportAttribute?.loading_b : true;
            const bHeight = loading_h ? loading_h <= pInserat?.transportAttribute?.loading_h : true;

            return bLoading && bTransmisson && bSeats && bDoors && bFuel && bPower && bWeightClass
                && bExtraType && bVolume && bLength && bBreite && bHeight;
        }

        const filterAvailability = cache((pInserat: typeof inserat) => {
        
            if (pInserat.bookings.length === 0) {
                return true;
            }
    
            //set start and date to same date if the user only provides one
    
            const usedPeriodBegin = new Date(periodBegin);
            const usedPeriodEnd = new Date(periodEnd);
    
            for (const booking of pInserat.bookings) {
                if (!(booking.startDate <= usedPeriodBegin) || !(booking.endDate <= usedPeriodBegin) 
                || isSameDay(booking.startDate, usedPeriodBegin) || isSameDay(booking.endDate, usedPeriodBegin)
                    && (!(booking.endDate >= usedPeriodEnd) || !(booking.startDate >= usedPeriodEnd))
                ) {
                    return false;
                }
            }
    
            return true;
        })





        const ilikeQuery = title ? title.split(' ').map((w : any) => ilike(inserat.title, `%${w}%`)) : "";

        const results = await db.query.inserat.findMany({
            where:
                and(
                    eq(inserat.isPublished, true),
                    //@ts-ignore
                    ...ilikeQuery,
                    thisCategory ? eq(inserat.category, thisCategory) : undefined,
                    begin ? gte(inserat.price, begin) : undefined,
                    end ? lte(inserat.price, end) : undefined,

                ),
            with: {
                address: true,
                lkwAttribute: true,
                pkwAttribute: true,
                trailerAttribute: true,
                transportAttribute: true,
                bookings: true
            }
        })

        const filteredArray = results.filter((pInserat) => {

            const conditions = ConditionFilter(pInserat);

            if (!conditions) return false;

            if (periodBegin && periodEnd) {

                const available = filterAvailability(pInserat);

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
                }
            }
            return true;
        });

        let filteredResult = [];



        if (location) {
            const usedRadius = radius ? radius : 50;
            const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);


            for (const pInserat of filteredArray) {
                const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon,
                    Number(pInserat.address?.latitude), Number(pInserat.address?.longitude));
                
                if (distance < usedRadius) {
                    filteredResult.push(pInserat);
                }
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