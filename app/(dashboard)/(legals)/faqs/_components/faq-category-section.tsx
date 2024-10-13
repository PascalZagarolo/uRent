'use client'

import { useSearchParams } from "next/navigation";

const FaqCategorySection = () => {

    const currentCategory = useSearchParams().get('category');

    return ( 
        <div>
            <h2>{currentCategory}</h2>	
        </div>
     );
}
 
export default FaqCategorySection;