import { db } from "@/utils/db";
import InseratImageCarousel from "./_components/inserat-image";
import { AlignLeft, CarFront, MapPin } from "lucide-react";
import Active from "./_components/active-badge";
import ProfileView from "./_components/profile-view";
import InseratOptions from "./_components/inserat-options";
import getCurrentUser from "@/actions/getCurrentUser";
import InseratDescription from "./_components/inserat-description";


const InseratAnzeige = async ({
    params
}: { params: { inseratId: string } }) => {

    const currentUser = await getCurrentUser();

    const images = await db.images.findMany({
        where: {
            inseratId: params.inseratId
        }
    })

    const inserat = await db.inserat.findUnique({
        where: {
            id: params.inseratId
        }
    })

    const user = await db.user.findUnique({
        where: {
            id: inserat.userId
        }
    })

    const inseratArray = await db.inserat.findMany({
        where : {
            userId : user.id
        }
    })

    const inseratOwner = await db.user.findUnique({
        where : {
            id : inserat.userId
        }
    })

    const purchases = await db.purchase.findUnique({
        where : {
            inseratId_userId : {
                inseratId : inserat.id,
                userId : currentUser.id
            
            }
        }
    })

    const rezensionen = await db.rezension.findMany({
        where : {
            receiverId : user.id
        }
    })

    const contactOptions = await db.contactOptions.findUnique({
        where : {
            userId : currentUser.id
        }
    })

   

    const isPurchased = purchases ? true : false;

    return (
        <div className="2xl:grid  2xl:grid-cols-2 xl:flex justify-center  gap-12 xl:mt-24 h-max">
            <div className="h-full p-4">
                <div className="flex xl:justify-end justify-center">
                    <div className="mt-4 bg-[#262939] text-gray-200 p-8 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border border-gray-300 w-full md:w-auto">
                        <div className="flex items-center justify-end truncate ">
                            {inserat.category === "PKW" && (
                                <div className="bg-[#1d1f2b] px-8 rounded-lg p-4">
                                    <CarFront className="" />
                                </div>
                                
                            )}
                            <p className="text-xl ml-4 font-bold text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] 
                            bg-[#1d1f2b] px-8 rounded-lg p-4 w-[400px] truncate flex justify-center border
                             border-gray-300"> {inserat.title}   </p>
                            <div className="flex justify-end ml-4 bg-[#1d1f2b] px-8 rounded-lg p-4">
                                <Active />
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-1">
                            <p className="text-sm text-gray-200 font-semibold italic">erstellt am :</p>
                            <p className="font-semibold text-sm">01.01.24</p>
                        </div>


                        <div className="mt-4 rounded-md     flex justify-center text-gray-900">
                        <InseratImageCarousel
                                images={images}
                            />
                        </div>
                        <div>
                            <div className="flex justify-end items-center bg-gray-100/100 mt-8 p-2 text-gray-900 rounded-md border-gray-800 border-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                            <div className="flex mr-auto items-center">
                                <div className="flex font-bold italic text-sm items-center"> <MapPin className="text-rose-600 "/> Mömer </div>
                                </div>
                                <div className="justify-end flex mt-2 text-2xl font-bold">
                                    {inserat.price} <p className="text-sm mr-1">00 €</p>
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        <div className="">

                        </div>
                        <div className="mt-2">
                            <div className="">
                                <p className="flex text-lg sm:text-xl font-bold"><AlignLeft className="mr-2"/> Beschreibung der Anzeige</p>
                            </div>
                                <InseratDescription
                                    inserat = {inserat}
                                />
                        </div>
                    </div>


                </div>

            </div>


            <div className=" p-4 xl:mt-24 sm:flex justify-center xl:block">
            <div className="xl:hidden flex sm:block justify-center">
                    <ProfileView
                        user={user}
                        inseratArray = {inseratArray}
                        inseratOwner = {inseratOwner}
                        averageRating={rezensionen.reduce((a, b) => a + b.rating, 0) / rezensionen.length}
                    />
                </div>
            <div className="sm:ml-16 xl:ml-0 flex sm:block justify-center">
                    <InseratOptions 
                    user = {user}
                    isPurchased = {isPurchased}
                    ownUser = {currentUser}
                    
                    contactOptions = {contactOptions}
                    />
                </div>
                <div className="hidden xl:mt-16 xl:block">
                    <ProfileView
                        user={user}
                        inseratArray = {inseratArray}
                        inseratOwner = {inseratOwner}
                        averageRating={rezensionen.reduce((a, b) => a + b.rating, 0) / rezensionen.length}
                    />
                </div>

            </div>
        </div>
    );
}

export default InseratAnzeige;