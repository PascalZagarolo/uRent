'use client'

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ArrowRight, MailIcon, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { GrContactInfo } from "react-icons/gr"

const FurtherInformations = () => {
    const categoryRender = (name, description, icons) => {
        return (
            <div className="flex flex-col items-center px-4 py-4 bg-indigo-800 hover:bg-indigo-900  shadow-lg rounded-md w-10/12 justify-center  hover:cursor-pointer h-[200px]">
                <div>
                    {icons}
                </div>
                <div className="text-sm mt-2">
                    {name}
                </div>
                <div className="text-xs text-gray-200/60 font-medium text-center mt-2">
                    {description}
                </div>
            </div>
        )
    }

    const router = useRouter();

    return (
        <div>
            <div>
                <h3>
                    Nicht gefunden, was du suchst? <br />
                </h3>
            </div>
            <div className="">
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-x-4 gap-y-4 justify-center mt-4">
                <div className="w-full flex justify-center">
                    {categoryRender(
                        "FAQs durchsuchen",
                        "Um präziser antworten zu finden, kannst du Suchbegriffe in die Leiste eingeben.",
                        <MagnifyingGlassIcon className="w-6 h-6" />
                    )}
                </div>

                {/* Arrow between the first and second category */}
                <div className="flex justify-center">
                    <ArrowRight />
                </div>

                <div className="w-full flex justify-center" onClick={() => {router.push(`/faqs/support`)}}>
                    {categoryRender(
                        "Zum Kontaktformular",
                        "Fülle das Kontaktformular aus, damit wir uns um dich kümmern können.",
                        <GrContactInfo className="w-6 h-6" />
                    )}
                </div>

                {/* Arrow between the second and third category */}
                <div className="flex justify-center">
                    <ArrowRight />
                </div>

                <div className="w-full flex justify-center">
                    {categoryRender(
                        "Schreib uns eine Email",
                        "Falls das Kontaktformular nicht ausreichen sollte, kannst du uns über support@urent-rental.de erreichen.",
                        <MailIcon className="w-6 h-6" />
                    )}
                </div>
            </div>
            </div>
        </div>
    );
}

export default FurtherInformations;