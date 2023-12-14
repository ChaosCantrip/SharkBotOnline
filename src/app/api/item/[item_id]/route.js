import { get_item } from "@lib/sharkbot";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const item_id = params.item_id.toUpperCase();
    const item = await get_item(item_id);
    if (item) {
        return NextResponse.json(item);
    } else {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
}