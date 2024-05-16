import { pgTable, type AnyPgColumn, foreignKey, pgEnum, uuid, integer, text, timestamp, boolean, numeric, unique, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const application = pgEnum("application", ['CONTAINERTRANSPORT', 'DEICHSELANHAENGER', 'FAHRZEUGTRANSPORT', 'FLUESSIGKEITSTRANSPORT', 'KASTENWAGEN', 'KOFFERAUFBAU', 'KIPPER', 'KRANWAGEN', 'KUEHLWAGEN', 'MOEBELTRANSPORT', 'PERSONENTRANSPORT', 'PLANWAGEN', 'PRITSCHENWAGEN', 'SATTELSCHLEPPER', 'SONSTIGES'])
export const brand = pgEnum("brand", ['Abarth', 'Acura', 'Audi', 'Alfa Romeo', 'Alpina', 'Alpine', 'Aston Martin', 'Bentley', 'BMW', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroën', 'Corvette', 'Cupra', 'Dacia', 'Daihatsu', 'Ferrari', 'Fiat', 'Ford', 'GMC', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Koenigsegg', 'KTM', 'Lada', 'Lancia', 'Land Rover', 'Lamborghini', 'Lexus', 'Lincoln', 'Lotus', 'Maserati', 'Mazda', 'McLaren', 'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Plymouth', 'Polestar', 'Pontiac', 'Porsche', 'RAM', 'Renault', 'Rolls Royce', 'Rover', 'Saab', 'Seat', 'Škoda', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Volkswagen', 'Volvo', 'Sonstige'])
export const carType = pgEnum("carType", ['KOMBI', 'COUPE', 'SUV', 'LIMOUSINE', 'VAN', 'KASTENWAGEN', 'KLEINBUS', 'CABRIO', 'KLEIN', 'SPORT', 'SUPERSPORT'])
export const category = pgEnum("category", ['PKW', 'LKW', 'TRAILER', 'TRANSPORT'])
export const coupling = pgEnum("coupling", ['KUGELKOPFKUPPLUNG', 'MAULKUPPLUNG'])
export const drive = pgEnum("drive", ['D4x2', 'D4x4', 'D6x2', 'D6x4', 'D6x6', 'D8x4', 'D8x6', 'D8x8'])
export const extraType = pgEnum("extraType", ['CONTAINERTRANSPORT', 'FAHRZEUGTRANSPORT', 'FLUESSIGKEITSTRANSPORT', 'KASTENWAGEN', 'KIPPER', 'KOFFERAUFBAU', 'KUEHLAUFBAU', 'MOEBELTRANSPORT', 'MULDENKIPPER', 'PERSONENTRANSPORT', 'PLANE', 'PRITSCHE'])
export const fuelType = pgEnum("fuelType", ['ELEKTRISCH', 'DIESEL', 'BENZIN', 'HYBRID'])
export const license = pgEnum("license", ['B', 'B17', 'B96', 'B196', 'B197', 'BE', 'C1', 'C1E', 'C', 'CE', 'D1', 'D1E', 'DE', 'L', 'T', 'CE1'])
export const lkwBrand = pgEnum("lkwBrand", ['DAF', 'Demag', 'Ford', 'Iveco', 'Liebherr', 'Magirus Deutz', 'MAN', 'Meiller', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Palfinger', 'Peugeot', 'Renault', 'Scania', 'Skoda', 'Steyr', 'Tatra', 'Toyota', 'Volkswagen', 'Volvo', 'Sonstige'])
export const loading = pgEnum("loading", ['AUFFAHRRAMPE', 'LADERAMPE', 'LADEBORDWAND', 'KRAN', 'MITNAHMESTAPLER'])
export const notificationType = pgEnum("notificationType", ['MESSAGE', 'BOOKING', 'BOOKING_REQUEST', 'EMAIL', 'FAVOURITE', 'REPORT_ACTION'])
export const priceType = pgEnum("priceType", ['FREE', 'BASIS', 'PREMIUM', 'ENTERPRISE'])
export const trailer = pgEnum("trailer", ['KLEIN', 'SATTEL', 'ANHAENGER'])
export const transmission = pgEnum("transmission", ['MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC'])
export const transportBrand = pgEnum("transportBrand", ['Citroën', 'Dacia', 'DAF', 'Fiat', 'Ford', 'Hyundai', 'Iveco', 'Mazda', 'Maxus', 'Mercedes-Benz', 'Mitsubishi', 'Multicar', 'Nissan', 'Opel', 'Peugeot', 'Renault', 'SEAT', 'Škoda', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo', 'Sonstige'])


export const address = pgTable("address", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	postalCode: integer("postalCode"),
	state: text("state"),
	locationString: text("locationString"),
	longitude: text("longitude"),
	latitude: text("latitude"),
	inseratId: uuid("inseratId").notNull().references((): AnyPgColumn => inserat.id, { onDelete: "cascade" } ),
});

export const booking = pgTable("booking", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	inseratId: uuid("inseratId").notNull().references(() => inserat.id, { onDelete: "cascade" } ),
	userId: text("userId").references(() => user.id, { onDelete: "cascade" } ),
	vehicleId: uuid("vehicleId").references(() => vehicle.id, { onDelete: "cascade" } ),
	content: text("content"),
	startDate: timestamp("startDate", { mode: 'string' }),
	endDate: timestamp("endDate", { mode: 'string' }),
	isAvailability: boolean("isAvailability").default(false),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	name: text("name"),
	buchungsnummer: text("buchungsnummer"),
	startPeriod: text("startPeriod"),
	endPeriod: text("endPeriod"),
});

export const bookingRequest = pgTable("bookingRequest", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	inseratId: uuid("inseratId").notNull().references(() => inserat.id, { onDelete: "cascade" } ),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	content: text("content"),
	startDate: timestamp("startDate", { mode: 'string' }),
	endDate: timestamp("endDate", { mode: 'string' }),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
});

export const business = pgTable("business", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").references((): AnyPgColumn => user.id, { onDelete: "cascade" } ),
	description: text("description"),
	openingHours: text("openingHours"),
	telephone_number: text("telephone_number"),
	email: text("email"),
	website: text("website"),
	impressum: text("impressum"),
	fax: text("fax"),
});

export const businessAddress = pgTable("businessAddress", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	businessId: uuid("businessId").references(() => business.id, { onDelete: "cascade" } ),
	postalCode: integer("postalCode"),
	image: text("image"),
	state: text("state"),
	city: text("city"),
	street: text("street"),
	isPrimary: boolean("isPrimary").default(false).notNull(),
});

export const businessImages = pgTable("businessImages", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	position: integer("position"),
	url: text("url"),
	businessId: uuid("businessId").references(() => business.id, { onDelete: "cascade" } ),
});

export const contactOptions = pgTable("contactOptions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").notNull().references((): AnyPgColumn => user.id, { onDelete: "cascade" } ),
	email: boolean("email").default(false).notNull(),
	emailAddress: text("emailAddress"),
	website: boolean("website").default(false).notNull(),
	websiteAddress: text("websiteAddress"),
	phone: boolean("phone").default(false).notNull(),
	phoneNumber: text("phoneNumber"),
	userAddressId: uuid("userAddressId").references((): AnyPgColumn => userAddress.id, { onDelete: "set null" } ),
});

