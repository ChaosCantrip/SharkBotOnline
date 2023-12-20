import {sql} from "@vercel/postgres";
import {SharkResponse} from "@/app/api/SharkResponse";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const item_types = await sql`SELECT * FROM item_types`;
    return SharkResponse({
        item_types: item_types.rows
    }, 200);
}