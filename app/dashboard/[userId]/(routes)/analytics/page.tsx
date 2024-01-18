'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { CarFront, TrendingUpIcon, View } from "lucide-react";
import { useParams, useRouter } from "next/navigation";


const Analytics = () => {

    const params = useParams();
    const router = useRouter();

    return (
        <div>
            
            <Dialog open>
                <DialogContent className="w-full"> 
                    <DialogHeader>
                    <DialogTitle>
                        Kommt noch
                    </DialogTitle>
                    <div>
                        ...
                    </div>
                    </DialogHeader>
                    <DialogFooter>
                    <div className="flex justify-center gap-x-4">
                        <Button variant="ghost" className="border-2 border-black" onClick={() => {router.push(`/dashboard/${params.userId}/inserate`)}}>
                            Meine Inserate
                        </Button>
                        <Button variant="ghost" className="border-2 border-black" onClick={() => {router.push(`/dashboard/${params.userId}/bookings`)}}>
                            Meine Buchungen
                        </Button>
                    </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
        </div>
    );
}

export default Analytics;