export const favourite = pgTable("favourite", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	inseratId: uuid("inseratId").notNull().references(() => inserat.id, { onDelete: "cascade" } ),
});

export const conversation = pgTable("conversation", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	user1: text("user1").notNull().references(() => user.id, { onDelete: "cascade" } ),
	user2: text("user2").notNull().references(() => user.id, { onDelete: "cascade" } ),
	blocked: boolean("blocked").default(false).notNull(),
});

export const images = pgTable("images", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	position: integer("position"),
	url: text("url").notNull(),
	inseratId: uuid("inseratId").references(() => inserat.id, { onDelete: "cascade" } ),
});

export const inserat = pgTable("inserat", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description"),
	category: category("category"),
	price: numeric("price"),
	isPublished: boolean("isPublished").default(false).notNull(),
	multi: boolean("multi").default(false).notNull(),
	amount: integer("amount").default(1).notNull(),
	emailAddress: text("emailAddress"),
	phoneNumber: text("phoneNumber"),
	priceType: priceType("priceType").default('FREE'),
	begin: timestamp("begin", { mode: 'string' }),
	end: timestamp("end", { mode: 'string' }),
	annual: boolean("annual").default(false).notNull(),
	dailyPrice: boolean("dailyPrice").default(false).notNull(),
	license: license("license"),
	caution: numeric("caution"),
	reqAge: integer("reqAge"),
	priceHour: numeric("priceHour"),
	priceWeekend: numeric("priceWeekend"),
	firstRelease: timestamp("firstRelease", { mode: 'string' }),
	views: integer("views").default(0).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	addressId: uuid("addressId").references((): AnyPgColumn => address.id),
	pkwId: uuid("pkwId").references((): AnyPgColumn => pkwAttribute.id),
	lkwId: uuid("lkwId").references((): AnyPgColumn => lkwAttribute.id),
	trailerId: uuid("trailerId").references((): AnyPgColumn => trailerAttribute.id),
	transportId: uuid("transportId").references((): AnyPgColumn => transportAttribute.id),
	priceKilometer: numeric("priceKilometer"),
});

