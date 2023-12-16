import {get_all_items, get_all_items_lite} from "@lib/sharkbot";
import {SharkResponse} from "@/app/api/SharkResponse";

export async function GET(request) {
    const items = await get_all_items_lite();
    return SharkResponse({items: items});
}