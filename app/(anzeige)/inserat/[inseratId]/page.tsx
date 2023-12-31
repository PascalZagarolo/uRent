import { db } from "@/app/utils/db";
import InseratImageCarousel from "./_components/inserat-image";
import { AlignLeft, CarFront, MapPin } from "lucide-react";
import Active from "./_components/active-badge";
import ProfileView from "./_components/profile-view";
import InseratOptions from "./_components/inserat-options";


const InseratAnzeige = async ({
    params
}: { params: { inseratId: string } }) => {


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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-24">
            <div className=" p-4">
                <div className="flex justify-end">
                    <div className="mt-4">
                        <div className="flex items-center justify-end">
                            {inserat.category === "PKW" && (
                                <CarFront className="" />
                            )}
                            <p className="text-2xl ml-4 font-bold text-[#000000] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"> {inserat.title} </p>
                            <div className="flex justify-end ml-4">
                                <Active />
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm text-gray-800/90 font-bold italic">erstellt am :</p>
                            <p className="font-semibold text-sm">01.01.24</p>
                        </div>


                        <div className="mt-2 bg-[#393e56] rounded-md p-2 border border-black">
                            <InseratImageCarousel
                                images={images}
                            />
                        </div>
                        <div>
                            <div className="flex justify-end items-center">
                            <div className="flex mr-auto items-center">
                                <p className="flex font-bold italic text-sm items-center"> <MapPin className="text-rose-600 "/> Mömer </p>
                                </div>
                                <p className="justify-end flex mt-2 text-2xl font-bold">
                                    {inserat.price} <p className="text-sm mr-1">00 €</p>
                                </p>
                                
                                
                            </div>
                            
                        </div>
                        <div>
                            <div>
                                <p className="flex text-xl font-bold"><AlignLeft className="mr-2"/> Beschreibung der Anzeige</p>
                            </div>
                                <div className="mt-2 font-semibold text-gray-800/80">
                                    {inserat.description}
                                </div>
                        </div>
                    </div>


                </div>

            </div>


            <div className=" p-4 mt-24">
                <div>
                    <InseratOptions />
                </div>
                <div className="mt-16">
                    <ProfileView
                        user={user}
                        inseratArray = {inseratArray}
                    />
                </div>

            </div>
        </div>
    );
}

export default InseratAnzeige;