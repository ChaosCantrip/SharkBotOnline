import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { redirect } from "next/navigation";

async function get_token(code) {
    const body = {
        "grant_type": "authorization_code",
        "client_id": process.env.BUNGIE_CLIENT_ID,
        "client_secret": process.env.BUNGIE_CLIENT_SECRET,
        "code": code
    }

    let formBody = [];
    for (let property in body) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const token_response = await fetch("https://www.bungie.net/platform/app/oauth/token/", {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })

    if (!token_response.ok) {
        redirect("/bungie_auth/failure");
    } else {
        return await token_response.json();
    }
}

async function get_destiny_info(membership_id) {
    const destiny_info_response = await fetch(`https://www.bungie.net/Platform/Destiny2/-1/Profile/${membership_id}/LinkedProfiles/`, {
        cache: "no-store",
        headers: {
            "X-API-Key": process.env.BUNGIE_X_API_KEY
        }
    })

    if (!destiny_info_response.ok) {
        redirect("/bungie_auth/failure");
    } else {
        return await destiny_info_response.json();
    }
}

export async function GET(request) {
    const code = request.nextUrl.searchParams.get("code");
    const member_id = request.nextUrl.searchParams.get("state");

    if (code == null || member_id == null || member_id.length !== 18 || isNaN(member_id)) {
        redirect("/bungie_auth/failure");
    }

    const data = await get_token(code);
    const destiny_info = await get_destiny_info(data["membership_id"]);

    data["destiny_membership_id"] = destiny_info["Response"]["profiles"][0]["membershipId"];
    data["destiny_membership_type"] = destiny_info["Response"]["profiles"][0]["membershipType"];
    data["refreshed_at"] = Date.now();

    await setDoc(doc(db, "bungieauth", member_id), data)

    redirect("/bungie_auth/success");
}