import { Address, Images, Inserat, LkwAttribute, PkwAttribute, User } from "@prisma/client"

export type InserateImagesAndAttributes = Inserat & {
    user : User;
    images : Images[];
    pkwAttribute : PkwAttribute;
    lkwAttribute : LkwAttribute;
    address : Address;
}