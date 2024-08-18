'use server';

import { db, nfts } from '../db/db';
import { count, eq, and, ne } from 'drizzle-orm';

export async function fetchRandomNFT() {
    // Get Total Number of Rows
    const nftCount = await db
        .select({count: count()})
        .from(nfts)
        .where(eq(nfts.show, true));


    // Get Random Row
    const randomIndex = Math.floor(Math.random() * nftCount[0].count);

    const randomNFT = await db
        .select({
            id: nfts.id,
            imageUrl: nfts.imageUrl,
            description: nfts.description,
            name: nfts.name,
            owner: nfts.owner,
        })
        .from(nfts)
        .where(and(
            eq(nfts.show, true),
            )
        )
        .offset(randomIndex)
        .limit(1);

    return randomNFT[0];
}


export async function setNFTShow(id: number, show: boolean) {
    return await db.update(nfts).set({show}).where(eq(nfts.id, id));
}