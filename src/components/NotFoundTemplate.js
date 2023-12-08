import styles from "./NotFoundTemplate.module.css";
import article from '@styles/article.module.css';
import Link from "next/link";

export default function NotFoundTemplate({ title, body }) {
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>{title}</h1>
            <div className={article.body}>
                <p>{body}</p>
                <div className={styles.link_wrapper}>
                    <Link className={styles.link} href={"/"}>Go Home</Link>
                </div>
            </div>
        </div>
    )
}