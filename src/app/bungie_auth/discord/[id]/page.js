import Link from "next/link";

export default function AuthPage({ params }){
    if (!isNaN(params.id) && params.id.length === 18){
        const target = `https://www.bungie.net/en/oauth/authorize?client_id=${process.env.BUNGIE_CLIENT_ID}&response_type=code&state=${params.id}`
        return (
            <div>
                <h1>Bungie.Net Authorization</h1>
                <div>
                    <p>Click <Link href={target}>Here</Link> to authorize SharkBot with Bungie.Net</p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Hmm...</h1>
                <div>
                    <p>That doesn't look like a correct Member ID. Are you sure you're coming from SharkBot?</p>
                </div>
            </div>
        )
    }
}