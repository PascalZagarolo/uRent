import { NextResponse } from 'next/server';
import { inserat } from '@/db/schema';
import db from '@/db/drizzle';
import { desc, inArray } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'Invalid or missing ids array' }, { status: 400 });
        }

        // Limit to maximum 10 IDs
        const limitedIds = ids.slice(0, 10);

        // Fetch inserate by IDs
        const inserate = await db.query.inserat.findMany({
            where: inArray(inserat.id, limitedIds),
            with: {
                images: {
                    limit: 1
                },
                address: true
            },
            orderBy: [desc(inserat.createdAt)]
        });

        return NextResponse.json({ inserate });
    } catch (error) {
        console.error('Error fetching inserate by IDs:', error);
        return NextResponse.json({ error: 'Failed to fetch inserate' }, { status: 500 });
    }
} 