'use client'

import React, { useEffect } from 'react';
import AdSense from 'react-adsense';
const AdsComponent = (props?: any) => {

    useEffect(() => {
        try {
            //@ts-ignore
            (window.adsbygoogle = window?.adsbygoogle || []).push({});
        }

        catch (e) {
            console.log(e)
        }
    }, []);

    try {
        return (

            <>
               <AdSense.Google
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