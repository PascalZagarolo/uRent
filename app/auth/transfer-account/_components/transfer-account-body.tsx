'use client'

import { useEffect, useState } from "react";
import ProgressBar from "./progress-bar";
import StepFooter from "./step-footer";
import ChangeMail from "./change-mail";
import ChangePassword from "./change-password";
import ConfirmChanges from "./confirm-changes";
import { ArrowLeftFromLineIcon, ArrowRightFromLine } from "lucide-react";
import SuccessfullTransfer from "./successful-transfer";
import { useRouter, useSearchParams } from "next/navigation";
import { checkIfCodeExists } from "@/actions/admin/transfer-account/check-if-code-exists";
import { Button } from "@/components/ui/button";
import { IoReturnUpBack } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";


const TransferAccountBody = () => {

    const router = useRouter();

    const [isInvalid, setIsInvalid] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [newMail, setNewMail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // Separate useState hooks for each page's disabled state
    const [isDisabledPage1, setIsDisabledPage1] = useState(false);
    const [isDisabledPage2, setIsDisabledPage2] = useState(false);
    const [isDisabledPage3, setIsDisabledPage3] = useState(false);

    const searchParams = useSearchParams().get("token")

    useEffect(() => {
        const checkToken = async () => {
            if (searchParams) {
                const res = await checkIfCodeExists(searchParams);
                if (!res) {
                    setIsInvalid(true)
                }
            } else {
                setIsInvalid(true);
            }

        }

        checkToken();
    }, [searchParams])

    return (
        <div className="w-full">
            <div className="flex w-full">
                <a className="mt-16  text-sm text-gray-200/60 hover:underline flex flex-row items-center w-content"
                    href="/"
                >
                    <ArrowLeftFromLineIcon
                        className="w-4 h-4 mr-4"
                    />  Zurück zur Startseite
                </a>
            </div>
            <div className="text-4xl mt-4 flex flex-row items-center font-bold  justify-center">
                uRent
            </div>
            {isInvalid ? (
                <div className="py-8 w-full">
                    <div className="flex flex-row items-center font-semibold text-lg">
                        Der Link ist ungültig oder abgelaufen.
                    </div>
                    <div className="text-sm text-gray-200/80">
                        Bitte überprüfe den Link oder ob du bereits eingeloggt bist. Du kannst auch über die Startseite zurückkehren.
                    </div>
                    <div className="text-sm text-gray-200/80">
                        Schau außerdem in deine E-Mails. Nur Links, die du direkt von uRent zum Account-Transfer erhalten hast, sind gültig.
                    </div>
                    <div className="text-sm text-gray-200/80 flex flex-col">
                        Falls das Problem weiterhin besteht und du keinen Zugriff auf deinen Account hast, wende dich bitte an unseren Support unter
                        <span className="font-semibold text-gray-200">support@urent-rental.com</span>
                        <div>
                            Wir kümmern uns so schnell wie möglich um dein Anliegen.
                        </div>
                    </div>
                    <div className="mt-8 w-full space-y-2">
                        <Button className="bg-indigo-800 w-full hover:bg-indigo-900 text-gray-200"
                        onClick={() => {
                            router.push("/faqs/support")
                        }}
                        >
                            <BiSupport className="w-4 h-4 mr-2" />
                            Support kontaktieren
                        </Button>
                        <Button className="bg-[#222222] w-full hover:bg-[#242424] text-gray-200"
                        onClick={() => {
                            router.push("/")
                        }}
                        >
                            <IoReturnUpBack className="w-4 h-4 mr-2" />
                            Zurück zur Startseite
                        </Button>
                    </div>
                </div>

            ) : (
                <>
                    <div className="mt-8">
                        <ProgressBar currentStep={currentPage} />
                    </div>
                    <div className="h-[400px] mt-8">
                        {
                            {
                                1: <ChangeMail
                                    setIsDisabled={(e: boolean) => {
                                        setIsDisabledPage1(e);
                                    }}
                                    currentMail={newMail}
                                    setNewMail={setNewMail}
                                />,
                                2: <ChangePassword
                                    setIsDisabled={(e: boolean) => {
                                        setIsDisabledPage2(e);
                                    }}
                                    setCurrentPassword={setNewPassword}
                                    currentPassword={newPassword}
                                />,
                                3: <ConfirmChanges
                                    newMail={newMail}
                                    newPassword={newPassword}
                                    changePage={() => { setCurrentPage(4) }}
                                />,
                                4: <SuccessfullTransfer />
                            }[currentPage]
                        }
                    </div>
                    <div>
                        <StepFooter
                            isDisabledPage1={isDisabledPage1}
                            isDisabledPage2={isDisabledPage2}
                            isDisabledPage3={isDisabledPage3}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default TransferAccountBody;
