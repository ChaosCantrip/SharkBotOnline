"use client";

import ErrorTemplate from "@components/ErrorTemplate";

export default function RootError({ error, reset }) {
    return <ErrorTemplate error={error} reset={reset} title="Something went wrong!" body="An error occurred."/>
}
