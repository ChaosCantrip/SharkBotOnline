import { get_item } from "@lib/sharkbot";
import {SharkResponse} from "@/app/api/SharkResponse";

export async function GET(request, { params }) {
    const item_id = params.item_id.toUpperCase();
    const item = await get_item(item_id);
    if (item) {
        return SharkResponse(item);
    } else {
        return SharkResponse({ error: "Item not found" }, 404);
    }
}