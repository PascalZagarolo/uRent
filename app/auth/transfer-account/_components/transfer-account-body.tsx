'use client'

import { useEffect, useState } from "react";
import ProgressBar from "./progress-bar";
import StepFooter from "./step-footer";
import ChangeMail from "./change-mail";
import ChangePassword from "./change-password";
import ConfirmChanges from "./confirm-changes";

const TransferAccountBody = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const [newMail, setNewMail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // Separate useState hooks for each page's disabled state
    const [isDisabledPage1, setIsDisabledPage1] = useState(false);
    const [isDisabledPage2, setIsDisabledPage2] = useState(false);
    const [isDisabledPage3, setIsDisabledPage3] = useState(false);

    

    return (
        <div>
            <div>
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
                        currentPassword = {newPassword}
                        />,
                        3: <ConfirmChanges 
                        newMail={newMail}
                        
                        />,
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
        </div>
    );
}

export default TransferAccountBody;
