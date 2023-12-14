import {get_post, set_post} from "@lib/sharkbot";
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


const required_fields = ["title", "body", "author"];
const required_sub_fields = {
    "author": ["name"]
}

export async function POST(request, { params }) {
    const post_id = params.post_id.toLowerCase();
    const post_data = await request.json();
    const auth_token = request.headers.get("Authorization");
    const post = await get_post(post_id);
    const post_exists = post !== null;

    if (!auth_token) {
        return SharkResponse({ error: "Missing Authorization header" }, 400);
    }

    if (auth_token !== process.env.SHARKBOT_AUTH_TOKEN) {
        return SharkResponse({ error: "Invalid Authorization token" }, 403);
    }

    if (!post_id.match(/^[0-9a-f]{6}$/)) {
        return SharkResponse({ error: "Invalid post ID" }, 400);
    }

    if (post_exists) {
        if (post_data.update !== true) {
            return SharkResponse({ error: "Post already exists, specify update=true to overwrite" }, 400);
        }
    }

    for (const field of required_fields) {
        if (!post_data[field]) {
            return SharkResponse({ error: `Missing required field: ${field}` }, 400);
        }
    }

    for (const field of Object.keys(required_sub_fields)) {
        const sub_fields = required_sub_fields[field];
        for (const sub_field of sub_fields) {
            if (!post_data[field][sub_field]) {
                return SharkResponse({ error: `Missing required sub-field: ${field}.${sub_field}` }, 400);
            }
        }
    }

    const timestamp = Date.now();

    const new_post = {
        id: post_id,
        title: post_data.title,
        body: post_data.body,
        author: {
            name: post_data.author.name
        },
        created_at: post_exists ? post.created_at : timestamp,
        updated_at: timestamp
    };

    await set_post(post_id, new_post);

    if (post_exists) {
        return SharkResponse({ message: "Post updated" }, 200);
    } else {
        return SharkResponse({ message: "Post created" }, 201);
    }

}