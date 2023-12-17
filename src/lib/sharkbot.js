import { sql } from "@vercel/postgres";
import { cache } from "react";

export const get_item = cache(async (item_id) => {
    const item = await sql`SELECT * FROM items WHERE id = ${item_id}`;
    if (item.rowCount === 0) {
        return null;
    } else {
        return item.rows[0];
    }
});

export const get_all_items = cache(async () => {
    const items = await sql`SELECT * FROM items`;
    return items.rows;
});

export const get_collection = cache(async (collection_id) => {
    const collection = await sql`SELECT * FROM collections WHERE id = ${collection_id}`;
    if (collection.rowCount === 0) {
        return null;
    } else {
        return collection.rows[0];
    }
});

export const get_collection_items = cache(async (collection_id) => {
    const items = await sql`SELECT * FROM items WHERE collection_id = ${collection_id}`;
    return items.rows;
});

export const get_all_collections = cache(async () => {
    const collections = await sql`SELECT * FROM collections`;
    return collections.rows;
});

export const get_member = cache(async (member_id) => {
    const member = await sql`SELECT * FROM members WHERE id = ${member_id}`;
    if (member.rowCount === 0) {
        return null;
    } else {
        return member.rows[0];
    }
});

export const get_leaderboard = cache(async (leaderboard_id) => {
    const leaderboard = await sql`SELECT * FROM leaderboards WHERE id = ${leaderboard_id}`;
    if (leaderboard.rowCount === 0) {
        return null;
    } else {
        return leaderboard.rows[0];
    }
});

export const get_post = cache(async (post_id) => {
    const post = await sql`SELECT * FROM posts WHERE id = ${post_id}`;
    if (post.rowCount === 0) {
        return null;
    } else {
        return post.rows[0];
    }
});

export const set_post = cache(async (post_id, data) => {
    const post = await sql`SELECT * FROM posts WHERE id = ${post_id}`;
    if (post.rowCount === 0) {
        await sql`INSERT INTO posts (id, title, content, author, created_at, updated_at) VALUES (${data.id}, ${data.title}, ${data.content}, ${data.author}, ${data.created_at}, ${data.updated_at})`;
    } else {
        await sql`UPDATE posts SET title = ${data.title}, content = ${data.content}, author = ${data.author}, updated_at = ${data.updated_at} WHERE id = ${post_id}`;
    }
});

export const get_all_posts = cache(async () => {
    const posts = await sql`SELECT * FROM posts`;
    return posts.rows;
});