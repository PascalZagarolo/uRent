import { TrendingUp } from "lucide-react";
import SidebarDashboard from "../../_components/sidebar-dashboard";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { MdManageSearch } from "react-icons/md";
import db from "@/db/drizzle";
import getCurrentUser from "@/actions/getCurrentUser";
import { inserat } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import SelectInserat from "./_components/select-inserat";
import AddBooking from "./_components/add-bookings";
import RenderedInserat from "./_components/rendered-inserat";

interface ManagePageProps {
    searchParams: {
        inseratId: string
    }
}

const ManagePage: React.FC<ManagePageProps> = async ({
    searchParams
}) => {

    const currentUser = await getCurrentUser();

    const foundInserate = await db.query.inserat.findMany({
        where: (
            and(
                eq(inserat.userId, currentUser.id),
                eq(inserat.isPublished, "true")

            )
        ), with: {
            images: true
        }
    })

    let thisInserat;

    if(searchParams.inseratId) {
        thisInserat = await db.query.inserat.findFirst({
            where : (
                and(
                    eq(inserat.id, searchParams.inseratId),
                )
            ), with : {
                images : true
            }
        })
    }

    return (
        <div className="flex justify-center py-8 px-4  ">
            <div className="px-4 hidden md:block">
                <SidebarDashboard />
            </div>
            <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen w-full">
                    <div className="p-4 mt-4 w-full rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center w-full">
                            <div className="w-2/3 flex">
                                <MdManageSearch className="mr-4" /> Fahrzeuge verwalten
                            </div>
                            <div className="w-1/3">
                                <SelectInserat 
                                    foundInserate={foundInserate}
                                />
                            </div>
                        </h3>
                        <div className="py-4">
                            <AddBooking />
                        </div>

                        <div className="p-4  sm:flex">
                            <div className="sm:w-3/5 mr-4">
                                <div className="w-full  dark:bg-[#141414] rounded-md mt-2">
                                    {thisInserat ? (
                                        <RenderedInserat 
                                        thisInserat={thisInserat}
                                        />
                                    ) : (
                                        <div className="flex justify-center p-8 text-sm">
                                            Noch kein Inserat ausgewählt
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="sm:w-2/5">
                                <div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default ManagePage;