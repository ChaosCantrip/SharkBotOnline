import {NextResponse} from "next/server";

export function SharkResponse(data, status = 200){
    const timestamp = new Date().toISOString();
    return NextResponse.json(
        {
            "Response": data,
            "Timestamp": timestamp
        },
        {
            status: status
        }
    );
}