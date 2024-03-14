
import getCurrentUser from "../../actions/getCurrentUser";




import { Images, Inserat } from "@prisma/client";

import type { ApplicationType, CarBrands, CarType, Category, CouplingType, DriveType, ExtraType, FuelType, 
    LkwBrand, LoadingType, TrailerType, Transmission } from "@prisma/client";
import { db } from "@/utils/db";

import HeaderLogo from "./_components/header-logo";

import Footer from "./_components/footer";
import { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";
import { Metadata } from "next";
import RelevanteInserate from "./_bodyparts/relevant-inserate";
import PaginationComponent from "./_components/pagination-component";





interface MainPageProps {
    searchParams: {
        title: string,
        category: Category,
        start: string,
        end: string,
        filter: string,
        page: number,
        periodBegin: string,
        periodEnd: string,
        location: string,
        amount: string,

        //conditions

        reqAge?: string;
        reqLicense?: string;

        //PKW
        brand?: CarBrands;
        doors?: string;
        initial?: string;
        power?: string;
        seats?: string;
        fuel?: FuelType;
        transmission?: Transmission;
        type?: CarType;
        freeMiles?: string;
        extraCost?: string;

        //LKW
        weightClass?: string;
        drive?: DriveType;
        loading?: LoadingType;
        application: ApplicationType;
        lkwBrand?: LkwBrand;

        //TRANSPORT
        trailerType: TrailerType;
        coupling: CouplingType;
        extraType: ExtraType;
        axis: string;
        brake: string

    }
}

export const metadata: Metadata = {
    title: 'Mieten auf uRent',
    description: 'Kostenlos und schnell mieten auf uRent. Mieten und Vermieten Sie alles, was Sie brauchen.',
}

const Main = async ({
    searchParams
}: MainPageProps) => {






    const currentUser = await getCurrentUser();



    const start = Number(searchParams.start)
    const end = Number(searchParams.end)


    const LazyMainPageSideBar = lazy(() => import("./_components/main-page-sidebar"));


    const notifications = await db.notification.findMany({
        where: {
            userId: currentUser?.id
        }
    })

    return (
        <div className=" sm:h-full sm:overflow-y-auto no-scrollbar">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />
            </div>
            <div>
                <div className="relative flex justify-center mt-4">
                    <Suspense fallback={<div className="ml-4"><ClipLoader loading /></div>}>
                        <div className="top-0 sm:mr-4 ">
                            <LazyMainPageSideBar />
                        </div>
                    </Suspense>
                    <div className="sm:block overflow-y-auto sm:overflow-hidden no-scrollbar flex items-center justify-center h-[100%]">
                        <RelevanteInserate
                            title={searchParams.title}
                            category={searchParams.category}
                            filter={searchParams.filter}
                            start={searchParams.start}
                            end={searchParams.end}
                            page={searchParams.page}
                            periodBegin={searchParams.periodBegin}
                            periodEnd={searchParams.periodEnd}
                            location={searchParams.location}
                            amount={searchParams.amount}

                            reqAge={searchParams.reqAge}
                            reqLicense={searchParams.reqLicense}

                            // Car specific attributes
                            brand={searchParams.brand}
                            doors={searchParams.doors}
                            initial={searchParams.initial}
                            power={searchParams.power}
                            seats={searchParams.seats}
                            fuel={searchParams.fuel}
                            transmission={searchParams.transmission}
                            type={searchParams.type}
                            freeMiles={searchParams.freeMiles}
                            extraCost={searchParams.extraCost}

                            //LKW specific attributes
                            weightClass={searchParams.weightClass}
                            drive={searchParams.drive}
                            loading={searchParams.loading}
                            application={searchParams.application}
                            lkwBrand={searchParams.lkwBrand}

                            trailerType={searchParams.trailerType}
                            coupling={searchParams.coupling}
                            extraType={searchParams.extraType}
                            axis={searchParams.axis}
                            brake={searchParams.brake}

                            currentUser = {currentUser}
                        />
                    </div>
                </div>
                <div className="p-4 flex justify-center">
                    <PaginationComponent />
                </div>
            </div>

            <Footer />
        </div>


    );
}

export default Main;