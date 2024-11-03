'use server'

import { stripe } from "@/lib/stripe";



export const getMatchingProduct = async (product_id: string) => {
    try {
        const matchingProduct = await stripe.products.retrieve(
            product_id
        )

        return matchingProduct;
    } catch (e : any) {
        console.log(e);
        return null;
    }
}


export const getMatchingCustomer = async (customer_id : string) => {
    try {
        const matchingCustomer = await stripe.customers.retrieve(
            customer_id
        )
        return matchingCustomer;
    } catch (e : any) {
        console.log(e);
        return null;
    }
}