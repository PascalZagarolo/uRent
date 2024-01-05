import { CarFront, Caravan, TowerControl, Tractor, Truck } from "lucide-react";

const CategoryDashboard = () => {
    return (
        <div>
            <div className="flex justify-around mt-4 mb-2">

                <div className="justify-center rounded-md ">
                    <CarFront
                        className="h-10 w-10"
                    />
                    <p className="flex justify-center font-semibold">
                        PKW
                    </p>
                </div>

                <div className="justify-center">
                    <Truck
                        className="h-10 w-10"
                    />
                    <p className="flex justify-center font-semibold">
                        LKW
                    </p>
                </div>

                <div className="justify-center">
                    <Tractor
                        className="h-10 w-10 flex justify-center"
                    />
                    <p className="flex justify-center font-semibold">
                        Land
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <TowerControl className="h-10 w-10 flex justify-center" />
                    <p className="font-semibold">Bau</p>
                </div>


                <div className="flex flex-col items-center">
                    <Caravan className="h-10 w-10 flex justify-center" />
                    <p className="font-semibold">Anhänger und Wohnmobile</p>
                </div>




            </div>
        </div>
    );
}

export default CategoryDashboard;