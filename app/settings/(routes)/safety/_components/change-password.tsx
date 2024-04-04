import { Label } from "@/components/ui/label";

const ChangePassword = () => {
    return (
        <div>
            <div>
                <div className="w-1/2">
                    <Label className="text-sm font-semibold p-2">
                        Passwort
                    </Label>

                    <div className="w-full">
                        <div className="pl-3 p-2.5 bg-[#141414] text-sm rounded-md">
                        *********
                        </div>
                        <p className="ml-auto flex justify-end p-1 w-full text-xs font-semibold hover:underline hover:cursor-pointer"

                        >
                        Passwort ändern                            
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;