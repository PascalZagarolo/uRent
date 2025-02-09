import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FaUserCheck } from "react-icons/fa";
import { GiCarKey } from "react-icons/gi";
import { MdOutlineEmojiTransportation } from "react-icons/md";

const RegisterWrapper = () => {
    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex flex-col items-center px-8 py-8">
                <div className="text-lg text-gray-200/80">
                    Willkommen auf
                </div>
                <p className="text-gray-200 text-4xl font-semibold">
                    uRent!
                </p>
            </div>
            <div>
                <p className="text-sm text-gray-200/60 font-medium">
                    Du bist auf dem richtigen Weg. <br/>
                    So einfach nutzt du uRent:
                </p>
            </div>
            <div className="flex flex-col space-y-16 h-full w-[400px]">
                <div className="flex flex-row space-x-4 mt-8">
                    <div>
                        <div className="bg-[#1F2332] p-4 rounded-md shadow-lg">
                        <FaUserCheck className="w-4 h-4" />
                        </div>
                    </div>
                    <div>
                        <Label className="text-lg">
                            Registrieren
                        </Label>
                        <div className="text-gray-200/80 text-sm">
                            Registriere dich jetzt in nur wenigen Schritten.
                        </div>
                    </div>
                </div>

                <div className="flex flex-row space-x-4 mt-8">
                    <div>
                        <div className="bg-[#1F2332] p-4 rounded-md shadow-lg">
                        <GiCarKey className="w-4 h-4"/>
                        </div>
                    </div>
                    <div>
                        <Label className="text-lg">
                            Mieten
                        </Label>
                        <div className="text-gray-200/80 text-sm">
                            Wähle aus einer Vielzahl von Fahrzeugen & Vermietern, die zu dir passen.
                            Trete mit dem Vermieter und erfülle deine Bedürfnisse.
                            So einfach wie noch nie.
                        </div>
                    </div>
                </div>

                <div className="flex flex-row space-x-4 mt-8">
                <div>
                        <div className="bg-[#1F2332] p-4 rounded-md shadow-lg">
                        <MdOutlineEmojiTransportation className="w-4 h-4" />
                        </div>
                    </div>
                    <div>
                        <Label className="text-lg">
                            Vermieten
                        </Label>
                        <div className="text-gray-200/80 text-sm">
                            Vermiete deinen Fuhrpark, präsentiere deine Fahrzeuge und finde den passenden Mieter, so einfach wie noch nie.
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <Image
                    width={200}
                    height={200}
                    alt="Logo"
                    className="w-16 h-16 shadow-lg rounded-md"
                    src={"/uRent.png"}
                />
                <div className="mt-auto ml-auto text-xs text-gray-200/80">
                    © 2025 uRent. All Rights reserved.
                </div>
            </div>
        </div>
    );
}

export default RegisterWrapper;