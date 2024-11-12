





import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    boolean,
    decimal,
    pgEnum,
    uuid,
 

} from "drizzle-orm/pg-core"
import type { AdapterAccount } from '@auth/core/adapters'

import {  relations, sql } from "drizzle-orm"
import { string, z } from "zod"
import { profile } from "console"






//@ts-ignore
export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").unique(),
    displayname : text("displayname"),
    vorname : text("vorname"),
    nachname : text("lastname"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
    confirmedMail: boolean("confirmedMail").notNull().default(false),
    description: text("description"),

    sharesEmail: boolean("sharesEmail").notNull().default(false),
    sharesRealName : boolean("sharesRealName").notNull().default(false),
    sharesPhoneNumber : boolean("sharesPhoneNumber").notNull().default(false),
    
    newsletter : boolean("newsletter").default(false),

    usesTwoFactor : boolean("usesTwoFactor").notNull().default(false),
    isBusiness : boolean("isBusiness").default(false),
    enableSocialLogin : boolean("enableSocialLogin").default(true),
    isAdmin : boolean("isAdmin").default(false),
    
    
    businessId : uuid("businessId")
            .references(() => business.id, { onDelete : "set null"}),
    contactId : uuid("contactId")
        .references(() => contactOptions.id, { onDelete : "set null"}),
    subscriptionId : uuid("subscriptionId")
        .references(() => userSubscription.id, { onDelete : "set null"}),
    userAddressId : uuid("userAddressId")
                    .references(() => userAddress.id , { onDelete : "set null"}),
    paymentMethodsId : uuid("paymentMethodsId")
                        .references(() => paymentMethods.id, { onDelete : "set null"}),
    twoFactorConfirmationId : uuid("twoFactorConfirmationId")
                                .references(() => twoFactorConfirmation.id, { onDelete: "set null" }),
})

export const oauthAccountTable = pgTable("oauth_account", {
    id : text("id").primaryKey(),
    userId : text("userId")
            .references(() => userTable.id, { onDelete: "cascade" }),
    provider : text("provider").notNull(),
    providerUserId : text("provider_user_id").notNull(),
    accessToken : text("accessToken"),
    refreshToken : text("refreshToken"),
    expiresAt : timestamp("expiresAt", { 
        withTimezone : true, 
        mode: "date" }).notNull(),
})




export const business : any = pgTable("business", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: text("userId")
        .references(() => userTable.id, { onDelete: "cascade" }),
    description: text("description"),
    openingHours : text("openingHours"),
    telephone_number : text("telephone_number"),
    email : text("email"),
    website : text("website"),
    impressum : text("impressum"),
    fax : text("fax"),
})

export const businessAddress = pgTable("businessAddress", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    businessId : uuid("businessId")
        .references(() => business.id, { onDelete: "cascade" }),
    postalCode: integer("postalCode"),
    image : text("image"),
    state: text("state"),
    city : text("city"),
    street : text("street"),
    title : text("title"),
    isPrimary : boolean("isPrimary").notNull().default(false),
})

export const openingTimes = pgTable("openingTimes" , {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    businessId : uuid("businessId")
        .references(() => business.id, { onDelete: "cascade" }),
    
    monday : text("monday"),
    tuesday : text("tuesday"),
    wednesday : text("wednesday"),
    thursday : text("thursday"),
    friday : text("friday"),
    saturday : text("saturday"),
})

export const businessImages = pgTable("businessImages", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    position: integer("position"),
    url: text("url"),
    businessId: uuid("businessId")
        .references(() => business.id, { onDelete: "cascade" }),

})

export const blog = pgTable("blog", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    createdAt : timestamp("createdAt", { mode: "date" }).defaultNow(),
    category : text("category"),
    tags : text("tags"),
    title : text("title"),
    content : text("content"),
    isPublic : boolean("isPublic").notNull().default(false),
    imageUrl : text("imageUrl"),
})

export const twoFactorConfirmation = pgTable("twoFactorConfirmation", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: text("userId")
        .references(() => userTable.id, { onDelete: "cascade" }),
})


