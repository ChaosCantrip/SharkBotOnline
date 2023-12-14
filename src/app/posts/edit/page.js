"use client";

import article from "@styles/article.module.css";
import styles from "./edit.module.css";
/* import {MDXRemote} from "next-mdx-remote/rsc"; */

export default async function PostEditPage(){

    async function handlePublish(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let formDataObject = Object.fromEntries(data.entries());
        let formJson = JSON.stringify(formDataObject);
        let post_data = {
            "id": formDataObject.post_id,
            "title": formDataObject.post_title,
            "body": formDataObject.post_body,
            "author": {
                "name": formDataObject.post_author_name
            },
            "update": true,
        }
        let post_json = JSON.stringify(post_data);
        let auth_token = formDataObject.auth_key;
        let post_id = formDataObject.post_id;
        let url = `/api/posts/${post_id}`;
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": auth_token
            },
            body: post_json
        });
        let response_json = await response.json();
        if (response.ok){
            alert(`Post published successfully!`);
        } else {
            alert(`Error publishing post: ${response_json.Response.error}`);
        }
    }

    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>Edit Post</h1>
            <div className={article.body}>
                <form className={styles.form} onSubmit={handlePublish}>
                    <div className={styles.top}>
                        <div className={styles.field}>
                            <label className={styles.label}>Post ID</label>
                            <input className={styles.input} type="text" placeholder="Post ID" id="post_id" name="post_id" required/>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Post Title</label>
                            <input className={styles.input} type="text" placeholder="Post Title" id="post_title" name="post_title" required/>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Post Body</label>
                        <textarea className={styles.textarea} placeholder="Post Body" id="post_body" name="post_body" required/>
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
                                <input className={styles.input} type="text" placeholder="Author Name" id="post_author_name" name="post_author_name" required/>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.big_label}>Authorization</p>
                            <div className={styles.inline_field}>
                                <label className={styles.label}>Key</label>
                                <input className={styles.input} type="text" placeholder="Authorization Key" id="auth_key" name="auth_key" required/>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.big_label}>Actions</p>
                            <div className={styles.buttons}>
                                <button className={styles.button} disabled={true}>Save as Draft</button>
                                <button className={styles.button} disabled={true}>Load Draft</button>
                                <button className={styles.button} type="submit">Publish</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}