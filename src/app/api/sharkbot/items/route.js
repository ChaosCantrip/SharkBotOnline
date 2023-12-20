import {sql} from "@vercel/postgres";
import {SharkResponse} from "@/app/api/SharkResponse";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const items = await sql`SELECT * FROM items`;
    return SharkResponse({
        items: items.rows
    }, 200);
}