
import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    boolean,
    decimal,
    pgEnum,
    serial,

} from "drizzle-orm/pg-core"
import type { AdapterAccount } from '@auth/core/adapters'

import { relations } from "drizzle-orm"
import { z } from "zod"




export const users = pgTable("user", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
    confirmedMail: boolean("confirmedMail").notNull().default(false),
    description: text("description"),
    sharesEmail: boolean("sharesEmail").notNull().default(false),
})



export const accounts = pgTable(
    "account",
    {
        userId: integer("userId")
            .references(() => users.id, { onDelete: "cascade" }).notNull(),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: integer("userId")
        .references(() => users.id, { onDelete: "cascade" }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        email: text("email").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
)

export const resetPasswordToken = pgTable(
    "resetPasswordToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        email: text("email").notNull()
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.email, vt.token] })
    })
)

export const licenseEnum = pgEnum(
    "license", [
    "A1",
    "A2",
    "A",
    "AM",

    "B",
    "B17",
    "B96",
    "B196",
    "B197",
    "BE",

    "C1",
    "C1E",
    "C",
    "CE",

    "D1",
    "D1E",
    "DE",

    "L",
    "T",
])

export const categoryEnum = pgEnum("category", [
    "PKW",
    "LKW",
    "TRAILER",
    "TRANSPORT"
])

export const CategoryEnumRender = z.enum(categoryEnum.enumValues).Enum;

export const inserat = pgTable("inserat", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    category: categoryEnum("category"),
    price: decimal("price", { precision: 2 }),
    isPublished: boolean("isPublished").notNull().default(false),
    multi: boolean("multi").notNull().default(false),
    amount: integer("amount").notNull().default(1),

    emailAddress: text("emailAddress"),
    phoneNumber: text("phoneNumber"),

    begin: timestamp("begin", { mode: "date" }),
    end: timestamp("end", { mode: "date" }),
    annual: boolean("annual").notNull().default(false),

    license: licenseEnum("license"),
    caution: decimal("caution", { precision: 2 }),
    reqAge: integer("reqAge"),

    views: integer("views").notNull().default(0),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),

    userId: integer("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    pkwId: integer("pkwId")
        .references(() => pkwAttribute.id, { onDelete: "cascade" }),

    lkwId: integer("lkwId")
        .references(() => lkwAttribute.id, { onDelete: "cascade" }),

    trailerId: integer("lkwId")
        .references(() => trailerAttribute.id, { onDelete: "cascade" }),

    transportId : integer("transportId")
            .references(() => transportAttribute.id, { onDelete: "cascade" }),
    
    
})

export const brandEnum = pgEnum("brand", [
    'Acura' , 'Alfa_Romeo', 'Alpha_Motor_Corporation', 'Arcimoto', 'Arrinera_Automotive', 'Aptera_Motors',
    'Aston_Martin', 'Atlis_Motor_Vehicles', 'Audi', 'BMW', 'Bentley', 'Bollinger_Motors', ' Bugatti ',
    'Buick', 'BYD', 'BYTON', 'Cadillac', 'Canoo', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen',
    'Dacia', 'Daihatsu', 'Dodge', 'Electra_Meccanica', 'Electrameccanica_Vehicles_Corp', 'Elio_Motors',
    'Faraday_Future', 'Ferrari' , 'Fiat', 'Fisker_Inc', 'Ford', 'Genesis', 'Geely', 'GMC', 'Great_Wall',
    'Haval', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Isuzu', 'JAC', 'Jaguar',  'Jeep', 'Karma_Automotive',
    'Kia ', ' Kreisel_Electric ', ' Land_Rover ', ' Lamborghini ', ' Lexus ', ' Lincoln ', ' Local_Motors ', 'Lordstown_Motors',
    'Lotus ', ' Lucid_Motors ', ' Mahindra ', ' Maserati ', ' Mazda ', ' McLaren ', ' Mercedes_Benz ', ' MG ',
    'Micro_Mobility_Systems ', 'Mini', 'Mitsubishi', 'NIO', ' Nikola_Corporation ', ' Nissan ', ' Opel ',
    'Peugeot', 'Polestar',  'Porsche', 'Proton', 'RAM', 'Renault', 'Rimac', 'Rivian', 'Rolls_Royce',
    'Saab', 'SEAT', 'Smart', 'SsangYong', 'Subaru', 'Suzuki', 'Skoda', 'Tesla', 'Terrafugia', 'Toyota',
    'Vanderhall_Motor_Works',
    'Vauxhall', 'VinFast', 'Volkswagen', 'Volvo', 'Workhorse_Group_Inc', 'Wuling', 'Zoyte'
])

