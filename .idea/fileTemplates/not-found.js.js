import NotFoundTemplate from "@components/NotFoundTemplate";

export const metadata = {
    title: "${TITLE}",
    description: "${BODY}"
};

export default function ${FUNCTION_PREFIX}NotFound() {
    return (
        <NotFoundTemplate title="${TITLE}" body="${BODY}"/>
    )
}
