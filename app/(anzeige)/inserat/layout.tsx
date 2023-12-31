import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import getCurrentUser from "@/app/actions/getCurrentUser";

const InseratLayout = async ({
    children
} : { children : React.ReactNode}) => {

    const currentUser = await getCurrentUser();

    return (
        <div className="w-full">
            <HeaderLogo
                currentUser={currentUser}
            />
            
            <div>
                {children}
            </div>
        </div>
    );
}

export default InseratLayout;