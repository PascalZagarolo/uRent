import Logo from "@/app/profile/[profileId]/_components/u-rent-logo";
import CreationHeader from "../_components/creation-header";
import InseratBodyLeft from "../_components/inserat-body-left";

const InseratCreation = () => {
    return (
        <div>
            <div className="mt-8 flex justify-center">
                <Logo />
            </div>

            <div className="flex justify-center mt-8">
                <CreationHeader />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="col-span-1 bg-gray-300">
                    <InseratBodyLeft/>
                </div>
                <div className="col-span-1 bg-gray-300">
                    dasda
                </div>
            </div>

        </div>
    );
}

export default InseratCreation;