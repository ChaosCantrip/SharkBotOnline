import NotFoundTemplate from "@components/NotFoundTemplate";

export const metadata = {
    "title": "Item not found!",
    "description": "It appears the Item you are looking for does not exist!"
}

export default function ItemNotFound() {
    return (
        <NotFoundTemplate title="Item not found!" body="It appears the Item you are looking for does not exist!"/>
    )
}
