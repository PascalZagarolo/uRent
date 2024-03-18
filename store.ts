import { create } from "zustand";
import { users } from "./db/schema";





type searchUserByBookingStore = {
    user : typeof users.$inferSelect,
    changeUser: (newUser : typeof users.$inferSelect) => void;
    resetUser: () => void;
}

export const usesearchUserByBookingStore = create<searchUserByBookingStore>((set) => ({
    user : null,
    changeUser : (newUser: typeof users.$inferSelect) => {
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
    changeSearchParams: (newSearchParams : Object, value : string | number) => void;
    deleteSearchParams: (newSearchParams : Object) => void;
    getState: () => Object;
}

export const useSavedSearchParams = create<savedSearchParams>((set) => ({
    searchParams : {},
    changeSearchParams(newSearchParams, value) {

        set((state) => ({
            searchParams: {
                ...state.searchParams,
                [newSearchParams.toString().trim()]: value
            }   
        }));
        
    },
    deleteSearchParams(newSearchParams) {
        set((state) => {
            const updatedSearchParams = { ...state.searchParams };
            delete updatedSearchParams[newSearchParams.toString().trim()];
            return { searchParams: updatedSearchParams };
        });
    },
    getState() {
        return this.searchParams;
    }
}))

type saveCurrentUser = {
    savedCurrentUser : typeof users.$inferSelect,
    changeCurrentUser: (newUser : typeof users.$inferSelect) => void;
    getSavedCurrentUser : () => typeof users.$inferSelect | null;
}

export const useSaveCurrentUser = create<saveCurrentUser>((set) => ({
    savedCurrentUser : null,
    changeCurrentUser : (newUser: typeof users.$inferSelect) => {
        set({ savedCurrentUser : newUser })
    },
    getSavedCurrentUser() {
        return this.savedCurrentUser;
    }
}))



