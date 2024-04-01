'use client'

import { Button } from "@/components/ui/button";

const SaveChanges = () => {
    return ( 
        <div className="w-full ml-auto">
            <Button className="dark:bg-[#0F0F0F] hover:bg-[#1c1c1c] text-gray-200 text-sm">
                Änderungen speichern
            </Button>
        </div>
     );
}
 
export default SaveChanges;