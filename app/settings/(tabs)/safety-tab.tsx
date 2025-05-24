import { Shield, LockIcon, LogOut, Trash2 } from "lucide-react";
import DeleteUser from "../_components/delete-user";
import { userTable } from "@/db/schema";
import ChangePassword from "../(routes)/safety/_components/change-password";
import Select2Fa from "../(routes)/safety/_components/select-2fa";
import { Button } from "@/components/ui/button";
import { logoutAllUsers } from "@/actions/logout-all";

interface SafetyTabProps {
    currentUser: typeof userTable.$inferSelect | any;
}

const SafetyTab = ({ currentUser }: SafetyTabProps) => {
    return (
        <div>
            {/* Password Section */}
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
                    <Shield className="w-5 h-5 mr-2" />
                    Sicherheit
                </h2>
                
                <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">
                        Passwort ändern
                    </h3>
                    <ChangePassword
                        userEmail={currentUser?.email}
                    />
                </div>
                
                {/* Two-Factor Authentication */}
                {currentUser.password && (
                    <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm p-6 mb-6">
                        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                            <div className="flex items-center">
                                <LockIcon className="w-4 h-4 mr-2" /> 
                                Zwei-Faktor Authentifizierung
                            </div>
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Erhalte bei jedem Anmeldungsversuch eine Bestätigungs-Email.
                        </p>
                        <Select2Fa
                            thisUser={currentUser}
                        />
                    </div>
                )}
                
                {/* Logout All Users */}
                {!currentUser?.accounts && (
                    <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm p-6 mb-6">
                        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                            <div className="flex items-center">
                                <LogOut className="w-4 h-4 mr-2" /> 
                                Alle Nutzer ausloggen
                            </div>
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Logge alle Nutzer aus deinem Account aus, die sich noch eingeloggt haben.
                        </p>
                        <form action={logoutAllUsers}>
                            <Button variant="outline" size="sm">
                                Alle ausloggen
                            </Button>
                        </form>
                    </div>
                )}
                
                {/* Delete Account */}
                <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm p-6">
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                        <div className="flex items-center">
                            <Trash2 className="w-4 h-4 mr-2 text-red-500" /> 
                            Account löschen
                        </div>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Lösche deinen Account, sowie alle mit ihm verbundenen Daten.
                    </p>
                    <DeleteUser 
                        userId={currentUser.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default SafetyTab;