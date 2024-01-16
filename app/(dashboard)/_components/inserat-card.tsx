'use client'

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Images, Inserat, User } from "@prisma/client";
import axios from "axios";
import { Banknote, CalendarCheck2, CarFront, Check, LocateFixedIcon, MapPinIcon, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratCardProps {
    inserat: Inserat & { images: Images[]; user: User };
    profileId: string,
    isFaved: boolean,
    owned: boolean,

}

const InseratCard: React.FC<InseratCardProps> = ({
    inserat,
    profileId,
    isFaved,
    owned
}) => {

    const formatDate = (inputDate: Date): string => {
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const onFav = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/profile/${profileId}/favourites`, { inseratId: inserat.id })

            setTimeout(() => {
                router.refresh();
            }, 500)
        } catch {
            toast.error("Fehler beim Favorisieren der Anzeige")
        } finally {
            setIsLoading(false);
        }
    }

    const onRedirect = () => {
        router.push(`/inserat/${inserat.id}`)
    }

    return (
        <div className="w-[400px] h-[360px]  rounded-md  items-center ml-4 bg-[#ffffff] border-2 border-white mb-8 ">
            <h3 className={cn("flex justify-stretch font-semibold mt-1 ml-2 text-lg hover:cursor-pointer h-[40px] items-center", inserat.title.length > 15 ? "text-sm" : "text-lg")} onClick={onRedirect}>
                <CarFront className="ml-2   h-6 w-6" /> <p className="flex ml-4 font-bold text-[#0d0f15] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] "> {inserat.title} </p>
                <div className="ml-auto items-center flex mr-4">
                    <p className="font-bold text-gray-800/50 italic text-xs">{formatDate(inserat.createdAt)}</p>
                    <p className="ml-4">
                        <Button variant="ghost" onClick={onFav}>
                            <Star className={cn(isFaved ? "text-yellow-300" : "text-black")} />
                        </Button>
                    </p>
                </div>

            </h3>
            <div className="mt-2">
                <Separator
                    className="w-8 bg-black rounded-lg ml-2 "
                />
            </div>
            <div className="flex justify-center h-[200px] items-center ">
                <Image
                    src={inserat.images[0].url}
                    height={160}
                    width={320}
                    alt="Car-Vorschau"
                    className="rounded-md border mb-2 border-black hover:cursor-pointer items-center"
                    onClick={onRedirect}
                />
            </div>

            <div className="ml-2 mt-2">
                <Separator
                    className=" mt-2 w-16 bg-black"
                />
                <div className="flex mt-2">
                    <p className="text-gray-900/80 font-bold mr-4 flex">
                        <CalendarCheck2 className="mr-2" />  Zeitraum :
                    </p>
                    <p className="font-semibold text-[#434b70]">
                        {formatDate(inserat.begin)}
                    </p>
                    <p className="font-bold text-black-800 mr-2 ml-2">
                        -
                    </p>
                    <p className="font-bold text-[#434b70]">
                        {formatDate(inserat.end)}
                    </p>
                </div>

                <div className="font-semibold text-gray-900 flex mt-2 items-center">
                    {inserat.alreadyOwned ? (
                        <div>
                            {owned ? (
                                <p className="mr-2 flex font-bold">
                                    <Check
                                        className="mr-2 text-emerald-600" />
                                    Im Besitz
                                </p>
                            ) : (
                                <p className="mr-2 flex font-bold">
                                    <X
                                        className="mr-2 text-rose-600" />
                                    Bereits vergriffen
                                </p>
                            )}
                        </div>

                    ) : (
                        <div className="flex">
                            {owned ? (
                                <p className="mr-2 flex font-bold">
                                    <Check
                                        className="mr-2 text-emerald-600" />
                                    Im Besitz
                                </p>
                            ) : (
                                <div className="flex">
                                    <p className="mr-2 flex font-bold">
                                        <Banknote
                                            className="mr-2" />
                                        Preis :
                                    </p>
                                    {inserat.price} €
                                </div>
                            )}
                        </div>
                    )}










                    <div className="ml-auto mr-4 flex items-center">
                        <MapPinIcon className="text-rose-600 mr-2" /> Mömer <p className="text-gray-800/50 text-xs ml-2">(187 Km)</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">

                <div className="rounded-md bg-[#404668] position:absolute ">
                    <div className="flex mt-4 items-center border border-black rounded-md">
                        <Image
                            className="rounded-full ml-2 mt-2 mb-2 border border-[#141621] "
                            src={inserat.user?.image}
                            height={40}
                            width={40}
                            alt="User-Bild"
                        />
                        <Link href={`/profile/${inserat.userId}`}>
                            <p className="ml-4 font-semibold text-[#dbddf2] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]">
                                {inserat.user?.name}
                            </p>
                        </Link>

                        <div className="ml-auto mr-2">
                            <Button className="bg-[#222637]  border border-white  font-semibold">
                                Besichtigen
                            </Button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default InseratCard;
