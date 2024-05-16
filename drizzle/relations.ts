import { relations } from "drizzle-orm/relations";
import { inserat, address, booking, vehicle, user, bookingRequest, business, businessAddress, businessImages, contactOptions, userAddress, favourite, conversation, images, trailerAttribute, transportAttribute, pkwAttribute, lkwAttribute, message, notification, openingTimes, rezension, session, stripeCustomer, report, purchase, twoFactorConfirmation, userSubscription, changeEmailToken, block, oauth_account, savedSearch, account } from "./schema";

export const addressRelations = relations(address, ({one, many}) => ({
	inserat: one(inserat, {
		fields: [address.inseratId],
		references: [inserat.id],
		relationName: "address_inseratId_inserat_id"
	}),
	inserats: many(inserat, {
		relationName: "inserat_addressId_address_id"
	}),
}));

export const inseratRelations = relations(inserat, ({one, many}) => ({
	addresses: many(address, {
		relationName: "address_inseratId_inserat_id"
	}),
	bookings: many(booking),
	bookingRequests: many(bookingRequest),
	favourites: many(favourite),
	images: many(images),
	trailerAttribute: one(trailerAttribute, {
		fields: [inserat.trailerId],
		references: [trailerAttribute.id],
		relationName: "inserat_trailerId_trailerAttribute_id"
	}),
	transportAttribute: one(transportAttribute, {
		fields: [inserat.transportId],
		references: [transportAttribute.id],
		relationName: "inserat_transportId_transportAttribute_id"
	}),
	address: one(address, {
		fields: [inserat.addressId],
		references: [address.id],
		relationName: "inserat_addressId_address_id"
	}),
	pkwAttribute: one(pkwAttribute, {
		fields: [inserat.pkwId],
		references: [pkwAttribute.id],
		relationName: "inserat_pkwId_pkwAttribute_id"
	}),
	lkwAttribute: one(lkwAttribute, {
		fields: [inserat.lkwId],
		references: [lkwAttribute.id],
		relationName: "inserat_lkwId_lkwAttribute_id"
	}),
	user: one(user, {
		fields: [inserat.userId],
		references: [user.id]
	}),
	messages: many(message),
	lkwAttributes: many(lkwAttribute, {
		relationName: "lkwAttribute_inseratId_inserat_id"
	}),
	reports: many(report),
	pkwAttributes: many(pkwAttribute, {
		relationName: "pkwAttribute_inseratId_inserat_id"
	}),
	purchases: many(purchase),
	trailerAttributes: many(trailerAttribute, {
		relationName: "trailerAttribute_inseratId_inserat_id"
	}),
	transportAttributes: many(transportAttribute, {
		relationName: "transportAttribute_inseratId_inserat_id"
	}),
	vehicles: many(vehicle),
}));

export const bookingRelations = relations(booking, ({one}) => ({
	inserat: one(inserat, {
		fields: [booking.inseratId],
		references: [inserat.id]
	}),
	vehicle: one(vehicle, {
		fields: [booking.vehicleId],
		references: [vehicle.id]
	}),
	user: one(user, {
		fields: [booking.userId],
		references: [user.id]
	}),
}));

export const vehicleRelations = relations(vehicle, ({one, many}) => ({
	bookings: many(booking),
	inserat: one(inserat, {
		fields: [vehicle.inseratId],
		references: [inserat.id]
	}),
}));

export const userRelations = relations(user, ({one, many}) => ({
	bookings: many(booking),
	bookingRequests: many(bookingRequest),
	businesses: many(business, {
		relationName: "business_userId_user_id"
	}),
	contactOptions: many(contactOptions, {
		relationName: "contactOptions_userId_user_id"
	}),
	favourites: many(favourite),
	conversations_user1: many(conversation, {
		relationName: "conversation_user1_user_id"
	}),
	conversations_user2: many(conversation, {
		relationName: "conversation_user2_user_id"
	}),
	inserats: many(inserat),
	messages: many(message),
	notifications: many(notification),
	rezensions_receiverId: many(rezension, {
		relationName: "rezension_receiverId_user_id"
	}),
	rezensions_senderId: many(rezension, {
		relationName: "rezension_senderId_user_id"
	}),
	sessions: many(session),
	stripeCustomers: many(stripeCustomer),
	reports: many(report),
	purchases: many(purchase),
	twoFactorConfirmations: many(twoFactorConfirmation, {
		relationName: "twoFactorConfirmation_userId_user_id"
	}),
	userSubscriptions: many(userSubscription, {
		relationName: "userSubscription_userId_user_id"
	}),
	userAddresses: many(userAddress, {
		relationName: "userAddress_userId_user_id"
	}),
	contactOption: one(contactOptions, {
		fields: [user.contactId],
		references: [contactOptions.id],
		relationName: "user_contactId_contactOptions_id"
	}),
	userAddress: one(userAddress, {
		fields: [user.userAddressId],
		references: [userAddress.id],
		relationName: "user_userAddressId_userAddress_id"
	}),
	twoFactorConfirmation: one(twoFactorConfirmation, {
		fields: [user.twoFactorConfirmationId],
		references: [twoFactorConfirmation.id],
		relationName: "user_twoFactorConfirmationId_twoFactorConfirmation_id"
	}),
	business: one(business, {
		fields: [user.businessId],
		references: [business.id],
		relationName: "user_businessId_business_id"
	}),
	userSubscription: one(userSubscription, {
		fields: [user.subscriptionId],
		references: [userSubscription.id],
		relationName: "user_subscriptionId_userSubscription_id"
	}),
	changeEmailTokens: many(changeEmailToken),
	blocks: many(block),
	oauth_accounts: many(oauth_account),
	savedSearches: many(savedSearch),
	accounts: many(account),
}));