export const message = pgTable("message", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	content: text("content"),
	image: text("image"),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }),
	isInterest: boolean("isInterest").default(false).notNull(),
	inseratId: uuid("inseratId").references(() => inserat.id, { onDelete: "cascade" } ),
	senderId: text("senderId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	conversationId: uuid("conversationId").notNull().references(() => conversation.id, { onDelete: "cascade" } ),
	seen: boolean("seen").default(false).notNull(),
});

export const lkwAttribute = pgTable("lkwAttribute", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	lkwBrand: lkwBrand("lkwBrand"),
	model: text("model"),
	seats: integer("seats"),
	axis: integer("axis"),
	power: integer("power"),
	loading_volume: numeric("loading_volume"),
	transmission: transmission("transmission"),
	loading_l: numeric("loading_l"),
	loading_b: numeric("loading_b"),
	loading_h: numeric("loading_h"),
	loading_size: numeric("loading_size"),
	weightClass: integer("weightClass"),
	drive: drive("drive"),
	loading: loading("loading"),
	application: application("application"),
	inseratId: uuid("inseratId").notNull().references((): AnyPgColumn => inserat.id, { onDelete: "cascade" } ),
});

export const notification = pgTable("notification", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	notificationType: notificationType("notificationType"),
	content: text("content"),
	userId: text("userId").references(() => user.id, { onDelete: "cascade" } ),
	conversationId: text("conversationId"),
	inseratId: text("inseratId"),
	seen: boolean("seen").default(false),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
});

export const openingTimes = pgTable("openingTimes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	businessId: uuid("businessId").references(() => business.id, { onDelete: "cascade" } ),
	monday: text("monday"),
	tuesday: text("tuesday"),
	wednesday: text("wednesday"),
	thursday: text("thursday"),
	friday: text("friday"),
	saturday: text("saturday"),
});

export const rezension = pgTable("rezension", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	content: text("content"),
	image: text("image"),
	rating: integer("rating").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	editedAt: timestamp("editedAt", { mode: 'string' }),
	isEdited: boolean("isEdited").default(false).notNull(),
	receiverId: text("receiverId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	senderId: text("senderId").notNull().references(() => user.id, { onDelete: "cascade" } ),
});

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	user_id: text("user_id").notNull().references(() => user.id),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }),
});

export const stripeCustomer = pgTable("stripeCustomer", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	stripeCustomerId: uuid("stripeCustomerId").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		stripeCustomer_stripeCustomerId_unique: unique("stripeCustomer_stripeCustomerId_unique").on(table.stripeCustomerId),
	}
});

