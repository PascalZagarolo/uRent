import Footer from "./_components/footer";

import { Metadata } from "next";
import RelevanteInserate from "./_bodyparts/relevant-inserate";
import PaginationComponent from "./_components/pagination-component";
import MainPageSideBar from "./_components/main-page-sidebar";

import {
    ApplicationEnumRender, CarTypeEnumRender, CategoryEnumRender, CouplingEnumRender,
    DriveEnumRender, ExtraTypeEnumRender, FuelTypeEnumRender, LkwBrandEnumRender,
    LoadingEnumRender, TrailerEnumRender, TransmissionEnumRender
} from "@/db/schema";
import { cache } from "react";
import HeaderInfo from "./_bodyparts/_components/header-info";
import AdsComponent from "@/components/ad-component";
import getCurrentUserWithFavourites from "@/actions/getCurrentUserWithFavourites";



interface MainPageProps {
    searchParams: {
        title: string,
        category: typeof CategoryEnumRender,
        start: string,
        end: string,
        filter: string,
        page: number,

        //Date and Timefilter
        periodBegin: string,
        periodEnd: string,
        startTime: number,
        endTime: number,
        startDateDynamic: string,
        endDateDynamic: string,
        reqTime: string,
        minTime: string,

        location: string,
        amount: string,

        //conditions

        reqAge?: string;
        license?: string;

        //PKW
        thisBrand?: any;
        doors?: string;
        doorsMax?: string;

        initial?: string;
        initialMax?: string;
        power?: string;
        powerMax?: string;
        seats?: string;
        seatsMax?: string;
        fuel?: typeof FuelTypeEnumRender;
        transmission?: typeof TransmissionEnumRender;
        type?: typeof CarTypeEnumRender;
        freeMiles?: string;
        extraCost?: string;

        //LKW
        weightClass?: string;
        weightClassMax?: string;
        payload?: string;
        payloadMax?: string;
        drive?: typeof DriveEnumRender;
        loading?: typeof LoadingEnumRender;
        application: typeof ApplicationEnumRender;
        lkwBrand?: typeof LkwBrandEnumRender;

        //TRANSPORT
        transportBrand: string;
        trailerType: typeof TrailerEnumRender;
        coupling: typeof CouplingEnumRender;
        extraType: typeof ExtraTypeEnumRender;
        axis: string;
        axisMax: string;
        brake: string;

        volume: number,
        loading_l: number,
        loading_b: number,
        loading_h: number,

        radius: number,
        caution: number,
        user: string,

        ahk: string;

    }
}

export const metadata: Metadata = {
    title: 'Fahrzeuge auf uRent mieten',
    description: `PKW, Transporter, LKW, Anhänger und vieles mehr. Miete oder Vermiete Fahrzeuge auf uRent. 
    Miete dein gewünschtes Fahrzeug oder Vermiete es schnell und bequem, ob privat oder gewerblich, auf uRent.`,
    keywords: "mieten, vermieten, Nutzfahrzeuge, Pkw, Lkw, Transporter, Anhaenger, Mietwagen, Miettransporter, Mietlkw, Mietanhänger, uRent",
}

