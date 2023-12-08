import article from "@styles/article.module.css";
import {get_member} from "@lib/sharkbot";
import {notFound} from "next/navigation";

export async function generateMetadata({ params }) {
    const member_id = params.member_id;
    const member = await get_member(member_id);

    if (!member) {
        notFound();
    }

    return {
        title: member.display_name,
        description: `Profile for ${member.display_name} on SharkBot Online`,
        images: [
            {
                url: member.avatar_url,
                width: 256,
                height: 256,
                alt: member.display_name
            }
        ],
        icons: {
            icon: member.avatar_url
        }
    }
}

export default async function MemberPage({ params }) {
    const member_id = params.member_id;
    const member = await get_member(member_id);

    if (!member) {
        notFound();
    }

    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Member: {member_id}</h1>
            <div className={article.body}>
                <p>Some content idk</p>
                <pre>{JSON.stringify(member, null, 4)}</pre>
            </div>
        </div>
    )
}