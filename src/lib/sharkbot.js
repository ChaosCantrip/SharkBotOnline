import { sql } from "@vercel/postgres";
import { cache } from "react";

/* ===== ITEMS ===== */

export const get_item = cache(async (item_id) => {
    console.log(`DB READ | get_item | item_id: ${item_id}`)
    const item = await sql`SELECT * FROM items WHERE id = ${item_id}`;
    if (item.rowCount === 0) {
        return null;
    } else {
        return item.rows[0];
    }
});

export const get_all_items = cache(async () => {
    console.log(`DB READ | get_all_items`)
    const items = await sql`SELECT * FROM items`;
    return items.rows;
});

export const get_collection_items = cache(async (collection_id) => {
    console.log(`DB READ | get_collection_items | collection_id: ${collection_id}`)
    const items = await sql`SELECT * FROM items WHERE collection_id = ${collection_id}`;
    return items.rows;
});

export async function set_item(item_id, data) {
    console.log(`DB WRITE | set_item | item_id: ${item_id}`)
    const item = get_item(item_id);
    if (item === null) {
        await sql`INSERT INTO items (id, name, type, description, icon_url, sellable, collection_id, rarity, index, lootpool) VALUES (${data.id}, ${data.name}, ${data.type}, ${data.description}, ${data.icon_url}, ${data.sellable}, ${data.collection_id}, ${data.rarity}, ${data.index}, ${data.lootpool})`;
    } else {
        await sql`UPDATE items SET name = ${data.name}, type = ${data.type}, description = ${data.description}, icon_url = ${data.icon_url}, sellable = ${data.sellable}, collection_id = ${data.collection_id}, rarity = ${data.rarity}, index = ${data.index}, lootpool = ${data.lootpool} WHERE id = ${item_id}`;
    }
}

/* ===== COLLECTIONS ===== */

export const get_collection = cache(async (collection_id) => {
    console.log(`DB READ | get_collection | collection_id: ${collection_id}`)
    const collection = await sql`SELECT * FROM collections WHERE id = ${collection_id}`;
    if (collection.rowCount === 0) {
        return null;
    } else {
        return collection.rows[0];
    }
});

export const get_all_collections = cache(async () => {
    console.log(`DB READ | get_all_collections`)
    const collections = await sql`SELECT * FROM collections`;
    return collections.rows;
});

/* ===== MEMBERS ===== */

export const get_member = cache(async (member_id) => {
    console.log(`DB READ | get_member | member_id: ${member_id}`)
    const member = await sql`SELECT * FROM members WHERE id = ${member_id}`;
    if (member.rowCount === 0) {
        return null;
    } else {
        return member.rows[0];
    }
});

/* ===== LEADERBOARDS ===== */

export const get_leaderboard = cache(async (leaderboard_id) => {
    console.log(`DB READ | get_leaderboard | leaderboard_id: ${leaderboard_id}`)
    const leaderboard = await sql`SELECT * FROM leaderboards WHERE id = ${leaderboard_id}`;
    if (leaderboard.rowCount === 0) {
        return null;
    } else {
        return leaderboard.rows[0];
    }
});

/* ===== POSTS ===== */

export const get_post = cache(async (post_id) => {
    console.log(`DB READ | get_post | post_id: ${post_id}`)
    const post = await sql`SELECT * FROM posts WHERE id = ${post_id}`;
    if (post.rowCount === 0) {
        return null;
    } else {
        return post.rows[0];
    }
});

export async function set_post(post_id, data) {
    console.log(`DB WRITE | set_post | post_id: ${post_id}`)
    const post = get_post(post_id);
    if (post === null) {
        await sql`INSERT INTO posts (id, title, content, author, created_at, updated_at) VALUES (${data.id}, ${data.title}, ${data.content}, ${data.author}, ${data.created_at}, ${data.updated_at})`;
    } else {
        await sql`UPDATE posts SET title = ${data.title}, content = ${data.content}, author = ${data.author}, updated_at = ${data.updated_at} WHERE id = ${post_id}`;
    }
}

export const get_all_posts = cache(async () => {
    console.log(`DB READ | get_all_posts`)
    const posts = await sql`SELECT * FROM posts`;
    return posts.rows;
});