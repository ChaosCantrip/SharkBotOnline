import {SharkResponse} from "@/app/api/SharkResponse";
import {set_item} from "@lib/sharkbot";

const required_fields = [
    "id",
    "name",
    "type",
    "description",
    "collection_id",
    "index"
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

    for (const field of required_fields) {
        if (data[field] === undefined) {
            return SharkResponse({
                error: `Missing required field: ${field}`
            }, 400);
        }
    }

    try {
        await set_item(data.id, data);
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