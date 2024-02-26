'use client'

import findConversation from "@/actions/findConversation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { InserateImagesAndAttributes } from "@/types/types";

import { Images, Inserat, PkwAttribute, User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { Banknote, CalendarCheck2, CarFront, CaravanIcon, Check, CheckCheckIcon, ConstructionIcon, EyeIcon, ImageIcon, Lightbulb, LocateFixedIcon, Mail, MailCheckIcon, MailQuestion, MapPinIcon, MapPinned, RockingChair, Send, Settings2Icon, SofaIcon, Star, ThumbsUpIcon, TractorIcon, TramFront, Truck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface InseratCardProps {
    inserat: InserateImagesAndAttributes;
    profileId: string,
    isFaved: boolean,
    currentUser: User;


}

const InseratCard: React.FC<InseratCardProps> = ({
    inserat,
    profileId,
    isFaved,
    currentUser

}) => {

    const isOwn = currentUser.id === inserat.userId;

    const formatDate = (inputDate: Date): string => {
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [text, setText] = useState(
        "Betreff: Anfrage bezüglich Mietwagen\n\n" +
        "Sehr geehrte Damen und Herren,\n\n" +
        `Nach eingehender Prüfung Ihres Mietangebots bin ich sehr interessiert an dem genannten Fahrzeug.
         Gerne würde ich weitere Details zu den Konditionen besprechen und das Fahrzeug persönlich in Augenschein nehmen.\n\n` +
        "Mit freundlichen Grüßen,\n" +
        (currentUser.name ? currentUser.name + " " : "[Dein Name] ") +
        "Meine Kontaktdaten : \n\n" +
        "E-Mail : " + (currentUser.email ? currentUser.email : "[Deine E-Mail Addresse]") + "\n"

    );


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

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const onRedirect = () => {
        router.push(`/inserat/${inserat.id}`)
    }

    const getAddressCity = (address: string): string => {
        const addressParts = address.split(', ');
        if (addressParts.length > 2) {
            return addressParts[1];
        } else {
            return addressParts[0];
        }
    };

    const onConversation = () => {

        if (currentUser) {
            try {
                setIsLoading(true);
                const conversation = axios.post(`/api/conversation/${currentUser.id}/${inserat.userId}`).then((response) => {
                    router.push(`/conversation/${response.data.id}`)
                })
            } catch {
                toast.error("Fehler beim Erstellen der Konversation")
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push(`/login`)
        }
    }

    const onInterest = async () => {
        if (currentUser) {
            try {

                setIsLoading(true);
                axios.post(`/api/interest/${inserat.id}`, { text: text }).then(() => {
                    axios.get(`/api/conversation/${currentUser.id}/${inserat.userId}`).then((response) => {
                        if (response) {
                            console.log(response)
                            router.push(`/conversation/${response.data.id}`)
                        } else {
                            toast.error("Fehler beim abrufen")
                        }
                    })
                })
            } catch {
                toast.error("Etwas ist schief gelaufen");
            } finally {
                setIsLoading(false);

            }
        } else {
            router.push(`/login`);
        }
    }

    const onEdit = () => {
        router.push(`/inserat/create/${inserat.id}`);
    }

    return (
        <div className="sm:w-[750px] sm:h-[420px] w-[400px] h-[380px]   rounded-md  items-center dark:bg-[#171923]
          bg-[#ffffff]  mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:border-none p-2">



            <h3 className={cn("flex  font-semibold  ml-2 text-lg hover:cursor-pointer text-ellipsis  items-center  rounded-md mr-2",)} >
                <div className="bg-[#181c28] p-2 rounded-md  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {
                        {
                            'PKW': <CarFront className=" text-gray-100 h-6 w-6 " />,
                            'LKW': <Truck className=" text-gray-100 h-6 w-6 " />,
                            'LAND': <TractorIcon className=" text-gray-100 h-6 w-6 " />,
                            'BAU': <ConstructionIcon className=" text-gray-100 h-6 w-6 " />,
                            'TRANSPORT': <TramFront className=" text-gray-100 h-6 w-6 " />,
                            'CARAVAN': <CaravanIcon className=" text-gray-100 h-6 w-6 " />,
                            'TRAILOR': <CaravanIcon className=" text-gray-100 h-6 w-6 " />
                        }[inserat.category]
                    }
                </div>
                <div className="px-2 py-1 mt-1 rounded-md  ">
                    <div className="ml-4 font-bold text-[#0d0f15] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] truncate overflow-hidden text-medium w-[320px] h-[40px]
                     hover:cursor-pointer hover:underline dark:text-gray-100 " onClick={onRedirect}> {inserat.title} </div>
                </div>
                <div className="ml-auto items-center flex ">

                    <p className="">
                        <Button variant="ghost" onClick={onFav} className="dark:bg-[#171923] 
                            dark:border dark:border-[#171923]  dark:hover:none">
                            <Star className={cn(isFaved ? "text-yellow-300" : "text-black")} />
                        </Button>
                    </p>
                </div>

            </h3>

            <div className="flex justify-center h-[200px] items-center   w-full">
                <div className="flex p-4  w-full">
                    <div className="mr-4 w-[80px]">

                        <div className="">
                            {
                                {
                                    'PKW': inserat.pkwAttribute?.sitze && (
                                        <Badge className="bg-[#2c3246]  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                 dark:bg-[#181818]/95 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-[#181818]/60">
                                            <SofaIcon className="h-4 w-4 mr-1" />
                                            <p className="mr-1 text-blue-200"> {inserat.pkwAttribute?.sitze} </p> Sitze
                                        </Badge>
                                    ),

                                }[inserat.category]
                            }


                        </div>

                        <div className="mt-1">
                            <Badge className="bg-[#242a39] flex  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                dark:text-gray-100 dark:bg-[#181818]/95 dark:border-gray-700 dark:hover:bg-[#181818]/60
                                ">
                                <EyeIcon className="w-4 h-4 mr-1" /> {inserat.views}
                            </Badge>
                        </div>
                        <div className="mt-2">
                            <Badge className="bg-emerald-600  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                dark:bg-emerald-800 dark:text-gray-100 dark:border-gray-900 dark:hover:bg-emerald-700
                                ">
                                <CheckCheckIcon className="w-4 h-4" /> verfügbar
                            </Badge>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-1/2 flex">
                            <div className="">
                                <Image
                                    src={inserat.images[0].url}
                                    width={220}
                                    height={240}
                                    className="rounded-md  hover:cursor-pointer dark:border-gray-900 max-h-[180px]"
                                    onClick={onRedirect}
                                    alt={inserat.title}
                                />
                                <div className="text-xs font-bold">
                                    inseriert am:  {format(new Date(inserat.createdAt), "dd.MM")}
                                </div>
                            </div>
                            <div className="flex text-xs font-bold">
                                <ImageIcon className="w-4 h-4 mr-1 ml-1" />  {inserat.images.length}
                            </div>
                        </div>

                        <div className="ml-4 dark:bg-[#191B27] bg-gray-200 w-1/2 p-4 text-xs rounded-md mr-2 overflow-hidden h-[160px]" >
                            {inserat.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" ">
                <div className="flex justify-center bg-[#1e2332] p-2 rounded-md text-gray-100  dark:border-[#1e2332]  
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:bg-[#191B27]">
                    <p className="text-gray-100 font-bold mr-4 flex">
                        <CalendarCheck2 className="mr-2" />  {inserat.annual ? "" : "Zeitraum :"}
                    </p>
                    {inserat.annual ? (
                        <p className="font-semibold  text-sm items-center"> Datumsunabhängig verfügbar </p>
                    ) : (
                        <>
                            <p className="font-semibold text-gray-200">
                                {formatDate(inserat.begin)}
                            </p>
                            <p className="font-bold text-black-800 mr-2 ml-2">
                                -
                            </p>
                            <p className="font-bold text-gray-200">
                                {formatDate(inserat.end)}
                            </p>
                        </>
                    )}
                </div>
                <div>
                    <div className="font-semibold text-gray-900 flex mt-2 items-center">
                        <div className="flex">
                            <div className="flex dark:bg-emerald-800 bg-emerald-600 p-2 rounded-md 
                             drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-gray-200 dark:border-emerald-800 px-4">
                                <div className="mr-2 flex font-bold">

                                    <Banknote className="mr-1" />
                                </div>
                                {inserat.price} €  {inserat.annual && (<div className="text-[10px] ml-1 mr-1" > / Tag</div>)}
                            </div>
                        </div>
                        <div className="ml-auto w-[320px]  flex items-center dark:bg-[#171923] dark:border-[#171923]  bg-[#181c28] 0 
                        p-2 rounded-lg text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] truncate text-sm justify-center">
                            <MapPinned className="text-rose-600 mr-2  dark:bg-[#171923] dark:border-none rounded-md w-4 h-4" />
                            {inserat.address?.locationString ?
                                getAddressCity(inserat.address?.locationString)

                                : "Keine Angabe"}
                            {inserat.address?.locationString && (
                                <p className="text-gray-300 text-xs ml-auto">{inserat.address?.postalCode} Deutschland</p>
                            )}
                        </div>

                    </div>
                    <div className="w-full mt-2">

                        <div className="rounded-md bg-[#1b1e2d] w-full position:absolute mr-2 dark:bg-[#13141c] dark:border-none">
                            <div className="flex  items-center   rounded-md">
                                <Image
                                    className="rounded-full ml-2 mt-2 mb-2 object-fit  w-[40px] h-[40px]"
                                    src={inserat.user?.image || "/placeholder-person.jpg"}
                                    height={40}
                                    width={40}
                                    alt="User-Bild"
                                />
                                <Link href={`/profile/${inserat.userId}`}>
                                    <p className="ml-4 font-semibold text-[#dbddf2] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]">
                                        {inserat.user?.name}
                                    </p>
                                </Link>
                                
                                <div className="flex ml-auto">

                                    {!isOwn ? (
                                        <>
                                        <Dialog>
                                        <DialogTrigger className="" asChild>

                                            <Button className="flex items-center mr-4 ml-auto bg-[#171923] rounded-md p-2 px-8 font-semibold
                                                 dark:text-gray-100 dark:hover:bg-[#181818]/60">
                                                <ThumbsUpIcon className="w-4 h-4 mr-2" />
                                                Anfragen
                                            </Button>

                                        </DialogTrigger>
                                        <DialogContent className="dark:bg-[#0F0F0F]">
                                            <DialogHeader>
                                                <div className="text-lg font-bold flex">
                                                    <Lightbulb className="mr-2" />  Händler sofort kontaktieren
                                                </div>
                                            </DialogHeader>
                                            <div>
                                                <Textarea className="h-[400px] border border-gray-300 bg-gray-200 dark:bg-[#171717]"
                                                    value={text}
                                                    onChange={handleTextChange}
                                                />
                                            </div>
                                            <div>

                                                <div>
                                                    <RadioGroup className="flex gap-x-4 items-center" defaultValue="messenger">
                                                        <RadioGroupItem value="messenger" id="messenger" />

                                                        <Label className="flex "> <Send className="w-4 h-4 mr-2 items-center" /> Direktnachricht </Label>

                                                        <RadioGroupItem value="email" id="email" />

                                                        <Label className="flex "> <Mail className="w-4 h-4 mr-2 items-center" /> E-Mail</Label>

                                                    </RadioGroup>

                                                </div>
                                            </div>
                                            <div className="ml-auto">
                                                <DialogTrigger>
                                                    <Button variant="ghost" className="bg-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                                          dark:bg-[#171717] dark:hover:bg-[#1c1c1c] "
                                                        onClick={onInterest} disabled={!text}>
                                                        Senden
                                                    </Button>
                                                </DialogTrigger>
                                            </div>
                                        </DialogContent>
                                    </Dialog>






                                    <Button className="flex items-center mr-4  bg-[#171923] rounded-md p-2 px-8 font-semibold
                                     dark:text-gray-100 dark:hover:bg-[#181818]/60" onClick={onConversation}>
                                        <MailCheckIcon className="w-4 h-4 mr-2" />
                                        Kontaktieren
                                    </Button>
                                    </>
                                    ) : (
                                        <Button className="flex items-center mr-4  bg-slate-200  rounded-md p-2 px-8 font-semibold
                                     dark:text-gray-900/80 dark:hover:bg-slate-300 text-gray-900" onClick={onEdit}>
                                        <Settings2Icon className="w-4 h-4 mr-2" />
                                       Inserat bearbeiten
                                    </Button>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div >








        </div >
    );
}

export default InseratCard;
