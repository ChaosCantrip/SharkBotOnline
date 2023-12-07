import article from "@styles/article.module.css";

export default async function ItemPage({ params }) {
    const item_id = params.item_id;
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Item: {item_id}</h1>
            <div className={article.body}>
                <p>Some content idk</p>
            </div>
        </div>
    )
}