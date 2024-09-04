import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FaCarCrash } from "react-icons/fa";

export default function Custom404() {
  return (
    <div className="bg-[#1f2332] flex flex-col justify-center items-center min-h-screen text-white">
      <div>
      <FaCarCrash 
      className="text-9xl text-gray-200"
      />
      </div>
      <h2 className="text-6xl font-black">
        uRent
      </h2>
        <h3 className="text-2xl font-semibold text-gray-200">
          404 - Seite nicht gefunden
        </h3>
        <p className="mt-4">
          Die Seite, die du suchst, existiert nicht oder ist nicht mehr verfügbar.
        </p>
        <div className="mt-4">
          <Button className="bg-indigo-800 text-gray-200 font-semibold text-lg p-8 gap-x-4 hover:bg-indigo-900 hover:text-gray-300">
          <ChevronLeft className="w-8 h-8" />  Zurück zur Startseite
          </Button>
        </div>
    </div>
  )
}