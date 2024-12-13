import LandingPageHeader from "./_components/landing-page-header";
import RoadToSuccess from "./_components/road-to-success";
import URentSolution from "./_components/urent";

const WhyUrent = () => {
    return (
        <div className="flex justify-center sm:p-8 bg-[#404040]/10">
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="  min-h-screen">
                    <div className="flex flex-col">
                       <div>
                       <LandingPageHeader />
                       </div>
                       <div className="mt-4 px-4">
                        <URentSolution />
                       </div>
                       <div className="mt-8 px-4">
                        <RoadToSuccess />
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyUrent;