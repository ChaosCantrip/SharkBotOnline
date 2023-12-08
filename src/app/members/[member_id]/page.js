import article from "@styles/article.module.css";
import {get_member} from "@lib/sharkbot";
import {notFound} from "next/navigation";

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