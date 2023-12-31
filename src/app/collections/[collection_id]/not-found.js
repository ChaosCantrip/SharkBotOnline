import NotFoundTemplate from "@components/NotFoundTemplate";

export const metadata = {
    "title": "Collection not found!",
    "description": "It appears the Collection you are looking for does not exist!"
}

export default function CollectionNotFound() {
    return (
        <NotFoundTemplate title="Collection not found!" body="It appears the Collection you are looking for does not exist!"/>
    )
}
