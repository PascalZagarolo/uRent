import { Settings2Icon, TrendingUp, User2Icon } from "lucide-react";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from '../../actions/getCurrentUser';
import MenuBar from "./_components/settings-tabs";
import BreadCrumpSettings from "./_components/bread-crump-settings";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import Body from "./_components/username-input";
import Username from "./_components/username-input";
import SaveChangesSettings from "./_components/save-changes";
import ChangeProfilePic from "./_components/change-profile-pic";
import ProfilePicSettings from "./_components/profilepic-settings";
import EmailSettings from "./_components/e-mail-settings";


const SettingsPage = async () => {

    const currentUser = await getCurrentUser();

    const findCurrentUser = await db.query.users.findFirst({
        where : (
            eq(users.id, currentUser?.id)
        )
    })

    return (
        <div className="bg-[#ECECEC] dark:bg-[#121212]">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser} />
            </div>
            <div className="flex justify-center py-8 px-4">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div>
                        <MenuBar />
                    </div>
                    <div className="min-h-screen">
                        <div>
                            <BreadCrumpSettings />
                        </div>
                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <User2Icon className="mr-4" /> Account verwalten  <p className="ml-4 text-lg"> </p> 
                                <div className="ml-auto">
                                <SaveChangesSettings 
                                thisUser={findCurrentUser}
                                />
                                </div>
                            </h3>
                            <div className="w-full p-4 mt-2 rounded-md">
                                <div className="pb-4 px-4">
                                    <ProfilePicSettings 
                                    imageUrl = {findCurrentUser?.image}
                                    thisUserId = {findCurrentUser?.id}
                                    />
                                </div>
                                <Username 
                                thisUser = {findCurrentUser}
                                />
                                <div>
                                    <EmailSettings 
                                    usedEmail={findCurrentUser?.email}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;