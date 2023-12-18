import article from "@styles/article.module.css";
import {get_collection, get_collection_items} from "@lib/sharkbot";
import styles from "./collection.module.css";
import {notFound} from "next/navigation";
import {ItemsTable} from "@components/ItemsTable";

export default async function CollectionPage({ params }) {
    const collection_id = params.collection_id.toUpperCase();
    const collection = await get_collection(collection_id);

    if (!collection) {
        notFound();
    }

    const items = await get_collection_items(collection_id);
    const num_items = items.length;

    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>{collection.name} Collection<span className={styles.collection_id}>{collection.id}</span></h1>
            <div className={article.body}>
                <p>{num_items} items</p>
                <div className={styles.item_table_wrapper}>
                    <ItemsTable items={items} search_bar={true}/>
                </div>
            </div>
        </div>
    )
}