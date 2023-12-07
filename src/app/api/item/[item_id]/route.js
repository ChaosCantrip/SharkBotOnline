import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { item_id } = params;
    const doc_ref = doc(db, "items", item_id);
    const item = await getDoc(doc_ref);
    return NextResponse.json(item.data());
}