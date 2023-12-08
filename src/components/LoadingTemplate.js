import article from "@styles/article.module.css";
import LoadingDots from "@components/LoadingDots";

export default function LoadingTemplate({ title, body }) {
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>{title}</h1>
            <div className={article.body}>
                <p>{body}</p>
                <LoadingDots />
            </div>
        </div>
    )
}