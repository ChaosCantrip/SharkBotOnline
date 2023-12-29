import { sql } from "@vercel/postgres";
import { cache } from "react";

/* ===== ITEMS ===== */

export async function get_item(item_id) {
    console.log(`DB READ | get_item | item_id: ${item_id}`)
    const item = await sql`SELECT items.id, items.name, items.type, items.description, items.collection_id, items.index, collections.name AS collection_name, collections.sharkcoin_value, collections.xp_value, collections.icon_url, item_types.sellable, item_types.consumable FROM items INNER JOIN collections ON items.collection_id = collections.id INNER JOIN item_types ON items.type = item_types.id WHERE items.id = ${item_id}`;
    if (item.rowCount === 0) {
        return null;
    } else {
        return item.rows[0];
    }
}

export async function get_all_items() {
    console.log(`DB READ | get_all_items`)
    const items = await sql`SELECT * FROM items`;
    return items.rows;
}

export async function get_collection_items(collection_id) {
    console.log(`DB READ | get_collection_items | collection_id: ${collection_id}`)
    const items = await sql`SELECT items.id, items.name, items.type, items.description, items.collection_id, items.index, collections.name AS collection_name, collections.sharkcoin_value, collections.xp_value, collections.icon_url, item_types.sellable, item_types.consumable FROM items INNER JOIN collections ON items.collection_id = collections.id INNER JOIN item_types ON items.type = item_types.id WHERE items.collection_id = ${collection_id}`;
    return items.rows;
}

export async function set_item(item_id, data) {
    console.log(`DB WRITE | set_item | item_id: ${item_id}`)
    const item = await get_item(item_id);
    if (item === null) {
        await sql`INSERT INTO items (id, name, type, description, collection_id, index) VALUES (${data.id}, ${data.name}, ${data.type}, ${data.description}, ${data.collection_id}, ${data.index})`;
    } else {
        await sql`UPDATE items SET name = ${data.name}, type = ${data.type}, description = ${data.description}, collection_id = ${data.collection_id}, index = ${data.index} WHERE id = ${item_id}`;
    }
}

/* ===== ITEM TYPES ===== */

export async function get_item_type(item_type_id) {
    console.log(`DB READ | get_item_type | item_type_id: ${item_type_id}`)
    const item_type = await sql`SELECT * FROM item_types WHERE id = ${item_type_id}`;
    if (item_type.rowCount === 0) {
        return null;
    } else {
        return item_type.rows[0];
    }
}

export async function get_all_item_types() {
    console.log(`DB READ | get_all_item_types`)
    const item_types = await sql`SELECT * FROM item_types`;
    return item_types.rows;
}

/* ===== COLLECTIONS ===== */

export async function get_collection(collection_id) {
    console.log(`DB READ | get_collection | collection_id: ${collection_id}`)
    const collection = await sql`SELECT * FROM collections WHERE id = ${collection_id}`;
    if (collection.rowCount === 0) {
        return null;
    } else {
        return collection.rows[0];
    }
}

export async function get_all_collections() {
    console.log(`DB READ | get_all_collections`)
    const collections = await sql`SELECT * FROM collections`;
    return collections.rows;
}

export async function set_collection(collection_id, data) {
    console.log(`DB WRITE | set_collection | collection_id: ${collection_id}`)
    const collection = await get_collection(collection_id);
    if (collection === null) {
        await sql`INSERT INTO collections (id, name, sharkcoin_value, xp_value, icon_url, index) VALUES (${data.id}, ${data.name}, ${data.sharkcoin_value}, ${data.xp_value}, ${data.icon_url}, ${data.index})`;
    } else {
        await sql`UPDATE collections SET name = ${data.name}, sharkcoin_value = ${data.sharkcoin_value}, xp_value = ${data.xp_value}, icon_url = ${data.icon_url}, index = ${data.index} WHERE id = ${collection_id}`;
    }

}

/* ===== MEMBERS ===== */

export async function get_member(member_id) {
    console.log(`DB READ | get_member | member_id: ${member_id}`)
    const member = await sql`SELECT * FROM members WHERE id = ${member_id}`;
    if (member.rowCount === 0) {
        return null;
    } else {
        return member.rows[0];
    }
}

/* ===== LEADERBOARDS ===== */

export async function get_leaderboard(leaderboard_id) {
    console.log(`DB READ | get_leaderboard | leaderboard_id: ${leaderboard_id}`)
    const leaderboard = await sql`SELECT * FROM leaderboards WHERE id = ${leaderboard_id}`;
    if (leaderboard.rowCount === 0) {
        return null;
    } else {
        return leaderboard.rows[0];
    }
}

/* ===== POSTS ===== */

export async function get_post(post_id) {
    console.log(`DB READ | get_post | post_id: ${post_id}`)
    const post = await sql`SELECT * FROM posts WHERE id = ${post_id}`;
    if (post.rowCount === 0) {
        return null;
    } else {
        return post.rows[0];
    }
}

export async function set_post(post_id, data) {
    console.log(`DB WRITE | set_post | post_id: ${post_id}`)
    const post = get_post(post_id);
    if (post === null) {
        await sql`INSERT INTO posts (id, title, content, author, created_at, updated_at) VALUES (${data.id}, ${data.title}, ${data.content}, ${data.author}, ${data.created_at}, ${data.updated_at})`;
    } else {
        await sql`UPDATE posts SET title = ${data.title}, content = ${data.content}, author = ${data.author}, updated_at = ${data.updated_at} WHERE id = ${post_id}`;
    }
}

export async function get_all_posts() {
    console.log(`DB READ | get_all_posts`)
    const posts = await sql`SELECT * FROM posts`;
    return posts.rows;
}