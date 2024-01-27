'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Car } from "lucide-react";


const AddRezension = () => {
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
                        <p className="text-gray-900/50 text-xs"> teile deine Erfahrung mit diesem Mieter, um anderen Nutzern zu Anhalt zu geben.</p>
                    </DialogHeader>
                   
                        <div>
                            <h3 className="text-lg text-gray-900 font-semibold">
                                Bewertung
                            </h3>
                            <div className="flex gap-x-2">
                                <Car className="h-8 w-8"/>
                                <Car className="h-8 w-8"/>
                                <Car className="h-8 w-8"/>
                                <Car className="h-8 w-8"/>
                                <Car className="h-8 w-8"/>
                            </div>
                        </div>
                    
                    
                        <div>
                            <p className="text-gray-900 font-semibold text-xs">hinterlasse eine Bemerkung</p>
                        </div>
                        
                            <Textarea className="bg-gray-200"/>
                        
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