'use client' // Error components must be Client Components

import article from '@styles/article.module.css';
import styles from './error.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorTemplate({ error, reset, title, body }) {
    const router = useRouter();

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>{title}</h1>
            <div className={article.body}>
                <p>{body}</p>
                <div className={styles.buttons_wrapper}>
                    <button className={styles.button} onClick={() => router.back()}>Go back</button>
                    <button className={styles.button} onClick={() => reset()}>Try again</button>
                </div>
            </div>
        </div>
    )
}