export const faqs = pgTable("faqs", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    lastUpdated : timestamp("lastUpdated", { mode: "date" }).defaultNow(),
    category : text("category"),
    question : text("question"),
    answer : text("answer"),
    position : integer("position"),
    isPublic : boolean("isPublic").notNull().default(false),
})



export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
        
        
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	})
});


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
    
    "B",
    
    "BE",

    "C1",
    "C",
    "CE",
    "CE1",

])

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .references(() => userTable.id, { onDelete: "cascade" }).notNull(),
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

export const accountRelations = relations(accounts, ({ one }) => ({
    users : one(userTable, {
        fields : [accounts.userId],
        references : [userTable.id]
    })
}))



export const LicenseEnumRender = z.enum(licenseEnum.enumValues).Enum;

export const categoryEnum = pgEnum("category", [
    "PKW",
    "LKW",
    "TRAILER",
    "TRANSPORT"
])

export const CategoryEnumRender = z.enum(categoryEnum.enumValues).Enum;

export const inseratPriceType = pgEnum("priceType", [
    "FREE",
    "BASIS",
    "PREMIUM",
    "ENTERPRISE"
])

//@ts-ignore
export const inserat = pgTable("inserat", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    category: categoryEnum("category"),
    price: decimal("price"),
    isPublished: boolean("isPublished").notNull().default(false),
    multi: boolean("multi").notNull().default(false),
    amount: integer("amount").notNull().default(1),
    isHighlighted: boolean("isHighlighted").notNull().default(false),

    emailAddress: text("emailAddress"),
    phoneNumber: text("phoneNumber"),

    priceType : inseratPriceType("priceType").default("FREE"),
    
    begin: timestamp("begin", {mode: "date"}),
    end: timestamp("end", {mode: "date"}),
    annual: boolean("annual").notNull().default(false),
    dailyPrice : boolean("dailyPrice").notNull().default(false),

    license: licenseEnum("license"),
    caution: decimal("caution"),
    reqAge: integer("reqAge"),
    minTime : integer("minTime"),

    priceHour : decimal("priceHour"),
    priceWeekend : decimal("priceWeekend"),
    priceKilometer : decimal("priceKilometer"),

    color : text("color"),


    firstRelease : timestamp("firstRelease", {mode: "date"}),

    views: integer("views").notNull().default(0),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),

    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade" }),

  

    addressId : uuid("addressId")
        .references(() => address.id),

    pkwId: uuid("pkwId")
        .references(() => pkwAttribute.id),

    lkwId: uuid("lkwId")
        .references(() => lkwAttribute.id),

    trailerId: uuid("trailerId")
        .references(() => trailerAttribute.id),

    transportId : uuid("transportId")
            .references(() => transportAttribute.id),
    
    
})

export const conversationFolder = pgTable("conversationFolder", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    title : text("title"),
    color : text("color"),
    icon : text("icon"),
    userId : text("userId")
                .references(() => userTable.id, { onDelete: "cascade" }),
    position : integer("position"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),

})

export const priceprofile = pgTable("priceprofile", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    title : text("title"),
    description : text("description"),
    price : decimal("price"),
    freeMiles : integer("freeMiles"),
    extraCost : decimal("extraCost"),
    position : integer("position"),

    inseratId : uuid("inseratId")
                .references(() => inserat.id, { onDelete: "cascade" }),

})

export const paymentMethods = pgTable("paymentMethods", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId : text("userId")
            .references(() => userTable.id, { onDelete: "cascade" }),
    creditCard : boolean("creditCard").notNull().default(false),
    paypal : boolean("paypal").notNull().default(false),
    barGeld : boolean("barGeld").notNull().default(false),
})

export const userSubscription = pgTable("userSubscription" , {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    
    userId : text("userId")
        .references(() => userTable.id, { onDelete: "cascade" }),

    subscriptionType : inseratPriceType("subscriptionType"),
    amount : integer("amount").notNull().default(0),

    stripe_customer_id : text("stripe_customer_id"),
    stripe_subscription_id : text("stripe_subscription_id"),
    stripe_product_id : text("stripe_product_id"),
    stripe_price_id : text("stripe_price_id"),
    stripe_current_period_end : timestamp("stripe_current_period_end", { mode: "date" }),

    isGift : boolean("isGift").notNull().default(false),
})



