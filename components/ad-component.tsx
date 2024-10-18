'use client'

import React, { useEffect } from 'react';
import AdSense from 'react-adsense';
const AdsComponent = (props?: any) => {

    

    try {

        

        return (

            <>
               <AdSense
                    client='ca-pub-9497499351411762'
                    slot='3797720061'
                    style={{ display: 'block' }}
                    format='auto'
                    responsive='true'
    
                /> 
            </>
    
        );
    } catch(e : any) {
        console.log(e);
        return (
            <>
            </>
        )
    }
    
};

export default AdsComponent;