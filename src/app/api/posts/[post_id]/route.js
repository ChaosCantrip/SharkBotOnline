import { get_post } from "@lib/sharkbot";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const post_id = params.post_id.toLowerCase();
    const post = await get_post(post_id);
    if (post) {
        return NextResponse.json(post);
    } else {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
}