export const loadingEnum = pgEnum("loading", [
    "AUFFAHRRAMPE",
    "KIPPER",
    "KRAN",
    "LADERAMPE",
    "LADEBORDWAND",
    "MITNAHMESTAPLER"
])

export const LoadingEnumRender = z.enum(loadingEnum.enumValues).Enum;

export const brandEnum = pgEnum("brand", [
    "Abarth", "Acura", "Audi", "Alfa Romeo", "Alpina", "Alpine", 
    "Aston Martin", "Bentley", "BMW", "Bugatti", "Buick", "BYD", "Cadillac", "Chevrolet", 
    "Chrysler", "Citroen", "Corvette", "Cupra", "Dacia", "Daihatsu", "Dodge", "Ferrari", "Fiat", "Ford", 
    "GMC", "Honda", "Hummer", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "KTM", 
    "Lada", "Lancia", "Land Rover", "Lamborghini", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "McLaren", 
    "Mercedes_Benz", "MG", "Mini", "Mitsubishi", "NIO", "Nissan", "Opel", "Pagani", "Peugeot", "Plymouth", "Polestar", 
    "Pontiac", "Porsche", "RAM", "Renault", "Rolls Royce", "Rover", "Saab", "Seat", "Skoda", 
    "Smart", "Subaru", "Suzuki", "Tesla", "Volkswagen", "Volvo", "Sonstige"
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
    "PICKUP",
    "SUV",
    "LIMOUSINE",
    "VAN",
    "KASTENWAGEN",
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
    "KIPPERAUFBAU",
    
    "KOFFERAUFBAU",
    "KUEHLAUFBAU",

    "MOEBELTRANSPORT",
    "MULDENKIPPER",

    "PERSONENTRANSPORT",
    "PLANE",
    "PRITSCHE",
    "VERANSTALTUNG",
])

export const contactProfileTypeEnum = pgEnum("contactProfileTypeEnum", [
    "EMAIL",
    "PHONE",
 ])

 export const ContactProfileTypeEnumRender = z.enum(contactProfileTypeEnum.enumValues).Enum;

export const userContactprofiles = pgTable("userContactprofiles", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    title : text("title"),
    content : text("content"),
    profileType : contactProfileTypeEnum("profileType"),
    userId : text("userId")
                .references(() => userTable.id, { onDelete: "cascade" }),
})

export const userContactprofilesRelations = relations(userContactprofiles, ({ one }) => ({
    users : one(userTable, {
        fields : [userContactprofiles.userId],
        references : [userTable.id]
    })
}))


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

    ahk : boolean("ahk").notNull().default(false),

    initial: timestamp("initial", {mode: "date"}),
    power: integer("power"),

    inseratId: uuid("inseratId" )
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})



