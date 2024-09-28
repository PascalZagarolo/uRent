'use client'

import { blog } from "@/db/schema";
import { ArrowLeft, ImageIcon, Pencil, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import BlogEdit from "./blog-edit";
import { Button } from "@/components/ui/button";

interface BlogEditSelectProps {
    foundBlogs : typeof blog.$inferSelect[]
}

const BlogEditSelect = ({ foundBlogs }: BlogEditSelectProps) => {

    const [selectedId, setSelectedId] = useState<string | null>(null);

    return ( 
    <div>
        {selectedId ? (
            <div>
            <div className="mt-4 flex flex-row items-center text-sm font-semibold gap-x-2 hover:underline hover:cursor-pointer"
            onClick={() => setSelectedId(null)}
            >
                <ArrowLeft className="w-4 h-4 text-gray-200 hover:text-gray-300"  />
                Zurück zur Blog Auswahl
            </div>
            <BlogEdit 
            thisBlog={foundBlogs.find((blog) => blog.id === selectedId)} 
            deleteCurrentBlog={() => setSelectedId(null)}
            />
        </div>
        
        ) : (
            <div className="gap-y-4 mt-4">
            {foundBlogs.map((blog) => (
                <div className="w-full bg-[#131313] rounded-md p-2 hover:cursor-pointer shadow-lg"
                
                >
                    <div className="">
                        <div className="text-sm flex-grow flex items-center line-clamp-1 font-semibold break-all hover:underline">
                            <div>
                            {blog.title}
                            </div>
                            <div className="flex justify-end ml-auto">
                                <Button size="sm" variant="ghost" onClick={() => setSelectedId(blog.id)} key={blog.id}>
                                    <PencilIcon className="w-4 h-4 text-gray-200" />
                                </Button>
                                <Button className="" size="sm" variant="ghost">
                                    <TrashIcon className="w-4 h-4 text-rose-600" />
                                </Button>
                            </div>
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