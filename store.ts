import { create } from "zustand";


type searchUserStore = {
    username : string
}

export const useSearchUserStore = create<searchUserStore>(() => ({
    username : "",
}));