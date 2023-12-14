import article from "@styles/article.module.css";

export default async function PostPage({ params }) {
    const post_id = params.post_id.toLowerCase();
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Post: {post_id}</h1>
            <div className={article.body}>
                <p>Some content idk</p>
            </div>
        </div>
    )
}