export const lkwBrandEnum = pgEnum("lkwBrand", [
    "DAF", "Demag", "Ford", "Iveco", "Liebherr", 
    "Magirus Deutz", "MAN", "Meiller", "Mercedes_Benz", 
    "Mitsubishi", "Nissan", "Opel", "Palfinger", "Peugeot", 
    "Renault", "Scania", "Skoda", "Steyr", "Tatra", "Toyota", 
    "Volkswagen", "Volvo", "Sonstige"
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
    "ABSETZKIPPERAUFBAU",
    "BAUMATERIALTRANSPORT",
    "CONTAINERTRANSPORT",
    
    "DEICHSELANHAENGER",

    "FAHRZEUGTRANSPORT",
    "FLUESSIGKEITSTRANSPORT",

    "KASTENWAGEN",
    "KOFFERAUFBAU",
    "KIPPER",
    "KIPPERAUFBAU",
    "KRANWAGEN",
    "KUEHLWAGEN",

    "MOEBELTRANSPORT",

    "PERSONENTRANSPORT",
    "PLANWAGEN",
    "PRITSCHENWAGEN",
    "SATTELSCHLEPPER",

    "VERANSTALTUNG",

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
    fuel: fuelTypeEnum("fuel"),
    
    loading_volume : decimal("loading_volume"),

    transmission: transmissionEnum("transmission"),
    initial: timestamp("initial", {mode: "date"}),
    loading_l : decimal("loading_l"),
    loading_b : decimal("loading_b"),
    loading_h : decimal("loading_h"),
    loading_size : decimal("loading_size"),

    weightClass: integer("weightClass"),
    drive: driveEnum("drive"),
    loading: loadingEnum("loading"),
    application: applicationEnum("application"),
    ahk : boolean("ahk").notNull().default(false),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

export const trailerEnum = pgEnum("trailer", [
    "KLEIN",
    "SATTEL",
    "ANHAENGER",
    "VERANSTALTUNG",
])

export const TrailerEnumRender = z.enum(trailerEnum.enumValues).Enum;

export const couplingEnum = pgEnum("coupling", [
    "KUGELKOPFKUPPLUNG",
    "MAULKUPPLUNG",
    "SATTELKUPPLUNG"
])

export const CouplingEnumRender = z.enum(couplingEnum.enumValues).Enum;



export const ExtraTypeEnumRender = z.enum(extraTypeEnum.enumValues).Enum;

export const trailerAttribute = pgTable("trailerAttribute", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    type: trailerEnum("type"),
    coupling: couplingEnum("coupling"),
    loading: loadingEnum("loading"),
    extraType: extraTypeEnum("extraType"),

    initial: timestamp("initial", {mode: "date"}),

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

export const transportBrandEnum = pgEnum("transportBrand", [
    "Citroen", "Dacia", "DAF", "Fiat", "Ford", "Hyundai", "Iveco", "Man", "Mazda", 
    "Maxus", "Mercedes_Benz", "Mitsubishi", "Multicar", "Nissan", "Opel", 
    "Peugeot", "Renault", "SEAT", "Skoda", "Suzuki", "Toyota", "Volkswagen",
     "Volvo", "Sonstige"
])

export const TransportBrandEnumRender = z.enum(transportBrandEnum.enumValues).Enum;



export const transportAttribute = pgTable("transportAttribute", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    loading: loadingEnum("loading"),
    transmission: transmissionEnum("transmission"),
    extraType : extraTypeEnum("extraType"),

    loading_volume : decimal("loading_volume"),

    initial: timestamp("initial", {mode: "date"}),

    loading_l : decimal("loading_l"),
    loading_b : decimal("loading_b"),
    loading_h : decimal("loading_h"),
    loading_size : decimal("loading_size"),
    ahk : boolean("ahk").notNull().default(false),
    

    transportBrand : transportBrandEnum("transportBrand"),

    weightClass: integer("weightClass"),

    power: integer("power"),

    seats: integer("seats"),
    doors: integer("doors"),

    fuel: fuelTypeEnum("fuel"),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),
})

//@ts-ignore
export const address = pgTable("address", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    postalCode: text("postalCode"),
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
        .references(() => inserat.id, { onDelete: "cascade" }),

})



export const favourite = pgTable("favourite", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: text("userId").
        references(() => userTable.id, { onDelete: "cascade" }).notNull(),
    inseratId: uuid("inseratId").
        references(() => inserat.id, { onDelete: "cascade" }).notNull(),
} )

export const purchase = pgTable("purchase", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: text("userId").
        notNull().
        references(() => userTable.id, { onDelete: "cascade" }),
    inseratId: uuid("inseratId")
    .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
})

export const stripeCustomer = pgTable("stripeCustomer", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: text("userId").
        notNull().
        references(() => userTable.id, { onDelete: "cascade" }),
    stripeCustomerId: uuid("stripeCustomerId").notNull().unique(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),

})

export const giftCode = pgTable("giftCode", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    name : text("name"),
    plan : inseratPriceType("plan"),
    inseratAmount : integer("inseratAmount"),
    months : integer("months"),
    userAmount : integer("userAmount"),
    availableAmount : integer("availableAmount"),
    expirationDate : timestamp("expirationDate", { mode: "date" }),
    code : text("code"),
    
})