export const bookingRequestRelations = relations(bookingRequest, ({one}) => ({
	inserat: one(inserat, {
		fields: [bookingRequest.inseratId],
		references: [inserat.id]
	}),
	user: one(user, {
		fields: [bookingRequest.userId],
		references: [user.id]
	}),
}));

export const businessRelations = relations(business, ({one, many}) => ({
	user: one(user, {
		fields: [business.userId],
		references: [user.id],
		relationName: "business_userId_user_id"
	}),
	businessAddresses: many(businessAddress),
	businessImages: many(businessImages),
	openingTimes: many(openingTimes),
	users: many(user, {
		relationName: "user_businessId_business_id"
	}),
}));

export const businessAddressRelations = relations(businessAddress, ({one}) => ({
	business: one(business, {
		fields: [businessAddress.businessId],
		references: [business.id]
	}),
}));

export const businessImagesRelations = relations(businessImages, ({one}) => ({
	business: one(business, {
		fields: [businessImages.businessId],
		references: [business.id]
	}),
}));

export const contactOptionsRelations = relations(contactOptions, ({one, many}) => ({
	user: one(user, {
		fields: [contactOptions.userId],
		references: [user.id],
		relationName: "contactOptions_userId_user_id"
	}),
	userAddress: one(userAddress, {
		fields: [contactOptions.userAddressId],
		references: [userAddress.id],
		relationName: "contactOptions_userAddressId_userAddress_id"
	}),
	userAddresses: many(userAddress, {
		relationName: "userAddress_contactOptionsId_contactOptions_id"
	}),
	users: many(user, {
		relationName: "user_contactId_contactOptions_id"
	}),
}));

export const userAddressRelations = relations(userAddress, ({one, many}) => ({
	contactOptions: many(contactOptions, {
		relationName: "contactOptions_userAddressId_userAddress_id"
	}),
	contactOption: one(contactOptions, {
		fields: [userAddress.contactOptionsId],
		references: [contactOptions.id],
		relationName: "userAddress_contactOptionsId_contactOptions_id"
	}),
	user: one(user, {
		fields: [userAddress.userId],
		references: [user.id],
		relationName: "userAddress_userId_user_id"
	}),
	users: many(user, {
		relationName: "user_userAddressId_userAddress_id"
	}),
}));

export const favouriteRelations = relations(favourite, ({one}) => ({
	user: one(user, {
		fields: [favourite.userId],
		references: [user.id]
	}),
	inserat: one(inserat, {
		fields: [favourite.inseratId],
		references: [inserat.id]
	}),
}));

export const conversationRelations = relations(conversation, ({one, many}) => ({
	user_user1: one(user, {
		fields: [conversation.user1],
		references: [user.id],
		relationName: "conversation_user1_user_id"
	}),
	user_user2: one(user, {
		fields: [conversation.user2],
		references: [user.id],
		relationName: "conversation_user2_user_id"
	}),
	messages: many(message),
	reports: many(report),
	blocks: many(block),
}));

export const imagesRelations = relations(images, ({one}) => ({
	inserat: one(inserat, {
		fields: [images.inseratId],
		references: [inserat.id]
	}),
}));

export const trailerAttributeRelations = relations(trailerAttribute, ({one, many}) => ({
	inserats: many(inserat, {
		relationName: "inserat_trailerId_trailerAttribute_id"
	}),
	inserat: one(inserat, {
		fields: [trailerAttribute.inseratId],
		references: [inserat.id],
		relationName: "trailerAttribute_inseratId_inserat_id"
	}),
}));

