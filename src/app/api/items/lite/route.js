import {get_all_items} from "@lib/sharkbot";
import {SharkResponse} from "@/app/api/SharkResponse";

export async function GET(request) {
    const items = await get_all_items();
    const items_lite = [];
    for (const item of items) {
        items_lite.push({
            id: item.id,
            name: item.name,
            description: item.description,
            type: item.type,
            collection: item.collection.id,
            index: item.index
        });
    }
    return SharkResponse({items: items_lite});
}