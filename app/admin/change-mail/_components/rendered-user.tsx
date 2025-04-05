import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarCheck2Icon, MailIcon, MailWarningIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { IoInformationCircle } from "react-icons/io5";
import { RiFolderUserFill } from "react-icons/ri";

interface RenderedUser {
    thisUser: typeof userTable.$inferSelect;
}

const RenderedUser = ({ thisUser }: RenderedUser) => {

    const [isOpen, setIsOpen] = useState(false);

    if (isOpen) {
        return (
            <Dialog open onOpenChange={(e) => {
                setIsOpen(e)
            }}>
                <DialogContent className="bg-[#191919] border-none">
                    <div className="flex flex-col">
                        <div className="text-lg font-bold">
                            Nutzer verwalten
                        </div>
                        <div className="flex flex-row  mt-8">
                            <div className="w-1/3">
                                <Image
                                    alt="pfp"
                                    src={thisUser?.image ?? "/placeholder-person.jpg"}
                                    className="w-24 h-24 rounded-full object-cover"
                                    width={200}
                                    height={200}

                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-lg font-semibold">
                                    {thisUser?.name}
                                </div>
                                <div className="text-gray-200/60 text-sm flex flex-row items-center">
                                    {thisUser?.email}
                                </div>
                                <div className="flex flex-row items-center space-x-4 mt-4">
                                    <RiFolderUserFill
                                        className={cn("", thisUser?.isAdmin ? "text-rose-400" : "text-indigo-500")}
                                    />
                                    <div className="flex flex-col">
                                        <div className={cn("text-sm font-semibold ", !thisUser?.isAdmin ? "text-indigo-500" : "text-rose-400")}>
                                            {thisUser?.isAdmin ? "Admin" : "Nutzer"}
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-row items-center space-x-4">
                                    <PersonIcon />
                                    <div className="flex flex-col">
                                        <div className={cn("text-gray-200 text-sm font-semibold mt-2 flex flex-row items-center space-x-2", !thisUser?.vorname && "text-gray-200/60 italic")}>
                                            <p className="font-medium text-gray-200/80 w-24">Vorname: </p> {thisUser?.vorname ?? "Kein Vorname hinterlegt."}
                                        </div>
                                        <div className={cn("text-gray-200 text-sm font-semibold items-center space-x-2 flex flex-row ", !thisUser?.nachname && "text-gray-200/60 italic")}>
                                            <p className="font-medium text-gray-200/80 w-24">Nachname: </p> {thisUser?.nachname ?? "Kein Nachname hinterlegt."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-row items-center text-gray-200/80 text-sm">
                                <CalendarCheck2Icon
                                    className="w-4 h-4 mr-2"
                                />
                                {format(thisUser?.createdAt ?? new Date(), "dd MMMM yyyy", { locale : de })}
                            </div>
                        </div>
                        <div className="py-4">
                            <div className="w-full flex flex-col items-center justify-center p-8 rounded-full border-gray-200 border">
                                <div className="text-4xl font-semibold">
                                    {thisUser?.inserat?.length ?? 0}
                                </div>
                                <Label className="mt-2">
                                    Inserate erstellt
                                </Label>
                            </div>
                        </div>
                        <div className="w-full max-w-md mx-auto my-4">
                            <div className="text-sm mb-1 text-gray-200 font-semibold">Sichtbarkeit erstellter Inserate</div>
                            <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                                {thisUser.inserat.length > 0 ? (
                                    <div
                                        className="bg-green-500 h-4"
                                        style={{
                                            width: `${(thisUser.inserat.filter(i => i.isPublished).length / thisUser.inserat.length) * 100}%`
                                        }}
                                    ></div>
                                ) : (
                                    <div className="h-4"></div> // Falls keine Inserate vorhanden
                                )}
                            </div>

                            <div className="text-xs text-gray-200/60 mt-1">
                                {thisUser.inserat.filter(i => i.isPublished).length} / {thisUser.inserat.length} veröffentlicht
                            </div>
                        </div>
                        <div className="mt-8 space-y-2 flex flex-col">
                            <span>
                                <Button className="w-full bg-indigo-800 text-gray-200 hover:bg-indigo-900">
                                    <BiTransfer
                                        className="w-4 h-4 mr-2"
                                    />
                                    Account-Übergabe
                                </Button>
                            </span>
                            <span>
                                <Button className="w-full bg-[#222222] shadow-lg text-gray-200 hover:bg-[#242424]">
                                    <MailWarningIcon
                                        className="w-4 h-4 mr-2"
                                    />
                                    E-Mail Addresse ändern
                                </Button>
                            </span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <div className="bg-[#222222] rounded-md shadow-md w-full p-4" key={thisUser?.id}>
            <div className="flex flex-row items-center space-x-8">
                <div>
                    <Image
                        alt="pfp"
                        src={thisUser?.image ?? "/placeholder-person.jpg"}
                        className="w-10 h-10 rounded-full object-cover"
                        width={40}
                        height={40}

                    />
                </div>
                <div className="w-72">
                    <Label className="font-semibold text-base w-full line-clamp-1 break-all">
                        {thisUser?.name}
                    </Label>
                </div>
                <div className="w-72">
                    <Label className="text-gray-200/60">
                        {thisUser?.email}
                    </Label>
                </div>
                <div className="">
                    <Button className="text-sm bg-indigo-800 hover:bg-indigo-900 shadow-lg text-gray-200"
                        onClick={() => setIsOpen(true)}
                    >
                        <IoInformationCircle
                            className="w-4 h-4 mr-2"
                        />
                        Weitere Informationen
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RenderedUser;