


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
    uuid,
    date,

} from "drizzle-orm/pg-core"
import type { AdapterAccount } from '@auth/core/adapters'

import { InferModel, relations, sql } from "drizzle-orm"
import { z } from "zod"




export const users = pgTable("user", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
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
    contactId : uuid("contactId")
        .references(() => contactOptions.id, { onDelete: "cascade" }),
    userAddressId : uuid("userAddressId")
                    .references(() => userAddress.id, { onDelete: "cascade" }),
})



export const accounts = pgTable(
    "account",
    {
        userId: uuid("userId")
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
    userId: uuid("userId")
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

export const LicenseEnumRender = z.enum(licenseEnum.enumValues).Enum;

export const categoryEnum = pgEnum("category", [
    "PKW",
    "LKW",
    "TRAILER",
    "TRANSPORT"
])

export const CategoryEnumRender = z.enum(categoryEnum.enumValues).Enum;

export const inserat = pgTable("inserat", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    category: categoryEnum("category"),
    price: decimal("price"),
    isPublished: boolean("isPublished").notNull().default(false),
    multi: boolean("multi").notNull().default(false),
    amount: integer("amount").notNull().default(1),

    emailAddress: text("emailAddress"),
    phoneNumber: text("phoneNumber"),
    
    begin: timestamp("begin", {mode: "date"}),
    end: timestamp("end", {mode: "date"}),
    annual: boolean("annual").notNull().default(false),
    dailyPrice : boolean("dailyPrice").notNull().default(false),

    license: licenseEnum("license"),
    caution: decimal("caution"),
    reqAge: integer("reqAge"),

    views: integer("views").notNull().default(0),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),

    userId: uuid("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    addressId : uuid("addressId")
        .references(() => address.id, { onDelete: "cascade" }),

    pkwId: uuid("pkwId")
        .references(() => pkwAttribute.id, { onDelete: "cascade" }),

    lkwId: uuid("lkwId")
        .references(() => lkwAttribute.id, { onDelete: "cascade" }),

    trailerId: uuid("trailerId")
        .references(() => trailerAttribute.id, { onDelete: "cascade" }),

    transportId : uuid("transportId")
            .references(() => transportAttribute.id, { onDelete: "cascade" }),
    
    
})

export const loadingEnum = pgEnum("loading", [
    "AUFFAHRRAMPE",
    "LADERAMPE",
    "LADEBORDWAND",
    "KRAN",
    "MITNAHMESTAPLER"
])

export const LoadingEnumRender = z.enum(loadingEnum.enumValues).Enum;

export const brandEnum = pgEnum("brand", [
    'Acura' , 'Alfa_Romeo', 'Alpha_Motor_Corporation', 'Arcimoto', 'Arrinera_Automotive', 'Aptera_Motors',
    'Aston_Martin', 'Atlis_Motor_Vehicles', 'Audi', 'BMW', 'Bentley', 'Bollinger_Motors', ' Bugatti ',
    'Buick', 'BYD', 'BYTON', 'Cadillac', 'Canoo', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen',
    'Dacia', 'Daihatsu', 'Dodge', 'Electra_Meccanica', 'Electrameccanica_Vehicles_Corp', 'Elio_Motors',
    'Faraday_Future', 'Ferrari' , 'Fiat', 'Fisker_Inc', 'Ford', 'Genesis', 'Geely', 'GMC', 'Great_Wall',
    'Haval', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Isuzu', 'JAC', 'Jaguar',  'Jeep', 'Karma_Automotive',
    'Kia', 'Kreisel_Electric', 'Land_Rover', ' Lamborghini ', ' Lexus ', ' Lincoln ', ' Local_Motors ', 'Lordstown_Motors',
    'Lotus', 'Lucid_Motors', 'Mahindra', 'Maserati', 'Mazda', 'McLaren', 'Mercedes_Benz', 'MG',
    'Micro_Mobility_Systems ', 'Mini', 'Mitsubishi', 'NIO', 'Nikola_Corporation', 'Nissan', 'Opel',
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

export const extraTypeEnum = pgEnum("extraType", [
    "CONTAINERTRANSPORT",

    "FAHRZEUGTRANSPORT",
    "FLUESSIGKEITSTRANSPORT",

    "KASTENWAGEN",
    "KIPPER",
    "KOFFERAUFBAU",
    "KUEHLAUFBAU",

    "MOEBELTRANSPORT",
    "MULDENKIPPER",

    "PERSONENTRANSPORT",
    "PLANE",
    "PRITSCHE",
])

export const pkwAttribute = pgTable("pkwAttribute", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    brand: brandEnum("brand"),
    model: text("model"),
    seats: integer("seats"),
    doors: integer("doors"),

    freeMiles: integer("freeMiles"),
    extraCost: decimal("extraCost"),
    loading: loadingEnum("loading"),
    extraType : extraTypeEnum("extraType"),

    weightClass: integer("weightClass"),

    transmission: transmissionEnum("transmission"),
    type: carTypeEnum("type"),
    fuel: fuelTypeEnum("fuel"),

    loading_volume : decimal("loading_volume"),

    loading_l : decimal("loading_l"),
    loading_b : decimal("loading_b"),
    loading_h : decimal("loading_h"),
    loading_size : decimal("loading_size"),

    

    initial: timestamp("initial", {mode: "date"}),
    power: integer("power"),

    inseratId: uuid("inseratId" )
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



export const applicationEnum = pgEnum("application", [
    "CONTAINERTRANSPORT",
    
    "DEICHSELANHAENGER",

    "FAHRZEUGTRANSPORT",
    "FLUESSIGKEITSTRANSPORT",

    "KASTENWAGEN",
    "KOFFERAUFBAU",
    "KIPPER",
    "KUEHLWAGEN",

    "MOEBELTRANSPORT",

    "PERSONENTRANSPORT",
    "PLANWAGEN",
    "PRITSCHENWAGEN",

    "SONSTIGES"
])

export const ApplicationEnumRender = z.enum(applicationEnum.enumValues).Enum;

export const lkwAttribute = pgTable("lkwAttribute", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    lkwBrand: lkwBrandEnum("lkwBrand"),
    model: text("model"),
    seats: integer("seats"),

    axis: integer("axis"),

    power: integer("power"),

    loading_volume : decimal("loading_volume"),

    loading_l : decimal("loading_l"),
    loading_b : decimal("loading_b"),
    loading_h : decimal("loading_h"),
    loading_size : decimal("loading_size"),

    weightClass: integer("weightClass"),
    drive: driveEnum("drive"),
    loading: loadingEnum("loading"),
    application: applicationEnum("application"),

    inseratId: uuid("inseratId")
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



export const ExtraTypeEnumRender = z.enum(extraTypeEnum.enumValues).Enum;

export const trailerAttribute = pgTable("trailerAttribute", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    type: trailerEnum("type"),
    coupling: couplingEnum("coupling"),
    loading: loadingEnum("loading"),
    extraType: extraTypeEnum("extraType"),

    loading_volume : decimal("loading_volume"),

    loading_l : decimal("loading_l"),
    loading_b : decimal("loading_b"),
    loading_h : decimal("loading_h"),
    loading_size : decimal("loading_size"),

    axis: integer("axis"),
    weightClass: integer("weight"),

    brake: boolean("brake").notNull().default(false),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

export const transportAttribute = pgTable("transportAttribute", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    loading: loadingEnum("loading"),
    transmission: transmissionEnum("transmission"),
    extraType : extraTypeEnum("extraType"),

    loading_volume : decimal("loading_volume"),

    loading_l : decimal("loading_l"),
    loading_b : decimal("loading_b"),
    loading_h : decimal("loading_h"),
    loading_size : decimal("loading_size"),

    weightClass: integer("weightClass"),

    power: integer("power"),

    seats: integer("seats"),
    doors: integer("doors"),

    fuel: fuelTypeEnum("fuel"),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

export const address = pgTable("address", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    postalCode: integer("postalCode"),
    state: text("state"),
    locationString: text("locationString"),

    longitude: text("longitude"),
    latitude: text("latitude"),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

export const images = pgTable("images", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    position: integer("position"),
    url: text("url").notNull(),
    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

})

export const favourite = pgTable("favourite", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: uuid("userId").
        references(() => users.id, { onDelete: "cascade" }).notNull(),
    inseratId: uuid("inseratId").
        references(() => inserat.id, { onDelete: "cascade" }).notNull(),
} )

export const purchase = pgTable("purchase", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: uuid("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),
    inseratId: uuid("inseratId")
    .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
})

export const stripeCustomer = pgTable("stripeCustomer", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: uuid("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),
    stripeCustomerId: uuid("stripeCustomerId").notNull().unique(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),

})

export const conversation = pgTable("conversation", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    user1Id: uuid("user1").
        references(() => users.id, { onDelete: "cascade" }).notNull(),
    user2Id: uuid("user2").
        references(() => users.id, { onDelete: "cascade" }).notNull(),
})

export const message = pgTable("message", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    content: text("content"),

    image: text("image"),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
    isInterest : boolean("isInterest").notNull().default(false),

    inseratId: uuid("inseratId").
        references(() => inserat.id, { onDelete: "cascade" }),
    senderId: uuid("senderId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),
    conversationId: uuid("conversationId").
        notNull().
        references(() => conversation.id, { onDelete: "cascade" }),

})

export const rezension = pgTable("rezension", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    content: text("content"),
    image: text("image"),
    rating: integer("rating").notNull(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    editedAt: timestamp("editedAt", { mode: "date" }),

    isEdited: boolean("isEdited").notNull().default(false),

    receiverId: uuid("receiverId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),

    senderId: uuid("senderId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),
})

export const contactOptions = pgTable("contactOptions", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    userId: uuid("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),

    email: boolean("email").notNull().default(false),
    emailAddress: text("emailAddress"),

    website: boolean("website").notNull().default(false),
    websiteAddress: text("websiteAddress"),

    phone: boolean("phone").notNull().default(false),
    phoneNumber: text("phoneNumber"),

    userAddressId: uuid("userAddressId").
        references(() => userAddress.id, { onDelete: "cascade" }),
})

export const userAddress = pgTable("userAddress", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    userId: uuid("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }).unique(),

    contactOptionsId: uuid("contactOptionsId").
        references(() => contactOptions.id, { onDelete: "cascade" }).unique(),

    postalCode: integer("postalCode"),

    locationString: text("locationString"),
    longitude: text("longitude"),
    latitude: text("latitude"),
})

export const booking = pgTable("booking", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    userId: uuid("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),

    content: text("content"),

    startDate: timestamp("startDate", {mode: "date"}),
    endDate: timestamp("endDate", {mode: "date"}),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),


})

export const bookingRequest = pgTable("bookingRequest", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    userId: uuid("userId").
        notNull().
        references(() => users.id, { onDelete: "cascade" }),

    content: text("content"),

    startDate: timestamp("startDate", {mode: "date"}),
    endDate: timestamp("endDate", {mode: "date"}),

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

export const accountRelations = relations(accounts, ({ one }) => ({
    users : one(users, {
        fields : [accounts.userId],
        references : [users.id]
    })
}))

export const sessionRelations =  relations(sessions, ({ one }) => ({
    users : one(users, {
        fields : [sessions.userId],
        references : [users.id]
    })
}))
export const userRelations = relations(users, ({ one, many }) => ({

    userAddress : one(userAddress, {
        fields : [users.userAddressId],
        references : [userAddress.id]
    }),

    inserat: many(inserat),

    writtenRezensionen: many(rezension, { relationName : "writtenRezensionen" }),
    receivedRezensionen : many(rezension, { relationName : "receivedRezensionen" }),

    messages : many(message),
    accounts : many(accounts),
    sessions : many(sessions),

    favourites : many(favourite),
    conversation_user1 : many(conversation,{ relationName : "conversation_user1" }),
    conversation_user2 : many(conversation,{ relationName : "conversation_user2" }),
    contactOptions : one(contactOptions, {
        fields : [users.contactId],
        references : [contactOptions.id]
    }),

    bookings : many(booking),
    bookingRequests : many(bookingRequest),
    
}));

export const inseratRelations = relations(inserat, ({ one, many }) => ({
    user: one(users, {
        fields: [inserat.userId],
        references: [users.id]
    }),
    pkwAttribute: one(pkwAttribute, {
        fields: [inserat.pkwId],
        references: [pkwAttribute.id]
    }),
    lkwAttribute: one(lkwAttribute, {
        fields: [inserat.lkwId],
        references: [lkwAttribute.id]
    }),
    trailerAttribute: one(trailerAttribute, {
        fields: [inserat.trailerId],
        references: [trailerAttribute.id]
    }),
    transportAttribute: one(transportAttribute, {
        fields: [inserat.transportId],
        references: [transportAttribute.id]
    }),
    address : one(address, {
        fields : [inserat.addressId],
        references : [address.id]
    }),

    message : many(message),

    images : many(images),

    bookings : many(booking),
    bookingRequests : many(bookingRequest),

    favourites : many(favourite),
}))

export const imageRelations = relations(images, ({ one }) => ({
    inserat : one(inserat, {
        fields : [images.inseratId],
        references: [inserat.id]
    })
}))

export const addressRelations = relations(address, ({ one }) => ({
    inserat : one(inserat, {
        fields : [address.inseratId],
        references : [inserat.id]
    })
}))

export const pkwAttributeRelations = relations(pkwAttribute, ({ one }) => ({
    inserat : one(inserat, {
        fields : [pkwAttribute.inseratId],
        references : [inserat.id]
    })
}))

export const lkwAttributeRelations = relations(lkwAttribute, ({ one }) => ({
    inserat : one(inserat, {
        fields : [lkwAttribute.inseratId],
        references : [inserat.id]
    })
}))

export const trailerAttributeRelations = relations(trailerAttribute, ({ one }) => ({
    inserat : one(inserat, {
        fields : [trailerAttribute.inseratId],
        references : [inserat.id]
    })
}))

export const transportAttributeRelations = relations(transportAttribute, ({ one }) => ({
    inserat : one(inserat, {
        fields : [transportAttribute.inseratId],
        references : [inserat.id]
    })
}))

export const bookingRelations = relations(booking, ({ one }) => ({
    user : one(users, {
        fields : [booking.userId],
        references : [users.id]
    }),
    inserat : one(inserat, {
        fields : [booking.inseratId],
        references : [inserat.id]
    })
}))

export const bookingRequestRelations = relations(bookingRequest, ({ one }) => ({
    user : one(users, {
        fields : [bookingRequest.userId],
        references : [users.id]
    }),
    inserat : one(inserat, {
        fields : [bookingRequest.inseratId],
        references : [inserat.id]
    })
}))

export const favouriteRelation = relations(favourite, ({ one }) => ({
    user : one(users, {
        fields : [favourite.userId],
        references : [users.id]
    }),
    inserat : one(inserat, {
        fields : [favourite.inseratId],
        references : [inserat.id]
    })
}))

export const contactOptionsRelation = relations(contactOptions, ({ one }) => ({
    userAddress : one(userAddress, {
        fields : [contactOptions.userAddressId],
        references: [userAddress.id]
    })
}))

export const messageRelations = relations(message, ({ one }) => ({
    sender : one(users, {
        fields : [message.senderId],
        references : [users.id]
    }),
    conversation : one(conversation, {
        fields : [message.conversationId],
        references : [conversation.id]
    }),
    inserat : one(inserat, {
        fields : [message.inseratId],
        references : [inserat.id]
    })
}))

export const rezensionRelations = relations(rezension, ({ one }) => ({
    sender : one(users , {
        fields : [rezension.senderId],
        references : [users.id],
        relationName : "writtenRezensionen"
    }),
    receiver : one(users, {
        fields : [rezension.receiverId],
        references : [users.id],
        relationName : "receivedRezensionen"
    })
}))

export const conversationRelations = relations(conversation, ({ one, many }) => ({
    user1 : one(users, {
        fields : [conversation.user1Id],
        references : [users.id],
        relationName : "conversation_user1"
    }),
    user2 : one(users, {
        fields : [conversation.user2Id],
        references : [users.id],
        relationName : "conversation_user2"
    }),
    messages : many(message)
}))