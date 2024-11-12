import { getCurrentUserWithNotifications } from "@/actions/getCurrentUserWithNotifications";
import Footer from "@/app/(dashboard)/_components/footer";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import db from "@/db/drizzle";
import { blog } from "@/db/schema";
import { getLabelByValue } from "@/hooks/blogs/convert-values";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { ArrowLeft, InstagramIcon, LinkedinIcon, MailIcon, TwitchIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";

import BackToMain from "./_components/back-to-main";

const BlogId = async ({ params }: { params: { blogId: string } }) => {


    const currentUser = await getCurrentUserWithNotifications();
    const thisBlog = await db.query.blog.findFirst({
        where: eq(blog.id, params.blogId)
    })

    const usedTags = thisBlog?.tags;
    const tagsArray = usedTags ? usedTags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    const tagRenderer = () => {
        return (
            <div className="flex flex-row items-center justify-center">
                {tagsArray.map((tag, index) => {
                    return (
                        <div key={index} className="bg-gray-200 dark:bg-indigo-800 px-2 py-1 rounded-md text-xs font-semibold mr-2">
                            {getLabelByValue(tag)}
                        </div>
                    )
                })}
            </div>
        );
    };

    // function replaceWithBr(text) {
    //     // Converts line breaks into <br> tags, handling strings.
    //     return text.replace(/\n/g, '<br />');
    //   }



    return (
        <div className="bg-[#404040]/10 h-full w-full  dark:bg-[#0F0F0F] ">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div>
                <div className="flex justify-center sm:py-8 sm:px-4">
                    <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                        <div className="min-h-screen">
                            <BackToMain />
                            <div className="pt-8">
                                <div className="text-center text-sm text-gray-200/60">
                                    erstellt am {format(new Date(thisBlog?.createdAt), "dd. MMMM yyyy")}
                                </div>
                                <div className="lg:px-32 md:px-8 px-4 text-center pb-4 font-semibold text-xl">
                                    {thisBlog?.title}
                                </div>
                                <div>
                                    {tagRenderer()}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4 lg:px-16 sm:px-8 px-4">
                                <Image
                                    width={1000}
                                    height={600}
                                    src={thisBlog?.imageUrl}
                                    className="rounded-lg w-full h-96 object-cover"
                                    alt="blog image"
                                />
                            </div>
                            <div className="flex flex-row items-center lg:px-16 sm:px-8 px-4 py-2 gap-x-4">
                                <a href="https://www.instagram.com/urent.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:cursor-pointer"
                                >
                                    <InstagramIcon size={24} />
                                </a>
                                <a
                                href="https://www.linkedin.com/company/urentde"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:cursor-pointer"
                                >
                                    <LinkedinIcon size={24} />
                                </a>
                                <a 
                                href="mailto:support@urent-rental.de"
                                
                                className="hover:cursor-pointer">
                                    <MailIcon size={24} />
                                </a>
                            </div>
                            <div>
                                <div
                                    className="lg:px-16 sm:px-8 px-4 mt-2 text-base text-gray-200 w-full pb-8"
                                    dangerouslySetInnerHTML={{ __html: thisBlog?.content }}
                                    
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>

        </div>
    );
}

export default BlogId;