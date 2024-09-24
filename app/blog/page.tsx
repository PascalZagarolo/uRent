import { getCurrentUserWithNotifications } from "@/actions/getCurrentUserWithNotifications";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import MobileHeader from "../(dashboard)/_components/mobile-header";
import Footer from "../(dashboard)/_components/footer";
import BlogOverview from "./_components/blog-overview";
import { Badge } from "@/components/ui/badge";

const BlogPage = async () => {

    const currentUser = await getCurrentUserWithNotifications();

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
                            <div>
                                <div className="p-4">
                                    <h4 className="flex justify-center mt-4">
                                    <Badge className="bg-indigo-800 px-4 text-white">Blog</Badge>
                                    </h4>
                                    <h3 className="text-2xl font-semibold flex justify-center mt-4">
                                    uRent - Neuigkeiten & Blogs
                                    </h3>
                                    <h2 className="mt-2 flex justify-center">
                                        Neuigkeiten, Blogs, Ressourcen und Tipps rund um uRent
                                    </h2>
                                </div>
                                <div>
                                    <BlogOverview />
                                </div>
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

export default BlogPage;