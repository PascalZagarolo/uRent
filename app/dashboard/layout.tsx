
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import MobileHeader from "../(dashboard)/_components/mobile-header";

const DashboardLayout = async (
    { children }: { children: React.ReactNode },

) => {
    
    const currentUser = await getCurrentUser();
    
    return (
        <div className="bg-[#404040]/10 h-full w-full  dark:bg-[#0F0F0F] ">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}       
                />
             </div>
            <div >       
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;