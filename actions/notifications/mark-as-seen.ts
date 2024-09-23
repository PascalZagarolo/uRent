'use server';

import db from "@/db/drizzle";
import { notification } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const MarkAsSeen = (conversationId, currentUserId) => {
    try {
        const patchNotifications = async () => {
            const patchNotifications = await db.update(notification).set({
                seen: true
            }).where(
                and(
                    eq(notification.conversationId, conversationId),
                    eq(notification.userId, currentUserId)
                )
            )
        }

        return null;

        } catch(e : any) {
            console.log(e);
            return null;
        }
 }