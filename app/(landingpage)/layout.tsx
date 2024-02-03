import React from "react";
import LandingPageHeader from "./_components/landing-page-header";

const LandingPageLayout= ({
    children
} : { children : React.ReactNode}) => {
    return ( 
        <div>
            <LandingPageHeader/>
            <div>
            {children}
            </div>
        </div>
     );
}
 
export default LandingPageLayout;