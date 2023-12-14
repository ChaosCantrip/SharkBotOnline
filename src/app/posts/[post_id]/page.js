import article from "@styles/article.module.css";
import {get_post} from "@lib/sharkbot";
import {notFound} from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc"

import styles from "./post.module.css";

export default async function PostPage({ params }) {
    const post_id = params.post_id.toLowerCase();
    const post = await get_post(post_id);

    if (!post) {
        notFound();
    }

    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>{post.title}</h1>
            <div className={article.body}>
                <div className={styles.markdown_wrapper}>
                    <MDXRemote source={post.body} />
                </div>
            </div>
            <div className={styles.footnotes}>
                <p>{post.author.name}</p>
                <p>{new Date(post.created_at).toString()}</p>
                <p>{post.id}</p>
            </div>
        </div>
    )
}