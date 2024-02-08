import { create } from "zustand";
import EditName from './app/profile/[profileId]/_components/edit-name-component';


type searchUserStore = {
    username : string,
    changeName: (newName : string) => void;
}

export const useSearchUserStore = create<searchUserStore>((set) => ({
    username : "",
    changeName : (newName: string) => {
        set({ username : newName })
    }
}));

export const getUserByName = async (username : string) => {
    await getUserByName(username)
}