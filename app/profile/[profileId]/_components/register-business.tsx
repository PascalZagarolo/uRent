'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RocketIcon } from "lucide-react";
import { BsBuildingsFill } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa6";
import { MdSwapHoriz } from "react-icons/md";

const RegisterBusiness = () => {
    return (
        <div className="mt-4">
            <AlertDialog>
                <Alert className="dark:bg-[#191919] dark:border-none">
                    <BsBuildingsFill className="h-4 w-4" />
                    <AlertTitle>Du hast ein Gewerbe ?</AlertTitle>
                    <AlertDescription>
                        Klicke <AlertDialogTrigger className="underline px-1 hover:cursor-pointer"> hier </AlertDialogTrigger>, um dein Konto in ein gewerbliches umzuwandeln.
                    </AlertDescription>
                </Alert>
                <AlertDialogContent className="dark:bg-[#191919] dark:border-none">
                    <div>
                        <h3 className="font-semibold text-lg flex items-center">
                        <MdSwapHoriz className="w-4 h-4 mr-2" />  Konto umwandeln ?
                        </h3>
                        <div className="text-xs dark:text-gray-200/70">

                            <p>Ein gewerbliches Konto bietet dir zusätzliche Funktionen wie die Möglichkeit, deinen Auftritt, weiter zu personalisieren,
                                und die Möglichkeit ein Impressum, Standorte und Öffnungszeiten hinzuzufügen.
                            </p>
                            <p>Wenn du ein gewerbliches Konto erstellst, musst du die Nutzungsbedingungen für gewerbliche Konten akzeptieren.</p>
                        </div>
                        <AlertDialogFooter className="mt-2">
                            <AlertDialogCancel className="dark:border-none">Abbrechen</AlertDialogCancel>
                            <AlertDialogAction className="dark:bg-[#121212] dark:hover:bg-[#171717] dark:text-gray-200">Umwandeln</AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default RegisterBusiness;