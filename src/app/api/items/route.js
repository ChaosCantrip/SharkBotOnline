import {SharkResponse} from "@/app/api/SharkResponse";
import {get_all_items} from "@lib/sharkbot";

export async function GET(request) {
    const items = await get_all_items();
    return SharkResponse({items: items});
}