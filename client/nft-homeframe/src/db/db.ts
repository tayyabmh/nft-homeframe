import { pgTable, serial, text, varchar, boolean } from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const connectionString = "postgres://postgres.pxcjxudqrdzjvbynbvcd:hd4yv4Gyg3bSAjxG@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

export const nfts = pgTable('nfts', {
    id: serial('id').primaryKey(),
    collection: text('collection_name'),
    name: text('name'),
    description: text('description'),
    imageUrl: text('image_url'),
    show: boolean('show').default(true),
    owner: varchar('owner'),
}); 