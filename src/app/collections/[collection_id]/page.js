import article from "@styles/article.module.css";

export default async function CollectionPage({ params }) {
    const collection_id = params.collection_id.toUpperCase();
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Collection: {collection_id}</h1>
            <div className={article.body}>
                <p>Some content idk</p>
            </div>
        </div>
    )
}