import { create } from "zustand";
import { userTable } from "./db/schema";





type searchUserByBookingStore = {
    user : typeof userTable.$inferSelect,
    changeUser: (newUser : typeof userTable.$inferSelect) => void;
    resetUser: () => void;
}

export const usesearchUserByBookingStore = create<searchUserByBookingStore>((set) => ({
    user : null,
    changeUser : (newUser: typeof userTable.$inferSelect) => {
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
    results : 10,
    changeAmount : (newAmount: number) => {
        set({ results : newAmount })
    }
}))

type savedSearchParams = {
    searchParams : Object,
    changeSearchParams: (newSearchParams : Object, value : string | number) => void;
    deleteSearchParams: (newSearchParams : Object) => void;
    getState: () => Object;
    removeAll: () => void;
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
            //@ts-ignore
            delete updatedSearchParams[newSearchParams.toString().trim()];
            return { searchParams: updatedSearchParams };
        });
    },
    getState() {
        return this.searchParams;
    },
    removeAll() {
        set({ searchParams : {} })
    }
}))

type saveCurrentUser = {
    savedCurrentUser : typeof userTable.$inferSelect,
    changeCurrentUser: (newUser : typeof userTable.$inferSelect) => void;
    getSavedCurrentUser : () => typeof userTable.$inferSelect | null;
}

export const useSaveCurrentUser = create<saveCurrentUser>((set) => ({
    savedCurrentUser : null,
    changeCurrentUser : (newUser: typeof userTable.$inferSelect) => {
        set({ savedCurrentUser : newUser })
    },
    getSavedCurrentUser() {
        return this.savedCurrentUser;
    }
}))

type unsavedChanges = {
    currentChanges : Object,
    changeCurrent: (newChange : Object, value : string | number) => void;
    deleteCurrent : (newChange : Object) => void;
    getState: () => Object;
}

export const useUnsavedChanges = create<unsavedChanges>((set) => ({
    currentChanges : {},
    changeCurrent(newChange, value) {
        set((state) => ({
            currentChanges: {
                ...state.currentChanges,
                [newChange.toString().trim()]: value
            }   
        }));
        
    },
    deleteCurrent(newChange) {
        set((state) => {
            const updatedNewChange = { ...state.currentChanges };
            //@ts-ignore
            delete updatedNewChange[newChange.toString().trim()];
            return { currentChanges: updatedNewChange };
        });
    },
    getState() {
        return this.currentChanges;
    }
}))

type unsavedChangesSettings = {
    currentChanges : Object,
    changeCurrent: (newChange : Object, value : string | number) => void;
    deleteCurrent : (newChange : Object) => void;
    getState: () => Object;
}

export const useUnsavedChangesSettings = create<unsavedChanges>((set) => ({
    currentChanges : {},
    changeCurrent(newChange, value) {
        set((state) => ({
            currentChanges: {
                ...state.currentChanges,
                [newChange.toString().trim()]: value
            }   
        }));
        
    },
    deleteCurrent(newChange) {
        set((state) => {
            const updatedNewChange = { ...state.currentChanges };
            //@ts-ignore
            delete updatedNewChange[newChange.toString().trim()];
            return { currentChanges: updatedNewChange };
        });
    },
    getState() {
        return this.currentChanges;
    }
}))

type deleteParams = {
    removeAttributes : boolean,
    changeAttributes: (action : boolean) => void;
}

export const useDeleteParams = create<deleteParams>((set) => ({
    removeAttributes : false,
    changeAttributes : (action : boolean) => {
        set({ removeAttributes : action })
    }
}))