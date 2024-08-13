import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { IoPush } from "react-icons/io5";

const Notificationpreferences = () => {
    return (
        <div>
            <div className="flex flex-row w-full space-x-8">
                <div className="w-1/3">
                    <div className="flex flex-col">
                        <h3 className="flex items-center flex-row gap-x-2">
                            <IoPush className="w-4 h-4" />
                            <span className="text-gray-200 font-semibold">Push-Benachrichtigungen</span>
                        </h3>
                        <p className="text-gray-200/60 text-xs">
                            Passe deine Benachrichtigungseinstellungen an. <br />
                            Aktiviere Push-Benachrichtigungen, um über neue Ereignisse wie Nachrichten, Buchungsanfragen und mehr informiert zu werden.
                        </p>
                    </div>

                </div>
                <div className="w-2/3 flex flex-col space-y-4">
                    <div className="flex-row flex space-x-4">
                        <div>
                            <Switch 
                            checked={true}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4">

                                <Label className="text-base">
                                    Push Benachrichtigung aktivieren
                                </Label>
                            </div>
                            <div>
                                <p className="text-gray-200/60 text-xs">
                                    Du erhältst Benachrichtigungen über neue Nachrichten, <br /> Buchungsanfragen und mehr. <br />
                                    Falls aktiviert, kannst du deine Präferenzen genauer bestimmen.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-row flex space-x-4">
                        <div>
                            <Switch />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4">

                                <Label className="text-base">
                                    Konversationen
                                </Label>
                            </div>
                            <div>
                                <p className="text-gray-200/60 text-xs">
                                    Du erhältst Benachrichtigungen über neue Konversationen. <br /> und Nachrichten.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-row flex space-x-4">
                        <div>
                            <Switch />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4">

                                <Label className="text-base">
                                    Buchungsanfragen
                                </Label>
                            </div>
                            <div>
                                <p className="text-gray-200/60 text-xs">
                                    Du erhältst Benachrichtigungen über neue Buchungsanfragen.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Notificationpreferences;