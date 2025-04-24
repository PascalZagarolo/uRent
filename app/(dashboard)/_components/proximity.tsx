'use client'

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from 'query-string';
import { useSavedSearchParams } from "@/store";
import { MapPin } from "lucide-react";

const Proximity = () => {
  const params = getSearchParamsFunction("radius");
  const usedSearchParams = useSearchParams();
  const usedRadius = usedSearchParams.get("radius");
  
  const [currentRadius, setCurrentRadius] = useState(params.radius || 25)
  const { changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  const savedParams = useSavedSearchParams((state) => state.searchParams);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if(usedRadius) {
      changeSearchParams("radius", usedRadius)
      setCurrentRadius(usedRadius);
    }
  },[])

  const onClick = (newRadius : string) => {
    setCurrentRadius(newRadius);
    changeSearchParams("radius", newRadius)
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

  // Delete radius if location is deleted
  useEffect(() => {
    if(!usedLocation && usedRadius) {
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
    <Select 
      onValueChange={(e) => onClick(e)}
      value={currentRadius.toString()}
    >
      <SelectTrigger className="w-[120px] h-10 bg-[#1B1F2C]/90 hover:bg-[#252a3d] text-gray-200 text-sm font-medium border-none rounded-r-md transition-all duration-200 focus:ring-1 focus:ring-indigo-500/60 shadow-md">
        <div className="flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-1.5 text-indigo-400/80 stroke-[2.2px]" />
          <SelectValue placeholder="Umkreis" />
        </div>
      </SelectTrigger>
      <SelectContent className="font-medium border-none bg-[#1B1F2C]/95 backdrop-blur-sm border-indigo-500/10 shadow-md">
        <SelectGroup>
          <SelectLabel className="text-indigo-400/80 text-xs">Umkreis wählen</SelectLabel>
          <SelectItem value="1" className="hover:bg-indigo-500/20 text-sm">Nur Ort</SelectItem>
          <SelectItem value="10" className="hover:bg-indigo-500/20 text-sm">10 Km</SelectItem>
          <SelectItem value="15" className="hover:bg-indigo-500/20 text-sm">15 Km</SelectItem>
          <SelectItem value="25" className="hover:bg-indigo-500/20 text-sm">25 Km</SelectItem>
          <SelectItem value="50" className="hover:bg-indigo-500/20 text-sm">50 Km</SelectItem>
          <SelectItem value="100" className="hover:bg-indigo-500/20 text-sm">100 Km</SelectItem>
          <SelectItem value="250" className="hover:bg-indigo-500/20 text-sm">250 Km</SelectItem>
          <SelectItem value="500" className="hover:bg-indigo-500/20 text-sm">500 Km</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
 
export default Proximity;