export const transportAttributeRelations = relations(transportAttribute, ({one, many}) => ({
	inserats: many(inserat, {
		relationName: "inserat_transportId_transportAttribute_id"
	}),
	inserat: one(inserat, {
		fields: [transportAttribute.inseratId],
		references: [inserat.id],
		relationName: "transportAttribute_inseratId_inserat_id"
	}),
}));

export const pkwAttributeRelations = relations(pkwAttribute, ({one, many}) => ({
	inserats: many(inserat, {
		relationName: "inserat_pkwId_pkwAttribute_id"
	}),
	inserat: one(inserat, {
		fields: [pkwAttribute.inseratId],
		references: [inserat.id],
		relationName: "pkwAttribute_inseratId_inserat_id"
	}),
}));

export const lkwAttributeRelations = relations(lkwAttribute, ({one, many}) => ({
	inserats: many(inserat, {
		relationName: "inserat_lkwId_lkwAttribute_id"
	}),
	inserat: one(inserat, {
		fields: [lkwAttribute.inseratId],
		references: [inserat.id],
		relationName: "lkwAttribute_inseratId_inserat_id"
	}),
}));

export const messageRelations = relations(message, ({one, many}) => ({
	inserat: one(inserat, {
		fields: [message.inseratId],
		references: [inserat.id]
	}),
	conversation: one(conversation, {
		fields: [message.conversationId],
		references: [conversation.id]
	}),
	user: one(user, {
		fields: [message.senderId],
		references: [user.id]
	}),
	reports: many(report),
}));

export const notificationRelations = relations(notification, ({one}) => ({
	user: one(user, {
		fields: [notification.userId],
		references: [user.id]
	}),
}));

export const openingTimesRelations = relations(openingTimes, ({one}) => ({
	business: one(business, {
		fields: [openingTimes.businessId],
		references: [business.id]
	}),
}));

export const rezensionRelations = relations(rezension, ({one}) => ({
	user_receiverId: one(user, {
		fields: [rezension.receiverId],
		references: [user.id],
		relationName: "rezension_receiverId_user_id"
	}),
	user_senderId: one(user, {
		fields: [rezension.senderId],
		references: [user.id],
		relationName: "rezension_senderId_user_id"
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.user_id],
		references: [user.id]
	}),
}));

export const stripeCustomerRelations = relations(stripeCustomer, ({one}) => ({
	user: one(user, {
		fields: [stripeCustomer.userId],
		references: [user.id]
	}),
}));

export const reportRelations = relations(report, ({one}) => ({
	message: one(message, {
		fields: [report.messageId],
		references: [message.id]
	}),
	conversation: one(conversation, {
		fields: [report.conversationId],
		references: [conversation.id]
	}),
	user: one(user, {
		fields: [report.userId],
		references: [user.id]
	}),
	inserat: one(inserat, {
		fields: [report.inseratId],
		references: [inserat.id]
	}),
}));

export const purchaseRelations = relations(purchase, ({one}) => ({
	user: one(user, {
		fields: [purchase.userId],
		references: [user.id]
	}),
	inserat: one(inserat, {
		fields: [purchase.inseratId],
		references: [inserat.id]
	}),
}));

export const twoFactorConfirmationRelations = relations(twoFactorConfirmation, ({one, many}) => ({
	user: one(user, {
		fields: [twoFactorConfirmation.userId],
		references: [user.id],
		relationName: "twoFactorConfirmation_userId_user_id"
	}),
	users: many(user, {
		relationName: "user_twoFactorConfirmationId_twoFactorConfirmation_id"
	}),
}));

export const userSubscriptionRelations = relations(userSubscription, ({one, many}) => ({
	user: one(user, {
		fields: [userSubscription.userId],
		references: [user.id],
		relationName: "userSubscription_userId_user_id"
	}),
	users: many(user, {
		relationName: "user_subscriptionId_userSubscription_id"
	}),
}));

export const changeEmailTokenRelations = relations(changeEmailToken, ({one}) => ({
	user: one(user, {
		fields: [changeEmailToken.userId],
		references: [user.id]
	}),
}));

export const blockRelations = relations(block, ({one}) => ({
	conversation: one(conversation, {
		fields: [block.conversationId],
		references: [conversation.id]
	}),
	user: one(user, {
		fields: [block.userId],
		references: [user.id]
	}),
}));

export const oauth_accountRelations = relations(oauth_account, ({one}) => ({
	user: one(user, {
		fields: [oauth_account.userId],
		references: [user.id]
	}),
}));

export const savedSearchRelations = relations(savedSearch, ({one}) => ({
	user: one(user, {
		fields: [savedSearch.userId],
		references: [user.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));