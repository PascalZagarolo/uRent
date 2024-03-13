import { Address, Images, Inserat, LkwAttribute, PkwAttribute, TrailerAttribute, TransportAttribute, User } from "@prisma/client"

export type InserateImagesAndAttributes = Inserat & {
    user : User;
    images : Images[];
    pkwAttribute : PkwAttribute;
    lkwAttribute : LkwAttribute;
    trailerAttribute : TrailerAttribute;
    transportAttribute : TransportAttribute;
    address : Address;
}