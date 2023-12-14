"use client";

import article from "@styles/article.module.css";
import styles from "./edit.module.css";
import {MDXRemote} from "next-mdx-remote/rsc";

export default async function PostEditPage(){
    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Edit Post</h1>
            <div className={article.body}>
                <form className={styles.form}>
                    <div className={styles.top}>
                        <div className={styles.field}>
                            <label className={styles.label}>Post ID</label>
                            <input className={styles.input} type="text" placeholder="Post ID"/>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Post Title</label>
                            <input className={styles.input} type="text" placeholder="Post Title"/>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Post Body</label>
                        <textarea className={styles.textarea} placeholder="Post Body"/>
                    </div>
                    {/*
                    <div className={styles.preview_wrapper}>
                        <p className={styles.label}>Preview</p>
                        <div className={styles.preview}>
                            <h1 className={article.title}>Post Title</h1>
                            <div className={article.body}>
                                <MDXRemote source={"Hello, **world**"} />
                            </div>
                        </div>
                    </div>
                    */}
                    <div className={styles.bottom}>
                        <div className={styles.field}>
                            <p className={styles.big_label}>Author</p>
                            <div className={styles.inline_field}>
                                <label className={styles.label}>Name</label>
                                <input className={styles.input} type="text" placeholder="Author Name"/>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.big_label}>Authorization</p>
                            <div className={styles.inline_field}>
                                <label className={styles.label}>Key</label>
                                <input className={styles.input} type="text" placeholder="Authorization Key"/>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.big_label}>Actions</p>
                            <div className={styles.buttons}>
                                <button className={styles.button} disabled={true}>Save as Draft</button>
                                <button className={styles.button} disabled={true}>Load Draft</button>
                                <button className={styles.button}>Publish</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}