'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vehicle } from "@/db/schema";
import { Pencil1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface EditVehicleProps {
    thisVehicle: typeof vehicle.$inferSelect;
}

const EditVehicle: React.FC<EditVehicleProps> = ({
    thisVehicle
}) => {

   

    const [title, setTitle] = useState(thisVehicle.title);
    const [registration, setRegistration] = useState(thisVehicle?.registration);
    const [internalId, setInternalId] = useState(thisVehicle.internalId);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSave = async () => {
        try {
            setIsLoading(true);
            const values = {
                title: title,
                registration: registration,
                internalId : internalId
            }

            await axios.patch(`/api/vehicle/${thisVehicle.id}/edit`, values)
                .then(() => {
                    router.refresh();
                    toast.success("Änderungen gespeichert")
                })
        } catch (error: any) {
            console.log(error);
            toast.error("Fehler beim Speichern")
        } finally {

        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Pencil1Icon className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] dark:border-none">
                <div>
                    <div>
                        <h3 className="text-md font-semibold">
                            Fahrzeug bearbeiten
                        </h3>
                    </div>
                    <div className="mt-4">
                        <Label>
                            Titel *
                        </Label>
                        <div className="mt-2">
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="dark:border-none dark:bg-[#0F0F0F]"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <Label>
                            Kennzeichen
                        </Label>
                        <div className="mt-2">
                            <Input
                                value={registration}
                                onChange={(e) => setRegistration(e.target.value)}
                                placeholder="Kennzeichen.."
                                className="dark:border-none dark:bg-[#0F0F0F]"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Label>
                            Interne Fahrzeugnr.
                        </Label>
                        <div className="mt-2">
                            <Input
                                value={internalId}
                                onChange={(e) => setInternalId(e.target.value)}
                                placeholder="Kennzeichen.."
                                className="dark:border-none dark:bg-[#0F0F0F]"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300" onClick={onSave}>
                                Änderungen speichern
                            </Button>
                        </DialogTrigger>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditVehicle;