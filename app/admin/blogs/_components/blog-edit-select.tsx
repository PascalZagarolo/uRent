'use client'

import { blog } from "@/db/schema";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import BlogEdit from "./blog-edit";

interface BlogEditSelectProps {
    foundBlogs : typeof blog.$inferSelect[]
}

const BlogEditSelect = ({ foundBlogs }: BlogEditSelectProps) => {

    const [selectedId, setSelectedId] = useState<string | null>(null);

    return ( 
    <div>
        {selectedId ? (
            <div>
            <BlogEdit thisBlog={foundBlogs.find((blog) => blog.id === selectedId)} 
                    deleteCurrentBlog={() => setSelectedId(null)}
            />
        </div>
        
        ) : (
            <div className="gap-y-4 mt-4">
            {foundBlogs.map((blog) => (
                <div className="w-full bg-[#131313] rounded-md p-2 hover:cursor-pointer shadow-lg"
                onClick={() => setSelectedId(blog.id)} key={blog.id}
                >
                    <div className="">
                        <div className="text-sm font-semibold hover:underline">
                            {blog.title}
                        </div>
                        <div className="mt-2">
                            {blog.imageUrl ? (
                                <Image
                                src={blog?.imageUrl}
                                width={200}
                                height={200}
                                alt={blog?.title}
                                className="rounded-md h-24 object-cover"
                                placeholder={"blur"}
                            />
                            ) : (
                                <div className="h-24 bg-[#191919] rounded-md flex items-center justify-center">
                                    <ImageIcon className="w-4 h-4 text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        )}
    </div>
     );
}
 
export default BlogEditSelect;