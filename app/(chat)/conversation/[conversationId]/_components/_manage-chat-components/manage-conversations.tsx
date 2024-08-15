import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { conversation, conversationFolder } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Pencil, PencilIcon } from "lucide-react";
import { useState } from "react";

interface MessageConversationProps {
    foundFolders: typeof conversationFolder.$inferSelect[]
}

const ManageConversations: React.FC<MessageConversationProps> = ({
    foundFolders
}) => {

    const colorResponse = (color: string) => {
        switch (color) {
            case "blue":
                return "bg-blue-800";
            case "red":
                return "bg-red-800";
            case "indigo":
                return "bg-indigo-800";
            case "green":
                return "bg-green-800";
            case "yellow":
                return "bg-yellow-800";
            case "white":
                return "bg-white";
            case "black":
                return "bg-black";
        }
    }

    const renderedFolder = (
        id,
        title,
        color,
        icon
    ) => {
        return (
            <button
                key={id}
                className={cn(
                    `${colorResponse(color)} p-1.5 rounded-md px-2 mt-2 hover:${colorResponse(color)}/50 font-semibold
             hover:text-gray-200/40`,
                    currentFolder === id && " border-gray-400 border"
                )}
                onClick={() => {
                    id == currentFolder ? setCurrentFolder(null) : setCurrentFolder(id)
                }}
            >
                <div className="text-xs text-gray-200">
                    {title}
                </div>
            </button>
        )
    }

    const [currentFolder, setCurrentFolder] = useState<string | null>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto" size="sm" variant="ghost">
                    <PencilIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#131313]">
                <div>
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 dark:bg-[#191919]">
                            <TabsTrigger value="delete">Account</TabsTrigger>
                            <TabsTrigger value="add">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="delete">
                            <Card className="dark:bg-[#191919] dark:border-none">
                                <CardHeader>
                                    <CardTitle>Konversationen zu Ordner hinzufügen</CardTitle>
                                    <CardDescription>
                                        Wähle den Ordner sowie die Konversationen aus die du hinzufügen möchtest.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="">
                                    <div className="flex flex-row flex-wrap items-center  gap-x-2 ">

                                        {currentFolder ? (
                                            foundFolders
                                                ?.filter(folder => folder.id === currentFolder) // Filter the folders to match only the currentFolder
                                                .map(folder => renderedFolder(folder.id, folder.title, folder.color, folder.icon)) // Render the matched folder
                                        ) : (
                                            foundFolders?.map(folder => renderedFolder(folder.id, folder.title, folder.color, folder.icon)) // Render all folders if currentFolder is not defined
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>

                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="add">
                            <Card>

                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ManageConversations;