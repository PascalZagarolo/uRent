import { TiGroup } from "react-icons/ti";
import WorkWithUs from "./_components/work-with-us";

const CareerPage = () => {
    return (
        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-4xl justify-center font-semibold flex items-center gap-x-2">
                                <TiGroup className="w-6 h-6" />    Karriere bei <div className="text-4xl font-bold text-indigo-800">uRent</div>
                            </h3>
                            <div className="mt-4 md:mt-4">
                                <div className="px-4">
                                    <WorkWithUs />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CareerPage;