export const BrandEnumRender = z.enum(brandEnum.enumValues).Enum;

export const transmissionEnum = pgEnum("transmission", [
    "MANUAL",
    "AUTOMATIC",
    "SEMI_AUTOMATIC"
])

export const TransmissionEnumRender = z.enum(transmissionEnum.enumValues).Enum;

export const carTypeEnum = pgEnum("carType", [
    "KOMBI",
    "COUPE",
    "SUV",
    "LIMOUSINE",
    "VAN",
    "KLEINBUS",
    "CABRIO",
    "KLEIN",
    "SPORT",
    "SUPERSPORT"

])

export const CarTypeEnumRender = z.enum(carTypeEnum.enumValues).Enum;

export const fuelTypeEnum = pgEnum("fuelType", [
    "ELEKTRISCH",
    "DIESEL",
    "BENZIN",
    "HYBRID"
])

export const FuelTypeEnumRender = z.enum(fuelTypeEnum.enumValues).Enum;

export const pkwAttribute = pgTable("pkwAttribute", {
    id: serial("id").primaryKey(),

    brand: brandEnum("brand"),
    model: text("model"),
    seats: integer("seats"),
    doors: integer("doors"),

    freeMiles: integer("freeMiles"),
    extraCost: decimal("extraCost", { precision: 2 }),

    transmission: transmissionEnum("transmission"),
    type: carTypeEnum("type"),
    fuel: fuelTypeEnum("fuel"),

    initial: timestamp("initial", { mode: "date" }),
    power: integer("power"),

    inseratId: integer("inseratId" )
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})



export const lkwBrandEnum = pgEnum("lkwBrand", [
    "Anhui_Jianghuai_Automobile",
    "Ashok_Leyland",
    "Beiben_Trucks",
    "Bedford_Vehicles",
    "Beiqi_Foton",
    "BYD_Auto",
    "Changan_Automobile",
    "Changan_Motors",
    "Changfeng_Group",
    "Changhe",
    "Chery_Automobile",
    "Chevrolet_Trucks",
    "Daihatsu",
    "DAF_Trucks",
    "Dongfeng_Liuzhou_Motor",
    "Dongfeng_Motor_Corporation",
    "Dodge_Trucks",
    "Eicher_Motors",
    "FAW_Group",
    "FAW_Group_Corporation",
    "FAW_Jiefang",
    "FAW_Jilin_Automobile",
    "Fiat_Professional",
    "Ford_Trucks",
    "Freightliner_Trucks",
    "Fuso",
    "GAC_Group",
    "GAZ_Group",
    "Geely_Auto",
    "GMC_Trucks",
    "Great_Wall_Motors",
    "Hafei",
    "Haima_Automobile",
    "Haval",
    "Hawtai",
    "Higer_Bus",
    "Hino_Motors",
    "Hyundai_Trucks",
    "International_Trucks",
    "Isuzu_Motors",
    "Iveco",
    "JAC_Motors",
    "Jiefang",
    "Jinhua_Youngman_Vehicle",
    "Jinbei",
    "Kamaz",
    "Kenworth",
    "King_Long",
    "KrAZ",
    "Land_Rover",
    "Landwind",
    "Leyland_Trucks",
    "Lifan_Group",
    "Mack_Trucks",
    "MAN_Truck_Bus",
    "Maruti_Suzuki",
    "Mazda_Trucks",
    "Maxus",
    "Mercedes_Benz_Trucks",
    "Mitsubishi_Fuso_Truck_and_Bus_Corporation",
    "Navistar_International",
    "Nissan_Trucks",
    "Peterbilt",
    "Piaggio_Commercial_Vehicles",
    "Renault_Trucks",
    "SAF_HOLLAND",
    "SAIC_Motor",
    "Scania",
    "Shaanxi_Automobile_Group",
    "Shacman",
    "Shandong_Tangjun_Ouling_Automobile_Manufacture",
    "Sichuan_Tengzhong",
    "Sinotruk",
    "Sisu_Auto",
    "Tata_Motors",
    "Tatra_Trucks",
    "Toyota_Trucks",
    "UD_Trucks",
    "Ural_Automotive_Plant",
    "Volkswagen_Commercial_Vehicles",
    "Volvo_Trucks",
    "Western_Star_Trucks",
    "Wuling_Motors",
    "Xiamen_Golden_Dragon_Bus",
    "Yutong_Group",
    "Zotye_Auto",
    "Zhejiang_Geely_Holding_Group",
    "ZIL"

])

