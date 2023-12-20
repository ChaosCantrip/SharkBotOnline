import {sql} from "@vercel/postgres";
import {SharkResponse} from "@/app/api/SharkResponse";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const collections = await sql`SELECT * FROM collections`;
    return SharkResponse({
        collections: collections.rows
    }, 200);
}