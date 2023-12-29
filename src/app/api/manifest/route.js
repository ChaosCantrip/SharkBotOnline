import { get_all_items, get_all_collections, get_all_item_types } from "@lib/sharkbot";
import {SharkResponse} from "@/app/api/SharkResponse";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const items = await get_all_items();
    const collections = await get_all_collections();
    const item_types = await get_all_item_types();
    return SharkResponse({ items: items, collections: collections, item_types: item_types });
}