export const conversation = pgTable("conversation", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    blocked : boolean("blocked").notNull().default(false),
    conversationFolder : text("conversationFolder"),
    inseratId : uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }),
    lastMessageId: uuid("lastMessageId")
        .references(() => message.id, { onDelete: "set null" }),
    user1Id: text("user1").
        references(() => userTable.id, { onDelete: "cascade" }).notNull(),
    user2Id: text("user2").
        references(() => userTable.id, { onDelete: "cascade" }).notNull(),

})

export const message = pgTable("message", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    content: text("content"),

    image: text("image"),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
    isInterest : boolean("isInterest").notNull().default(false),

    seen : boolean("seen").notNull().default(false),

    inseratId: uuid("inseratId").
        references(() => inserat.id, { onDelete: "cascade" }),
    senderId: text("senderId").
        notNull().
        references(() => userTable.id, { onDelete: "cascade" }),
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

    receiverId: text("receiverId").
        notNull().
        references(() => userTable.id, { onDelete: "cascade" }),

    senderId: text("senderId").
        notNull().
        references(() => userTable.id, { onDelete: "cascade" }),
})

//@ts-ignore
export const contactOptions = pgTable("contactOptions", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    userId: text("userId").
        notNull().
        references(() => userTable.id, { onDelete: "cascade" }),

    email: boolean("email").notNull().default(false),
    emailAddress: text("emailAddress"),

    website: boolean("website").notNull().default(false),
    websiteAddress: text("websiteAddress"),

    phone: boolean("phone").notNull().default(false),
    phoneNumber: text("phoneNumber"),

    userAddressId: uuid("userAddressId").
        references(() => userAddress.id, { onDelete : "set null"}),
})

//@ts-ignore
export const userAddress = pgTable("userAddress", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    userId: text("userId").
        notNull().
        references(() => userTable.id, {onDelete : "cascade"}).unique(),

    contactOptionsId: uuid("contactOptionsId").
        references(() => contactOptions.id).unique(),

    postalCode: integer("postalCode"),
    city : text("city"),
    street : text("street"),
    houseNumber : integer("houseNumber"),
    locationString: text("locationString"),
    longitude: text("longitude"),
    latitude: text("latitude"),
})

export const booking = pgTable("booking", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    userId: text("userId").
        references(() => userTable.id, { onDelete: "cascade" }),
    
    vehicleId : uuid("vehicleId")
        .references(() => vehicle.id, { onDelete : "cascade"}),

    name : text("name"),
    buchungsnummer : text("buchungsnummer"),
    content: text("content"),

    startDate: timestamp("startDate", {mode: "date"}),
    endDate: timestamp("endDate", {mode: "date"}),

    startPeriod : text("startPeriod"),
    endPeriod : text("endPeriod"),

    isAvailability : boolean("isAvailability").default(false),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),


})

export const bookingRequest = pgTable("bookingRequest", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    userId: text("userId").
        notNull().
        references(() => userTable.id, { onDelete: "cascade" }),

    content: text("content"),

    startDate: timestamp("startDate", {mode: "date"}),
    endDate: timestamp("endDate", {mode: "date"}),

    startPeriod : text("startPeriod"),
    endPeriod : text("endPeriod"),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),

})

export const vehicle = pgTable("vehicle", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    inseratId: uuid("inseratId")
        .references(() => inserat.id, { onDelete: "cascade" }).notNull(),

    title : text("title"),
    registration: text("registration"),
    internalId : text("internalId"),
    image : text("image")
})


export const notificationTypeEnum = pgEnum("notificationType", [
    
    "BOOKING",
    "BOOKING_REQUEST",
    "EMAIL",
    "FAVOURITE",
    "MESSAGE",
    "REPORT_ACTION",
    "SUBSCRIPTION",
    "SUBSCRIPTION_ALMOST_EXPIRED",
    "SUBSCRIPTION_REDEEMED",
    "SUBSCRIPTION_RENEWAL",
    "SUBSCRIPTION_UPGRADED",
    "WELCOME",

    "OFFER",
    "NEWS"
])

