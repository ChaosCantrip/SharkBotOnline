"use client";

import ErrorTemplate from "@components/ErrorTemplate";

export default function ${FUNCTION_PREFIX}Error({ error, reset }) {
    return <ErrorTemplate error={error} reset={reset} title="${TITLE}" body="${BODY}"/>
}
