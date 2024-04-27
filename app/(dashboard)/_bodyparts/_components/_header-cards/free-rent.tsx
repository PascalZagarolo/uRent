import Countdown from "./countdown";

const FreeRentCard = () => {

    const targetDate = new Date('2024-07-30T00:00:00');

    return (
        <div className="">
            <div className="">
                <div className="">
                    <h3>
                        <h1 className="font-semibold">NUR NOCH</h1>
                        <Countdown targetDate={targetDate} />
                    </h3>
                    <h3 className="text-4xl text-gray-200 font-bold flex justify-center mt-8">
                        3 Monate Gratis
                    </h3>
                    <h1 className="flex justify-center">
                        Vermiete 3 Monate gratis und ohne Risiko deine Fahrzeuge auf uRent
                    </h1>
                    <h2>
                        <span className="p-4 flex justify-center mt-2 rounded-md bg-[#1F2332] text-gray-200 font-bold text-lg ">
                           <p className="font-medium mr-2">CODE: </p> RELEASE24
                        </span>
                        <p className="text-xs dark:text-gray-200/70">
                            Nutze den Code RELEASE24 und profitiere von 3 Monaten kostenloser Vermietung.
                            Gültig bis 30.07.2024
                        </p>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default FreeRentCard;