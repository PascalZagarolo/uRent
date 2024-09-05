'use client'

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaCarCrash } from "react-icons/fa";
import { LiaCarCrashSolid } from "react-icons/lia";


export default function ErrorPage() {

    const router = useRouter();

  return (
    <div className="bg-[#1f2332] flex flex-col justify-center items-center min-h-screen text-white">
      <div>
      <LiaCarCrashSolid  
      className="text-9xl text-gray-200"
      />
      </div>
      <h2 className="text-6xl font-black">
        uRent
      </h2>
        <h3 className="text-2xl font-semibold text-gray-200">
         500 - Serverfehler
        </h3>
        <p className="mt-4">
          uRent konnte deine Anfrage nicht verarbeiten.
        </p>
        <p>
            Versuche die Seite neu zu laden oder kontaktiere den Support falls das Problem weiterhin besteht.
        </p>
        <div className="mt-4">
          <Button className="bg-indigo-800 text-gray-200 font-semibold text-lg p-8 gap-x-4 hover:bg-indigo-900 hover:text-gray-300"
          onClick={() => router.push("/")}
          >
          <ChevronLeft className="w-8 h-8" />  Zurück zur Startseite
          </Button>
        </div>
    </div>
  )
}