const Main = cache(async ({
    searchParams
}: MainPageProps) => {






    const currentUser = await getCurrentUserWithFavourites();







    return (
       
            <>
            <head>
            <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_CLOUD_SECRET}&libraries=places&callback=initMap`} async>
            </script>
            </head>
            
            <div className="sm:h-full sm:overflow-y-auto no-scrollbar ">
                <div>
                    {//@ts-ignore
                        (searchParams.page === "1" || !searchParams.page) && (
                            <div className="xl:flex hidden justify-center py-2">
                                <HeaderInfo
                                    currentUser={currentUser}
                                    subscribedToNewsletter={currentUser?.newsletter}
                                    userId={currentUser?.id || ""}
                                    isBusiness={currentUser?.isBusiness}
                                />
                            </div>
                        )}
                    <div className="relative flex justify-center mt-4">

                        <div className='h-screen 2xl:flex items-center justify-center w-2/12  p-16 hidden'>
                            <div className=' w-full sm:block hidden space-y-4'>
                                <div>
                                    <AdsComponent dataAdSlot='3797720061' />
                                </div>
                                <div>
                                    <AdsComponent dataAdSlot='3797720061' />
                                </div>
                                <div>
                                    <AdsComponent dataAdSlot='3797720061' />
                                </div>
                            </div>
                        </div>

                        <div className="top-0 sm:mr-4 ">
                            <MainPageSideBar
                                userId={currentUser?.id || ""}
                            />
                        </div>
                        <div className="sm:block overflow-y-auto sm:overflow-hidden  no-scrollbar flex flex-col items-center justify-center h-[100%]">

                            <RelevanteInserate
                                title={searchParams.title}
                                thisCategory={searchParams.category}
                                filter={searchParams.filter}
                                start={searchParams.start}
                                end={searchParams.end}
                                page={searchParams.page}
                                //Date and Time filter
                                periodBegin={searchParams.periodBegin}
                                periodEnd={searchParams.periodEnd}
                                startTime={searchParams.startTime}
                                endTime={searchParams.endTime}
                                startDateDynamic={searchParams.startDateDynamic}
                                endDateDynamic={searchParams.endDateDynamic}
                                reqTime={searchParams.reqTime}
                                minTime={searchParams.minTime}

                                location={searchParams.location}
                                amount={searchParams.amount}

                                reqAge={searchParams.reqAge}
                                reqLicense={searchParams.license}

                                // Car specific attributes
                                thisBrand={searchParams.thisBrand}
                                doors={searchParams.doors}
                                doorsMax={searchParams.doorsMax}
                                initial={searchParams.initial}
                                initialMax={searchParams.initialMax}
                                power={searchParams.power}
                                powerMax={searchParams.powerMax}
                                seats={searchParams.seats}
                                seatsMax={searchParams.seatsMax}
                                fuel={searchParams.fuel}
                                transmission={searchParams.transmission}
                                thisType={searchParams.type}
                                freeMiles={searchParams.freeMiles}
                                extraCost={searchParams.extraCost}
                                ahk={searchParams.ahk}

                                //LKW specific attributes
                                weightClass={searchParams.weightClass}
                                weightClassMax={searchParams.weightClassMax}
                                payload={searchParams.payload}
                                payloadMax={searchParams.payloadMax}
                                drive={searchParams.drive}
                                loading={searchParams.loading}
                                application={searchParams.application}
                                lkwBrand={searchParams.lkwBrand}

                                //TRANSPORT specific attributes
                                transportBrand={searchParams.transportBrand}

                                trailerType={searchParams.trailerType}
                                coupling={searchParams.coupling}
                                extraType={searchParams.extraType}
                                axis={searchParams.axis}
                                axisMax={searchParams.axisMax}
                                brake={searchParams.brake}

                                currentUser={currentUser as any}

                                volume={searchParams.volume}
                                loading_l={searchParams.loading_l}
                                loading_b={searchParams.loading_b}
                                loading_h={searchParams.loading_h}

                                radius={searchParams.radius}
                                userId={searchParams.user}
                                caution={searchParams.caution}
                            />
                        </div>

                        <div className='h-screen 2xl:flex items-center justify-center w-2/12 p-16 hidden'>
                            <div className=' w-full sm:block hidden space-y-4'>
                                <div>
                                    <AdsComponent dataAdSlot='3797720061' />
                                </div>
                                <div>
                                    <AdsComponent dataAdSlot='3797720061' />
                                </div>
                                <div>
                                    <AdsComponent dataAdSlot='3797720061' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm:p-4 flex justify-center w-full">
                        <PaginationComponent />
                    </div>

                </div>

                <div>
                    <Footer />
                </div>
            </div>
            </>


        
    );
});

export default Main;