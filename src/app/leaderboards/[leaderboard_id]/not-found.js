import NotFoundTemplate from "@components/NotFoundTemplate";

export const metadata = {
    "title": "Leaderboard not found!",
    "description": "It appears the Leaderboard you are looking for does not exist!"
}

export default function LeaderboardNotFound() {
    return (
        <NotFoundTemplate title="Leaderboard not found!" body="It appears the Leaderboard you are looking for does not exist!"/>
    )
}
