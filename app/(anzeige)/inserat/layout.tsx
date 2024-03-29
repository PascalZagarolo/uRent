import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";


const InseratLayout = async ({
    children
}: { children: React.ReactNode }) => {

    const currentUser = await getCurrentUser();

   

    return (
        <div className=" bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen">
            <HeaderLogo 
            currentUser={currentUser} 
            />
            <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                
                />  
             </div>

            <div className="h-full">
                {children}
            </div>
        </div>
    );
}

export default InseratLayout;