import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


async function get_token(refresh_token){
    const body = {
        "grant_type": "refresh_token",
        "client_id": process.env.BUNGIE_CLIENT_ID,
        "client_secret": process.env.BUNGIE_CLIENT_SECRET,
        "refresh_token": refresh_token
    }
    let formBody = [];
    for (let property in body) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return await fetch("https://www.bungie.net/platform/app/oauth/token/", {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
}

async function get_data(member_id){
    const docSnap = await getDoc(doc(db, "bungieauth", member_id));

    if (docSnap.exists()) {
        return docSnap.data().refresh_token;
    } else {
        return false;
    }
}

export async function POST(request){
    const headersList = headers();
    const auth = headersList.get("SB_AUTH_KEY");
    const member_id = request.nextUrl.searchParams.get("member_id");
    console.log(auth);
    console.log(member_id);
    if (auth == null || member_id == null) {
        return NextResponse.json({message: "Malformed Request"}, {status: 400});
    }
    if (member_id.length !== 18 || isNaN(member_id)) {
        return NextResponse.json({message: "Malformed Member ID"}, {status: 400});
    }
    if (auth !== process.env.SHARKBOT_AUTH_TOKEN) {
        return NextResponse.json({message: "Bad Authorization"}, {status: 401});
    }
    const token = await get_data(member_id);
    if (!token) {
        return NextResponse.json({message: "Member Token Not Found"}, {status: 404});
    }
    const refreshed_at = Date.now();
    const response = await get_token(token);
    const response_data = await response.json();
    if (!response.ok){
        return NextResponse.json({
            message: "Something went wrong!",
            status: response.status,
            response: response_data
        }, {status: 500});
    }
    response_data["refreshed_at"] = refreshed_at;
    await updateDoc(doc(db, "bungieauth", member_id), response_data);
    return NextResponse.json({
        message: "Success!",
        status: response.status,
        response: response_data
    }, {status: 200});
}