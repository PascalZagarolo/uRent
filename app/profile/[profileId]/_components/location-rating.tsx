import { MapPin } from "lucide-react";

const LocationProfile = () => {
    return ( 
        <div>
            <div className="flex">
                <p><MapPin className="h-6 w-6 text-blue-800"/></p>
                <div className="text-sm font-semibold flex ml-2 items-center">
                    <p className="mr-2">Land</p>, <p className="text-rose-600 ml-2"> Stadt </p>
                </div>
            </div>
        </div>
     );
}
 
export default LocationProfile;