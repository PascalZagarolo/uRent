'use client'

import { blog } from "@/db/schema";
import { ArrowLeft, ImageIcon, Pencil, PencilIcon, TrashIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import BlogEdit from "./blog-edit";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface BlogEditSelectProps {
    foundBlogs: typeof blog.$inferSelect[]
}

const BlogEditSelect = ({ foundBlogs }: BlogEditSelectProps) => {

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const router = useRouter();

    const onDelete = async (id: string) => {
        try {
            await axios.delete(`/api/blog/${id}/delete`);
            toast.success('Blog erfolgreich gelöscht');
            router.refresh();
        } catch(e : any) {
            console.log(e);
            toast.error('Fehler beim Löschen des Blogs')
        }
    }

    return (
        <div>
            {selectedId ? (
                <div>
                    <div className="mt-4 flex flex-row items-center text-sm font-semibold gap-x-2 hover:underline hover:cursor-pointer"
                        onClick={() => setSelectedId(null)}
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-200 hover:text-gray-300" />
                        Zurück zur Blog Auswahl
                    </div>
                    <BlogEdit
                        thisBlog={foundBlogs.find((blog) => blog.id === selectedId)}
                        deleteCurrentBlog={() => setSelectedId(null)}
                    />
                </div>

            ) : (
                <div className="gap-y-4 mt-4 space-y-4">
                    {
                        foundBlogs.length > 0 ? (
                            foundBlogs.map((blog) => (
                                <div className="w-full bg-[#222222] rounded-md p-2 hover:cursor-pointer shadow-lg"
                                key={blog.id}
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
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button className="" size="sm" variant="ghost">
                                                            <TrashIcon className="w-4 h-4 text-rose-600" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="border-none dark:bg-[#191919]">
                                                        <div>
                                                            <div className="text-lg font-semibold flex flex-row items-center">
                                                                <X className="w-4 h-4 mr-2 text-rose-600" />
                                                                Blog wirklich löschen?
                                                            </div>
                                                            <p className="text-xs text-gray-200/60">
                                                                Gelöschte Blogs können nicht wiederhergestellt werden.
                                                            </p>
                                                            <div className="mt-4 flex justify-end">
                                                                <AlertDialogAction asChild>
                                                                <Button className="bg-rose-600 hover:bg-rose-700 text-gray-200 hover:text-gray-300"
                                                                onClick={() => {onDelete(blog.id)}}
                                                                >
                                                                        Löschen
                                                                    </Button>
                                                                </AlertDialogAction>
                                                                <AlertDialogCancel asChild>
                                                                    <Button variant="ghost" className="border-none">
                                                                        Abbrechen
                                                                    </Button>
                                                                </AlertDialogCancel>
                                                            </div>
                                                        </div>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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
                                                   
                                                />
                                            ) : (
                                                <div className="h-24 bg-[#191919] rounded-md flex items-center justify-center">
                                                    <ImageIcon className="w-4 h-4 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="mt-4 text-sm text-gray-200/60">
                                Keine Blogs gefunden..
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}

export default BlogEditSelect;