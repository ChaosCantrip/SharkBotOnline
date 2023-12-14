import NotFoundTemplate from "@components/NotFoundTemplate";

export const metadata = {
    "title": "Post not found!",
    "description": "It appears the Post you are looking for does not exist!"
}

export default function PostNotFound() {
    return (
        <NotFoundTemplate title="Post not found!" body="It appears the Post you are looking for does not exist!"/>
    )
}
