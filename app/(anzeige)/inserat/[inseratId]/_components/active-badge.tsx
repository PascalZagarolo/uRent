import { Badge } from "@/components/ui/badge";

const Active = () => {
    return ( 
        <div className="">
            <Badge className="bg-emerald-500 border border-black hidden sm:block">
                Aktiv
            </Badge>
            <Badge className="bg-emerald-500 border border-black sm:hidden p-2"/>
                
            
        </div>
     );
}
 
export default Active;