import article from "@styles/article.module.css";
import { get_item } from "@lib/sharkbot";
import {notFound} from "next/navigation";

import styles from "./item.module.css";
import Link from "next/link";
import {sql} from "@vercel/postgres";

export const dynamicParams = false;

export async function generateStaticParams() {
    const item_ids = await sql`SELECT id FROM items`;

    return item_ids.rows.map((item) => {
        return {
            item_id: item.id
        }
    })
}

export async function generateMetadata({ params }) {
    const item_id = params.item_id.toUpperCase();
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
    const item_id = params.item_id.toUpperCase();
    const item = await get_item(item_id);

    if (!item) {
        notFound();
    }

    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>{item.name}<span className={styles.item_id}>{item.id}</span></h1>
            <div className={article.body}>
                <div className={styles.body}>
                    <div className={styles.main}>
                        <p className={styles.item_description}>{item.description}</p>
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
                            <p className={styles.item_value}>${item.sharkcoin_value}</p>
                        </div>
                        <div className={styles.item_collection_wrapper}>
                            <Link href={"/collections/" + item.collection_id}>
                                <div className={styles.item_collection}>
                                    <img className={styles.item_collection_icon} src={item.icon_url} alt={""} />
                                    <p className={styles.item_collection_name}>{item.collection_name} Collection</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}