
import db from "@/db/drizzle";

import MenuBar from "../_components/menu-bar";
import BreadCrumpPage from "../_components/bread-crump-page";
import { MdOutlineReportProblem } from "react-icons/md";
import { Newspaper } from "lucide-react";
import BlogCreation from "./_components/blog-creation";


const BlogsPage = async () => {

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
                          <Newspaper className="w-4 h-4 mr-2" />  Blog erstellen
                        </h3>
                        <div>
                            <BlogCreation />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogsPage;