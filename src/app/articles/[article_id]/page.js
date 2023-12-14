import article from "@styles/article.module.css";

export default async function ArticlePage({ params }) {
    const article_id = params.article_id.toLowerCase();
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Article: {article_id}</h1>
            <div className={article.body}>
                <p>Some content idk</p>
            </div>
        </div>
    )
}