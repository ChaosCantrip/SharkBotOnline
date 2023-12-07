import article from "@styles/article.module.css";

export default function ItemsPage() {
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Items Page</h1>
            <div className={article.body}>
                <p>Some content idk</p>
            </div>
        </div>
    )
}