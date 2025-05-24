import { MdOutlinePrivacyTip } from "react-icons/md";
import AccountPrivacy from "../(routes)/privacy/_components/account-privacy";
import DataUsage from "../(routes)/privacy/_components/data-usage";
import { userTable } from '../../../db/schema';
import { Lock } from "lucide-react";

interface PrivacyTabProps {
    currentUser: typeof userTable.$inferSelect | any;
}

const PrivacyTab = ({ currentUser }: PrivacyTabProps) => {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
                    <Lock className="w-5 h-5 mr-2" />
                    Privatsphäre
                </h2>
                
                <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">
                        Account-Privatsphäre
                    </h3>
                    <AccountPrivacy
                        thisUser={currentUser}
                    />
                </div>
                
                <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm p-6">
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">
                        Datennutzung
                    </h3>
                    <DataUsage
                        usesNewsletter={currentUser?.newsletter}
                        currentUserId={currentUser?.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default PrivacyTab;