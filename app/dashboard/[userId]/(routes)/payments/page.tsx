import { MdManageSearch } from "react-icons/md";
import BreadCrumpPage from "../../_components/bread-crump-page";
import MenuBar from "../../_components/menu-bar";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
import { BiCreditCardAlt } from "react-icons/bi";

const PaymentsPage = () => {
    return ( 
        <div className="flex justify-center py-8 px-4  ">
            
            <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen w-full">
                    <div>
                        <MenuBar />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="p-4 mt-4 w-full rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center w-full">
                            <div className="w-2/3 flex">
                                <BiCreditCardAlt className="mr-4" /> Zahlungsverkehr
                            </div>
                        </h3>
                            

                        

                    </div>
                    </div>
            </div>
        </div>
     );
}
 
export default PaymentsPage;