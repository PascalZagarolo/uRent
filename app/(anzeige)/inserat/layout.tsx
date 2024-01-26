import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";

const InseratLayout = async ({
    children
}: { children: React.ReactNode }) => {

    const currentUser = await getCurrentUser();

    return (
        <div className=" bg-[#404040]/10 min-h-screen">
            <HeaderLogo currentUser={currentUser} />

            <div className="h-full">
                {children}
            </div>
        </div>
    );
}

export default InseratLayout;