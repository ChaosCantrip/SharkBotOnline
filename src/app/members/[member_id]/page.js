import article from "@styles/article.module.css";

export default function MemberPage({ params }) {
    const member_id = params.member_id.toUpperCase();
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Member: {member_id}</h1>
            <div className={article.body}>
                <p>Some content idk</p>
            </div>
        </div>
    )
}