import { Images, Inserat } from "@prisma/client"

export type InserateAndImages = Inserat & {
    images : Images[]
}