export const changeEmailToken = pgTable("changeEmailToken", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    newEmail : text("newEmail"),
    userId : text("userId")
                .notNull()
                .references(() => userTable.id, { onDelete: "cascade" }),
    token : text("token"),
    expires : timestamp("expires", { mode: "date" }).notNull(),
})

export const deleteUserToken = pgTable("deleteUserToken", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId : text("userId")
                .notNull()
                .references(() => userTable.id, { onDelete: "cascade" }),
    token : text("token"),
    expires : timestamp("expires", { mode: "date" }).notNull(),
})

export const notification = pgTable("notification", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    notificationType: notificationTypeEnum("notificationType"),
    //save Inserattitle, username that sent the message etc...
    content : text("content"),

    userId : text("userId")
                .references(() => userTable.id, { onDelete: "cascade" }),

    conversationId : text("conversationId"),
    inseratId : text("inseratId"),

    seen : boolean("seen").default(false),


    createdAt : timestamp("createdAt", { mode: "date" }).defaultNow(),
})

export const notificationUnauthorized = pgTable("notificationUnauthorized", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    notificationType: notificationTypeEnum("notificationType"),
    //save Inserattitle, username that sent the message etc...
    title : text("title"),
    content : text("content"),
    link : text("link"),
    imageUrl : text("imageUrl"),

    showAuthorizedUsers : boolean("showAuthorizedUsers").default(false),
    isPublic : boolean("isPublic").default(false),

    createdAt : timestamp("createdAt", { mode: "date" }).defaultNow(),
})

export const savedSearch = pgTable("savedSearch", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    link : text("link"),
    title : text("title"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    receivesUpdates : boolean("receivesUpdates").notNull().default(false),
    receiveAvailability : boolean("receiveAvailability").notNull().default(false),
    receivedAvailability : boolean("receivedAvailability").notNull().default(false),
    userId : text("userId")
                .references(() => userTable.id, { onDelete: "cascade" }),
})

export const businessFaqs = pgTable("businessFaqs", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    question : text("question"),
    answer : text("answer"),
    position: integer("position"),
    businessId : uuid("businessId")
                .references(() => business.id, { onDelete: "cascade" }),
})

export const report = pgTable("report", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),

    userId : text("userId")
                .references(() => userTable.id, { onDelete: "cascade" }),

    inseratId : uuid("inseratId")
                .references(() => inserat.id, { onDelete: "cascade" }),

    messageId : uuid("messageId")
                .references(() => message.id, { onDelete: "cascade" }),

    conversationId : uuid("conversationId")
                    .references(() => conversation.id, { onDelete: "cascade" }),

   

    reportedUser : text("reportedUser")
                    .references(() => userTable.id, { onDelete: "cascade" }, ),
    
    content : text("content"),
    reportType : text("reportType"),
    reportStatus : text("reportStatus"),

})

export const block = pgTable("block", {
    id : uuid("id").default(sql`gen_random_uuid()`).primaryKey(),

    userId : text("userId")
                .references(() => userTable.id, { onDelete: "cascade" }),

    conversationId : uuid("conversationId")
                .references(() => conversation.id, { onDelete: "cascade" }),
})

//every array of a user => e.g liked posts etc..

export const conversationFolderRelations = relations(conversationFolder, ({ one, many}) => ({
    user : one(userTable, {
        fields : [conversationFolder.userId],
        references : [userTable.id]
    }),
    folderOnConversation : many(folderOnConversation)
}))

export const blockRelations = relations(block , ({ one }) => ({
    conversation : one(conversation, {
        fields : [block.conversationId],
        references : [conversation.id]
    }),
    
}))

export const sessionRelations =  relations(sessionTable, ({ one }) => ({
    users : one(userTable, {
        fields : [sessionTable.userId],
        references : [userTable.id]
    })
}))

export const changeEmailTokenRelations = relations(changeEmailToken, ({ one }) => ({
    users : one(userTable, {
        fields : [changeEmailToken.userId],
        references : [userTable.id]
    })
}))

export const folderOnConversation = pgTable("folder_conversation", {
    folderId : uuid("folderId")
                .references(() => conversationFolder.id, { onDelete: "cascade" }),
    userId : text("userId"),
    conversationId : uuid("conversationId")
                .references(() => conversation.id, { onDelete: "cascade" }),
    },
    (t) => ({
        primaryKey: primaryKey({ columns: [t.folderId, t.conversationId] }),
    })
    )

