import { Car, Milestone, Signal } from "lucide-react";
import OwnContent from "./own-content";

import { Inserat, Images, Rezension, User } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import AddRezension from "./add-rezension";
import getCurrentUser from "@/actions/getCurrentUser";
import MoreReviews from "./more-reviews";
import RezensionenRender from "./rezensionen";


interface RightSideProfileProps {
    inserate: Inserat[] & { images: Images[] }[];
    rezensionen: Rezension[] & { sender: User }[];

}

const RightSideProfile: React.FC<RightSideProfileProps> = async ({
    inserate,
    rezensionen
}) => {

    const currentUser = await getCurrentUser();

    const averageRating = rezensionen.reduce((a, b) => a + b.rating, 0) / rezensionen.length;

    return (
        <div className="">
            <h3 className=" flex justify-center p-8 text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] items-center bg-white rounded-md mt-5">
                <Milestone className="mr-2" /> Meine Inhalte
            </h3>
            <div className="flex justify-center mt-8">
                <OwnContent
                    inserate={inserate}
                />
            </div>
            <h3 className="flex justify-center font-semibold text-2xl items-center">
                <Separator className="w-1/3 bg-gray-500 mr-8 " /> Rezensionen <Separator className="w-1/3 bg-gray-500 ml-8 " />
            </h3>

            <div className=" mt-4 text-xl font-semibold">
                <div>
                <div>
                        <AddRezension
                        currentUser={currentUser}
                        />
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <p className="flex">
                            {averageRating} <Car className="ml-4" />
                        </p>
                        
                    </div>
                    

                    <p className="text-xs text-gray-900/50 flex justify-center"> in {rezensionen.length} Bewertungen</p>
                    <div>
                        <p>

                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 p-8 bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]">
                {rezensionen.map((rezension) => (
                    <RezensionenRender
                        rezension={rezension}
                    />
                ))}


            </div>
            {rezensionen.length > 4 && (
                <div className="w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    <MoreReviews />
                </div>
            )}
        </div>
    );
}

export default RightSideProfile;