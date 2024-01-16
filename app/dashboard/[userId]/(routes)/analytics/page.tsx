import { CarFront, TrendingUpIcon, View } from "lucide-react";

const Analytics = () => {
    return (
        <div>
            <h3 className="mt-4 flex justify-center text-3xl">
                Meine Analytiken
            </h3>
            <div className="gap-x-8 flex justify-between mt-16 ml-16 mr-16 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <div>
                    <div className="rounded-md px-16 py-8 border-2 border-[#1c202d] bg-[#232839] text-gray-100">
                        <h3 className="text-lg font-semibold flex justify-center">
                            <TrendingUpIcon className="h-6 w-6 mr-2" /> Verdienst
                        </h3>
                    </div>
                    <div className="rounded-md border-2 border-[#1c202d] bg-[#343b52]">
                        200
                    </div>
                </div>

                <div>
                    <div className="rounded-md px-16 py-8 border-2 border-[#1c202d] bg-[#232839] text-gray-100">
                        <h3 className="text-lg font-semibold flex justify-center">
                            <CarFront className="h-6 w-6 mr-2" /> Anzeigen
                        </h3>
                    </div>
                    <div className="rounded-md border-2 border-[#1c202d] bg-[#343b52]">
                        200
                    </div>
                </div>


                <div>
                <div className="rounded-md px-16 py-8 border-2 border-[#1c202d] bg-[#232839] text-gray-100">
                    <h3 className="text-lg font-semibold flex justify-center">
                        <View className="h-6 w-6 mr-2" /> Ansichten
                    </h3>
                </div>
                <div className="rounded-md border-2 border-[#1c202d] bg-[#343b52]">
                        200
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Analytics;