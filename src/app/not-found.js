import NotFoundTemplate from "@components/NotFoundTemplate";

export const metadata = {
    title: "Page not found!",
    description: "It appears the Page you are looking for does not exist!"
}

export default function RootNotFound() {
    return (
        <NotFoundTemplate title="Page not found!" body="It appears the Page you are looking for does not exist!"/>
    )
}
