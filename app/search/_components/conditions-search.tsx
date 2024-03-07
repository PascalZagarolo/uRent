import { Separator } from "@/components/ui/separator";

const ConditionsSearch = () => {
    return ( 
        <div>
            <h3 className="font-semibold text-md flex items-center">
                Mietconditionen
                <Separator 
                className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"
                
                />
            </h3>
            <div className="w-full flex mt-4 space-x-4">
                <div className="w-1/3">
1
                </div>
                <div className="w-1/3">
2
                </div>
                <div className="w-1/3">
3
                </div>
            </div>
        </div>
     );
}
 
export default ConditionsSearch;