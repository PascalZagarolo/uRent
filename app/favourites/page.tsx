import { CalendarSearchIcon, Star } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";


import db from "@/db/drizzle";
import { booking, favourite } from "@/db/schema";
import { eq } from "drizzle-orm";

import getCurrentUser from "@/actions/getCurrentUser";
import getCurrentUserWithFavourites from "@/actions/getCurrentUserWithFavourites";
import { redirect } from "next/navigation";
import MobileHeader from "../(dashboard)/_components/mobile-header";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Footer from "../(dashboard)/_components/footer";


const Bookings = async ({
    params
}: { params: { userId: string } }) => {






    const currentUser = await getCurrentUserWithFavourites();

    if (currentUser) {
        return redirect(`/dashboard/${currentUser.id}/favourites`)
    }

    return (
        <div>
            <div>
                <div className="relative top-0 w-full z-50">
                    <HeaderLogo
                        currentUser={currentUser}
                        foundNotifications={currentUser?.notifications}
                    />
                </div>
                <div className="sm:hidden">
                    <MobileHeader
                        currentUser={currentUser}
                        foundNotifications={currentUser?.notifications}
                    />
                </div>
            </div>
            <div className="flex justify-center sm:py-8  sm:px-4 ">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className=" min-h-screen">

                        <div className="md:p-4 mt-4 p-2 rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center md:px-0 sm:px-4">
                                <StarFilledIcon className="mr-4" /> Meine Favouriten <p className="ml-4 text-lg"> </p>
                            </h3>
                            <p className="text-xs dark:text-gray-200/60 ">
                                Deine favorisierten und gespeicherten Fahrzeuge, damit du sie später einfacher wieder finden kannst.

                            </p>
                            <div className="md:p-4 p-2">
                                <h3 className="flex justify-center items-center text-lg font-semibold gap-x-2">
                                    <Star className="h-6 w-6 text-gray-200 dark:text-gray-800" />
                                    Favourisiere Inserate um sie im Blick zu behalten und später wieder zu finden.
                                </h3>
                                <div className="flex justify-center items-center gap-x-8 mt-4">
                                    <Button className="bg-indigo-900 hover:bg-indigo-900 hover:text-gray-300 text-gray-200 px-8 text-md">
                                        <a className="" href="/login">
                                            Anmelden
                                        </a>
                                    </Button>
                                    <Label>
                                        oder
                                    </Label>
                                    <Button className="bg-indigo-900 hover:bg-indigo-900 hover:text-gray-300 text-gray-200 px-8 text-md">
                                        <a className="" href="/register">
                                            Registrieren
                                        </a>
                                    </Button>
                                </div>
                                <div>
                                    <h3 className="flex justify-center text-xs dark:text-gray-200/60 mt-1">
                                        Melde dich an um Inserate zu favourisieren.
                                    </h3>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
            <div>
                <Footer />
            </div>
        </div>

    );
}

export default Bookings;