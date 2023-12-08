import NotFoundTemplate from "@components/NotFoundTemplate";

export const metadata = {
    "title": "Member not found!",
    "description": "It appears the Member you are looking for does not exist!"
}

export default function MemberNotFound() {
    return (
        <NotFoundTemplate title="Member not found!" body="It appears the Member you are looking for does not exist!"/>
    )
}
