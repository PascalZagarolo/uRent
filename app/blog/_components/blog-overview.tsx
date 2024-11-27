'use client'

import { useEffect, useRef, useState } from "react";
import BlogCategorySelect from "./blog-category-select";
import SearchBlog from "./search-blog";
import { category } from "@/drizzle/schema";
import RenderedBlogs from "./rendered-blogs";
import { ClipLoader } from "react-spinners";
import { getPublishedBlogs } from "@/actions/blogs/getCurrentBlogs";


const BlogOverview = () => {

    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentTitle, setCurrentTitle] = useState("");

    const allBlogs = useRef([]);
    const [renderedBlogs, setRenderedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
       const fetchBlogs = async () => {
            try {
                const foundBlogs = await getPublishedBlogs();
                allBlogs.current = foundBlogs;
                setRenderedBlogs(foundBlogs);
            } catch(e : any) {
                console.log(e);
            } finally {
                setLoading(false);
            }
       }    
       
       fetchBlogs();
     }, []);

     useEffect(() => {
        let returnedBlogs = allBlogs.current;
    
        // Filter by title if a title is set
        if (currentTitle) {
            returnedBlogs = returnedBlogs.filter((blog) =>
                blog.title.toLowerCase().includes(currentTitle.toLowerCase())
            );
        }
    
        // Filter by category if a category is set
        if (currentCategory) {
            returnedBlogs = returnedBlogs.filter((blog) => 
                blog.category === currentCategory
            );
        }
    
        setRenderedBlogs(returnedBlogs);
    }, [currentTitle, currentCategory]);
    


    return (
        <div className="h-full">
            <div>
                <SearchBlog 
                currentTitle = {currentTitle}
                setCurrentTitle = {setCurrentTitle}
                />
            </div>
            <div className="mt-8">
                <BlogCategorySelect
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                />
            </div>
            {loading ? (
                <div className="w-full h-full flex justify-center items-center py-16">
                    <ClipLoader color="white" loading={true} size={40} className="flex justify-center items-center " />
                </div>
            ) : (
                <div className="mt-8 sm:px-8 px-4">
                    {renderedBlogs.length > 0 && (
                        <RenderedBlogs foundBlogs={renderedBlogs} />
                    )}
                </div>
            )}
        </div>
    );
}

export default BlogOverview;