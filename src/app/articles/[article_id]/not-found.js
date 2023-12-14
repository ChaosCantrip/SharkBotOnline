import NotFoundTemplate from "@components/NotFoundTemplate";

export const metadata = {
    "title": "Article not found!",
    "description": "It appears the Article you are looking for does not exist!"
}

export default function ArticleNotFound() {
    return (
        <NotFoundTemplate title="Article not found!" body="It appears the Article you are looking for does not exist!"/>
    )
}
