import article from "@styles/article.module.css";

export default function PostsPage() {
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Posts Page</h1>
            <div className={article.body}>
                <p>Some content idk</p>
            </div>
        </div>
    )
}