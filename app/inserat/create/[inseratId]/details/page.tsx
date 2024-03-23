
import db from "@/db/drizzle";
import ReturnBackTo from "./_components/return-back-to";
import { eq } from "drizzle-orm";
import { inserat } from "@/db/schema";

const DetailsPage = async ({
    params
} : { params : { inseratId : string }}) => {

    const thisInserat = await db.query.inserat.findFirst({
        where : eq(inserat.id, params.inseratId)
    })

    const renderSwitch = (category : string) => {
        switch(category) {
            case 'PKW' :
                return "PKW";
            case 'LKW' :
                return "LKW";
            case 'LAND':
                return "Landwirtschaft";
            case 'BAU':
                return "Baumaschinen";
            case 'TRAILOR':
                return "Anhänger";
            case 'CARAVAN':
                return 'Wohnmobile';
            case 'TRANSPORT':
                return 'Transporter';
        }
    }

    return ( 
        <div>
            <div>
                <h3 className="text-2xl p-4 flex font-bold">
                 <div className="mr-4">
                 <ReturnBackTo
                 inseratId = {thisInserat.id}
                 />
                 </div> 
                 <p className="font-medium mr-2">  Details - </p> {renderSwitch(thisInserat.category)}
                </h3>
            </div>
        </div>
     );
}
 
export default DetailsPage;


