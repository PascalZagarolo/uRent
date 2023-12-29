import { CircleUserRound, Star } from "lucide-react";

const RatingProfile = () => {
    return ( 
        <div className="flex items-center">
            <div className="flex items-center mr-4">
                <CircleUserRound
                className="text-blue-800 h-6 w-6"
                />
                <p className="ml-2 text-black font-semibold text-sm"> Rezensionen (361) </p>
            </div>
            <div className="flex">
                <Star className="h-6 w-6 text-gray-800/50"/>
                <Star className="h-6 w-6 text-gray-800/50"/>
                <Star className="h-6 w-6 text-gray-800/50"/>
                <Star className="h-6 w-6 text-gray-800/50"/>
                <Star className="h-6 w-6 text-gray-800/50"/>
            </div>
        </div>
     );
}
 
export default RatingProfile;