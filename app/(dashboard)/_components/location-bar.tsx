import { Input } from "@/components/ui/input";

const LocationBar = () => {
    return ( 
        <div className="ml-16">
            <Input
            placeholder="Ich komme aus..."
            className="mt-2"
            />
        </div>
     );
}
 
export default LocationBar;