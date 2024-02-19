import { Car, Milestone, Signal } from "lucide-react";
import OwnContent from "./own-content";

import { Inserat, Images, Rezension, User } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import AddRezension from "./add-rezension";
import getCurrentUser from "@/actions/getCurrentUser";
import MoreReviews from "./more-reviews";
import RezensionenRender from "./rezensionen";

type RezensionWithSender = Rezension & {
    sender: User;
  };

interface RightSideProfileProps {
    inserate: Inserat[] & { images: Images[] }[];
    rezensionen: RezensionWithSender[];

}

const RightSideProfile: React.FC<RightSideProfileProps> = async ({
    inserate,
    rezensionen
}) => {

    const currentUser = await getCurrentUser();

    const averageRating = rezensionen.reduce((a, b) => a + b.rating, 0) / rezensionen.length;

    return (
        <div className="">
            <h3 className=" flex justify-center p-8 text-3xl font-bold  items-center bg-white rounded-md mt-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
            dark:bg-[#10121a] dark:border dark:border-gray-300">
                <Milestone className="mr-2" /> Meine Inhalte
            </h3>
            <div className="flex justify-center mt-8">
                <OwnContent
                    inserate={inserate}
                />
            </div>
            <h3 className="flex justify-center font-semibold text-2xl items-center mt-8">
                <Separator className="w-1/3 bg-gray-500 mr-8 " /> Rezensionen <Separator className="w-1/3 bg-gray-500 ml-8 " />
            </h3>

            <div className=" mt-4 text-xl font-semibold">
                <div>
                    <div>
                        <AddRezension
                            currentUser={currentUser}
                        />
                    </div>
                    {rezensionen.length !== 0 && (
                        <>
                            <div className="flex justify-center items-center mt-4">
                                <p className="flex">
                                    {averageRating} <Car className="ml-4" />
                                </p>

                            </div>


                            <p className="text-xs text-gray-900/50 flex justify-center dark:text-gray-100"> in {rezensionen.length} Bewertungen</p>
                        </>


                    )}
                    
                    
                                        </div>
            </div>
            
            {rezensionen.length !== 0 ? (
                <div className="mt-4 grid grid-cols-2 gap-4 p-8 bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] dark:bg-[#0F0F0F] dark:border-gray-300 dark:border">
                {rezensionen.map((rezension : RezensionWithSender) => (
                    <RezensionenRender
                    rezension={rezension}
                    key={rezension.id}
                />
                ))}


            </div>
            ) : (
                <div className="mt-4 p-8 flex justify-center text-gray-900/50 font-semibold italic dark:bg-[#10121a] dark:border 
                dark:border-gray-100 dark:text-gray-100/70">
                    Noch keine Rezensionen vorhanden
                </div>
            )}
            {rezensionen.length > 4 && (
                <div className="w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
                    <MoreReviews />
                </div>
            )}
            
        </div>
    );
}

export default RightSideProfile;