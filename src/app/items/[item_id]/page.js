import article from "@styles/article.module.css";
import { get_item } from "@lib/sharkbot";
import {notFound} from "next/navigation";

import styles from "./item.module.css";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const item_id = params.item_id;
    const item = await get_item(item_id);

    if (!item) {
        notFound();
    }

    return {
        title: item.name,
        description: item.description,
        images: [
            {
                url: item.icon_url,
                width: 256,
                height: 256,
                alt: item.name
            }
        ],
        icons: {
            icon: item.icon_url
        }
    }

}

export default async function ItemPage({ params }) {
    const item_id = params.item_id;
    const item = await get_item(item_id);

    if (!item) {
        notFound();
    }

    const has_found_in = item.found_in.length > 0;

    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>{item.name}<span className={styles.item_id}>{item.id}</span></h1>
            <div className={article.body}>
                <div className={styles.body}>
                    <div className={styles.main}>
                        <p className={styles.item_description}>{item.description}</p>
                        { has_found_in ? (
                            <div className={styles.found_in_wrapper}>
                                <p>{item.name} can be found in:</p>
                                <div className={styles.found_in}>
                                    {item.found_in.map((lootbox) => (
                                        <Link href={"/items/" + lootbox.id} key={lootbox.id}>
                                            <div className={styles.found_in_item_wrapper}>
                                                <img className={styles.found_in_item_icon} src={lootbox.icon_url} alt={""} />
                                                <p className={styles.found_in_item_name}>{lootbox.name}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className={styles.not_found_in}>{item.name} cannot be found in any lootboxes.</p>
                        )}
                    </div>
                    <div className={styles.embed}>
                        <div className={styles.embed_top_wrapper}>
                            <p className={styles.embed_name}>{item.name}</p>
                            <img className={styles.item_icon} src={item.icon_url} alt={""} />
                            <p className={styles.embed_description}>{item.description}</p>
                        </div>
                        <div className={styles.embed_values}>
                            <p className={styles.item_value}>{item.type}</p>
                            <p className={styles.item_value}><span className={item.sellable ? styles.green : styles.red}>{item.sellable ? "Sellable" : "Not Sellable"}</span></p>
                            <p className={styles.item_value}>{item.xp_value}xp</p>
                            <p className={styles.item_value}>${item.value}</p>
                        </div>
                        <div className={styles.item_collection_wrapper}>
                            <Link href={"/collections/" + item.collection.id}>
                                <div className={styles.item_collection}>
                                    <img className={styles.item_collection_icon} src={item.collection.icon_url} alt={""} />
                                    <p className={styles.item_collection_name}>{item.collection.name} Collection</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}