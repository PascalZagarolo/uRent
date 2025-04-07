import { checkIfCodeValid } from "@/actions/admin/transfer-account/check-if-code-valid";
import { sendTransferAccountConfirmation } from "@/actions/admin/transfer-account/send-transfer-account-confirmation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2Icon } from "@radix-ui/react-icons";
import { CheckCircleIcon, CheckIcon, LockIcon, ShareIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { IoMdShareAlt } from "react-icons/io";
import { TbMailShare } from "react-icons/tb";
import { ClipLoader } from "react-spinners";
import { newPassword } from '../../../../actions/new-password';

interface ConfirmChangeProps {
    newMail: string,
    newPassword : string
    changePage : (number) => void;
}

const ConfirmChanges = ({ newMail, newPassword, changePage }: ConfirmChangeProps) => {
   
    const [currentCode, setCurrentCode] = useState("");

    const [codeSent, codeWasSent] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("")

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const sendCode = async () => {
        try {
            if (isLoading) return;

            setIsLoading(true);

            const res = await sendTransferAccountConfirmation(token, newMail)
            if (res?.error) {
                console.log(res?.error)
            }
            if (res?.success) {
                codeWasSent(true);
                toast.success("Email erfolgreich versendet.")
            }
        } catch (e: any) {
            console.log(e);
            toast.error("Etwas ist schiefgelaufen, bitte versuche es erneut.");
        } finally {
            setIsLoading(false);
        }
    }

    const checkCode = async () => {
        try {
            if(isLoading) return;

            setIsLoading(true);

            const res = await checkIfCodeValid(
                    currentCode,
                    token,
                    newMail,
                    newPassword
            )
            
            if(res.success && !res.error) {
                setSuccess(true);
                changePage(4)
            } else if(res.error) {
                setError(res.error)
                
            }

        } catch(e : any) {
            console.log(e);
            toast.error("Etwas ist schiefgelaufen.");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div>
            <div className="text-lg font-semibold flex flex-row items-center">
                <GiConfirmed
                    className="w-4 h-4 mr-2"
                />
                Änderungen bestätigen
            </div>


            {!codeSent ? (
                <div className="mt-4 flex flex-col">
                    <Label className="font-semibold">Bestätigungscode anfordern </Label>
                    <p className="text-xs text-gray-200/60 mt-1">
                        An die von dir angegebene neue E-Mail-Adresse <span className="text-indigo-400 font-semibold">{newMail}</span> wird ein Bestätigungscode gesendet werden.
                    </p>
                    <Button className="bg-indigo-800 hover:bg-indigo-900 mt-4 text-gray-200"
                        disabled={!newMail}
                        onClick={sendCode}
                    >
                        <TbMailShare
                            className="w-4 h-4 mr-2"
                        />
                        Email senden
                    </Button>
                </div>
            ) : (
                
                    <div className="mt-4">
                    <Label className="font-semibold">Bestätigungscode eingeben</Label>
                    <Input
                        className="bg-[#222222] shadow-lg border-none"
                        placeholder=""
                        type="password"
                        maxLength={6}
                        value={currentCode}
                        onChange={(e) => setCurrentCode(e.target.value)} 
                    />
                    <div className="mt-4">
                        <Button className="text-sm text-gray-200 w-full bg-indigo-800 hover:bg-indigo-900"
                        onClick={checkCode}
                        disabled={isLoading}
                        >
                           {isLoading ? (
                            <ClipLoader 
                            color="white"
                            size={20}
                            />
                           ) : (
                            <>
                            <IoMdShareAlt  
                            className="w-4 h-4 mr-2"
                            />
                            Account übertragen
                            </>
                           )}
                        </Button>
                    </div>
                    {error && (
                        <div className="text-rose-600 font-semibold">
                            {error}
                        </div>
                    )}
                </div>
                
            )}

            <div>

            </div>


        </div>
    );
};

export default ConfirmChanges;
