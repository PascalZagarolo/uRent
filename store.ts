import { create } from "zustand";

import { User } from "@prisma/client";
import { result } from "lodash";


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

type resultsPerPage = {
    results : number,
    changeAmount: (newAmount : number) => void;
}

export const useResultsPerPage = create<resultsPerPage>((set) => ({
    results : 12,
    changeAmount : (newAmount: number) => {
        set({ results : newAmount })
    }
}))

type savedSearchParams = {
    searchParams : Object,
    changeSearchParams: (newSearchParams : Object, value : string) => void;
}

export const useSavedSearchParams = create<savedSearchParams>((set) => ({
    searchParams : {},
    changeSearchParams(newSearchParams, value) {

        ;

        set((state) => ({
            searchParams: {
                ...state.searchParams,
                [newSearchParams.toString().trim()]: value
            }   
        }));
        
    },
}))



