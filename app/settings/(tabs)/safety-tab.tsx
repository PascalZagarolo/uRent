import { DeleteIcon, User2Icon } from "lucide-react";
import DeleteUser from "../_components/delete-user";
import { userTable } from "@/db/schema";

import { LockClosedIcon } from "@radix-ui/react-icons";
import ChangePassword from "../(routes)/safety/_components/change-password";
import Select2Fa from "../(routes)/safety/_components/select-2fa";
import { FcGoogle } from "react-icons/fc";
import EnableSocialLogin from "../(routes)/safety/_components/enable-social";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PiSignOutThin } from "react-icons/pi";
import { logoutAllUsers } from "@/actions/logout-all";

interface SafetyTabProps {
    currentUser : typeof userTable.$inferSelect | any;
}

const SafetyTab = ({ currentUser } : SafetyTabProps) => {
    return ( 
        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <User2Icon className="mr-4" /> Sicherheit  <p className="ml-4 text-lg"> </p>
                                <div className="ml-auto">

                                </div>
                            </h3>
                            <div className="w-full p-4 mt-2 rounded-md">
                                <div className="pb-4 px-4">
                                    <ChangePassword
                                        userEmail={currentUser?.email}
                                    />
                                </div>
                            </div>
                            {currentUser.password && (
                                <>
                                    <h3 className="dark:text-gray-100 text-2xl font-semibold">
                                        <div className="flex items-center">
                                            <LockClosedIcon className="mr-4 h-6 w-6" /> Zwei-Faktor Authentifizierung
                                        </div>
                                        <p className="ml-4 text-xs dark:text-gray-200/60 font-medium">
                                            Erhalte bei jedem Anmeldungsversuch eine Bestätigungs-Email.
                                        </p>

                                    </h3>
                                    <div className="w-full p-4 mt-2 rounded-md">
                                        <div className="pb-4 px-4">
                                            <Select2Fa

                                                thisUser={currentUser}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {currentUser.password && (
                                <>
                                    <h3 className="dark:text-gray-100 text-2xl font-semibold">
                                        <div className="flex items-center">
                                            <FcGoogle className="mr-4 h-6 w-6" /> Google-Login
                                        </div>
                                        <p className="ml-4 text-xs dark:text-gray-200/60 font-medium">
                                            Falls aktiviert, kannst du dich mit deinem bestehendem Google Account anmelden.
                                        </p>

                                    </h3>
                                    <div className="w-full p-4 mt-2 rounded-md">
                                        <div className="pb-4 px-4">
                                            <EnableSocialLogin
                                                userId={currentUser.id}
                                                enabledSocials={currentUser.enableSocialLogin}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div>
                                {!currentUser?.accounts && (
                                    <div>
                                        <h3 className="dark:text-gray-100 text-2xl font-semibold">
                                            <div className="flex items-center">
                                                <FaSignOutAlt className="mr-4 h-6 w-6" /> Alle Nutzer ausloggen
                                            </div>
                                            <p className="ml-4 text-xs dark:text-gray-200/60 font-medium">
                                                Logge alle Nutzer aus deinem Account aus, die sich noch eingeloggt haben.
                                            </p>

                                        </h3>
                                        <div className="w-full p-4 mt-2 rounded-md">
                                            <div className="pb-4 px-4">
                                                <form action={logoutAllUsers}>
                                                    <Button className="dark:bg-[#141414] text-sm" variant="ghost">
                                                        <PiSignOutThin className='w-4 h-4 mr-2' />  Ausloggen
                                                    </Button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="dark:text-gray-100 text-2xl font-semibold">
                                    <div className="flex items-center">
                                        <DeleteIcon className="mr-4 h-6 w-6" /> Account löschen
                                    </div>
                                    <p className="ml-4 text-xs dark:text-gray-200/60 font-medium">
                                        Lösche deinen Account, sowie alle mit ihm verbundenen Daten.
                                    </p>

                                </h3>
                                <div className="w-full px-8 mt-2 rounded-md">
                                    <DeleteUser 
                                    userId={currentUser.id}
                                    />
                                </div>
                            </div>
                        </div>
     );
}
 
export default SafetyTab;