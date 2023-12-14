import { get_post } from "@lib/sharkbot";
import {SharkResponse} from "@/app/api/SharkResponse";

export async function GET(request, { params }) {
    const post_id = params.post_id.toLowerCase();
    const post = await get_post(post_id);
    if (post) {
        return SharkResponse(post);
    } else {
        return SharkResponse({ error: "Post not found" }, 404);
    }
}