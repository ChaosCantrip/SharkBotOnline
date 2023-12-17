import {SharkResponse} from "@/app/api/SharkResponse";
import { sql } from "@vercel/postgres";

const required_fields = [
    "id",
    "name",
    "type",
    "description",
    "icon_url",
    "sellable",
    "collection_id",
    "rarity",
    "index"
]

const optional_fields = [
    "lootpool"
]

export async function POST(request) {
    const data = await request.json();
    const auth = request.headers.get("Authorization");

    if (!auth) {
        return SharkResponse({
            error: "Missing authorization header."
        }, 400);
    }

    if (auth !== process.env.SHARKBOT_AUTH_TOKEN) {
        return SharkResponse({
            error: "Invalid authorization token."
        }, 401);
    }

    if (!data) {
        return SharkResponse({
            error: "Missing request body."
        }, 400);
    }

    const item = await sql`SELECT * FROM items WHERE id = ${data.id}`;
    if (item.rowCount > 0) {
        return SharkResponse({
            error: "Item already exists."
        }, 400);
    }

    for (const field of required_fields) {
        if (data[field] === undefined) {
            return SharkResponse({
                error: `Missing required field: ${field}`
            }, 400);
        }
    }

    for (const field of optional_fields) {
        if (!data[field]) {
            data[field] = null;
        }
    }

    try {
        const result = await sql`
            INSERT INTO items (
                id,
                name,
                type,
                description,
                icon_url,
                sellable,
                collection_id,
                rarity,
                index,
                lootpool
            ) VALUES (
                ${data.id},
                ${data.name},
                ${data.type},
                ${data.description},
                ${data.icon_url},
                ${data.sellable},
                ${data.collection_id},
                ${data.rarity},
                ${data.index},
                ${data.lootpool}
            )
        `;
        return SharkResponse({
            message: "Item added successfully."
        }, 201);
    } catch (e) {
        console.error(e);
        return SharkResponse({
            error: "Internal server error."
        }, 500);
    }
}