export const report = pgTable("report", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").references(() => user.id, { onDelete: "cascade" } ),
	inseratId: uuid("inseratId").references(() => inserat.id, { onDelete: "cascade" } ),
	messageId: uuid("messageId").references(() => message.id, { onDelete: "cascade" } ),
	reportType: text("reportType"),
	content: text("content"),
	conversationId: uuid("conversationId").references(() => conversation.id, { onDelete: "cascade" } ),
});

export const pkwAttribute = pgTable("pkwAttribute", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	brand: brand("brand"),
	model: text("model"),
	seats: integer("seats"),
	doors: integer("doors"),
	freeMiles: integer("freeMiles"),
	extraCost: numeric("extraCost"),
	loading: loading("loading"),
	extraType: extraType("extraType"),
	weightClass: integer("weightClass"),
	transmission: transmission("transmission"),
	type: carType("type"),
	fuel: fuelType("fuel"),
	loading_volume: numeric("loading_volume"),
	loading_l: numeric("loading_l"),
	loading_b: numeric("loading_b"),
	loading_h: numeric("loading_h"),
	loading_size: numeric("loading_size"),
	ahk: boolean("ahk").default(false).notNull(),
	initial: timestamp("initial", { mode: 'string' }),
	power: integer("power"),
	inseratId: uuid("inseratId").notNull().references((): AnyPgColumn => inserat.id, { onDelete: "cascade" } ),
});

export const purchase = pgTable("purchase", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	inseratId: uuid("inseratId").notNull().references(() => inserat.id, { onDelete: "cascade" } ),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
});

export const twoFactorConfirmation = pgTable("twoFactorConfirmation", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").references((): AnyPgColumn => user.id, { onDelete: "cascade" } ),
});

export const userSubscription = pgTable("userSubscription", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").references((): AnyPgColumn => user.id, { onDelete: "cascade" } ),
	subscriptionType: priceType("subscriptionType"),
	amount: integer("amount").default(0).notNull(),
	stripe_customer_id: text("stripe_customer_id"),
	stripe_subscription_id: text("stripe_subscription_id"),
	stripe_product_id: text("stripe_product_id"),
	stripe_price_id: text("stripe_price_id"),
	stripe_current_period_end: timestamp("stripe_current_period_end", { mode: 'string' }),
});

export const twoFactorToken = pgTable("twoFactorToken", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	email: text("email"),
	token: text("token"),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const trailerAttribute = pgTable("trailerAttribute", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	type: trailer("type"),
	coupling: coupling("coupling"),
	loading: loading("loading"),
	extraType: extraType("extraType"),
	loading_volume: numeric("loading_volume"),
	loading_l: numeric("loading_l"),
	loading_b: numeric("loading_b"),
	loading_h: numeric("loading_h"),
	loading_size: numeric("loading_size"),
	axis: integer("axis"),
	weight: integer("weight"),
	brake: boolean("brake").default(false).notNull(),
	inseratId: uuid("inseratId").notNull().references((): AnyPgColumn => inserat.id, { onDelete: "cascade" } ),
});

