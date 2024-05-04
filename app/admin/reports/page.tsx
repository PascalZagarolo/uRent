
import db from "@/db/drizzle";
import InseratRenderReport from "./_components/inserat-render-report";
import MenuBar from "../_components/menu-bar";
import BreadCrumpPage from "../_components/bread-crump-page";
import { MdOutlineReportProblem } from "react-icons/md";


const ReportPage = async () => {

    const foundReports = await db.query.report.findMany(
        {
            with : {
                user : true,
                inserat : {
                    with : {
                        user : true
                    }
                }
            }
        }
    )

    


    return (
        <div className="flex justify-center sm:py-8  sm:px-4">
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                    <div>
                        <MenuBar />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-md font-semibold flex items-center">
                          <MdOutlineReportProblem className="text-rose-600 w-4 h-4 mr-2"/>  Reports
                        </h3>
                        <div className="mt-4 space-y-4">
                            {foundReports.map((report) => (
                                <InseratRenderReport
                                key={report.id} 
                                thisReport = {foundReports[0]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportPage;