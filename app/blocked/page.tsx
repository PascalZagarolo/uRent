'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdSpeed } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(11); // Start countdown from 11 seconds

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Redirect after 11 seconds
    const timeout = setTimeout(() => {
      router.push("/");
    }, 11000);

    // Clear the intervals on component unmount
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="bg-[#1f2332] flex flex-col justify-center items-center min-h-screen text-white">
      <div>
        <MdSpeed className="text-9xl text-gray-200" />
      </div>
      <h2 className="text-6xl font-black">uRent</h2>
      <h3 className="text-2xl font-semibold text-gray-200">
        Da ist wohl jemand zu schnell gefahren
      </h3>
      <p className="mt-4">Du schickst uRent zu viele Anfragen</p>
      <p className="text-center">
        Warte ein paar Sekunden und versuche die Seite neu zu laden. <br />
        Falls das Problem weiterhin besteht kontaktiere den Support für mehr
        Informationen.
      </p>
      <div className="mt-4">
        <Button
          className="bg-indigo-800 text-gray-200 font-semibold text-lg p-8 gap-x-4 hover:bg-indigo-900 hover:text-gray-300"
          onClick={() => router.push("/")}
          disabled={countdown > 0}
        >
          <ChevronLeft className="w-8 h-8" /> 
          {/* Update button text with countdown */}
          Zurück zur Startseite {countdown > 0 ? `(${countdown})` : ""}
        </Button>
      </div>
    </div>
  );
}
