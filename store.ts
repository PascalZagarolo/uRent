import { create } from "zustand";
import EditName from './app/profile/[profileId]/_components/edit-name-component';
import { User } from "@prisma/client";


type searchUserByBookingStore = {
    user : User,
    changeUser: (newUser : User) => void;
}

export const usesearchUserByBookingStore = create<searchUserByBookingStore>((set) => ({
    user : null,
    changeUser : (newUser: User) => {
        set({ user : newUser })
        console.log(newUser)
    }
}));