export const folderOnConversationRelations = relations(folderOnConversation, ({ one }) => ({
    conversationFolder : one(conversationFolder, {
        fields : [folderOnConversation.folderId],
        references : [conversationFolder.id]
    }),
    conversation : one(conversation, {
        fields : [folderOnConversation.conversationId],
        references : [conversation.id]
    })
}))

export const userRelations = relations(userTable, ({ one, many }) => ({
    userAddress : one(userAddress, {
        fields : [userTable.userAddressId],
        references : [userAddress.id]
    }),
    inserat: many(inserat),

    writtenRezensionen: many(rezension, { relationName : "writtenRezensionen" }),
    receivedRezensionen : many(rezension, { relationName : "receivedRezensionen" }),

    messages : many(message),
    
    sessions : many(sessionTable),

    favourites : many(favourite),
    conversation_user1 : many(conversation,{ relationName : "conversation_user1" }),
    conversation_user2 : many(conversation,{ relationName : "conversation_user2" }),
    contactOptions : one(contactOptions, {
        fields : [userTable.contactId],
        references : [contactOptions.id]
    }),
    twoFactorConfirmation : one(twoFactorConfirmation, {
        fields : [userTable.twoFactorConfirmationId],
        references : [twoFactorConfirmation.id]
    }),
    business : one(business, {
        fields : [userTable.businessId],
        references : [business.id]
    }),
    subscription : one(userSubscription, {
        fields : [userTable.subscriptionId],
        references : [userSubscription.id]
    }),
    paymentMethods : one(paymentMethods, {
        fields : [userTable.paymentMethodsId],
        references : [paymentMethods.id]
    }),
    bookings : many(booking),
    bookingRequests : many(bookingRequest),
    notifications : many(notification),
    savedSearch : many(savedSearch),
    accounts : many(accounts),
    conversationFolders : many(conversationFolder),
    userContactprofiles : many(userContactprofiles),
    
    
    
}));



export const twoFactorToken = pgTable("twoFactorToken", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    email : text("email"),
    token : text("token"),
    expires : timestamp("expires", { mode: "date" }).notNull(),
})

export const paymentMethodsRelations = relations(paymentMethods, ({ one }) => ({
    users : one(userTable, {
        fields : [paymentMethods.userId],
        references : [userTable.id]
    
    })
}))

export const twoFactorConfirmationRelations = relations(twoFactorConfirmation, ({ one }) => ({
    users : one(userTable, {
        fields : [twoFactorConfirmation.userId],
        references : [userTable.id]
    })

}))

export const deleteUserTokenRelations = relations(deleteUserToken, ({ one }) => ({
    users : one(userTable, {
        fields : [deleteUserToken.userId],
        references : [userTable.id]
    })
}))

export const subscriptionRelations = relations(userSubscription, ({ one }) => ({
    user : one(userTable, {
        fields : [userSubscription.userId],
        references : [userTable.id]
    })
}))