export const userAddress = pgTable("userAddress", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").notNull().references((): AnyPgColumn => user.id, { onDelete: "cascade" } ),
	contactOptionsId: uuid("contactOptionsId").references((): AnyPgColumn => contactOptions.id),
	postalCode: integer("postalCode"),
	city: text("city"),
	street: text("street"),
	houseNumber: integer("houseNumber"),
	locationString: text("locationString"),
	longitude: text("longitude"),
	latitude: text("latitude"),
},
(table) => {
	return {
		userAddress_userId_unique: unique("userAddress_userId_unique").on(table.userId),
		userAddress_contactOptionsId_unique: unique("userAddress_contactOptionsId_unique").on(table.contactOptionsId),
	}
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	vorname: text("vorname"),
	lastname: text("lastname"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
	password: text("password"),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow(),
	confirmedMail: boolean("confirmedMail").default(false).notNull(),
	description: text("description"),
	sharesEmail: boolean("sharesEmail").default(true).notNull(),
	usesTwoFactor: boolean("usesTwoFactor").default(false).notNull(),
	isBusiness: boolean("isBusiness").default(false),
	businessId: uuid("businessId").references((): AnyPgColumn => business.id, { onDelete: "set null" } ),
	contactId: uuid("contactId").references((): AnyPgColumn => contactOptions.id, { onDelete: "set null" } ),
	subscriptionId: uuid("subscriptionId").references((): AnyPgColumn => userSubscription.id, { onDelete: "set null" } ),
	userAddressId: uuid("userAddressId").references((): AnyPgColumn => userAddress.id, { onDelete: "set null" } ),
	twoFactorConfirmationId: uuid("twoFactorConfirmationId").references((): AnyPgColumn => twoFactorConfirmation.id, { onDelete: "set null" } ),
	newsletter: boolean("newsletter").default(false),
	enableSocialLogin: boolean("enableSocialLogin").default(true),
	sharesRealName: boolean("sharesRealName").default(true).notNull(),
	isAdmin: boolean("isAdmin").default(false),
});

export const transportAttribute = pgTable("transportAttribute", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	loading: loading("loading"),
	transmission: transmission("transmission"),
	extraType: extraType("extraType"),
	loading_volume: numeric("loading_volume"),
	loading_l: numeric("loading_l"),
	loading_b: numeric("loading_b"),
	loading_h: numeric("loading_h"),
	loading_size: numeric("loading_size"),
	transportBrand: transportBrand("transportBrand"),
	weightClass: integer("weightClass"),
	power: integer("power"),
	seats: integer("seats"),
	doors: integer("doors"),
	fuel: fuelType("fuel"),
	inseratId: uuid("inseratId").notNull().references((): AnyPgColumn => inserat.id, { onDelete: "cascade" } ),
});

export const vehicle = pgTable("vehicle", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	inseratId: uuid("inseratId").notNull().references(() => inserat.id, { onDelete: "cascade" } ),
	title: text("title"),
	registration: text("registration"),
	image: text("image"),
});

export const changeEmailToken = pgTable("changeEmailToken", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	newEmail: text("newEmail"),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
	token: text("token"),
});

export const block = pgTable("block", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("userId").references(() => user.id, { onDelete: "cascade" } ),
	conversationId: uuid("conversationId").references(() => conversation.id, { onDelete: "cascade" } ),
});

export const oauth_account = pgTable("oauth_account", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").references(() => user.id, { onDelete: "cascade" } ),
	provider: text("provider").notNull(),
	provider_user_id: text("provider_user_id").notNull(),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	expiresAt: timestamp("expiresAt", { withTimezone: true, mode: 'string' }).notNull(),
});

export const giftCode = pgTable("giftCode", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name"),
	plan: priceType("plan"),
	inseratAmount: integer("inseratAmount"),
	userAmount: integer("userAmount"),
	expirationDate: timestamp("expirationDate", { mode: 'string' }),
	code: text("code"),
	availableAmount: integer("availableAmount"),
	months: integer("months"),
});

export const savedSearch = pgTable("savedSearch", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	link: text("link"),
	userId: text("userId").references(() => user.id, { onDelete: "cascade" } ),
	title: text("title"),
	receivesUpdates: boolean("receivesUpdates").default(false).notNull(),
	receiveAvailability: boolean("receiveAvailability").default(false).notNull(),
	receivedAvailability: boolean("receivedAvailability").default(false).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
});

export const resetPasswordToken = pgTable("resetPasswordToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
	email: text("email").notNull(),
},
(table) => {
	return {
		resetPasswordToken_email_token_pk: primaryKey({ columns: [table.token, table.email], name: "resetPasswordToken_email_token_pk"}),
	}
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	email: text("email").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationToken_identifier_token_pk: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"}),
	}
});

export const account = pgTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
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
(table) => {
	return {
		account_provider_providerAccountId_pk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"}),
	}
});