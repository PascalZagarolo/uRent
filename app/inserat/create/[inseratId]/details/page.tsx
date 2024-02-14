import { db } from "@/utils/db";
import ReturnBackTo from "./_components/return-back-to";

const DetailsPage = async ({
    params
} : { params : { inseratId : string }}) => {

    const inserat = await db.inserat.findUnique({
        where : {
            id : params.inseratId
        }
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
                 inseratId = {inserat.id}
                 />
                 </div> 
                 <p className="font-medium mr-2">  Details - </p> {renderSwitch(inserat.category)}
                </h3>
            </div>
        </div>
     );
}
 
export default DetailsPage;


