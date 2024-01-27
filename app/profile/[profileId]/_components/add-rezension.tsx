'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Car, CarFront } from "lucide-react";
import React from "react";


const AddRezension = () => {

    const [isNumber, setIsNumber] = React.useState<number | null>(null);

    const stars = document.querySelectorAll(".stars i");
    // Loop through the "stars" NodeList
    stars.forEach((star, index1) => {
        // Add an event listener that runs a function when the "click" event is triggered
        star.addEventListener("click", () => {
            // Loop through the "stars" NodeList Again
            stars.forEach((star, index2) => {
                // Add the "active" class to the clicked star and any stars with a lower index
                // and remove the "active" class from any stars with a higher index
                index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
                setIsNumber(index1 + 1);
            });
        });
    });

    return (
        <div className="mt-2 w-full">
            <Dialog>
                <DialogTrigger className="w-full" asChild>
                    <Button className="w-full" variant="ghost">
                        Rezension verfassen
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[800px]">
                    <DialogHeader>
                        <DialogTitle>
                            Rezension verfassen
                        </DialogTitle>
                        <p className="text-gray-900/50 text-xs"> teile deine Erfahrung mit diesem Mieter, um anderen Nutzern Anhalt zu geben.</p>
                    </DialogHeader>

                    <div>
                        <h3 className="text-lg text-gray-900 font-semibold">
                            Bewertung
                        </h3>

                        <div className="stars flex gap-x-2">
                            <i className="fa-solid fa-star"><Car className="w-8 h-8" /></i>
                            <i className="fa-solid fa-star"><Car className="w-8 h-8" /></i>
                            <i className="fa-solid fa-star"><Car className="w-8 h-8" /></i>
                            <i className="fa-solid fa-star"><Car className="w-8 h-8" /></i>
                            <i className="fa-solid fa-star"><Car className="w-8 h-8" /></i>
                        </div>
                        <div>
                            {isNumber === 1 && (
                                <p className="flex justify-center text-lg font-semibold mt-2 text-rose-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"> Schrecklich </p>
                            )}

                            {isNumber === 2 && (
                                <p className="flex justify-center text-lg font-semibold mt-2 text-yellow-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"> Naja </p>
                            )}

                            {isNumber === 3 && (
                                <p className="flex justify-center text-lg font-semibold mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"> Okay </p>
                            )}

                            {isNumber === 4 && (
                                <p className="flex justify-center text-lg font-semibold mt-2 text-green-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"> Gut </p>
                            )}

                            {isNumber === 5 && (
                                <p className="flex justify-center text-lg font-semibold mt-2 text-orange-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"> Fantastisch </p>
                            )}

                            


                        </div>
                    </div>


                    <div>
                        <p className="text-gray-900 font-semibold text-xs">hinterlasse eine Bemerkung</p>
                    </div>

                    <Textarea className="bg-gray-200" />

                    <div className="mt-2 ml-auto flex w-full">
                        <Button className="bg-gray-800 border-gray-200 border drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                            Absenden
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddRezension;