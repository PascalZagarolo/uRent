"use server";

import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { desc, inArray, sql, not, eq } from "drizzle-orm";

/**
 * Fetches recommended inserate based on provided IDs or category
 * @param ids Array of inserat IDs to fetch
 * @param category Optional category to filter by if no IDs are provided
 * @param limit Maximum number of results to return (default: 10)
 * @param excludeId Optional ID to exclude from results
 */
export async function getRecommendedInserate({
  ids,
  category,
  limit = 10,
  excludeId
}: {
  ids?: string[];
  category?: string;
  limit?: number;
  excludeId?: string;
}) {
  try {
    // Check if we have specific IDs to fetch
    if (ids && ids.length > 0) {
      const limitedIds = ids.slice(0, limit);
      
      // Query to fetch inserate by IDs
      const results = await db.query.inserat.findMany({
        where: inArray(inserat.id, limitedIds),
        with: {
          images: {
            limit: 1
          },
          address: true
        },
        orderBy: [desc(inserat.createdAt)],
        limit: limit
      });

      return {
        success: true,
        inserate: results
      };
    } 
    // If no specific IDs, get recommended inserate based on category
    else {
      const query = db.query.inserat.findMany({
        where: sql`${inserat.isPublished} = true ${
          category ? sql` AND ${inserat.category} = ${category}` : sql``
        } ${
          excludeId ? sql` AND ${inserat.id} != ${excludeId}` : sql``
        }`,
        with: {
          images: {
            limit: 1
          },
          address: true
        },
        orderBy: [desc(inserat.createdAt)],
        limit: limit
      });

      const results = await query;

      return {
        success: true,
        inserate: results
      };
    }
  } catch (error) {
    console.error("Error fetching recommended inserate:", error);
    return {
      success: false,
      error: "Failed to fetch recommended inserate",
      inserate: []
    };
  }
}
