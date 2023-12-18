import {SharkResponse} from "@/app/api/SharkResponse";
import {set_collection} from "@lib/sharkbot";

const required_fields = [
    "id",
    "name",
    "sharkcoin_value",
    "xp_value",
    "icon_url",
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
        await set_collection(data.id, data);
        return SharkResponse({
            message: "Collection added successfully."
        }, 201);
    } catch (e) {
        console.error(e);
        return SharkResponse({
            error: "Internal server error."
        }, 500);
    }
}