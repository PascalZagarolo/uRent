
import getCurrentUser from "../../actions/getCurrentUser";









import HeaderLogo from "./_components/header-logo";

import Footer from "./_components/footer";

import { Metadata } from "next";
import RelevanteInserate from "./_bodyparts/relevant-inserate";
import PaginationComponent from "./_components/pagination-component";
import MainPageSideBar from "./_components/main-page-sidebar";
import { auth } from "@/auth";
import { ApplicationEnumRender, CarTypeEnumRender, CategoryEnumRender, CouplingEnumRender, 
    DriveEnumRender, ExtraTypeEnumRender, FuelTypeEnumRender, LkwBrandEnumRender,
     LoadingEnumRender, TrailerEnumRender, TransmissionEnumRender } from "@/db/schema";






interface MainPageProps {
    searchParams: {
        title: string,
        category: typeof CategoryEnumRender,
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
        brand?: any;
        doors?: string;
        initial?: string;
        power?: string;
        seats?: string;
        fuel?: typeof FuelTypeEnumRender;
        transmission?: typeof TransmissionEnumRender;
        type?: typeof CarTypeEnumRender;
        freeMiles?: string;
        extraCost?: string;

        //LKW
        weightClass?: string;
        drive?: typeof DriveEnumRender;
        loading?: typeof LoadingEnumRender;
        application: typeof ApplicationEnumRender;
        lkwBrand?: typeof LkwBrandEnumRender;

        //TRANSPORT
        trailerType: typeof TrailerEnumRender;
        coupling: typeof CouplingEnumRender;
        extraType: typeof ExtraTypeEnumRender;
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

    const user = await auth();


    

    return (
        <div className=" sm:h-full sm:overflow-y-auto no-scrollbar">
           
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                     />
            </div>
            
            <div>
                <div className="relative flex justify-center mt-4">
                    
                        <div className="top-0 sm:mr-4 ">
                            <MainPageSideBar />
                        </div>
                      
                    <div className="sm:block overflow-y-auto sm:overflow-hidden no-scrollbar flex items-center justify-center h-[100%]">
                     
                    <RelevanteInserate
                            title={searchParams.title}
                            thisCategory={searchParams.category}
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
                            thisBrand={searchParams.brand}
                            doors={searchParams.doors}
                            initial={searchParams.initial}
                            power={searchParams.power}
                            seats={searchParams.seats}
                            fuel={searchParams.fuel}
                            transmission={searchParams.transmission}
                            thisType={searchParams.type}
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