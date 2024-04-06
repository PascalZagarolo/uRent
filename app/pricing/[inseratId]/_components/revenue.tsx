import { inserat } from "@/db/schema";

interface RevenuePreviewProps {
    thisInserat : typeof inserat.$inferSelect;
}

const RevenuePreview : React.FC<RevenuePreviewProps> = ({
    thisInserat
}) => {
    
    

    return ( 
        <div>
            <div>
                <h1 className="flex text-sm dark:text-gray-200/70 ">
                    fange noch heute an und verdiene bis zu 
                    <div>
                        
                    </div>
                </h1>
            </div>
        </div>
     );
}
 
export default RevenuePreview;