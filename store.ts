import { create } from "zustand";

import { User } from "@prisma/client";


type searchUserByBookingStore = {
    user : User,
    changeUser: (newUser : User) => void;
    resetUser: () => void;
}

export const usesearchUserByBookingStore = create<searchUserByBookingStore>((set) => ({
    user : null,
    changeUser : (newUser: User) => {
        set({ user : newUser })
        console.log(newUser)
    }, resetUser : () => {
        set({ user : null })
    }
}));

type getFilterAmount = {
    
    amount : number,
    changeAmount: (newAmount : number) => void;
}

export const useGetFilterAmount = create<getFilterAmount>((set) => ({
    amount : 0,
    changeAmount : (newAmount: number) => {
        set({ amount : newAmount })
    } 
}));


type loadingState = {
    loading : boolean,
    changeLoading: (newLoadingState: boolean) => void
}

export const useLoadingState = create<loadingState>((set) => ({
    loading : false,
    changeLoading : (newLoadingState : boolean) => {
        loading : newLoadingState
    }
})) 

