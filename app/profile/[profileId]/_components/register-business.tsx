'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import axios from "axios";
import { RocketIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsBuildingsFill } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa6";
import { GiCarKey } from "react-icons/gi";
import { MdSwapHoriz } from "react-icons/md";


const RegisterBusiness = () => {

    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onBusinessRegister = async () => {
        try {
            setIsLoading(true);
            const res = await axios.patch(`/api/profile/${params.profileId}/register-business`)
                .then(() => router.refresh())
        } catch {
            toast.error("Fehler beim Umwandeln des Kontos");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mt-4">
            <AlertDialog>
                <Alert className="bg-gradient-to-b from-[#181a2a] to-[#16161f] shadow-2xl border-2 border-indigo-700 md:rounded-r-none rounded-md text-gray-200">
                    <GiCarKey className="h-4 w-4 text-indigo-400" />
                    <AlertTitle>Du bist Vermieter?</AlertTitle>
                    <AlertDescription>
                        Klicke <AlertDialogTrigger className="underline px-0.5 hover:cursor-pointer"> hier </AlertDialogTrigger>
                        , um dein Konto kostenlos in ein Vermieterprofil umzuwandeln.
                    </AlertDescription>
                </Alert>
                <AlertDialogContent className="bg-gradient-to-b from-[#23244a] to-[#19191f] border-2 border-indigo-700 text-gray-200 shadow-2xl">
                    <div>
                        <h3 className="font-semibold text-lg flex items-center">
                        <MdSwapHoriz className="w-4 h-4 mr-2 text-indigo-400" />  Konto umwandeln ?
                        </h3>
                        <div className="text-xs text-gray-400">
                            <p>Ein gewerbliches Konto bietet dir zusätzliche Funktionen wie die Möglichkeit, deinen Auftritt, weiter zu personalisieren,
                                und die Möglichkeit ein Impressum, Standorte und Öffnungszeiten hinzuzufügen.
                            </p>
                            <p>Das erstellen eines gewerblichen Kontos, unterliegt unseren <a className="hover:cursor underline text-indigo-400" href="/agbs" target="_blank"> 
                            Allgemeinen Geschäftsbedingungen </a></p>
                        </div>
                        <AlertDialogFooter className="mt-2">
                            <AlertDialogCancel className="border-none text-gray-300">Abbrechen</AlertDialogCancel>
                            <AlertDialogAction className="bg-indigo-800 hover:bg-indigo-900 text-gray-200"
                            onClick={onBusinessRegister} disabled={isLoading}>
                            Umwandeln
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default RegisterBusiness;