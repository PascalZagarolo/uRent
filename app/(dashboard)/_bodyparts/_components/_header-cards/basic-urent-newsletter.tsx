import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { TruckIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegNewspaper, FaRegWindowMinimize } from "react-icons/fa";


interface BasicUrentNewsletterProps {
    userId : string
}

const BasicUrentNewsletter = ({ userId } : BasicUrentNewsletterProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubscribe = async() => {
        try {

            if(!userId) {
                return router.push('/login');
            }

            const values = {
                newsletter : true
            }

            await axios.patch(`/api/profile/${userId}`, values);
            router.refresh();
            toast.success('Wir halten dich von nun an auf dem laufenden!');
        } catch(e : any) {
            console.log(e);
        }
    }

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
                                                <Button className="text-sm font-semibold bg-indigo-800" variant="ghost" onClick={onSubscribe}>
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