export const LkwBrandEnumRender = z.enum(lkwBrandEnum.enumValues).Enum;

export const driveEnum = pgEnum("drive", [
    "D4x2",
    "D4x4",

    "D6x2",
    "D6x4",
    "D6x6",

    "D8x4",
    "D8x6",
    "D8x8",
])

export const DriveEnumRender = z.enum(driveEnum.enumValues).Enum;

export const loadingEnum = pgEnum("loading", [
    "AUFFAHRRAMPE",
    "LADERAMPE",
    "KRAN",
    "MITNAHMESTAPLER"
])

export const LoadingEnumRender = z.enum(loadingEnum.enumValues).Enum;

export const applicationEnum = pgEnum("application", [
    "DEICHSELANHAENGER",

    "FAHRZEUGTRANSPORT",
    "FLUESSIGKEITSTRANSPORT",

    "KASTENWAGEN",
    "KOFFERAUFBAU",
    "KUEHLWAGEN",

    "MOEBELTRANSPORT",

    "PERSONENTRANSPORT",
    "PLANWAGEN",
    "PRITSCHENWAGEN"
])

export const ApplicationEnumRender = z.enum(applicationEnum.enumValues).Enum;

export const lkwAttribute = pgTable("lkwAttribute", {
    id: serial("id").primaryKey(),

    lkwBrand: lkwBrandEnum("lkwBrand"),
    model: text("model"),
    seats: integer("seats"),

    weightClass: integer("weightClass"),
    drive: driveEnum("drive"),
    loading: loadingEnum("loading"),
    application: applicationEnum("application"),

    inseratId: integer("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

export const trailerEnum = pgEnum("trailer", [
    "KLEIN",
    "SATTEL",
    "ANHAENGER"
])

export const TrailerEnumRender = z.enum(trailerEnum.enumValues).Enum;

export const couplingEnum = pgEnum("coupling", [
    "KUGELKOPFKUPPLUNG",
    "MAULKUPPLUNG",
])

export const CouplingEnumRender = z.enum(couplingEnum.enumValues).Enum;

export const extraTypeEnum = pgEnum("extraType", [
    "CONTAINERTRANSPORT",

    "FAHRZEUGTRANSPORT",
    "FLUESSIGKEITSTRANSPORT",

    "KASTENWAGEN",
    "KOFFERAUFBAU",
    "KUEHLAUFBAU",

    "MOEBELTRANSPORT",
    "MULDENKIPPER",

    "PERSONENTRANSPORT",
    "PLANE",
    "PRITSCHE",
])

export const ExtraTypeEnumRender = z.enum(extraTypeEnum.enumValues).Enum;

export const trailerAttribute = pgTable("trailerAttribute", {
    id: serial("id").primaryKey(),

    type: trailerEnum("type"),
    coupling: couplingEnum("coupling"),
    loading: loadingEnum("loading"),
    extraType: extraTypeEnum("extraType"),

    axis: integer("axis"),
    weightClass: integer("weight"),

    brake: boolean("brake").notNull().default(false),

    inseratId: integer("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

export const transportAttribute = pgTable("transportAttribute", {
    id: serial("id").primaryKey(),

    loading: loadingEnum("loading"),
    transmission: transmissionEnum("transmission"),

    seats: integer("seats"),
    doors: integer("doors"),

    fuel: fuelTypeEnum("fuel"),

    inseratId: integer("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

export const address = pgTable("address", {
    id: serial("id").primaryKey(),

    postalCode: integer("postalCode"),
    state: text("state"),
    locationString: text("locationString"),

    longitude: text("longitude"),
    latitude: text("latitude"),

    inseratId: integer("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

export const images = pgTable("images", {
    id: serial("id").primaryKey(),
    position: integer("position"),
    url: text("url").notNull(),
    inseratId: integer("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

})

export const favourite = pgTable("favourite", {
    userId: integer("userId").
        references(() => users.id, { onDelete: "cascade" }).notNull(),
    inseratId: integer("inseratId").
        references(() => inserat.id, { onDelete: "cascade" }).notNull(),
}, (favourite) => ({
    compoundKey: primaryKey({ columns: [favourite.userId, favourite.inseratId] }),
}))

export const purchase = pgTable("purchase", {
    id: serial("id").primaryKey(),
    userId: integer("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),
    inseratId: integer("inseratId")
    .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
})

export const stripeCustomer = pgTable("stripeCustomer", {
    id: serial("id").primaryKey(),
    userId: integer("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),
    stripeCustomerId: integer("stripeCustomerId").notNull().unique(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),

})

export const conversation = pgTable("conversation", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    userId: integer("userId").
        
        references(() => users.id, { onDelete: "cascade" }).notNull(),
    userId2: integer("userId2").
        references(() => users.id, { onDelete: "cascade" }).notNull(),
})

export const message = pgTable("message", {
    id: serial("id").primaryKey(),

    content: text("content"),

    image: text("image"),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),

    inseratId: integer("inseratId").
        references(() => inserat.id, { onDelete: "cascade" }).notNull(),
    senderId: integer("senderId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),
    conversationId: integer("conversationId").
        notNull().
        references(() => conversation.id, { onDelete: "cascade" }),

})

export const rezension = pgTable("rezension", {
    id: serial("id").primaryKey(),

    content: text("content"),
    image: text("image"),
    rating: integer("rating").notNull(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    editedAt: timestamp("editedAt", { mode: "date" }),

    isEdited: boolean("isEdited").notNull().default(false),

    receiverId: integer("receiverId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),

    senderId: integer("senderId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),
})

export const contactOptions = pgTable("contactOptions", {
    userId: integer("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }).primaryKey(),

    email: boolean("email").notNull().default(false),
    emailAddress: text("emailAddress"),

    website: boolean("website").notNull().default(false),
    websiteAddress: text("websiteAddress"),

    phone: boolean("phone").notNull().default(false),
    phoneNumber: text("phoneNumber"),

    userAddressId: integer("userAddressId").
        references(() => userAddress.id, { onDelete: "cascade" }),
})

export const userAddress = pgTable("userAddress", {
    id: serial("id").primaryKey(),

    userId: integer("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }).unique(),

    contactOptionsId: integer("contactOptionsId").
        references(() => contactOptions.userId, { onDelete: "cascade" }).unique(),

    postalCode: integer("postalCode"),

    locationString: text("locationString"),
    longitude: text("longitude"),
    latitude: text("latitude"),
})

export const booking = pgTable("booking", {
    id: serial("id").primaryKey(),

    inseratId: integer("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    userId: integer("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),

    content: text("content"),

    startDate: timestamp("begin", { mode: "date" }),
    endDate: timestamp("end", { mode: "date" }),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),


})

export const bookingRequest = pgTable("bookingRequest", {
    id: serial("id").primaryKey(),

    inseratId: integer("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    userId: integer("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),

    content: text("content"),

    startDate: timestamp("begin", { mode: "date" }),
    endDate: timestamp("end", { mode: "date" }),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),

})

/*
export const notificationTypeEnum = pgEnum("notificationType", [
    "MESSAGE",
    "BOOKING",
    "EMAIL",
    "FAVOURITE"
])

export const notifications = pgTable("notification", {
    id: serial("id").primaryKey(),

    userId: integer("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),

    notificationType : text("notificationType").notNull(),

    content: text("content"),

    createdAt : timestamp("createdAt", { mode: "date" }).defaultNow(),
    readAt : timestamp("readAt", { mode: "date" }),

})
*/
//every array of a user => e.g liked posts etc..
export const userRelations = relations(users, ({ one, many }) => ({
    inserat: many(inserat),

    writtenRezensionen: many(rezension, { relationName : "writtenRezensionen" }),
    receivedRezensionen : many(rezension, { relationName : "receivedRezensionen" }),

    messages : many(message),
    accounts : many(accounts),
    sessions : many(sessions),

    favourites : many(favourite),
    conversation : many(conversation),
    contactOptions : many(contactOptions),

    bookings : many(booking),
    bookingRequests : many(bookingRequest),
    
}));

export const inseratRelations = relations(inserat, ({ one, many }) => ({
    owner: one(users, {
        fields: [inserat.userId],
        references: [users.id]
    }),
    pkwAttribute: one(pkwAttribute),
    lkwAttribute: one(lkwAttribute),
    trailerAttribute: one(trailerAttribute),
    transportAttribute: one(transportAttribute),

    message : many(message),

    images : many(images),

    purchased : many(purchase),

    bookings : many(booking),
    bookingRequests : many(bookingRequest),

    favourites : many(favourite),
}))