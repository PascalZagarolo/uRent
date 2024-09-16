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