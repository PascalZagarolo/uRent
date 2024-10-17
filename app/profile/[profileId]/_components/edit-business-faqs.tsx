'use client'

import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { business, businessFaqs } from "@/db/schema";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdFormatListBulletedAdd } from "react-icons/md";

interface EditBusinessFaqsProps {
    thisFaq : typeof businessFaqs.$inferSelect;
    businessId : string;
    onChange : (updatedFaq : typeof businessFaqs.$inferSelect) => void;
}

const EditBusinessFaqs : React.FC<EditBusinessFaqsProps> = ({
    thisFaq,
    businessId,
    onChange
}) => {

    const [currentQuestion, setCurrentQuestion] = useState(thisFaq.question);
    const [currentAnswer, setCurrentAnswer] = useState(thisFaq.answer);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSend = async () => {
        try {
            setIsLoading(true);
            const values = {
                answer : currentAnswer,
                question : currentQuestion,
            }
            const edited = await axios.patch(`/api/businessfaq/${thisFaq?.id}/edit`, values)
            onChange(edited.data);
        } catch(error : any) {
            toast.error("Fehler beim absenden der Daten");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Dialog>

            <DialogTrigger>
                <PencilIcon className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="flex items-center text-md font-semibold">
                            <MdFormatListBulletedAdd className="w-4 h-4 mr-2" />  FAQ bearbeiten
                        </h3>
                    </div>
                    <div className="mt-8">
                        <div>
                        <Label className="text-sm font-medium">
                            Frage
                        </Label>
                        <Input className="dark:bg-[#1c1c1c] border-none mt-2" 
                        onChange={(e) => {setCurrentQuestion(e.target.value)}} value={currentQuestion} maxLength={1000}/>
                        <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={256} currentLength={currentQuestion.length} />
                            </div>
                        </div>
                        <div className="mt-2">
                        <Label className="text-sm font-medium">
                            Antwort
                        </Label>
                        <Textarea className="dark:bg-[#1c1c1c] border-none mt-2 h-[200px] whitespace-break-spaces" 
                        onChange={(e) => {setCurrentAnswer(e.target.value)}} value={currentAnswer} maxLength={1000}/>
                        <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={1000} currentLength={currentAnswer.length} />
                            </div>
                        </div>
                    </div>
                    {currentQuestion.length > 200 && (
                        <span className="text-rose-800 font-semibold text-xs">
                        Frage zu lang
                    </span>
                    )}
                    {currentAnswer.length > 5000 && (
                        <span className="text-rose-800 font-semibold text-xs">
                        Antwort zu lang
                    </span>
                    )}
                    <div className="mt-2 flex justify-end">
                        <DialogTrigger asChild>
                        <Button 
                        className="dark:bg-indigo-800 dark:hover:bg-indigo-900 dark:text-gray-200 dark:hover:text-gray-300"
                        disabled={currentQuestion.length === 0 || currentAnswer.length === 0 || 
                            currentQuestion.length > 200 || currentAnswer.length > 5000 || isLoading}
                            onClick={onSend}
                        >
                            Speichern
                        </Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                        <Button className="" variant="ghost">
                            Abbrechen
                        </Button>
                        </DialogTrigger>
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    );
}

export default EditBusinessFaqs;