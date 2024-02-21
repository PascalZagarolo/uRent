import { Images, Inserat, PkwAttribute, User } from "@prisma/client"

export type InserateImagesAndAttributes = Inserat & {
    user : User;
    images : Images[];
    pkwAttribute : PkwAttribute;

}