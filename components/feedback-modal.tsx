'use client'

import React, { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { VscFeedback } from "react-icons/vsc";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface FeedbackModalProps {
    content?: string;
    feature?: string;
    show?: boolean;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
    content,
    feature,
    show
}) => {

    const [currentInfo, setCurrentInfo] = useState("")
    const [currentRating, setCurrentRating] = useState<number>(0)

    const giveFeedbackNumber = (current : number) => {
        
        const corNumber = Math.floor(current / 20)

        switch(corNumber) {
            case 0:
                return "Gar nicht zufrieden"
            case 1:
                return "Eher unzufrieden"
            case 2:
                return "Neutral"
            case 3:
                return "Eher zufrieden"
            case 4:
                return "Sehr zufrieden"
            case 5:
                return "Extrem zufrieden"
        }

        
    }

    return (
        <Dialog open={show}>
            <DialogContent className="dark:border-none bg-[#191919]">
                <div>
                    <h3 className="text-md font-semibold flex items-center">
                        <VscFeedback className="w-4 h-4 mr-2" />  Hilf uns uRent zu verbessern
                    </h3>
                    <div className="text-sm flex items-center gap-x-1">
                        <div>Was hältst du von</div> <div className="text-indigo-800 font-bold">
                            {feature}
                        </div>?
                    </div>
                    <div className="text-sm text-gray-200/60 mt-2">
                        {content}
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center gap-x-2 text-sm">
                        <div>Wie zufrieden bist du mit</div> <div className="text-indigo-800 font-bold">
                            {feature}
                        </div>?
                        </div>
                        <div className={cn("mt-2 font-semibold",
                        giveFeedbackNumber(currentRating) === "Neutral" && "text-yellow-400",
                        giveFeedbackNumber(currentRating) === "Sehr zufrieden" && "text-emerald-400",
                        giveFeedbackNumber(currentRating) === "Extrem zufrieden" && "text-green-400",
                        giveFeedbackNumber(currentRating) === "Eher zufrieden" && "text-emerald-200",
                        giveFeedbackNumber(currentRating) === "Eher unzufrieden" && "text-red-400",
                        giveFeedbackNumber(currentRating) === "Gar nicht zufrieden" && "text-red-600"
                        )}>
                            {giveFeedbackNumber(currentRating)}
                        </div>
                        <Slider
                            onValueChange={([value]) => { setCurrentRating(value) }}
                            value={[currentRating]}
                            className="mt-2"
                            step={1}
                        />
                        <div className="flex justify-end text-xs">
                                {currentRating} / 100
                        </div>
                        <div className="mt-4">
                            <Label>
                                Weitere Informationen
                            </Label>
                        <Textarea 
                        className="border-none bg-[#131313] "
                        placeholder="Mir gefällt das Feature (nicht), weil..."
                        />
                        </div>
                        <div className="mt-2 flex justify-end">
                            <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300">
                                Feedback abschicken
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FeedbackModal;