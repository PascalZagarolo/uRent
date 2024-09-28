'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import BlogCreation from "./blog-creation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { blog } from "@/db/schema"
import BlogEditSelect from "./blog-edit-select"
import BlogDelete from "./blog-delete"

interface BlogTabProps {
    foundBlogs : typeof blog.$inferSelect[]
}

const BlogTab = ({ foundBlogs }:  BlogTabProps) => {

    const [currentTab, setCurrentTab] = useState<"create" | "edit" | "delete">("create")

    return (
        <div>
            <div className="flex flex-row items-center mt-4 gap-x-4">
                <Button className={cn("bg-[#131313] hover:bg-[#141414] text-gray-200 w-1/2", 
                currentTab === "create" && "text-gray-300 bg-[#171717] hover:bg-[#181818] border-indigo-800 border")}
                onClick={() => setCurrentTab("create")}

                >
                    Blog erstellen
                </Button>

                <Button className={cn("bg-[#131313] hover:bg-[#141414] text-gray-200 w-1/2", 
                currentTab === "edit" && "text-gray-300 bg-[#171717] hover:bg-[#181818] border-indigo-800 border")}
                onClick={() => setCurrentTab("edit")}

                >
                    Blog bearbeiten
                </Button>

                {/* <Button className={cn("bg-[#131313] hover:bg-[#141414] text-gray-200 w-1/3", 
                currentTab === "delete" && "text-gray-300 bg-[#171717] hover:bg-[#181818] border-indigo-800 border")}
                onClick={() => setCurrentTab("delete")}

                >
                    Blog löschen
                </Button> */}
            </div>
            <div className="w-full h-full">
                {
                    {
                        "create" : <BlogCreation />,
                        "edit" : <BlogEditSelect foundBlogs={foundBlogs} />,
                        "delete" :  <BlogDelete foundBlogs={foundBlogs} />
                    }[currentTab]
                }
            </div>
        </div>
    );
}

export default BlogTab;