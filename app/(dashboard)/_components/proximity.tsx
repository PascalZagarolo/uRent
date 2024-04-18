'use client'

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from 'query-string';


const Proximity = () => {

  const params = getSearchParamsFunction("radius");

  const [currentRadius, setCurrentRadius] = useState(params.radius || 25)

  const pathname = usePathname();
  const router = useRouter();

    const onClick = (newRadius : string) => {
      setCurrentRadius(newRadius)
      const url = qs.stringifyUrl({
        url: pathname,
        query: {
            radius : Number(newRadius),
            ...params,
        }
    }, { skipNull: true, skipEmptyString: true });
    router.push(url)
    }

    const searchParams = useSearchParams();

    const usedLocation = searchParams.get("location");

    //delete radius if location is deleted
    useEffect(() => {
      
      if(!usedLocation) {
        const url = qs.stringifyUrl({
          url: pathname,
          query: {
              radius : null,
              ...params,
          }
      }, { skipNull: true, skipEmptyString: true });
      router.push(url)
      }

      

    },[usedLocation])

    return ( 
        <Select onValueChange={(e) => {
          onClick(e)
        }}>
      <SelectTrigger className="w-[120px] bg-[#141721] text-gray-200 f border-none rounded-none rounded-r-md">
        <SelectValue placeholder="Umkreis" />
      </SelectTrigger>
      <SelectContent className="font-semibold">
        <SelectGroup>
          <SelectLabel>Umkreis</SelectLabel>
          <SelectItem value="1">Nur Ort</SelectItem>
          <SelectItem value="10">10 Km</SelectItem>
          <SelectItem value="15">15 Km</SelectItem>
          <SelectItem value="25">25 Km</SelectItem>
          <SelectItem value="50">50 Km</SelectItem>
          <SelectItem value="100">100 Km</SelectItem>
          <SelectItem value="250">250 Km</SelectItem>
          <SelectItem value="500">500 Km</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
     );
}
 
export default Proximity;