export const inseratRelations = relations(inserat, ({ one, many }) => ({
    user: one(userTable, {
        fields: [inserat.userId],
        references: [userTable.id]
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
    priceprofiles : many(priceprofile),

    vehicles : many(vehicle),
}))

export const priceprofileRelations = relations(priceprofile, ({ one }) => ({
    inserat : one(inserat, {
        fields : [priceprofile.inseratId],
        references : [inserat.id]
    })
}))

export const businessRelations = relations(business, ({ one, many}) => ({
    user : one(userTable, {
        fields : [business.userId],
        references : [userTable.id]
    }),
    openingTimes : one(openingTimes, {
        fields : [business.id],
        references : [openingTimes.businessId]
    }),
    faqs : many(businessFaqs),
    businessAddresses : many(businessAddress),
    businessImages : many(businessImages)
}))

export const businessFaqsRelations = relations(businessFaqs, ({ one }) => ({
    business : one(business, {
        fields : [businessFaqs.businessId],
        references : [business.id]
    })
}))


export const businessAddressRelations = relations(businessAddress, ({ one }) => ({
    business : one(business, {
        fields : [businessAddress.businessId],
        references : [business.id]
    })
}))

export const vehicleRelations = relations(vehicle, ({ one, many }) => ({
    inserat : one(inserat, {
        fields : [vehicle.inseratId],
        references : [inserat.id]
    }),
    bookings : many(booking)
}))

export const imageRelations = relations(images, ({ one }) => ({
    inserat : one(inserat, {
        fields : [images.inseratId],
        references: [inserat.id]
    })
}))

export const businessImagesRelations = relations(businessImages, ({ one }) => ({
    business : one(business, {
        fields : [businessImages.businessId],
        references : [business.id]
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

export const savedSearchRelations = relations(savedSearch, ({ one }) => ({
    user : one(userTable, {
        fields : [savedSearch.userId],
        references : [userTable.id]
    })
}))

export const bookingRelations = relations(booking, ({ one }) => ({
    user : one(userTable, {
        fields : [booking.userId],
        references : [userTable.id]
    }),
    inserat : one(inserat, {
        fields : [booking.inseratId],
        references : [inserat.id]
    }),
    vehicle : one(vehicle, {
        fields : [booking.vehicleId],
        references : [vehicle.id],
    })
}))

export const bookingRequestRelations = relations(bookingRequest, ({ one }) => ({
    user : one(userTable, {
        fields : [bookingRequest.userId],
        references : [userTable.id]
    }),
    inserat : one(inserat, {
        fields : [bookingRequest.inseratId],
        references : [inserat.id]
    })
}))

export const favouriteRelation = relations(favourite, ({ one }) => ({
    user : one(userTable, {
        fields : [favourite.userId],
        references : [userTable.id]
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
    }),
    user : one(userTable, {
        fields : [contactOptions.userId],
        references : [userTable.id]
    
    })
}))

export const userAddressRelations = relations(userAddress, ({ one }) => ({
    contactOptions : one(contactOptions, {
        fields : [userAddress.contactOptionsId],
        references : [contactOptions.id]
    })
}))

export const messageRelations = relations(message, ({ one }) => ({
    sender : one(userTable, {
        fields : [message.senderId],
        references : [userTable.id]
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
    sender : one(userTable , {
        fields : [rezension.senderId],
        references : [userTable.id],
        relationName : "writtenRezensionen"
    }),
    receiver : one(userTable, {
        fields : [rezension.receiverId],
        references : [userTable.id],
        relationName : "receivedRezensionen"
    })
}))

export const conversationRelations = relations(conversation, ({ one, many }) => ({
    user1 : one(userTable, {
        fields : [conversation.user1Id],
        references : [userTable.id],
        relationName : "conversation_user1"
    }),
    user2 : one(userTable, {
        fields : [conversation.user2Id],
        references : [userTable.id],
        relationName : "conversation_user2"
    }),
    lastMessage: one(message, {
        fields: [conversation.lastMessageId],  // Corrected to refer to the field in the conversation table
        references: [message.id],  // Corrected to refer to the primary key of the message table
        relationName: "lastMessage"
    }),
    inserat : one(inserat, {
        fields : [conversation.inseratId],
        references : [inserat.id]
    }),
    messages: many(message),
    blocks : many(block),
    folderOnConversation : many(folderOnConversation)
}))

export const notificationRelations = relations(notification, ({ one }) => ({
    user : one(userTable, {
        fields : [notification.userId],
        references : [userTable.id]
    })
}))

export const reportRelations = relations(report, ({ one }) => ({
    user : one(userTable, {
        relationName : "user",
        fields : [report.userId],
        references : [userTable.id]
    }),
    reportedUser : one(userTable, {
        relationName : "reportedUser",
        fields : [report.reportedUser],
        references : [userTable.id]
    }),
   inserat : one(inserat, {
    fields : [report.inseratId],
    references : [inserat.id]
   }),
    message : one(message, {
     fields : [report.messageId],
     references : [message.id]
    }),
    conversation : one(conversation, {
        fields : [report.conversationId],
        references : [conversation.id]
    })
}))