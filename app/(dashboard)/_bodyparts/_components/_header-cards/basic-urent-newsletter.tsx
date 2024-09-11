import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TruckIcon } from "lucide-react";
import Image from "next/image";
import { FaRegNewspaper, FaRegWindowMinimize } from "react-icons/fa";
import { PiCursorClickLight } from "react-icons/pi";

const BasicUrentNewsletter = () => {
    return (
        <div className="w-full">
            <div className="text-4xl w-full">

                <div className="grid grid-cols-2  gap-4 w-full">
                    <div className="p-4 font-semibold h-full flex flex-col justify-center items-center text-center">
                        <div>
                            Immer up to drive!
                        </div>
                        <div className="text-xl text-gray-200/90 font-medium">
                            jetzt den Newsletter abonnieren <br />
                            und immer auf den laufenden bleiben!
                        </div>
                        <div className="mt-4">
                            <Dialog>
                                <DialogTrigger>
                                    <Button className="text-lg font-semibold bg-indigo-800" variant="ghost">
                                        <FaRegNewspaper className="w-8 h-8 mr-4" />   Keine Neuigkeiten verpassen!
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="dark:bg-[#191919] dark:border-none">
                                    <div>
                                        <div className="text-lg font-semibold">
                                            Möchtest du dich zum Newsletter anmelden?
                                        </div>
                                        <div className="text-xs text-gray-200/60">
                                            Der Newsletter informiert dich über neue Angebote und Neuigkeiten auf uRent.
                                            Du kannst dich jederzeit abmelden.
                                        </div>
                                        <div className="mt-4 ml-auto justify-end flex">
                                            <DialogTrigger>
                                                <Button className="text-sm font-semibold bg-indigo-800" variant="ghost">
                                                    Anmelden
                                                </Button>
                                            </DialogTrigger>
                                            <DialogTrigger>
                                                <Button variant="ghost">
                                                    Abbrechen
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className=" w-full flex justify-end  ml-auto h-full">

                        <div className="p-4">
                            <div className="">
                                Mieten?
                            </div>
                            <div className="">
                                Vermieten?
                            </div>
                            <div className="w-full h-full">
                                <img
                                    src={'/uRent.png'}
                                    className="w-[200px] h-[200px]"
                                    alt="uRent"

                                />
                            </div>
                        </div>

                    </div>
                </div>





            </div>
        </div>
    );
}

export default BasicUrentNewsletter;