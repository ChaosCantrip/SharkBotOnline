import article from "@styles/article.module.css";

export default function LeaderboardPage({ params }) {
    const leaderboard_id = params.leaderboard_id.toUpperCase();
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Leaderboard: {leaderboard_id}</h1>
            <div className={article.body}>
                <p>Some content idk</p>
            </div>
        </div>
    )
}