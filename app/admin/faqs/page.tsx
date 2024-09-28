
import db from "@/db/drizzle";

import MenuBar from "../_components/menu-bar";
import BreadCrumpPage from "../_components/bread-crump-page";
import { MdOutlineReportProblem } from "react-icons/md";
import { Newspaper } from "lucide-react";

import { eq } from "drizzle-orm";
import { blog } from "@/db/schema";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import FaqTab from "./_components/faq-tab";


const FaqsPage = async () => {

    const foundBlogs  = await db.query.blog.findMany()

    


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
                          <QuestionMarkCircledIcon className="w-4 h-4 mr-2" />  FAQS erstellen oder bearbeiten
                        </h3>
                        <div>
                           <FaqTab 
                           foundFaqs={[]}
                           />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FaqsPage;