import { db } from "@/utils/db";
import axios from "axios";
import { NextResponse } from "next/server";

function calculateDistance(lat1, lon1, lat2, lon2) {
    const r = 6371; 
    const p = Math.PI / 180;
  
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                  + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                    (1 - Math.cos((lon2 - lon1) * p)) / 2;
  
    return 2 * r * Math.asin(Math.sqrt(a));
  }

export async function PATCH(
    req : Request
) {
    try {

        
       console.log("1")
        const values = await req.json();
       
        const {location,
            lkwBrand, application, loading, drive, weightClass, seats,
            ...filteredValues} = values;

        const results = await db.inserat.findMany({
            where : {
                ...filteredValues,
                isPublished : true
            }, include : {
                address : true
            }
        })
        console.log("1")
        let filteredResult = [];
            
        if(location) {
                const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);
           
            
            for (const inserat of results) {
                const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon, 
                                                    Number(inserat.address?.latitude), Number(inserat.address?.longitude));
                                                    console.log(addressObject.data[0].lat)
                                                    console.log(addressObject.data[0].lon)
                                                    console.log(distance);
                                                    if(distance < 50) {
                                                        filteredResult.push(inserat);
                                                    }
            }
        } else {
            filteredResult = results;
        }
            
        return NextResponse.json(filteredResult.length);

    } catch(error) {
        console.log(error);
        return new NextResponse(error , { status : 500 })
    }
}